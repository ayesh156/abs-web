'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface PreloaderProps {
  children: React.ReactNode;
}

export default function Preloader({ children }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  const hidePreloader = useCallback(() => {
    const preloaderElement = document.querySelector('.page-loader');
    const bounceball = document.querySelector('.bounceball') as HTMLElement;
    
    if (preloaderElement && bounceball) {
      // First, animate the ball out with a nice effect
      bounceball.style.animation = 'fadeOutBounce 0.8s ease-out forwards';
      
      // Then fade out the entire preloader with enhanced effect
      setTimeout(() => {
        preloaderElement.classList.add('fade-out');
      }, 400);
      
      // Finally remove the preloader from DOM
      setTimeout(() => {
        setIsLoading(false);
      }, 1400); // Extended timing for smoother transition
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle route changes (not on initial load)
  useEffect(() => {
    if (!isInitialLoad) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        hidePreloader();
      }, 300); // Shorter delay for route changes
      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad, hidePreloader]);

  // Handle initial page load
  useEffect(() => {
    if (!isMounted) return;

    const handleLoad = () => {
      setIsInitialLoad(false);
      setTimeout(() => {
        hidePreloader();
      }, 500); // Delay after window load for initial load
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isMounted, hidePreloader]);

  // Prevent body scroll when preloader is visible
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  if (!isMounted) {
    return (
      <div className="page-loader">
        <div className="preloader-content">
          <div className="bounceball"></div>
          <div className="brand-text">Absterco</div>
        </div>
        <div className="particles"></div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="page-loader">
          <div className="preloader-content">
            <div className="bounceball"></div>
            <div className="brand-text">Absterco</div>
          </div>
          <div className="particles"></div>
        </div>
      )}
      <div className={`main-content ${!isLoading ? 'loaded' : ''}`}>
        {children}
      </div>
    </>
  );
}
