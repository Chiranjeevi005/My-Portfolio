import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/AuthService';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-fallback-for-local-dev-only');

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get('admin_session')?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: 'No active session' }, { status: 401 });
  }

  const payload = await AuthService.verifySession(sessionToken);

  if (!payload) {
    return NextResponse.json({ error: 'Session expired or invalid' }, { status: 401 });
  }

  // Rate limiting for extensions (e.g., at most once every 30s)
  // This is a simple check; for production, use a more robust rate limiter
  const iat = payload.iat as number;
  const now = Math.floor(Date.now() / 1000);
  if (now - iat < 30) {
    return NextResponse.json({ error: 'Extension requested too soon' }, { status: 429 });
  }

  // Issue new session token
  const newToken = await new SignJWT({ role: 'admin', auth: 'session_extension' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30m')
    .sign(JWT_SECRET);

  const response = NextResponse.json({ 
    success: true, 
    expiresAt: Date.now() + 30 * 60 * 1000 
  });

  response.cookies.set('admin_session', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 60, // 30 mins
    path: '/',
  });

  return response;
}
