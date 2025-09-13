'use client';

import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertTriangle } from 'lucide-react';
import { isAuthBypassEnabled } from '@/lib/auth-bypass';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  fallbackUrl?: string;
  loadingComponent?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = true, 
  fallbackUrl = '/admin/login',
  loadingComponent 
}: ProtectedRouteProps) {
  const { user, loading, isAdmin, bypassMode, bypassWarning } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Check for bypass mode
  const bypassEnabled = isAuthBypassEnabled();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // If bypass mode is enabled, always allow access
    if (bypassEnabled || bypassMode) {
      setShouldRender(true);
      setRedirecting(false);
      return;
    }

    if (!loading) {
      if (!user) {
        // User is not authenticated
        if (!redirecting) {
          setRedirecting(true);
          // Store current URL for redirect after login
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
          }
          
          // Add a small delay to prevent rapid redirects
          timeoutId = setTimeout(() => {
            router.push(fallbackUrl);
          }, 100);
        }
        return;
      }

      if (requireAdmin && !isAdmin) {
        // User is authenticated but not admin
        if (!redirecting) {
          setRedirecting(true);
          // Add admin error parameter
          const loginUrl = new URL(fallbackUrl, window.location.origin);
          loginUrl.searchParams.set('error', 'admin_required');
          
          timeoutId = setTimeout(() => {
            router.push(loginUrl.toString());
          }, 100);
        }
        return;
      }

      // User is authenticated and authorized
      setShouldRender(true);
      setRedirecting(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user, loading, isAdmin, requireAdmin, fallbackUrl, router, redirecting, bypassEnabled, bypassMode]);

  // Show loading state
  if (loading) {
    return loadingComponent || (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-accent-green animate-spin" />
          <p className="text-white/70 text-sm">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Show loading state while redirecting
  if (redirecting || !shouldRender) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-accent-green animate-spin" />
          <p className="text-white/70 text-sm">
            {redirecting ? 'Redirecting...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated and authorized
  return (
    <>
      {/* Show bypass warning if in bypass mode */}
      {(bypassEnabled || bypassMode) && bypassWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/90 backdrop-blur-sm border-b border-amber-400 text-black">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center gap-3 text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              <span>{bypassWarning.title}</span>
              <span className="hidden sm:inline">- {bypassWarning.message}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content with top margin if warning is shown */}
      <div className={(bypassEnabled || bypassMode) && bypassWarning ? 'pt-12' : ''}>
        {children}
      </div>
    </>
  );
}
