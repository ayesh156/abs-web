/**
 * Performance Optimization Hook for Blog Forms
 * Implements debouncing, memoization, and efficient state management
 */

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

// Simple debounce implementation with cancel
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;
  
  const executedFunction = function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  executedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return executedFunction;
}

interface UseFormPerformanceOptions {
  debounceDelay?: number;
  autoSaveDelay?: number;
  enableAutoSave?: boolean;
}

export function useFormPerformance<T extends Record<string, any>>(
  initialData: T,
  onAutoSave?: (data: T) => Promise<void>,
  options: UseFormPerformanceOptions = {}
) {
  const {
    debounceDelay = 300,
    autoSaveDelay = 2000,
    enableAutoSave = false
  } = options;

  const [formData, setFormData] = useState<T>(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const originalDataRef = useRef<T>(initialData);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced form update function
  const debouncedUpdate = useMemo(
    () => debounce((newData: T) => {
      setFormData(newData);
      setIsDirty(true);
      
      // Trigger auto-save if enabled
      if (enableAutoSave && onAutoSave) {
        if (autoSaveTimeoutRef.current) {
          clearTimeout(autoSaveTimeoutRef.current);
        }
        
        autoSaveTimeoutRef.current = setTimeout(async () => {
          try {
            setIsAutoSaving(true);
            await onAutoSave(newData);
            setLastSaved(new Date());
            setIsDirty(false);
          } catch (error) {
            console.error('Auto-save failed:', error);
          } finally {
            setIsAutoSaving(false);
          }
        }, autoSaveDelay);
      }
    }, debounceDelay),
    [debounceDelay, autoSaveDelay, enableAutoSave, onAutoSave]
  );

  // Optimized field update function
  const updateField = useCallback((field: keyof T, value: any) => {
    const newData = { ...formData, [field]: value };
    debouncedUpdate(newData);
  }, [formData, debouncedUpdate]);

  // Batch update multiple fields
  const updateFields = useCallback((updates: Partial<T>) => {
    const newData = { ...formData, ...updates };
    debouncedUpdate(newData);
  }, [formData, debouncedUpdate]);

  // Reset form to initial state
  const resetForm = useCallback((newInitialData?: T) => {
    const dataToReset = newInitialData || originalDataRef.current;
    setFormData(dataToReset);
    setIsDirty(false);
    setLastSaved(null);
    
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = null;
    }
    
    if (newInitialData) {
      originalDataRef.current = newInitialData;
    }
  }, []);

  // Check if form has unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(originalDataRef.current);
  }, [formData]);

  // Get form validation status
  const getValidationStatus = useCallback((validators: Record<keyof T, (value: any) => boolean>) => {
    const errors: Record<string, boolean> = {};
    let isValid = true;

    Object.entries(validators).forEach(([field, validator]) => {
      const fieldValue = formData[field as keyof T];
      const fieldValid = validator(fieldValue);
      errors[field] = !fieldValid;
      if (!fieldValid) isValid = false;
    });

    return { isValid, errors };
  }, [formData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  return {
    formData,
    isDirty,
    isAutoSaving,
    lastSaved,
    hasUnsavedChanges,
    updateField,
    updateFields,
    resetForm,
    getValidationStatus,
    setFormData: debouncedUpdate
  };
}

/**
 * Memory optimization hook for large lists
 */
export function useVirtualizedList<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return {
      startIndex,
      endIndex,
      items: items.slice(startIndex, endIndex),
      offsetY: startIndex * itemHeight,
      totalHeight: items.length * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    handleScroll,
    totalHeight: visibleItems.totalHeight
  };
}

/**
 * Image preloading hook for better UX
 */
export function useImagePreloader(urls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  const preloadImage = useCallback((url: string) => {
    if (loadedImages.has(url) || loadingImages.has(url)) return;

    setLoadingImages(prev => new Set(prev).add(url));

    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set(prev).add(url));
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
    };
    img.onerror = () => {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
    };
    img.src = url;
  }, [loadedImages, loadingImages]);

  useEffect(() => {
    urls.forEach(preloadImage);
  }, [urls, preloadImage]);

  return {
    loadedImages,
    loadingImages,
    isLoaded: (url: string) => loadedImages.has(url),
    isLoading: (url: string) => loadingImages.has(url)
  };
}