'use client';

import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

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
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

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
  }, [user, loading, isAdmin, requireAdmin, fallbackUrl, router, redirecting]);

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
  return <>{children}</>;
}
