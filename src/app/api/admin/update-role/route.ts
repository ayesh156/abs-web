import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, setAdminClaim, createUserDocument, getUserDocument } from '@/lib/auth-admin';
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
    const { uid, role } = await request.json();
    
    if (!uid || !role || !['admin', 'user'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid uid or role' },
        { status: 400 }
      );
    }

    // Get the target user
    const targetUser = await adminAuth.getUser(uid);
    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Set admin claims based on role
    const isAdmin = role === 'admin';
    const claimResult = await setAdminClaim(uid, isAdmin);
    if (!claimResult.success) {
      return NextResponse.json(
        { error: claimResult.error || 'Failed to set role claims' },
        { status: 500 }
      );
    }

    // Update user document in Firestore
    const userDocResult = await createUserDocument(uid, {
      email: targetUser.email!,
      name: targetUser.displayName || targetUser.email?.split('@')[0] || 'User',
      role: role as 'admin' | 'user',
      isAdmin,
      metadata: {
        promotedToAdminAt: isAdmin ? new Date() : undefined, // Will be converted to server timestamp
        promotedBy: currentUser.email || 'admin'
      }
    });

    if (!userDocResult.success) {
      return NextResponse.json(
        { error: userDocResult.error || 'Failed to update user document' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}`,
      user: {
        uid: targetUser.uid,
        email: targetUser.email,
        name: targetUser.displayName,
        role,
        isAdmin
      }
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
