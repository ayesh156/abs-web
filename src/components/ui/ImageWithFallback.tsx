'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
  onLoad?: () => void;
  onError?: () => void;
}

// Generate a simple gradient placeholder
const generatePlaceholder = (width: number = 400, height: number = 300) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#25306c;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#f0591c;stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
    </svg>
  `)}`;
};

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  className,
  sizes,
  priority = false,
  fallbackSrc,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  aspectRatio,
  onLoad,
  onError,
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  // Generate fallback placeholder
  const defaultBlurDataURL = blurDataURL || generatePlaceholder(width, height);

  if (hasError) {
    return (
      <div className={cn(
        'flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 text-white/30 border border-white/10',
        aspectRatio && aspectRatioClasses[aspectRatio],
        className
      )}>
        <div className="text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 opacity-40">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-full h-full"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-xs font-medium">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'relative overflow-hidden',
      aspectRatio && aspectRatioClasses[aspectRatio]
    )}>
      {/* Loading indicator */}
      {isLoading && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 z-10',
          className
        )}>
          <div className="relative">
            <div className="w-8 h-8 border-2 border-accent-green/30 border-t-accent-green rounded-full animate-spin" />
            <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-white/20 rounded-full animate-spin animation-delay-75" />
          </div>
        </div>
      )}

      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={cn(
          className,
          'transition-all duration-500',
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        )}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}