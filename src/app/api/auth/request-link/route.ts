import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/auth-store';
import { createMagicLinkToken } from '@/lib/auth';
import { Resend } from 'resend';

// Hardcoded authorized identity
const ALLOWED_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. Enforce Rate Limiting
    if (!checkRateLimit(ip)) {
      // Intentionally return 429 so they are throttled and discouraged 
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();
    const { email } = body;

    // 2. Strict Access Gate
    // Refuse anything else silently to prevent enumeration
    if (!email || !ALLOWED_EMAIL || email.trim().toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { message: 'If authorized, access link has been sent.' },
        { status: 200 }
      );
    }

    // 3. Generate Nonce & Signed JWT Token
    // Nonce makes the token single-use
    const nonce = Math.random().toString(36).substring(2, 15);
    const token = await createMagicLinkToken(email, nonce);

    // 4. Send Email Strategy
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'}/api/auth/verify?token=${token}`;

    // Only fire off email if RESEND is actually hooked up
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'default') {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'System <onboarding@resend.dev>', // Should be a verified domain
        to: email,
        subject: 'Secure Access Link — Chiran Jeevi',
        text: `This link grants temporary access.\n\nValid for 5 minutes.\nSingle-use only.\n\n${verifyUrl}`,
      });
    } else {
      // Fallback for isolated developer mode without exposing error to frontend
      console.log(`[AUTH SERVICE - MAGIC LINK]: \n${verifyUrl}`);
    }

    return NextResponse.json(
      { message: 'If authorized, access link has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[AUTH ERROR]:', error);
    // Even an actual crash gives the generic enumeration-safe response
    return NextResponse.json(
      { message: 'If authorized, access link has been sent.' },
      { status: 200 }
    );
  }
}
