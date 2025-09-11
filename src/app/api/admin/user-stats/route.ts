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

    // Get all users from Firebase Auth
    let pageToken: string | undefined;
    const allAuthUsers: any[] = [];
    
    do {
      const listUsersResult = await adminAuth.listUsers(1000, pageToken);
      allAuthUsers.push(...listUsersResult.users);
      pageToken = listUsersResult.pageToken;
    } while (pageToken);

    // Get users from Firestore for additional data
    const db = getAdminFirestore();
    const usersSnapshot = await db.collection('users').get();
    const firestoreUsers = new Map();
    
    usersSnapshot.docs.forEach(doc => {
      firestoreUsers.set(doc.id, doc.data());
    });

    // Calculate statistics
    const stats = {
      total: allAuthUsers.length,
      active: 0,
      inactive: 0,
      admins: 0,
      regularUsers: 0,
      emailVerified: 0,
      emailUnverified: 0,
      recentLogins: 0, // Last 24 hours
      recentSignups: 0, // Last 7 days
      byProvider: {
        password: 0,
        google: 0,
        other: 0
      },
      monthlySignups: [] as any[]
    };

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Monthly signups for the last 12 months
    const monthlyData = new Map();
    for (let i = 11; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = month.toISOString().slice(0, 7); // YYYY-MM format
      monthlyData.set(monthKey, {
        month: month.toLocaleString('default', { month: 'short', year: 'numeric' }),
        users: 0
      });
    }

    allAuthUsers.forEach(user => {
      // Basic stats
      if (user.disabled) {
        stats.inactive++;
      } else {
        stats.active++;
      }

      if (user.customClaims?.admin) {
        stats.admins++;
      } else {
        stats.regularUsers++;
      }

      if (user.emailVerified) {
        stats.emailVerified++;
      } else {
        stats.emailUnverified++;
      }

      // Recent activity
      if (user.metadata.lastSignInTime && new Date(user.metadata.lastSignInTime) > oneDayAgo) {
        stats.recentLogins++;
      }

      if (user.metadata.creationTime && new Date(user.metadata.creationTime) > oneWeekAgo) {
        stats.recentSignups++;
      }

      // Provider stats
      const provider = user.providerData[0]?.providerId || 'password';
      if (provider.includes('google')) {
        stats.byProvider.google++;
      } else if (provider === 'password') {
        stats.byProvider.password++;
      } else {
        stats.byProvider.other++;
      }

      // Monthly signups
      if (user.metadata.creationTime) {
        const creationDate = new Date(user.metadata.creationTime);
        const monthKey = creationDate.toISOString().slice(0, 7);
        if (monthlyData.has(monthKey)) {
          monthlyData.get(monthKey).users++;
        }
      }
    });

    stats.monthlySignups = Array.from(monthlyData.values());

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
