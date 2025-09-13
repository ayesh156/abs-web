/**
 * Advanced Image State Management Hook
 * Handles image uploads, removals, and Firebase Storage cleanup
 */

import { useState, useCallback, useRef } from 'react';
import { BlogImageService } from '@/lib/blog-service';

interface ImageState {
  url: string;
  isNew: boolean; // True if uploaded in current session
  toDelete: boolean; // True if marked for deletion
}

interface UseImageManagerOptions {
  initialImage?: string;
  onImageChange?: (url: string) => void;
}

export function useImageManager(options: UseImageManagerOptions = {}) {
  const { initialImage = '', onImageChange } = options;
  
  const [imageState, setImageState] = useState<ImageState>({
    url: initialImage,
    isNew: false,
    toDelete: false
  });
  
  // Track newly uploaded images for cleanup
  const newlyUploadedImages = useRef<Set<string>>(new Set());
  
  const setImage = useCallback((url: string, isNew: boolean = false) => {
    setImageState(prev => ({
      url,
      isNew,
      toDelete: false
    }));
    
    if (isNew) {
      newlyUploadedImages.current.add(url);
    }
    
    onImageChange?.(url);
  }, [onImageChange]);

  const removeImage = useCallback(async () => {
    const currentUrl = imageState.url;
    
    // Clear image immediately for UX
    setImageState(prev => ({
      ...prev,
      url: '',
      toDelete: prev.isNew // Only mark for deletion if it's a new image
    }));
    
    onImageChange?.('');
    
    // If it's a newly uploaded image, delete from storage immediately
    if (imageState.isNew && currentUrl) {
      try {
        await BlogImageService.deleteImage(currentUrl);
        newlyUploadedImages.current.delete(currentUrl);
        console.log('Newly uploaded image deleted:', currentUrl);
      } catch (error) {
        console.warn('Failed to delete newly uploaded image:', error);
      }
    }
  }, [imageState, onImageChange]);

  const markForDeletion = useCallback((url: string) => {
    setImageState(prev => ({
      ...prev,
      toDelete: true
    }));
  }, []);

  // Cleanup function for when form is cancelled or errors occur
  const cleanupNewImages = useCallback(async () => {
    const imagesToCleanup = Array.from(newlyUploadedImages.current);
    
    if (imagesToCleanup.length === 0) return;
    
    console.log('Cleaning up newly uploaded images:', imagesToCleanup);
    
    const cleanupPromises = imagesToCleanup.map(async (url) => {
      try {
        await BlogImageService.deleteImage(url);
        newlyUploadedImages.current.delete(url);
      } catch (error) {
        console.warn('Failed to cleanup image:', url, error);
      }
    });
    
    await Promise.allSettled(cleanupPromises);
  }, []);

  // Reset state
  const reset = useCallback((newInitialImage?: string) => {
    setImageState({
      url: newInitialImage || '',
      isNew: false,
      toDelete: false
    });
    newlyUploadedImages.current.clear();
  }, []);

  // Get current image URL
  const getCurrentImage = useCallback(() => {
    return imageState.url;
  }, [imageState.url]);

  // Check if image should be preserved (not newly uploaded)
  const shouldPreserveImage = useCallback(() => {
    return !imageState.isNew;
  }, [imageState.isNew]);

  return {
    imageUrl: imageState.url,
    isNewImage: imageState.isNew,
    toDelete: imageState.toDelete,
    setImage,
    removeImage,
    markForDeletion,
    cleanupNewImages,
    reset,
    getCurrentImage,
    shouldPreserveImage
  };
}