import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminFirestore } from '@/lib/auth-admin';
import { cookies } from 'next/headers';

export async function DELETE(request: NextRequest) {
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
    const { uid } = await request.json();
    
    if (!uid) {
      return NextResponse.json(
        { error: 'User UID is required' },
        { status: 400 }
      );
    }

    // Prevent self-deletion
    if (uid === decodedToken.uid) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
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

    // Delete from Firebase Auth
    await adminAuth.deleteUser(uid);

    // Delete from Firestore
    const db = getAdminFirestore();
    await db.collection('users').doc(uid).delete();

    return NextResponse.json({
      success: true,
      message: `User ${targetUser.email} deleted successfully`
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
