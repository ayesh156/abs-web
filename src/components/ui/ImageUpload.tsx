'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ImageIcon, Loader2, CheckCircle } from 'lucide-react';
import { BlogImageService } from '@/lib/blog-service';
import { formatFileSize } from '@/lib/imageCompression';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onImageRemoved?: (url: string) => void; // Callback when image is removed
  className?: string;
  maxSizeMB?: number;
  accept?: string;
  placeholder?: string;
  preserveImage?: boolean; // Don't delete on remove (for editing existing posts)
  originalImage?: string; // Track original image for edit mode
  showPreservationStatus?: boolean; // Show preservation vs. replacement indicators
}

export default function ImageUpload({
  value,
  onChange,
  onImageRemoved,
  className = '',
  maxSizeMB = 5,
  accept = 'image/*',
  placeholder = 'Drop an image here or click to upload',
  preserveImage = false,
  originalImage,
  showPreservationStatus = false
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  } | null>(null);
  const [showCompressionFeedback, setShowCompressionFeedback] = useState(false);

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please select an image file';
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  }, [maxSizeMB]);

  const uploadFile = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Upload with compression and real progress tracking
      const result = await BlogImageService.uploadImage(
        file,
        'blog-images',
        (progress) => setUploadProgress(progress)
      );

      onChange(result.url);

      // Store compression info for user feedback
      setCompressionInfo(result.compressionInfo);
      setShowCompressionFeedback(true);

      // Hide compression feedback after 5 seconds
      setTimeout(() => {
        setShowCompressionFeedback(false);
        setCompressionInfo(null);
      }, 5000);
      
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  }, [onChange, validateFile]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  }, [uploadFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  }, [uploadFile]);

  const removeImage = useCallback(async () => {
    const currentImageUrl = value;
    
    // Clear the form value immediately for better UX
    onChange('');
    setError(null);
    
    // If this is a newly uploaded image (not preserving) and we have a callback, handle deletion
    if (!preserveImage && currentImageUrl && onImageRemoved) {
      try {
        // Notify parent component about image removal
        onImageRemoved(currentImageUrl);
        
        // Delete from Firebase Storage
        await BlogImageService.deleteImage(currentImageUrl);
        console.log('Image successfully removed from storage:', currentImageUrl);
      } catch (error) {
        console.warn('Failed to delete image from storage:', error);
        // Don't show error to user as the form state is already cleared
      }
    }
  }, [value, onChange, onImageRemoved, preserveImage]);

  // QA: Determine preservation status for user feedback
  const getImageStatus = () => {
    if (!showPreservationStatus || !originalImage) return null;
    
    if (!value) {
      return { type: 'removed', message: 'Image will be removed' };
    } else if (value === originalImage) {
      return { type: 'preserved', message: 'Original image preserved' };
    } else {
      return { type: 'replaced', message: 'Image will be replaced' };
    }
  };

  const imageStatus = getImageStatus();

  return (
    <div className={className}>
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded content"
            className="w-full h-48 object-cover rounded-xl border border-white/20"
          />
          
          {/* QA: Enhanced preservation status indicator */}
          {imageStatus && (
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${
              imageStatus.type === 'preserved' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : imageStatus.type === 'replaced'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {imageStatus.message}
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
            <div className="flex items-center gap-2">
              <label className="cursor-pointer p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                <Upload className="h-5 w-5 text-white" />
                <input
                  type="file"
                  accept={accept}
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              <button
                onClick={removeImage}
                className="p-3 bg-red-500/20 backdrop-blur-sm rounded-xl hover:bg-red-500/30 transition-colors"
                disabled={isUploading}
              >
                <X className="h-5 w-5 text-red-400" />
              </button>
            </div>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-8 w-8 text-accent-green animate-spin mx-auto mb-2" />
                <p className="text-white text-sm">Uploading... {uploadProgress}%</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-accent-green bg-accent-green/5'
              : 'border-white/20 hover:border-white/30'
          } ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <Loader2 className="h-12 w-12 text-accent-green animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-accent-green">
                    {uploadProgress}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-white/80 font-medium">Uploading image...</p>
                <p className="text-white/60 text-sm">Please wait</p>
              </div>
              <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-green to-accent-green/80"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full ${dragActive ? 'bg-accent-green/20' : 'bg-white/10'} transition-colors`}>
                <ImageIcon className={`h-8 w-8 ${dragActive ? 'text-accent-green' : 'text-white/60'}`} />
              </div>
              <div>
                <p className="text-white/80 font-medium mb-1">
                  {dragActive ? 'Drop your image here' : placeholder}
                </p>
                <p className="text-white/60 text-sm">
                  Supports PNG, JPG, WEBP up to {maxSizeMB}MB
                </p>
              </div>
              <label className="cursor-pointer px-6 py-3 bg-gradient-to-r from-accent-green to-accent-green/80 text-black font-medium rounded-xl hover:from-accent-green/90 hover:to-accent-green/70 transition-all duration-200 shadow-lg">
                Choose File
                <input
                  type="file"
                  accept={accept}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Compression Feedback */}
      <AnimatePresence>
        {showCompressionFeedback && compressionInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-green-400 text-sm font-medium">
                  Image optimized successfully!
                </p>
                <p className="text-green-400/80 text-xs mt-1">
                  Reduced from {formatFileSize(compressionInfo.originalSize)} to{' '}
                  {formatFileSize(compressionInfo.compressedSize)} ({compressionInfo.compressionRatio.toFixed(1)}% smaller)
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}