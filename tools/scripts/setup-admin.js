#!/usr/bin/env node

/**
 * Absterco Admin Setup Script
 * 
 * This script helps create admin users for the Absterco Web authentication system.
 * It sets custom admin claims for Firebase users.
 * 
 * Usage:
 *   node setup-admin.js <email>
 * 
 * Example:
 *   node setup-admin.js admin@absterco.com
 */

const { getAuth } = require('firebase-admin/auth');
const { initializeApp, getApps, cert } = require('firebase-admin/app');
require('dotenv').config();

// Initialize Firebase Admin if not already initialized
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!privateKey || !process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
    console.error('Missing required Firebase Admin environment variables');
    console.error('Required: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_CLIENT_EMAIL');
    process.exit(1);
  }

  const serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    privateKey: privateKey,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  };

  initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.projectId,
  });
}

async function setAdminClaim(email) {
  try {
    console.log(`Looking up user: ${email}`);
    
    const auth = getAuth();
    const user = await auth.getUserByEmail(email);
    
    console.log(`Found user: ${user.uid}`);
    console.log(`Email: ${user.email}`);
    console.log(`Email verified: ${user.emailVerified}`);
    
    // Set admin custom claim
    await auth.setCustomUserClaims(user.uid, { admin: true });
    
    console.log('Successfully set admin claims!');
    console.log(`${email} is now an admin user`);
    console.log('');
    console.log('Login credentials:');
    console.log(`   Email: ${email}`);
    console.log('   Password: (set in Firebase Console)');
    console.log('');
    console.log('Login URL: http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('Error setting admin claims:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('');
      console.log('To create this user:');
      console.log('1. Go to Firebase Console → Authentication');
      console.log('2. Click "Add user"');
      console.log(`3. Enter email: ${email}`);
      console.log('4. Set a password');
      console.log('5. Run this script again');
    }
    
    process.exit(1);
  }
}

async function main() {
  const email = process.argv[2];
  
  if (!email) {
    console.log('Absterco Admin Setup Script');
    console.log('');
    console.log('Usage: node setup-admin.js <email>');
    console.log('');
    console.log('Example:');
    console.log('  node setup-admin.js admin@absterco.com');
    process.exit(1);
  }
  
  console.log('Absterco Admin Setup');
  console.log('=======================');
  console.log('');
  
  initializeFirebaseAdmin();
  await setAdminClaim(email);
}

main().catch(console.error);