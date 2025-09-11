'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, CheckCircle, XCircle, AlertTriangle, Terminal, Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminSetupPage() {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupStatus, setSetupStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [setupMessage, setSetupMessage] = useState('');

  const handleSetup = async () => {
    setIsSettingUp(true);
    setSetupStatus('idle');
    setSetupMessage('');

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@absterco.com',
          password: 'admin123',
          displayName: 'Absterco Administrator'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSetupStatus('success');
        setSetupMessage(data.message || 'Admin user created successfully!');
      } else {
        setSetupStatus('error');
        setSetupMessage(data.message || 'Failed to create admin user');
      }
    } catch (error) {
      setSetupStatus('error');
      setSetupMessage('Network error: Could not connect to the server');
    } finally {
      setIsSettingUp(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/6 w-32 h-32 bg-accent-green/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
        className="relative w-full max-w-2xl"
      >
        <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 p-8 text-center border-b border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-green/5 via-accent-green/10 to-accent-green/5"></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-accent-green/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-accent-green" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Setup</h1>
              <p className="text-white/60 text-sm">Set up your Absterco admin account</p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Current Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-accent-green" />
                Admin Account Setup
              </h2>
              <p className="text-white/70 text-sm mb-4">
                This will create an admin user in Firebase with the following credentials:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                  <span className="text-white/60 text-sm">Email:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-green font-mono text-sm">admin@absterco.com</span>
                    <button
                      onClick={() => copyToClipboard('admin@absterco.com')}
                      className="text-white/40 hover:text-white/70 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                  <span className="text-white/60 text-sm">Password:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-green font-mono text-sm">admin123</span>
                    <button
                      onClick={() => copyToClipboard('admin123')}
                      className="text-white/40 hover:text-white/70 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Setup Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent-green" />
                Setup Options
              </h3>
              
              <div className="space-y-4">
                {/* Method 1: Web Setup */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Option 1: Web Setup (Recommended)</h4>
                  <p className="text-white/60 text-sm">
                    Click the button below to automatically create the admin user:
                  </p>
                  
                  <motion.button
                    onClick={handleSetup}
                    disabled={isSettingUp}
                    whileHover={!isSettingUp ? { scale: 1.02 } : {}}
                    whileTap={!isSettingUp ? { scale: 0.98 } : {}}
                    className="w-full bg-gradient-to-r from-accent-green to-accent-green/90 hover:from-accent-green/90 hover:to-accent-green disabled:from-white/20 disabled:to-white/10 text-black disabled:text-white/50 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSettingUp ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Setting up...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        Create Admin User
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Method 2: Terminal Setup */}
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <h4 className="text-white font-medium">Option 2: Terminal Setup</h4>
                  <p className="text-white/60 text-sm">
                    Or run the setup script in your terminal:
                  </p>
                  
                  <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/60 text-xs">Terminal Command</span>
                      <button
                        onClick={() => copyToClipboard('npm run setup-admin')}
                        className="text-white/40 hover:text-white/70 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <code className="text-accent-green font-mono text-sm">npm run setup-admin</code>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {setupStatus !== 'idle' && (
                <motion.div
                  key={setupStatus}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    setupStatus === 'success'
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  {setupStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium flex-1">{setupMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4 pt-4 border-t border-white/10"
            >
              <Link
                href="/admin/login"
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Go to Login
              </Link>
              
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-accent-green/20 hover:bg-accent-green/30 text-accent-green py-3 rounded-xl font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Firebase Console
              </a>
            </motion.div>

            {/* Warning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-yellow-400 text-sm">
                <p className="font-medium mb-1">Important Security Notes:</p>
                <ul className="text-yellow-400/80 text-xs space-y-1">
                  <li>• Change the default password after first login</li>
                  <li>• This creates a user with full admin privileges</li>
                  <li>• Only run this setup once in production</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
