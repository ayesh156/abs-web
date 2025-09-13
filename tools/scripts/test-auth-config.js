#!/usr/bin/env node

/**
 * Absterco Firebase Authentication Test Script
 * 
 * This script tests the Firebase authentication setup and verifies
 * that all components are working correctly.
 */

const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, getApps, cert } = require('firebase-admin/app');
require('dotenv').config();

// Initialize Firebase Admin
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  try {
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    const serviceAccount = {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    };

    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.projectId,
    });
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error.message);
    return false;
  }
}

async function testFirebaseConfig() {
  console.log('Testing Firebase Configuration...');
  
  // Check environment variables
  const requiredVars = [
    'FIREBASE_ADMIN_PROJECT_ID',
    'FIREBASE_ADMIN_PRIVATE_KEY',
    'FIREBASE_ADMIN_CLIENT_EMAIL',
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    return false;
  }
  
  console.log('All required environment variables present');
  
  // Test Firebase Admin initialization
  if (!initializeFirebaseAdmin()) {
    return false;
  }
  
  console.log('Firebase Admin SDK initialized');
  
  try {
    // Test Auth service
    const auth = getAuth();
    console.log('Firebase Auth service accessible');
    
    // Test Firestore service
    const db = getFirestore();
    console.log('Firestore service accessible');
    
    return true;
  } catch (error) {
    console.error('Error accessing Firebase services:', error.message);
    return false;
  }
}

async function testAdminUsers() {
  console.log('\nTesting Admin Users...');
  
  const adminEmails = [
    'admin@absterco.com',
    'ayesh@absterco.com'
  ];
  
  const auth = getAuth();
  
  for (const email of adminEmails) {
    try {
      const user = await auth.getUserByEmail(email);
      const hasAdminClaim = user.customClaims?.admin === true;
      
      console.log(`${email}:`);
      console.log(`   UID: ${user.uid}`);
      console.log(`   Email Verified: ${user.emailVerified}`);
      console.log(`   Admin Claim: ${hasAdminClaim ? 'YES' : 'NO'}`);
      console.log(`   Created: ${user.metadata.creationTime}`);
      
      if (!hasAdminClaim) {
        console.log(`   NOTE: To set admin claim: node setup-admin.js ${email}`);
      }
      
    } catch (error) {
      if (error.code === 'auth/user-not-found') {/* Lines 115-117 omitted */} else {/* Lines 118-119 omitted */}
    }
  }
}

async function main() {
  console.log('Absterco Firebase Authentication Test');
  console.log('==========================================\n');
  
  const configOk = await testFirebaseConfig();
  
  if (configOk) {
    await testAdminUsers();
  }
  
  console.log('\nTest Summary:');
  console.log('================');
  if (configOk) {
    console.log('Firebase configuration is working');
    console.log('Admin SDK is properly initialized');
    console.log('');
    console.log('Next Steps:');
    console.log('1. Ensure admin users exist in Firebase Auth');
    console.log('2. Set admin claims using: node setup-admin.js <email>');
    console.log('3. Start development server: npm run dev');
    console.log('4. Test login at: http://localhost:3000/admin/login');
  } else {
    console.log('Firebase configuration has issues');
    console.log('   Please check your environment variables');
  }
}

main().catch(console.error);