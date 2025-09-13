/**
 * Auth Bypass Warning Component
 * 
 * Displays a prominent warning when authentication bypass is active.
 * This component should be included in admin layouts to ensure developers
 * are always aware when authentication is bypassed.
 */

'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { isAuthBypassEnabled, getBypassWarning } from '@/lib/auth-bypass';

interface AuthBypassWarningProps {
  className?: string;
  showDismiss?: boolean;
  variant?: 'fixed' | 'banner' | 'card';
}

export default function AuthBypassWarning({ 
  className = '', 
  showDismiss = false,
  variant = 'banner'
}: AuthBypassWarningProps) {
  const [dismissed, setDismissed] = useState(false);
  
  const bypassEnabled = isAuthBypassEnabled();
  const warningData = getBypassWarning();

  // Don't render if bypass is not enabled or warning is dismissed
  if (!bypassEnabled || !warningData || (dismissed && showDismiss)) {
    return null;
  }

  const baseClasses = "bg-amber-500/90 backdrop-blur-sm border-amber-400 text-black";
  
  const variantClasses = {
    fixed: "fixed top-0 left-0 right-0 z-50 border-b",
    banner: "border-l-4 border-amber-500",
    card: "rounded-lg border"
  };

  const contentClasses = {
    fixed: "container mx-auto px-4 py-2",
    banner: "px-4 py-3",
    card: "p-4"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className={contentClasses[variant]}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">{warningData.title}</span>
                {variant !== 'fixed' && (
                  <span className="text-sm text-amber-800">
                    {warningData.message}
                  </span>
                )}
              </div>
              {variant === 'fixed' && (
                <p className="text-xs text-amber-800 mt-1 hidden sm:block">
                  {warningData.message}
                </p>
              )}
            </div>
          </div>
          
          {showDismiss && (
            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 p-1 hover:bg-amber-600/20 rounded-md transition-colors"
              aria-label="Dismiss warning"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {variant === 'card' && (
          <div className="mt-3 text-sm text-amber-800">
            <p className="mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <strong>Security Notice:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>All authentication checks are currently disabled</li>
              <li>This should NEVER be enabled in production</li>
              <li>Set <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_BYPASS_AUTH=false</code> to restore normal authentication</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}