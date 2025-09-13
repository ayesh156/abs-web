'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Shield, User, Settings, Key, HelpCircle, LogIn } from 'lucide-react';

export default function AuthDebugPage() {
  const { user, loading } = useAuth();
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    // Get relevant environment variables (only public ones)
    setEnvVars({
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 20) + '...',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NODE_ENV: process.env.NODE_ENV,
    });
  }, []);

  const testCredentials = [
    {
      type: 'Admin (Mock)',
      email: 'admin@absterco.com',
      password: 'admin123',
      description: 'Default admin credentials for mock mode'
    },
    {
      type: 'User (Mock)', 
      email: 'user@absterco.com',
      password: 'user123',
      description: 'Regular user credentials for mock mode'
    },
    {
      type: 'Firebase Users',
      email: 'Your Firebase user email',
      password: 'Your Firebase user password',
      description: 'Any user created in Firebase Console'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Authentication Debug Info
          </h1>
          
          {/* Current Auth State */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Current Authentication State
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm text-gray-700">
                {JSON.stringify({
                  user: user ? {
                    uid: user.uid,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin
                  } : null,
                  loading,
                  authenticated: !!user
                }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Environment Variables
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(envVars, null, 2)}
              </pre>
            </div>
          </div>

          {/* Test Credentials */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Key className="w-5 h-5" />
              Available Test Credentials
            </h2>
            <div className="space-y-4">
              {testCredentials.map((cred, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium text-gray-900">{cred.type}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cred.description}</p>
                  <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                    <div>Email: {cred.email}</div>
                    <div>Password: {cred.password}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Troubleshooting Steps */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Troubleshooting Steps
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Check if authentication mode is correctly detected (Firebase vs Mock)</li>
              <li>For Firebase mode: Ensure user exists in Firebase Console</li>
              <li>For Firebase mode: Ensure admin claims are set if admin access required</li>
              <li>For Mock mode: Use the exact credentials shown above</li>
              <li>Check browser network tab for any authentication errors</li>
              <li>Check server terminal for any error messages</li>
            </ol>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <a 
              href="/admin/login" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <LogIn className="w-4 h-4" />
              Go to Login Page
            </a>
            <a 
              href="/admin/setup" 
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 ml-3"
            >
              <Shield className="w-4 h-4" />
              Set Admin Claims
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
