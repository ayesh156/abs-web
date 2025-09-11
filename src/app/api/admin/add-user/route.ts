import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, setAdminClaim, createUserDocument } from '@/lib/auth-admin';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Verify current user is admin
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the token
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Check if current user is admin
    const currentUser = await adminAuth.getUser(decodedToken.uid);
    if (!currentUser.customClaims?.admin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get request data
    const { email, name, role = 'user', createAccount = false } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!['admin', 'user'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be "admin" or "user"' },
        { status: 400 }
      );
    }

    let targetUser;
    let userCreated = false;
    
    try {
      // Try to find existing user
      targetUser = await adminAuth.getUserByEmail(email);
    } catch (error: unknown) {
      if ((error as any).code === 'auth/user-not-found' && createAccount) {
        // Create new user account
        targetUser = await adminAuth.createUser({
          email: email,
          displayName: name || email.split('@')[0],
          emailVerified: false,
          disabled: false
        });
        userCreated = true;
      } else if ((error as any).code === 'auth/user-not-found') {
        return NextResponse.json(
          { error: 'User not found. Set createAccount=true to create a new user.' },
          { status: 404 }
        );
      } else {
        throw error;
      }
    }

    // Set appropriate claims based on role
    const isAdmin = role === 'admin';
    const claimResult = await setAdminClaim(targetUser.uid, isAdmin);
    if (!claimResult.success) {
      return NextResponse.json(
        { error: claimResult.error || 'Failed to set user claims' },
        { status: 500 }
      );
    }

    // Create/update user document in Firestore
    const userDocResult = await createUserDocument(targetUser.uid, {
      email: targetUser.email!,
      name: name || targetUser.displayName || email.split('@')[0],
      role: role as 'admin' | 'user',
      isAdmin: isAdmin,
      ...(userCreated && { createdAt: new Date() }),
      metadata: {
        createdBy: currentUser.email || 'admin',
        ...(isAdmin && { 
          promotedToAdminAt: new Date(),
          promotedBy: currentUser.email || 'admin'
        })
      }
    });

    if (!userDocResult.success) {
      return NextResponse.json(
        { error: userDocResult.error || 'Failed to create user document' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} user ${userCreated ? 'created' : 'updated'} successfully`,
      user: {
        uid: targetUser.uid,
        email: targetUser.email,
        name: name || targetUser.displayName,
        role: role,
        isAdmin: isAdmin,
        created: userCreated
      }
    });

  } catch (error) {
    console.error('Error adding admin user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
