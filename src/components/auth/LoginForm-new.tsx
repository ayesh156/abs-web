'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Eye, EyeOff, Mail, Lock, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, user, loading: authLoading, error: authError, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo credentials
  const demoCredentials = {
    email: 'admin@absterco.com',
    password: 'admin123'
  };

  // Only redirect if already authenticated
  useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get('returnUrl') || 
                         sessionStorage.getItem('redirectAfterLogin') || 
                         '/admin';
      
      // Clear the stored redirect URL
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      
      router.push(redirectUrl);
    }
  }, [user, router, searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || authLoading) return;
    
    // Clear any existing errors only when user tries to submit
    clearError();
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(email, password);
      } else {
        await signIn(email, password);
        // Navigation will be handled by the useEffect above
      }
    } catch (err) {
      // Error is handled by the auth context
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = email.trim() && password.trim();
  const displayError = authError;
  const isLoadingState = authLoading || isSubmitting || isLoading;

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Header with demo credentials */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center space-y-3 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20">
            <Shield className="h-4 w-4 text-accent-green" />
            <span className="text-sm text-accent-green font-medium">Admin Access Only</span>
          </div>
          <div className="space-y-1">
            <p className="text-white/60 text-sm">
              Demo: <span className="text-white font-mono">{demoCredentials.email}</span>
            </p>
            <p className="text-white/60 text-sm">
              Password: <span className="text-white font-mono">{demoCredentials.password}</span>
            </p>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence mode="wait">
          {displayError && (
            <motion.div
              key="error-message"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl bg-red-500/10 border border-red-500/20 p-4"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-red-400 font-medium text-sm">Authentication Failed</h4>
                  <p className="text-red-400/80 text-sm mt-1">{displayError}</p>
                </div>
                <button
                  type="button"
                  onClick={clearError}
                  className="text-red-400/60 hover:text-red-400 transition-colors text-lg leading-none"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="space-y-2"
        >
          <label htmlFor="email" className="block text-sm font-medium text-white/90">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className={`h-5 w-5 transition-colors duration-200 ${
                email ? 'text-accent-green' : 'text-white/40 group-focus-within:text-accent-green'
              }`} />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => authError && clearError()}
              placeholder="Enter your email address"
              disabled={isLoadingState}
              className={`pl-12 transition-all duration-200 ${
                email 
                  ? 'border-accent-green/50 focus:border-accent-green focus:ring-accent-green/20'
                  : 'focus:border-accent-green/50 focus:ring-accent-green/10'
              }`}
              autoComplete="email"
              spellCheck={false}
              required
            />
            {email && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-accent-green" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="space-y-2"
        >
          <label htmlFor="password" className="block text-sm font-medium text-white/90">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 transition-colors duration-200 ${
                password ? 'text-accent-green' : 'text-white/40 group-focus-within:text-accent-green'
              }`} />
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => authError && clearError()}
              placeholder="Enter your password"
              disabled={isLoadingState}
              className={`pl-12 pr-12 transition-all duration-200 ${
                password 
                  ? 'border-accent-green/50 focus:border-accent-green focus:ring-accent-green/20'
                  : 'focus:border-accent-green/50 focus:ring-accent-green/10'
              }`}
              autoComplete="current-password"
              required
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/70 transition-colors duration-200 focus:outline-none focus:text-white"
              disabled={isLoadingState}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <motion.button
            type="submit"
            disabled={isLoadingState || !isFormValid}
            whileHover={!isLoadingState && isFormValid ? { scale: 1.02 } : {}}
            whileTap={!isLoadingState && isFormValid ? { scale: 0.98 } : {}}
            className="w-full bg-gradient-to-r from-accent-green to-accent-green/90 hover:from-accent-green/90 hover:to-accent-green disabled:from-white/20 disabled:to-white/10 text-black disabled:text-white/50 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoadingState ? (
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
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-center"
        >
          <p className="text-white/50 text-xs leading-relaxed">
            🔒 Firebase Authentication • Admin-only access<br />
            Protected by enterprise-grade security
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
}
