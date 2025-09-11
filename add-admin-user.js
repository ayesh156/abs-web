/**
 * Script to add a new admin user
 * Usage: node add-admin-user.js <email>
 * Example: node add-admin-user.js newadmin@absterco.com
 */

const admin = require('firebase-admin');

// Firebase Admin configuration from service account
const serviceAccount = {
  "type": "service_account",
  "project_id": "absterco-web",
  "private_key_id": "e4d38487c609da266ce3f0f586739dc3ede181fb",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDnryK5MvZbnegt\norLxsJ6q38OoEiVjo2FDHtFjZ23/GWov0tZhN3l42ksRAe5vmBk3ojvMErwC776o\nlnlUBGOPuhCDbEWdxTpALp+aXn5rJ7tHSX1SpxUqaVOr3dKhEptIAdzBQDZ4+OHG\nKjGwLLHt95qRdl/MPhkNc8/dnPjxeqf1e3+QCJC0HarbW89CCGM2w/2OGE1Sa27v\n5j0khf9C36nekP5ZIPGUm1z2yG6bF/Belzz+5LkeOZsJTpw3YaoN7Sn04Lae8M/n\nH1quXbXB5/wIJGILa2Td/p55Iti0rDuaxAlL7Fhf4hvvMiNFYPNdAZxw6WFYpILs\ngkBgSgn5AgMBAAECggEALtvOMxTqnNcQKYK5nIZzYO4G/YxGAaP+vPuTr/4wUiMK\nxgdnkpwMtnO4MQVp+yoRF555Z6n2WsWwkxp0CZklpeElC9+vKNzGDksfvrIT8YpE\np4NmlHv0nPJWmPExc6B2xZaS1octPURhLZpFGHPBvPaSTY9ais2YdY8R4Kmp8/TP\nQCV3oHJ82qU9ggguM16ietcECOyGW9ISTrKBUQUZs56DvSVwqpS3/2VEOM6X9uqI\n2C4PewScnil4VrlRQgUkV4AAIqBEY+S6l/R8DEXU+v8VNB19hemO4q/+R0qchEbl\nFnMU9tyv25LVtHuEdm1Y1Ztk0xfC1659D8O1Q5OjMQKBgQD96KAkRh3CC2pOCDPe\nxduAQcQEtSiYL8ApYreJrM9alWFnrHnxLrPJc18Y3Mw9u+k+nzaepjE/AJh5Agtr\nmd0Tl7EMr9USa2BvJtc8PoYlhQwJ/johg48YwooIQSSyN1A2LNJtfzdVT8JaFJ5n\nEzEgqZcn22O96d50zO1zf9r+XQKBgQDpl6YdHs6uWFDwLmsMmEeUpqyZJn0JvbWQ\nM9eKAsMp7T4md9PYHHmBlmynVSpG+dNJztluSwZ+SrSSaOEd0RiyGzkgtvfEfY0z\nfIdP//sTdOzIbwbmo1ePS0ckkqIMUnTQCldJN2HQoWfoL1bv+f0BF7m/h71+hCDB\nlEcVFZEoTQKBgQD7Cq6TTtQLUDgJ8OhAIYY2GFATi34YglXPVXA8aiUV3c5Rr+Fd\nShyuWCi1L1Gs1Ab4SHi7gXv9W7xlIFVkTNudjIScE5lqvcm5/EAgq3z8ycAufTLC\ngg3QoD/Ti30Zy8C937EqW/a8ncB+ShaXuQ0Ay0zNNog2dG3jM96uLMK8bQKBgAf0\nmjuzqOZXK6qCajLrnMR7SLWOkgOa6mwW1+hjX7I12kAFJLnffmPjc5/fTqlMKN4C\npXUUKQx0DuJNoB0b2fN26eMrWBThEcYHH7ShyzNGcCoDXgDM31aKAcpFFC/HPyM2\ntvJPaI1qcdd+hT93DB7VaAYV4WZFqbfuDN2y9lahAoGBAO+3drcXY8OcC6OzR7ro\nnyTMCr94rHwImRd0RCJr4uTxIgvqSS9oCFYA6mYbR1It9pf5FFIO6OD0zSsYUGWR\nMiQjs6nBiOKr181QzhTZKr+u3SR7KIb83ivBXerj0niFkjR45bvCxfMmZl6He4Ft\nIGhQlB4wfQe9Y/HrIpthn7Fj\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@absterco-web.iam.gserviceaccount.com",
  "client_id": "110625962708031848077",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40absterco-web.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "absterco-web"
  });
}

async function addAdminUser(email) {
  try {
    if (!email) {
      console.error('❌ Please provide an email address');
      console.log('Usage: node add-admin-user.js <email>');
      process.exit(1);
    }

    console.log(`🔧 Adding admin privileges for: ${email}`);
    
    // Check if user exists
    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
      console.log('👤 Found existing user:', {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        disabled: user.disabled
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('👤 User not found. Creating new user...');
        
        // Create new user
        user = await admin.auth().createUser({
          email: email,
          emailVerified: false,
          disabled: false
        });
        
        console.log('✅ New user created:', {
          uid: user.uid,
          email: user.email
        });
      } else {
        throw error;
      }
    }
    
    // Set admin claims
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      role: 'admin'
    });
    
    console.log('✅ Admin claims set successfully!');
    
    // Create user document in Firestore
    const db = admin.firestore();
    const userDoc = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || email.split('@')[0],
      role: 'admin',
      isAdmin: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      metadata: {
        createdBy: 'admin-script',
        promotedToAdminAt: admin.firestore.FieldValue.serverTimestamp()
      }
    };
    
    await db.collection('users').doc(user.uid).set(userDoc, { merge: true });
    console.log('✅ User document created in Firestore!');
    
    // Verify claims were set
    const updatedUser = await admin.auth().getUser(user.uid);
    console.log('🔍 Verified claims:', updatedUser.customClaims);
    
    console.log('\n🎉 Admin user added successfully!');
    console.log(`📧 Email: ${email}`);
    console.log(`🆔 UID: ${user.uid}`);
    console.log('🔑 The user can now sign in with their email and password.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding admin user:', error);
    process.exit(1);
  }
}

// Get email from command line arguments
const email = process.argv[2];
addAdminUser(email);
