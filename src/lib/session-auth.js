// Session authentication helper for API routes
import { auth } from './auth';
import { getUserByEmail } from './userManager';

/**
 * Authenticates a user session in an API route and returns user info
 * @param {Request} request - The API request object  
 * @returns {Promise<Object>} - Authentication result with user data or error
 */
export async function authenticateUserSession(request) {
  try {
    // Get session from NextAuth
    const session = await auth();
    
    if (!session?.user?.email) {
      return {
        authenticated: false,
        error: 'Unauthorized',
        message: 'No valid session found. Please sign in.',
        status: 401
      };
    }

    // Get user from database using email
    const dbUser = await getUserByEmail(session.user.email);
    
    if (!dbUser) {
      return {
        authenticated: false,
        error: 'User not found',
        message: 'User account not found in database.',
        status: 401
      };
    }

    return {
      authenticated: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        image: dbUser.image
      }
    };

  } catch (error) {
    console.error('Session authentication error:', error);
    return {
      authenticated: false,
      error: 'Authentication failed',
      message: 'An error occurred while authenticating the session.',
      status: 500
    };
  }
}

/**
 * Middleware wrapper for API routes that require authentication
 * @param {Function} handler - The API route handler function
 * @returns {Function} - Wrapped handler with authentication
 */
export function withAuth(handler) {
  return async function authenticatedHandler(request, context) {
    const authResult = await authenticateUserSession(request);
    
    if (!authResult.authenticated) {
      const { NextResponse } = await import('next/server');
      return NextResponse.json(
        {
          error: authResult.error,
          message: authResult.message
        },
        { status: authResult.status }
      );
    }

    // Add user to context for the handler
    const contextWithUser = {
      ...context,
      user: authResult.user
    };

    return handler(request, contextWithUser);
  };
} 