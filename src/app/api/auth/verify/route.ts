import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/AuthService';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sid = searchParams.get('sid');

    if (!sid) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const ua = request.headers.get('user-agent') || 'unknown';

    const result = await AuthService.verifyMagicLink(sid, ip, ua);

    let maskedIp = ip;
    if (ip.includes(':')) {
      // IPv6 masking: keep first 3 hextets
      const parts = ip.split(':');
      maskedIp = parts.slice(0, 3).concat(['*', '*', '*']).join(':');
    } else {
      // IPv4 masking: keep first 2 octets
      maskedIp = ip.split('.').slice(0, 2).concat(['*', '*']).join('.');
    }
    
    if (result.status === 'success') {
      console.log(`[AUTH LOG] ${new Date().toISOString()} | IP:${maskedIp} | UA:${AuthService.getContextHash(ip, ua).substring(0, 8)}... | outcome: success`);
      
      const cookieStore = await cookies();
      cookieStore.set('admin_session', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60, // 15 minutes
        path: '/',
      });

      return NextResponse.json({ ok: true });
    } else {
      console.log(`[AUTH LOG] ${new Date().toISOString()} | IP:${maskedIp} | UA:${AuthService.getContextHash(ip, ua).substring(0, 8)}... | outcome: ${result.reason}`);
      return NextResponse.json({ ok: false }, { status: 400 }); // Generic fail
    }

  } catch (error) {
    console.error('[AUTH SERVICE - VERIFY ERROR]:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
