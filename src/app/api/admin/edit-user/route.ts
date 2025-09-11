import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, createUserDocument } from '@/lib/auth-admin';
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
    const { uid, name, email, disabled } = await request.json();
    
    if (!uid) {
      return NextResponse.json(
        { error: 'User UID is required' },
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

    // Update Firebase Auth user
    const updateData: any = {};
    if (name !== undefined) updateData.displayName = name;
    if (email !== undefined) updateData.email = email;
    if (disabled !== undefined) updateData.disabled = disabled;

    if (Object.keys(updateData).length > 0) {
      await adminAuth.updateUser(uid, updateData);
    }

    // Update Firestore document
    const userDocResult = await createUserDocument(uid, {
      email: email || targetUser.email!,
      name: name || targetUser.displayName || 'Unnamed User',
      role: targetUser.customClaims?.admin ? 'admin' : 'user',
      isAdmin: targetUser.customClaims?.admin || false,
    });

    if (!userDocResult.success) {
      return NextResponse.json(
        { error: userDocResult.error || 'Failed to update user document' },
        { status: 500 }
      );
    }

    // Get updated user
    const updatedUser = await adminAuth.getUser(uid);

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: {
        uid: updatedUser.uid,
        email: updatedUser.email,
        name: updatedUser.displayName,
        disabled: updatedUser.disabled,
        emailVerified: updatedUser.emailVerified,
        role: updatedUser.customClaims?.admin ? 'admin' : 'user',
        isAdmin: updatedUser.customClaims?.admin || false
      }
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
