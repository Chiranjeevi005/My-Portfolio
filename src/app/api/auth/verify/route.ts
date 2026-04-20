import { NextResponse } from 'next/server';
import { verifyToken, createSessionToken } from '@/lib/auth';
import { usedNonces } from '@/lib/auth-store';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid link' }, { status: 400 });
  }

  // 1. JWT verification resolves expiration and cryptographic signature
  const payload = await verifyToken(token);

  if (!payload || payload.purpose !== 'magic_link') {
    return NextResponse.json({ error: 'Expired or invalid link' }, { status: 401 });
  }

  // 2. Strict One-Time Use Protection via Nonce Cache
  const nonce = payload.nonce as string;
  if (!nonce || usedNonces.has(nonce)) {
    return NextResponse.json({ error: 'Link already used. Request a new one.' }, { status: 401 });
  }

  // Record nonce entirely invalidating future replay attacks
  usedNonces.add(nonce);

  // 3. Issue Temporary Backend-Only Admin Session
  const sessionToken = await createSessionToken();

  // 4. Secure HttpOnly Cookie Attachment
  const cookieStore = await cookies();
  cookieStore.set('admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 60, // 30 minutes session
    path: '/',
  });

  // Redirect the authorized user strictly to the admin portal or subsequent dual factor endpoint
  return NextResponse.redirect(new URL('/admin', request.url));
}
