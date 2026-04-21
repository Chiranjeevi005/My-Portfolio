import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/AuthService';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const ua = request.headers.get('user-agent') || 'unknown';

    let maskedIp = ip;
    if (ip.includes(':')) {
      const parts = ip.split(':');
      maskedIp = parts.slice(0, 3).concat(['*', '*', '*']).join(':');
    } else {
      maskedIp = ip.split('.').slice(0, 2).concat(['*', '*']).join('.');
    }

    const body = await request.json();
    const { email } = body;

    // Neutral baseline response for enumeration safety
    const neutralResponse = NextResponse.json(
      { ok: true, message: 'If authorized, a link has been sent.' },
      { status: 200 }
    );

    if (!email) {
      return neutralResponse;
    }

    let shortId: string | null = null;
    try {
      shortId = await AuthService.issueMagicLink(email, ip, ua);
    } catch (err: any) {
      if (err.message === 'RATE_LIMITED') {
        console.log(`[AUTH LOG] ${new Date().toISOString()} | IP:${maskedIp} | UA:${AuthService.getContextHash(ip, ua).substring(0, 8)}... | outcome: rate_limited`);
        return NextResponse.json(
          { ok: false, message: 'Please wait before trying again.' },
          { status: 429 }
        );
      }
      return neutralResponse;
    }

    if (!shortId) {
      // Not authorized but we respond neutrally
      return neutralResponse;
    }

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'}/verify/${shortId}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #FFF9F3; color: #3A2D28; margin: 0; padding: 0; }
            .wrapper { padding: 40px 20px; }
            .container { max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #E8D5C8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(58, 45, 40, 0.05); }
            .header { padding: 32px 40px; text-align: center; background-color: #ffffff; border-bottom: 1px solid #E8D5C8; }
            .logo { font-size: 14px; font-weight: 700; color: #E85D45; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
            .content { padding: 40px; text-align: center; }
            .title { font-size: 22px; font-weight: 600; color: #3A2D28; margin: 0 0 16px 0; }
            .text { font-size: 15px; line-height: 1.6; color: #6E5C55; margin-bottom: 32px; }
            .button { display: inline-block; background-color: #E85D45; color: #ffffff !important; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 600; box-shadow: 0 4px 10px rgba(232, 93, 69, 0.2); }
            .security-notice { font-size: 13px; color: #A48C82; background-color: #FFF3E9; padding: 16px; border-radius: 8px; margin-top: 32px; text-align: left; }
            .footer { padding: 32px 40px; text-align: center; font-size: 12px; color: #A48C82; border-top: 1px solid #E8D5C8; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <div class="logo">Secure Access</div>
              </div>
              <div class="content">
                <h1 class="title">Gateway Verification</h1>
                <p class="text">
                  A high-trust session was requested for your account. 
                  Please click the link below to authorize this session and gain entry to your dashboard.
                </p>
                <a href="${verifyUrl}" class="button">Authorize Identity</a>
                <div class="security-notice">
                  <strong>Security Hardening:</strong> This link is valid for 2 minutes and restricted to a single use. 
                  It is cryptographically bound to your current device and network context.
                </div>
              </div>
              <div class="footer">
                If you did not request this access, no action is required.
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'default') {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'Action Required: Secure Gateway Access',
          html: htmlContent,
          text: `Verify your identity at: ${verifyUrl}`,
        });
      } catch (err) {
        console.error('[AUTH SERVICE - EMAIL ERROR]:', err);
      }
    } else {
      console.log(`[AUTH SERVICE - MAGIC LINK (LOCAL LOG)]: \n${verifyUrl}`);
    }

    return neutralResponse;
  } catch (error) {
    // Hide actual errors behind the generic response
    return NextResponse.json(
      { ok: true, message: 'If authorized, a link has been sent.' },
      { status: 200 }
    );
  }
}
