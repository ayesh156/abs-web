'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { signIn, signOut, onAuthStateChange, getCurrentUserToken } from '@/lib/auth';
import { 
  isAuthBypassEnabled, 
  createMockAdminUser, 
  setBypassAuthCookie,
  getBypassWarning 
} from '@/lib/auth-bypass';

// Enhanced user interface with Firestore data
interface EnhancedUser extends User {
  name?: string;
  role?: 'user' | 'admin';
  isAdmin?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
}

interface AuthContextType {
  user: EnhancedUser | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  getAuthStatus: () => Promise<{ authenticated: boolean; user?: EnhancedUser | null; isAdmin?: boolean }>;
  bypassMode: boolean;
  bypassWarning: ReturnType<typeof getBypassWarning>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<EnhancedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bypassMode, setBypassMode] = useState(false);

  // Check for bypass mode
  const bypassEnabled = isAuthBypassEnabled();
  const bypassWarning = getBypassWarning();

  useEffect(() => {
    let isMounted = true;
    let authStateListener: (() => void) | null = null;
    
    const initializeAuth = async () => {
      try {
        // Check for bypass mode first
        if (bypassEnabled) {
          console.warn('AUTHENTICATION BYPASS ACTIVE - Development mode only!');
          
          if (isMounted) {
            const mockUser = createMockAdminUser();
            const enhancedUser: EnhancedUser = {
              uid: mockUser.uid,
              email: mockUser.email,
              displayName: mockUser.displayName,
              photoURL: mockUser.photoURL,
              phoneNumber: mockUser.phoneNumber,
              emailVerified: mockUser.emailVerified,
              name: mockUser.name,
              role: mockUser.role,
              isAdmin: mockUser.isAdmin,
              lastLogin: new Date(),
              createdAt: new Date(),
              // Mock required Firebase User methods/properties
              getIdToken: async () => 'bypass-token',
              getIdTokenResult: async () => ({}) as import('firebase/auth').IdTokenResult,
              delete: async () => {},
              reload: async () => {},
              toJSON: () => ({}),
              isAnonymous: false,
              metadata: {} as import('firebase/auth').UserMetadata,
              providerData: [],
              providerId: 'firebase',
              refreshToken: '',
              tenantId: null,
            };
            
            setUser(enhancedUser);
            setIsAdmin(true);
            setBypassMode(true);
            setLoading(false);
            
            // Set bypass cookie for API routes
            setBypassAuthCookie();
          }
          return;
        }

        // Normal authentication flow
        setBypassMode(false);
        // First check if we have admin auth cookie
        const hasAdminAuth = document.cookie.includes('admin-auth=true');
        
        if (hasAdminAuth) {
          // Try to get current auth status from server first
          try {
            const statusResponse = await fetch('/api/auth/status', {
              credentials: 'include',
              headers: {
                'Cache-Control': 'no-cache',
              },
            });
            
            if (statusResponse.ok) {
              const statusData = await statusResponse.json();
              if (statusData.authenticated && statusData.user && isMounted) {
                const enhancedUser: EnhancedUser = {
                  uid: statusData.user.uid,
                  email: statusData.user.email || null,
                  displayName: statusData.user.displayName || null,
                  photoURL: statusData.user.photoURL || null,
                  phoneNumber: statusData.user.phoneNumber || null,
                  emailVerified: statusData.user.emailVerified || false,
                  name: statusData.user.name,
                  role: 'admin',
                  isAdmin: true,
                  lastLogin: statusData.user.lastLogin ? new Date(statusData.user.lastLogin) : undefined,
                  createdAt: statusData.user.createdAt ? new Date(statusData.user.createdAt) : undefined,
                  // Mock required Firebase User methods/properties
                  getIdToken: async () => '',
                  getIdTokenResult: async () => ({}) as import('firebase/auth').IdTokenResult,
                  delete: async () => {},
                  reload: async () => {},
                  toJSON: () => ({}),
                  isAnonymous: false,
                  metadata: {} as import('firebase/auth').UserMetadata,
                  providerData: [],
                  providerId: 'firebase',
                  refreshToken: '',
                  tenantId: null,
                };
                
                setUser(enhancedUser);
                setIsAdmin(true);
                setLoading(false);
                return;
              }
            }
          } catch (statusError) {
            console.warn('Status check failed, falling back to auth state listener:', statusError);
          }
        }

        // Set up Firebase auth state listener as fallback
        authStateListener = onAuthStateChange(async (firebaseUser) => {
          if (!isMounted) return;
          
          if (firebaseUser) {
            // Get token and verify with server
            try {
              const token = await getCurrentUserToken();
              if (!token) {
                throw new Error('Failed to get authentication token');
              }

              const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken: token }),
                credentials: 'include'
              });

              if (!isMounted) return;

              if (response.ok) {
                const data = await response.json();
                
                if (data.success) {
                  const enhancedUser: EnhancedUser = {
                    ...firebaseUser,
                    name: data.user?.name,
                    role: 'admin',
                    isAdmin: true,
                    lastLogin: data.user?.lastLogin ? new Date(data.user.lastLogin) : undefined,
                    createdAt: data.user?.createdAt ? new Date(data.user.createdAt) : undefined,
                  };
                  
                  setUser(enhancedUser);
                  setIsAdmin(true);
                } else {
                  setError(data.error || 'Authentication failed');
                  setUser(null);
                  setIsAdmin(false);
                }
              } else {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.error || 'Only administrators can access the system at this time.');
                setUser(null);
                setIsAdmin(false);
              }
            } catch (error) {
              console.error('Error verifying user:', error);
              setError('Only administrators can access the system at this time.');
              setUser(null);
              setIsAdmin(false);
            }
          } else {
            setUser(null);
            setIsAdmin(false);
          }
          
          if (isMounted) {
            setLoading(false);
          }
        });
        
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      if (authStateListener) {
        authStateListener();
      }
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    // If bypass mode is enabled, automatically "sign in" the mock user
    if (bypassEnabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error);
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);

    const { error } = await signOut();
    
    if (error) {
      setError(error);
    }
    
    setLoading(false);
  };

  const clearError = () => setError(null);

  const getAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          // Create enhanced user object from status response (admin only)
          const enhancedUser: EnhancedUser = {
            uid: data.user.uid,
            email: data.user.email || null,
            displayName: data.user.displayName || null,
            photoURL: data.user.photoURL || null,
            phoneNumber: data.user.phoneNumber || null,
            emailVerified: data.user.emailVerified || false,
            name: data.user.name,
            role: 'admin', // Always admin since we only allow admins
            isAdmin: true, // Always true since we only allow admins
            lastLogin: data.user.lastLogin ? new Date(data.user.lastLogin) : undefined,
            createdAt: data.user.createdAt ? new Date(data.user.createdAt) : undefined,
            // Mock required Firebase User methods/properties
            getIdToken: async () => '',
            getIdTokenResult: async () => ({}) as import('firebase/auth').IdTokenResult,
            delete: async () => {},
            reload: async () => {},
            toJSON: () => ({}),
            isAnonymous: false,
            metadata: {} as import('firebase/auth').UserMetadata,
            providerData: [],
            providerId: 'firebase',
            refreshToken: '',
            tenantId: null,
          };
          
          setUser(enhancedUser);
          setIsAdmin(true);
          return {
            authenticated: true,
            user: enhancedUser,
            isAdmin: true
          };
        } else if (data.error) {
          // Handle admin-only error from server
          setError(data.error);
        }
      }
      
      setUser(null);
      setIsAdmin(false);
      return { authenticated: false, user: null, isAdmin: false };
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAdmin(false);
      return { authenticated: false, user: null, isAdmin: false };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAdmin,
    signIn: handleSignIn,
    signOut: handleSignOut,
    clearError,
    getAuthStatus,
    bypassMode,
    bypassWarning,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
