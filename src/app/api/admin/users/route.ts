import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminFirestore } from '@/lib/auth-admin';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
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

    // Get all users from Firestore
    const db = getAdminFirestore();
    const usersSnapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
    
    const users: any[] = [];
    
    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      
      try {
        // Get additional user info from Firebase Auth
        const authUser = await adminAuth.getUser(doc.id);
        
        users.push({
          uid: doc.id,
          email: authUser.email,
          name: userData.name || authUser.displayName || 'Unnamed User',
          role: userData.role || 'user',
          isAdmin: userData.isAdmin || false,
          createdAt: userData.createdAt?.toDate() || authUser.metadata.creationTime,
          lastLogin: userData.lastLogin?.toDate() || null,
          status: authUser.disabled ? 'inactive' : 'active',
          emailVerified: authUser.emailVerified,
          metadata: userData.metadata || {}
        });
      } catch (authError) {
        // If user doesn't exist in Firebase Auth, skip or include with limited info
        console.warn(`User ${doc.id} exists in Firestore but not in Firebase Auth`);
      }
    }

    // Also get users from Firebase Auth who might not be in Firestore yet
    let pageToken: string | undefined;
    const allAuthUsers: any[] = [];
    
    do {
      const listUsersResult = await adminAuth.listUsers(1000, pageToken);
      allAuthUsers.push(...listUsersResult.users);
      pageToken = listUsersResult.pageToken;
    } while (pageToken);

    // Add auth users that aren't in Firestore
    for (const authUser of allAuthUsers) {
      const existsInFirestore = users.some(u => u.uid === authUser.uid);
      
      if (!existsInFirestore) {
        users.push({
          uid: authUser.uid,
          email: authUser.email,
          name: authUser.displayName || 'Unnamed User',
          role: authUser.customClaims?.admin ? 'admin' : 'user',
          isAdmin: authUser.customClaims?.admin || false,
          createdAt: authUser.metadata.creationTime,
          lastLogin: authUser.metadata.lastSignInTime || null,
          status: authUser.disabled ? 'inactive' : 'active',
          emailVerified: authUser.emailVerified,
          metadata: {}
        });
      }
    }

    // Sort by creation date (newest first)
    users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      users,
      total: users.length
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
