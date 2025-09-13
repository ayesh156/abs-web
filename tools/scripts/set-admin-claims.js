/**
 * Script to set admin claims for a user
 * Run this once to make your user an admin
 */

const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin using environment variables
function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return; // Already initialized
  }

  // Check for required environment variables
  const requiredVars = [
    'FIREBASE_ADMIN_PROJECT_ID',
    'FIREBASE_ADMIN_PRIVATE_KEY',
    'FIREBASE_ADMIN_CLIENT_EMAIL'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease check your .env file and ensure all Firebase Admin variables are set.');
    process.exit(1);
  }

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  const serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    privateKey: privateKey,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
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

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.projectId
  });
}

async function setAdminClaims() {
  try {
    // Initialize Firebase Admin
    initializeFirebaseAdmin();
    
    console.log('Setting admin claims...');
    
    // Get user by email
    const userEmail = 'admin@absterco.com';
    const user = await admin.auth().getUserByEmail(userEmail);
    
    console.log('Found user:', {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      disabled: user.disabled
    });
    
    // Set admin claims
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      role: 'admin'
    });
    
    console.log('Admin claims set successfully!');
    
    // Verify claims were set
    const updatedUser = await admin.auth().getUser(user.uid);
    console.log('Verified claims:', updatedUser.customClaims);
    
    process.exit(0);
  } catch (error) {
    console.error('Error setting admin claims:', error);
    process.exit(1);
  }
}

setAdminClaims();