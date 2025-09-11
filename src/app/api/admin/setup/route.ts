import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminFirestore } from '@/lib/auth-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const { email, password, displayName } = await req.json();

    // Use default values if not provided
    const adminEmail = email || 'admin@absterco.com';
    const adminPassword = password || 'admin123';
    const adminDisplayName = displayName || 'Absterco Administrator';

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let user;
    let userCreated = false;
    const auth = getAdminAuth();
    const firestore = getAdminFirestore();

    try {
      // Try to get existing user
      user = await auth.getUserByEmail(adminEmail);
      console.log('Found existing user:', user.uid);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        try {
          // Create new user
          user = await auth.createUser({
            email: adminEmail,
            password: adminPassword,
            displayName: adminDisplayName,
            emailVerified: true,
            disabled: false
          });
          userCreated = true;
          console.log('Created new user:', user.uid);
        } catch (createError: any) {
          console.error('Error creating user:', createError);
          return NextResponse.json(
            { error: `Failed to create user: ${createError.message}` },
            { status: 500 }
          );
        }
      } else {
        console.error('Error getting user:', error);
        return NextResponse.json(
          { error: `Failed to check user: ${error.message}` },
          { status: 500 }
        );
      }
    }

    // Set admin claims
    try {
      await auth.setCustomUserClaims(user.uid, {
        admin: true,
        role: 'admin'
      });
      console.log('Admin claims set for user:', user.uid);
    } catch (claimsError: any) {
      console.error('Error setting claims:', claimsError);
      return NextResponse.json(
        { error: `Failed to set admin claims: ${claimsError.message}` },
        { status: 500 }
      );
    }

    // Create/update Firestore document
    try {
      await firestore.collection('users').doc(user.uid).set({
        email: adminEmail,
        name: adminDisplayName,
        role: 'admin',
        isAdmin: true,
        createdAt: FieldValue.serverTimestamp(),
        lastLogin: null,
        metadata: {
          createdBy: 'setup-api',
          userCreated: userCreated,
          promotedToAdminAt: FieldValue.serverTimestamp(),
          promotedBy: 'system'
        }
      }, { merge: true });
      console.log('Firestore user document created/updated');
    } catch (firestoreError: any) {
      console.error('Error creating Firestore document:', firestoreError);
      // Don't fail the request for Firestore errors
    }

    return NextResponse.json({
      success: true,
      message: userCreated 
        ? `✅ Admin user created successfully! You can now login with email: ${adminEmail}`
        : `✅ Admin claims updated for existing user: ${adminEmail}`,
      userUid: user.uid,
      userCreated,
      credentials: {
        email: adminEmail,
        password: userCreated ? '(Use the password you provided)' : '(Use existing password)'
      }
    });

  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to setup admin user' },
      { status: 500 }
    );
  }
}

// GET endpoint to check admin setup status
export async function GET() {
  try {
    // Check if admin user already exists
    let adminExists = false;
    let adminClaims = null;
    const auth = getAdminAuth();
    
    try {
      const adminUser = await auth.getUserByEmail('admin@absterco.com');
      adminExists = true;
      
      // Check if user has admin claims
      const userRecord = await auth.getUser(adminUser.uid);
      adminClaims = userRecord.customClaims;
    } catch (error) {
      // User doesn't exist
    }

    return NextResponse.json({
      adminExists,
      adminClaims,
      hasAdminClaims: adminClaims?.admin === true,
      setupRequired: !adminExists || adminClaims?.admin !== true,
      message: adminExists 
        ? (adminClaims?.admin === true ? 'Admin user is properly configured' : 'Admin user exists but lacks admin claims')
        : 'Admin user needs to be created'
    });
  } catch (error: any) {
    console.error('Error checking admin setup status:', error);
    return NextResponse.json(
      { error: 'Failed to check admin setup status' },
      { status: 500 }
    );
  }
}
