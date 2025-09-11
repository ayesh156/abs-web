import { NextRequest, NextResponse } from 'next/server';

// Simple config validation functions
const isAuthEnabled = () => !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const isFirebaseMode = () => isAuthEnabled();
const isMockMode = () => !isFirebaseMode();

const validateConfig = () => {
  const errors: string[] = [];
  
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    errors.push('NEXT_PUBLIC_FIREBASE_API_KEY is not set');
  }
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    errors.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set');
  }
  if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
    errors.push('FIREBASE_ADMIN_PROJECT_ID is not set');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const appConfig = {
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

/**
 * Configuration Status API
 * 
 * GET /api/config/status
 * Returns the current configuration status and validation results.
 * Only accessible in development mode for security.
 */
export async function GET(_request: NextRequest) {
  // Only allow in development mode
  if (appConfig.isProduction) {
    return NextResponse.json(
      { error: 'Configuration status is not available in production' },
      { status: 403 }
    );
  }

  try {
    const validation = validateConfig();
    
    const status = {
      environment: appConfig.env,
      nodeEnv: process.env.NODE_ENV,
      authentication: {
        enabled: isAuthEnabled(),
        mode: isFirebaseMode() ? 'firebase' : isMockMode() ? 'mock' : 'disabled',
        adminOnlyAccess: process.env.NEXT_PUBLIC_ADMIN_ONLY_ACCESS === 'true',
      },
      firebase: {
        configured: isFirebaseMode(),
        emulatorEnabled: process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true',
        clientConfigured: !!(
          process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        ),
        adminConfigured: !!(
          process.env.FIREBASE_ADMIN_PROJECT_ID &&
          process.env.FIREBASE_ADMIN_PRIVATE_KEY &&
          process.env.FIREBASE_ADMIN_CLIENT_EMAIL
        ),
      },
      security: {
        jwtSecretSet: !!process.env.JWT_SECRET,
        adminSetupSecretSet: !!process.env.ADMIN_SETUP_SECRET,
        cookieSecure: process.env.COOKIE_SECURE === 'true',
        csrfProtection: process.env.CSRF_PROTECTION !== 'false',
      },
      analytics: {
        enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
        googleAnalyticsConfigured: !!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      },
      validation: {
        isValid: validation.isValid,
        errors: validation.errors,
        warnings: validation.errors.length > 0 ? 
          ['Configuration issues detected. Check errors for details.'] : [],
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(status, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Error getting configuration status:', error);
    return NextResponse.json(
      { error: 'Failed to get configuration status' },
      { status: 500 }
    );
  }
}
