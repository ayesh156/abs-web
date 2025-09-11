'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function SystemDiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setLoading(true);
    const results: any = {};

    try {
      // Test 1: Environment Variables
      results.envVars = {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_AUTH_MODE: process.env.NEXT_PUBLIC_AUTH_MODE,
        NEXT_PUBLIC_ADMIN_ONLY_ACCESS: process.env.NEXT_PUBLIC_ADMIN_ONLY_ACCESS,
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing',
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      };

      // Test 2: Firebase Connection (client-side)
      try {
        const firebase = await import('@/lib/firebase');
        results.authConfig = {
          auth: firebase.auth ? '✓ Firebase Auth loaded' : '✗ Firebase Auth not loaded',
          status: 'Firebase SDK available'
        };
      } catch (error) {
        results.authConfig = { error: 'Failed to load Firebase SDK' };
      }

      // Test 3: API Endpoints
      try {
        const response = await fetch('/api/auth/status');
        results.apiStatus = {
          status: response.status,
          ok: response.ok,
          data: response.ok ? await response.json() : 'Failed to fetch'
        };
      } catch (error) {
        results.apiStatus = { error: 'API endpoint not accessible' };
      }

      // Test 4: Firebase SDK Loading
      try {
        const { auth } = await import('@/lib/firebase');
        results.firebaseSDK = {
          auth: auth ? '✓ Loaded' : '✗ Not loaded',
          type: typeof auth
        };
      } catch (error) {
        results.firebaseSDK = { error: (error as Error).message };
      }

      setDiagnostics(results);
    } catch (error) {
      setDiagnostics({ error: 'Failed to run diagnostics' });
    }
    setLoading(false);
  };

  const testLogin = async (mode: 'mock' | 'firebase') => {
    setTestResults((prev: any) => ({ ...prev, [mode]: { loading: true } }));
    
    try {
      // Simplified test - just check if we can import the auth hook
      const { useAuth } = await import('@/hooks/useAuth');
      
      setTestResults((prev: any) => ({
        ...prev,
        [mode]: {
          success: true,
          message: `${mode} login test - Auth hook available`,
          note: 'Use the actual login page to test authentication'
        }
      }));
    } catch (error) {
      setTestResults((prev: any) => ({
        ...prev,
        [mode]: {
          success: false,
          error: (error as Error).message
        }
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Running system diagnostics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">System Diagnostics</h1>
          
          {/* Environment Variables */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Environment Variables</h2>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(diagnostics.envVars, null, 2)}
              </pre>
            </div>
          </div>

          {/* Auth Configuration */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Authentication Configuration</h2>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(diagnostics.authConfig, null, 2)}
              </pre>
            </div>
          </div>

          {/* API Status */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">API Endpoints</h2>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(diagnostics.apiStatus, null, 2)}
              </pre>
            </div>
          </div>

          {/* Firebase SDK */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Firebase SDK</h2>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(diagnostics.firebaseSDK, null, 2)}
              </pre>
            </div>
          </div>

          {/* Login Tests */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Authentication Tests</h2>
            <div className="space-y-4">
              <div>
                <Button 
                  onClick={() => testLogin('mock')}
                  className="mr-3"
                  disabled={testResults.mock?.loading}
                >
                  {testResults.mock?.loading ? 'Testing...' : 'Test Mock Login'}
                </Button>
                <Button 
                  onClick={() => testLogin('firebase')}
                  disabled={testResults.firebase?.loading}
                >
                  {testResults.firebase?.loading ? 'Testing...' : 'Test Firebase Login'}
                </Button>
              </div>
              
              {(testResults.mock || testResults.firebase) && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Test Results:</h4>
                  <pre className="text-sm text-gray-700">
                    {JSON.stringify(testResults, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={runDiagnostics} className="mr-3">
              Refresh Diagnostics
            </Button>
            <a 
              href="/admin/login" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Go to Login
            </a>
            <a 
              href="/debug/auth" 
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 ml-3"
            >
              Auth Debug
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
