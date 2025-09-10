'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Info, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MigrationAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show alert on every visit (removed localStorage persistence)
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transform transition-all duration-300',
        isClosing ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      )}
    >
      {/* Alert Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 backdrop-blur-xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse" />
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
            {/* Icon and Message */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Info className="h-5 w-5 text-blue-200" />
                  <div className="absolute -inset-1 rounded-full bg-blue-400/20 blur-sm animate-pulse" />
                </div>
              </div>
              
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-white">
                  <span className="hidden sm:inline">We&apos;re migrating & rebranding! </span>
                  <span className="sm:hidden">Migrating & rebranding! </span>
                  Previously known as <span className="font-semibold text-blue-200">Sigma Dev Solutions</span>
                </p>
                <p className="text-xs text-blue-200/80 mt-0.5">
                  Website is currently under development - expect exciting updates soon!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/rebranding">
                <button className="group relative inline-flex items-center space-x-1 rounded-lg border border-blue-300/30 bg-blue-700/50 px-3 py-1.5 text-xs font-medium text-blue-100 transition-all duration-200 hover:border-blue-300/50 hover:bg-blue-600/60">
                  <span>Learn More</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </Link>
              
              <button
                onClick={handleClose}
                className="group relative rounded-lg border border-white/20 bg-white/10 p-1.5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/20"
                aria-label="Close migration notice"
              >
                <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
      </div>
    </div>
  );
}
