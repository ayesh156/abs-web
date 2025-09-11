'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthFlowDebugPage() {
  const { user, loading, isAdmin, error } = useAuth();
  const [cookies, setCookies] = useState<string>('');
  const [authStatus, setAuthStatus] = useState<any>(null);

  useEffect(() => {
    // Get client-side cookies
    setCookies(document.cookie);
    
    // Check auth status
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          credentials: 'include',
        });
        const data = await response.json();
        setAuthStatus(data);
      } catch (error) {
        setAuthStatus({ error: (error as Error).message || 'Unknown error' });
      }
    };
    
    checkStatus();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-accent-green">Authentication Flow Debug</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* useAuth Hook Status */}
          <div className="bg-white/5 border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">useAuth Hook Status</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
              <p><strong>User:</strong> {user ? 'Authenticated' : 'Not authenticated'}</p>
              <p><strong>Is Admin:</strong> {isAdmin ? 'true' : 'false'}</p>
              <p><strong>Error:</strong> {error || 'None'}</p>
              {user && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded">
                  <p><strong>User Email:</strong> {user.email}</p>
                  <p><strong>User Name:</strong> {user.name || 'N/A'}</p>
                  <p><strong>User UID:</strong> {user.uid}</p>
                </div>
              )}
            </div>
          </div>

          {/* Server Auth Status */}
          <div className="bg-white/5 border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Server Auth Status</h2>
            <div className="space-y-2 text-sm">
              {authStatus ? (
                <>
                  <p><strong>Authenticated:</strong> {authStatus.authenticated ? 'true' : 'false'}</p>
                  <p><strong>User:</strong> {authStatus.user ? 'Found' : 'Not found'}</p>
                  <p><strong>Error:</strong> {authStatus.error || 'None'}</p>
                  {authStatus.user && (
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                      <p><strong>Server Email:</strong> {authStatus.user.email}</p>
                      <p><strong>Server Name:</strong> {authStatus.user.name || 'N/A'}</p>
                      <p><strong>Server UID:</strong> {authStatus.user.uid}</p>
                      <p><strong>Is Admin:</strong> {authStatus.user.isAdmin ? 'true' : 'false'}</p>
                    </div>
                  )}
                </>
              ) : (
                <p>Loading server status...</p>
              )}
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white/5 border border-white/20 rounded-xl p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Client-Side Cookies</h2>
            <div className="text-sm font-mono break-all">
              {cookies || 'No cookies found'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.location.href = '/admin/login'}
            className="px-4 py-2 bg-accent-green text-black rounded-lg hover:bg-accent-green/80 transition-colors"
          >
            Go to Login
          </button>
          <button
            onClick={() => window.location.href = '/admin'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => window.location.href = '/admin/users'}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Users
          </button>
        </div>
      </div>
    </div>
  );
}
