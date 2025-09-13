import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Track if settings have been applied
let firestoreSettingsApplied = false;

// Initialize Firebase Admin SDK only when needed
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return; // Already initialized
  }

  try {
    // Validate required environment variables first (minimum needed)
    const requiredEnvVars = [
      'FIREBASE_ADMIN_PROJECT_ID',
      'FIREBASE_ADMIN_PRIVATE_KEY',
      'FIREBASE_ADMIN_CLIENT_EMAIL'
    ];
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required Firebase Admin environment variables: ${missingVars.join(', ')}`);
    }

    // Create complete service account object compatible with Firebase Admin ServiceAccount type
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!privateKey) {
      throw new Error('FIREBASE_ADMIN_PRIVATE_KEY is required');
    }

    const serviceAccount: ServiceAccount = {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
      // Optional fields - include if provided for complete service account
      ...(process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID && { 
        privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID 
      }),
      ...(process.env.FIREBASE_ADMIN_TOKEN_URI && { 
        tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI 
      }),
      ...(process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL && { 
        authProviderX509CertUrl: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL 
      }),
      ...(process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL && { 
        clientX509CertUrl: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL 
      }),
      ...(process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN && { 
        universeDomain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN 
      }),
    };

    // Pass the service account object directly to cert()
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.projectId,
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw new Error('Firebase Admin initialization failed. Please check your environment variables.');
  }
}

// Lazy initialization function
export function getAdminAuth() {
  initializeFirebaseAdmin();
  return getAuth();
}

// Get admin Firestore instance
export function getAdminFirestore() {
  initializeFirebaseAdmin();
  const db = getFirestore();
  
  // Configure to ignore undefined properties only once
  if (!firestoreSettingsApplied) {
    try {
      db.settings({ ignoreUndefinedProperties: true });
      firestoreSettingsApplied = true;
    } catch (error) {
      // Settings already applied, ignore the error
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (!errorMessage.includes('already been initialized')) {
        console.warn('Firestore settings error:', errorMessage);
      }
    }
  }
  
  return db;
}

// User document interface
export interface UserDocument {
  uid: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  isAdmin: boolean;
  createdAt: Date;
  lastLogin?: Date;
  updatedAt: Date;
  metadata?: {
    createdBy?: string;
    promotedToAdminAt?: Date | any; // Allow server timestamp
    promotedBy?: string;
  };
}

/**
 * Create or update user document in Firestore
 */
export async function createUserDocument(
  uid: string, 
  userData: Partial<UserDocument>
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getAdminFirestore();
    const userRef = db.collection('users').doc(uid);
    
    // Build the document data
    const userDoc: any = {
      uid,
      email: userData.email || '',
      name: userData.name || userData.email?.split('@')[0] || 'User',
      role: userData.role || 'user',
      isAdmin: userData.isAdmin || false,
      updatedAt: FieldValue.serverTimestamp()
    };

    // Add createdAt if provided
    if (userData.createdAt) {
      userDoc.createdAt = userData.createdAt;
    }

    // Add lastLogin if provided
    if (userData.lastLogin !== undefined && userData.lastLogin !== null) {
      userDoc.lastLogin = userData.lastLogin;
    }

    // Handle metadata
    if (userData.metadata) {
      const metadata: any = {};
      
      if (userData.metadata.createdBy) {
        metadata.createdBy = userData.metadata.createdBy;
      }
      
      if (userData.metadata.promotedBy) {
        metadata.promotedBy = userData.metadata.promotedBy;
      }
      
      // Use server timestamp for promotedToAdminAt if user is being promoted to admin
      if (userData.isAdmin && userData.metadata.promotedToAdminAt) {
        metadata.promotedToAdminAt = FieldValue.serverTimestamp();
      }
      
      userDoc.metadata = metadata;
    }

    await userRef.set(userDoc, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error('Error creating user document:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create user document' 
    };
  }
}

/**
 * Get user document from Firestore
 */
export async function getUserDocument(uid: string): Promise<UserDocument | null> {
  try {
    const db = getAdminFirestore();
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return null;
    }
    
    return userDoc.data() as UserDocument;
  } catch (error) {
    console.error('Error getting user document:', error);
    return null;
  }
}

/**
 * Update user last login timestamp
 */
export async function updateUserLastLogin(uid: string): Promise<void> {
  try {
    const db = getAdminFirestore();
    await db.collection('users').doc(uid).update({
      lastLogin: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating user last login:', error);
  }
}

/**
 * Get user by email helper function
 */
export async function getUserByEmail(email: string) {
  try {
    const adminAuth = getAdminAuth();
    return await adminAuth.getUserByEmail(email);
  } catch (error) {
    // Don't log "user not found" as an error since it's often expected
    // Only log if it's a different type of error
    if (error && typeof error === 'object' && 'code' in error && error.code !== 'auth/user-not-found') {
      console.error('Error getting user by email:', error);
    }
    throw error;
  }
}

/**
 * Verify Firebase ID token on server-side
 */
export async function verifyIdToken(idToken: string) {
  try {
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return {
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      authTime: decodedToken.auth_time,
      exp: decodedToken.exp,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid token',
    };
  }
}

/**
 * Check if user has admin privileges
 * You can extend this with custom claims or Firestore checks
 */
export async function isAdminUser(uid: string): Promise<boolean> {
  try {
    const adminAuth = getAdminAuth();
    const userRecord = await adminAuth.getUser(uid);
    
    // Method 1: Check custom claims (recommended)
    if (userRecord.customClaims?.admin === true) {
      return true;
    }
    
    // Method 2: Check by email domain (simple approach)
    // You can modify this logic based on your needs
    const adminEmails = [
      // Add your admin emails here
      'admin@absterco.com',
      'ayesh@absterco.com'
    ];
    
    return userRecord.email ? adminEmails.includes(userRecord.email) : false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Set custom admin claim for a user
 * Call this function to make a user an admin
 */
export async function setAdminClaim(uid: string, isAdmin: boolean = true) {
  try {
    const adminAuth = getAdminAuth();
    await adminAuth.setCustomUserClaims(uid, { admin: isAdmin });
    return { success: true };
  } catch (error) {
    console.error('Error setting admin claim:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to set admin claim' };
  }
}
