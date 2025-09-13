'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, User, Shield, AlertCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { isAuthBypassEnabled } from '@/lib/auth-bypass';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, user, loading, error, clearError, bypassMode, bypassWarning } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for bypass mode
  const bypassEnabled = isAuthBypassEnabled();

  // Handle bypass mode - automatically redirect to admin panel
  useEffect(() => {
    if (bypassEnabled || bypassMode) {
      const redirectUrl = searchParams.get('returnUrl') || '/admin';
      console.log('Authentication bypass active - redirecting to admin panel');
      
      // Add a small delay for UX
      const timeoutId = setTimeout(() => {
        router.push(redirectUrl);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [bypassEnabled, bypassMode, router, searchParams]);

  // Only redirect if already authenticated (normal flow)
  useEffect(() => {
    if (user && !bypassEnabled && !bypassMode) {
      const redirectUrl = searchParams.get('returnUrl') || 
                         sessionStorage.getItem('redirectAfterLogin') || 
                         '/admin';
      
      // Clear the stored redirect URL
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      
      // Add a small delay to prevent rapid redirects
      const timeoutId = setTimeout(() => {
        router.push(redirectUrl);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [user, router, searchParams, bypassEnabled, bypassMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || loading) return;
    
    // Clear any existing errors only when user tries to submit
    clearError();
    
    setIsSubmitting(true);
    
    try {
      await signIn(formData.email, formData.password);
      // Navigation will be handled by the useEffect above
    } catch (err) {
      // Error is handled by the auth context
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = loading || isSubmitting;

  // If bypass mode is enabled, show bypass message instead of login form
  if (bypassEnabled || bypassMode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-6 text-center"
      >
        {/* Bypass Warning */}
        {bypassWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400"
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div className="text-left">
              <p className="font-semibold">{bypassWarning.title}</p>
              <p className="text-sm text-amber-400/80">{bypassWarning.message}</p>
            </div>
          </motion.div>
        )}

        {/* Bypass Status */}
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-accent-green/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-accent-green" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Authentication Bypassed</h3>
            <p className="text-white/70 text-sm">Redirecting to admin panel...</p>
          </div>
          
          {/* Loading spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 mx-auto border-2 border-white/30 border-t-accent-green rounded-full"
          />
        </div>

        {/* Manual redirect button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/admin')}
          className="w-full bg-gradient-to-r from-accent-green to-accent-green/90 hover:from-accent-green/90 hover:to-accent-green text-black py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Continue to Admin Panel
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Email Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white/90">
          Email
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40">
            <User className="w-5 h-5" />
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            onFocus={() => error && clearError()}
            className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green text-white placeholder-white/50 focus:bg-white/20 transition-all duration-300 shadow-sm"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white/90">
          Password
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40">
            <Lock className="w-5 h-5" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            onFocus={() => error && clearError()}
            className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green text-white placeholder-white/50 focus:bg-white/20 transition-all duration-300 shadow-sm"
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error-message"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 shadow-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium flex-1">{error}</span>
            <button
              type="button"
              onClick={clearError}
              className="text-red-400/60 hover:text-red-400 transition-colors text-lg leading-none"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        className="w-full bg-gradient-to-r from-accent-green to-accent-green/90 hover:from-accent-green/90 hover:to-accent-green disabled:from-white/20 disabled:to-white/10 text-black disabled:text-white/50 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            {isSubmitting ? 'Signing In...' : 'Verifying...'}
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            Sign In
          </>
        )}
      </motion.button>

      {/* Demo Credentials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="text-center space-y-3 pt-4 border-t border-white/10"
      >
        <p className="text-white/60 text-sm font-medium">Demo Credentials</p>
        <div className="space-y-2">
          <p className="text-white/50 text-xs">
            Email: <span className="text-accent-green font-mono">admin@absterco.com</span>
          </p>
          <p className="text-white/50 text-xs">
            Password: <span className="text-accent-green font-mono">admin123</span>
          </p>
        </div>
        <div className="text-white/40 text-xs space-y-1">
          <p className="flex items-center gap-2">
            <Lock className="w-3 h-3" />
            Firebase Authentication • Admin-only access
          </p>
          <p className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3" />
            If login fails, contact your administrator.
          </p>
        </div>
      </motion.div>
    </motion.form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Animated Background Elements */}
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
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
            rotate: [0, -45, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-accent-green/3 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 10
          }}
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent-green/8 rounded-full blur-xl"
        />
      </div>

      {/* Main Login Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
        className="relative w-full max-w-md"
      >
        {/* Glassmorphism Login Card */}
        <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-2xl">
          {/* Header with animated background */}
          <div className="relative bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 p-8 text-center border-b border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-green/5 via-accent-green/10 to-accent-green/5"></div>
            
            {/* Floating particles in header */}
            <div className="absolute top-2 left-8 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
            <div className="absolute bottom-3 right-12 w-1.5 h-1.5 bg-accent-green/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-accent-green/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-accent-green" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-white/60 text-sm">Access your Absterco management dashboard</p>
            </motion.div>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <Suspense fallback={
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-green"></div>
              </div>
            }>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
