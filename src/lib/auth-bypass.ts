/**
 * Authentication Bypass Utilities
 * 
 * This module provides utilities for bypassing authentication in development/testing environments.
 * SECURITY: Only enabled when NEXT_PUBLIC_BYPASS_AUTH is explicitly set to 'true'
 */

// Type definitions for mock user
interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  name: string;
  role: 'admin';
  isAdmin: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}

/**
 * Check if authentication bypass is enabled
 * Only enabled when NEXT_PUBLIC_BYPASS_AUTH is explicitly set to 'true'
 */
export function isAuthBypassEnabled(): boolean {
  if (typeof window === 'undefined') {
    // Server-side check
    return process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
  }
  
  // Client-side check
  return process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
}

/**
 * Create a mock admin user for bypass mode
 */
export function createMockAdminUser(): MockUser {
  return {
    uid: 'bypass-admin-user',
    email: 'admin@absterco.com',
    displayName: 'Admin User (Bypass Mode)',
    photoURL: null,
    phoneNumber: null,
    emailVerified: true,
    name: 'Admin User',
    role: 'admin',
    isAdmin: true,
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString(),
    }
  };
}

/**
 * Get bypass authentication status
 * Returns mock authentication data when bypass is enabled
 */
export function getBypassAuthStatus() {
  if (!isAuthBypassEnabled()) {
    return null;
  }

  return {
    authenticated: true,
    user: createMockAdminUser(),
    isAdmin: true,
    bypassMode: true
  };
}

/**
 * Warning component for bypass mode
 */
export function getBypassWarning() {
  if (!isAuthBypassEnabled()) {
    return null;
  }

  return {
    type: 'warning' as const,
    title: 'Authentication Bypass Active',
    message: 'Authentication is currently bypassed for development. This should NEVER be enabled in production.',
    icon: 'WARNING'
  };
}

/**
 * Set bypass auth cookie (for server-side validation)
 */
export function setBypassAuthCookie() {
  if (typeof window === 'undefined' || !isAuthBypassEnabled()) {
    return;
  }

  // Set a temporary cookie to indicate bypass mode
  document.cookie = 'bypass-auth=true; path=/; max-age=86400; SameSite=Strict';
}

/**
 * Clear bypass auth cookie
 */
export function clearBypassAuthCookie() {
  if (typeof window === 'undefined') {
    return;
  }

  document.cookie = 'bypass-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

/**
 * Check if bypass cookie is set (server-side helper)
 */
export function hasBypassAuthCookie(cookieString?: string): boolean {
  if (!isAuthBypassEnabled()) {
    return false;
  }

  const cookies = cookieString || (typeof document !== 'undefined' ? document.cookie : '');
  return cookies.includes('bypass-auth=true');
}