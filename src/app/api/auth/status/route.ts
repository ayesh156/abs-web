import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser, getUserDocument } from '@/lib/auth-admin';
import { isAuthBypassEnabled, hasBypassAuthCookie, createMockAdminUser } from '@/lib/auth-bypass';

export async function GET(request: NextRequest) {
  try {
    // Check for bypass mode first
    if (isAuthBypassEnabled()) {
      console.warn('AUTH BYPASS: Status check in bypass mode');
      
      // Check if bypass cookie is set or force bypass
      const hasBypassCookie = hasBypassAuthCookie(request.headers.get('cookie') || '');
      
      if (hasBypassCookie || true) { // Always true in bypass mode
        const mockUser = createMockAdminUser();
        
        return NextResponse.json({
          authenticated: true,
          user: {
            uid: mockUser.uid,
            email: mockUser.email,
            emailVerified: mockUser.emailVerified,
            isAdmin: mockUser.isAdmin,
            name: mockUser.name,
            role: mockUser.role,
            lastLogin: mockUser.metadata.lastSignInTime,
            createdAt: mockUser.metadata.creationTime,
            bypassMode: true
          },
        });
      }
    }

    // Normal authentication flow
    // Only check for admin token since we only allow admin users
    const adminToken = request.cookies.get('admin-token')?.value;

    if (!adminToken) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    // Verify the token
    const verification = await verifyIdToken(adminToken);
    
    if (!verification.success) {
      // Clear invalid cookies
      const response = NextResponse.json({
        authenticated: false,
        user: null,
      });
      
      response.cookies.delete('admin-token');
      response.cookies.delete('admin-auth');
      
      return response;
    }

    // Check admin status
    if (!verification.uid) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    const isAdmin = await isAdminUser(verification.uid);
    
    // Only allow admin users
    if (!isAdmin) {
      const response = NextResponse.json({
        authenticated: false,
        user: null,
        error: 'Access denied. Only administrators can access the system at this time.'
      });
      
      response.cookies.delete('admin-token');
      response.cookies.delete('admin-auth');
      
      return response;
    }
    
    // Get user document from Firestore for additional data
    const userDoc = await getUserDocument(verification.uid);

    return NextResponse.json({
      authenticated: true,
      user: {
        uid: verification.uid,
        email: verification.email,
        emailVerified: verification.emailVerified,
        isAdmin: true, // Always true since we only allow admins
        name: userDoc?.name,
        role: 'admin', // Always admin
        lastLogin: userDoc?.lastLogin,
        createdAt: userDoc?.createdAt,
      },
    });
  } catch (error) {
    console.error('Auth status check error:', error);
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }
}
