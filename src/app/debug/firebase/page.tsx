'use client';

import { useEffect, useState } from 'react';
import { Database, Key, AlertTriangle, CheckCircle, XCircle, ExternalLink, LogIn, Settings } from 'lucide-react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export default function FirebaseDiagnosticPage() {
  const [config, setConfig] = useState<any>(null);
  const [apiKeyTest, setApiKeyTest] = useState<string>('');

  useEffect(() => {
    setConfig(firebaseConfig);
    
    // Test API key format
    const apiKey = firebaseConfig.apiKey;
    if (apiKey && apiKey.startsWith('AIza')) {
      setApiKeyTest('API Key format looks correct');
    } else {
      setApiKeyTest('API Key format appears invalid');
    }
  }, []);

  const testFirebaseConnection = async () => {
    try {
      // Try to initialize Firebase manually
      const { initializeApp } = await import('firebase/app');
      const { getAuth } = await import('firebase/auth');
      
      const testApp = initializeApp(firebaseConfig, 'test-app');
      const testAuth = getAuth(testApp);
      
      console.log('Firebase initialization successful:', testAuth);
      alert('Firebase initialization successful! Check console for details.');
    } catch (error: any) {
      console.error('Firebase initialization error:', error);
      alert(`Firebase initialization failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Database className="w-6 h-6" />
            Firebase Configuration Diagnostic
          </h1>
          
          {/* API Key Status */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Key Status
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm">{apiKeyTest}</p>
              <p className="text-xs text-gray-600 mt-2">API Key: {config?.apiKey?.substring(0, 20)}...</p>
            </div>
          </div>

          {/* Full Firebase Config */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Firebase Client Configuration
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-xs text-gray-700 overflow-auto">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Environment Variables (Client-side)
            </h2>
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <div className="text-sm">
                <strong>NEXT_PUBLIC_FIREBASE_API_KEY:</strong> {process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 20)}...
              </div>
              <div className="text-sm">
                <strong>NEXT_PUBLIC_FIREBASE_PROJECT_ID:</strong> {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}
              </div>
              <div className="text-sm">
                <strong>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:</strong> {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Common Issues & Solutions
            </h2>
            <div className="space-y-4">
              <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-md">
                <h3 className="font-medium text-yellow-800">API Key Restrictions</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Go to Firebase Console → Project Settings → General → Web API Key → Manage in Google Cloud Console
                  → Remove restrictions or add your domain to allowed referrers
                </p>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800">Authentication API Not Enabled</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Go to Firebase Console → Authentication → Get Started (if not already enabled)
                </p>
              </div>
              
              <div className="border border-red-200 bg-red-50 p-4 rounded-md">
                <h3 className="font-medium text-red-800">Wrong Project Configuration</h3>
                <p className="text-sm text-red-700 mt-1">
                  Double-check that your Firebase project ID and other credentials match your actual Firebase project
                </p>
              </div>
            </div>
          </div>

          {/* Test Button */}
          <div className="mb-8">
            <button
              onClick={testFirebaseConnection}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              Test Firebase Connection
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <a 
              href="/admin/login" 
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              <LogIn className="w-4 h-4" />
              Try Login Again
            </a>
            <a 
              href="https://console.firebase.google.com/project/absterco-web/settings/general" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 ml-3"
            >
              <ExternalLink className="w-4 h-4" />
              Open Firebase Console
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
