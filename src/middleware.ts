import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Essential to extract the identical secret used during token minting
const JWT_SECRET = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      return new TextEncoder().encode('super-secret-fallback-for-local-dev-only');
    }
    throw new Error('FATAL: JWT_SECRET environment variable is missing.');
  }
  return new TextEncoder().encode(secret);
})();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin dashboard and GitHub proxy backends
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/github-proxy')) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      // Unauthenticated -> Kick to gateway
      return NextResponse.redirect(new URL('/access', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Secondary role verification for extreme containment
      if (payload.role !== 'admin') {
        throw new Error('Unauthorized role');
      }

      // If validated successfully, allow request routing to proceed
      return NextResponse.next();
    } catch (err) {
      // Invalid/expired token -> Purge potential stale tokens safely & kick to gateway
      const response = NextResponse.redirect(new URL('/access', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Allow unrestricted static/public requests
  return NextResponse.next();
}

// Optimization strategy: Only run middleware locally on target paths
export const config = {
  matcher: ['/admin/:path*', '/api/github-proxy/:path*'],
};
