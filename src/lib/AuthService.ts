import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

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

const ADMIN_EMAIL = (() => {
  const email = process.env.ADMIN_EMAIL;
  if (!email) {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      return 'admin@local.dev';
    }
    throw new Error('FATAL: ADMIN_EMAIL environment variable is missing.');
  }
  return email.toLowerCase();
})();

// Attach to globalThis to preserve in-memory state across hot-reloads during development
const globalStore = globalThis as unknown as {
  activeNonceByEmail: Map<string, string>;
  usedNonces: Map<string, number>; // nonce -> expiresAt
  tokenIndex: Map<string, { jwt: string; expiresAt: number }>;
  rateLimitMapIP: Map<string, { count: number; resetAt: number }>;
  cleanupStarted?: boolean;
};

if (!globalStore.activeNonceByEmail) {
  globalStore.activeNonceByEmail = new Map();
  globalStore.usedNonces = new Map();
  globalStore.tokenIndex = new Map();
  globalStore.rateLimitMapIP = new Map();
  globalStore.cleanupStarted = false;
}

/**
 * PRODUCTION NOTE:
 * For multi-instance deployments, the in-memory globalStore below should be replaced
 * with a shared store like Redis (using ioredis or Upstash) to ensure state persistence,
 * atomicity, and TTL enforcement across server nodes.
 */
if (!globalStore.cleanupStarted) {
  globalStore.cleanupStarted = true;
  setInterval(() => {
    const now = Date.now();
    // Cleanup tokenIndex
    for (const [id, data] of globalStore.tokenIndex.entries()) {
      if (now > data.expiresAt) globalStore.tokenIndex.delete(id);
    }
    // Cleanup usedNonces
    for (const [nonce, exp] of globalStore.usedNonces.entries()) {
      if (now > exp) globalStore.usedNonces.delete(nonce);
    }
    // Cleanup rateLimitMapIP
    for (const [ip, data] of globalStore.rateLimitMapIP.entries()) {
      if (now > data.resetAt) globalStore.rateLimitMapIP.delete(ip);
    }
  }, 60 * 1000).unref?.(); // Run every minute
}

export class AuthService {
  static getIpPrefix(ip: string) {
    // Extensive localhost normalization for dev
    if (
      ip === '::1' ||
      ip === '127.0.0.1' ||
      ip.includes('localhost') ||
      ip.startsWith('::ffff:127.0.0.1')
    ) {
      return 'localhost-loopback';
    }

    if (ip.includes(':')) {
      // IPv6 normalization: handle compressed '::'
      let fullIp = ip;
      if (ip.includes('::')) {
        const [left, right] = ip.split('::');
        const leftParts = left ? left.split(':') : [];
        const rightParts = right ? right.split(':') : [];
        const missing = 8 - (leftParts.length + rightParts.length);
        const middle = new Array(missing).fill('0');
        fullIp = [...leftParts, ...middle, ...rightParts].join(':');
      }
      // Issue (consistent /64 prefix): first 4 blocks
      return fullIp.split(':').slice(0, 4).join(':');
    }
    // IPv4 - take first 3 blocks (/24)
    return ip.split('.').slice(0, 3).join('.');
  }

  static getContextHash(ip: string, ua: string) {
    const prefix = this.getIpPrefix(ip);
    // Log context components internally to diagnose mismatches in dev
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AUTH CONTEXT] Prefix: ${prefix} | UA snippet: ${ua.substring(0, 20)}`);
    }
    return crypto.createHash('sha256').update(`${prefix}-${ua}`).digest('hex');
  }

  static checkIpRateLimit(ip: string): boolean {
    const now = Date.now();
    const data = globalStore.rateLimitMapIP.get(ip);
    if (!data || now > data.resetAt) {
      globalStore.rateLimitMapIP.set(ip, { count: 1, resetAt: now + 60 * 1000 });
      return true;
    }
    if (data.count >= 3) {
      // Over limit, apply backoff
      if (data.count >= 5) {
        data.resetAt = Math.max(data.resetAt, now + 5 * 60 * 1000); // 5 min
      } else {
        data.resetAt = Math.max(data.resetAt, now + 60 * 1000); // 60s
      }
      data.count++;
      return false;
    }
    data.count++;
    return true;
  }

  static async issueMagicLink(
    email: string,
    ip: string,
    ua: string
  ): Promise<string | null> {
    const normEmail = email.toLowerCase().trim();

    // Normalize and check against admin email
    if (normEmail !== ADMIN_EMAIL) return null;

    if (!this.checkIpRateLimit(ip)) {
      throw new Error('RATE_LIMITED');
    }

    // Single-use token logic: Cryptographically random nonce
    const nonce = crypto.randomBytes(16).toString('hex');

    // Latest-token-only: Invalidate older nonces for this email
    globalStore.activeNonceByEmail.set(normEmail, nonce);

    // Context binding
    const ctx = this.getContextHash(ip, ua);

    // Issue JWT
    const jwt = await new SignJWT({
      email: normEmail,
      purpose: 'magic_link',
      nonce,
      ctx,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2m') // exp = now + 120s
      .sign(JWT_SECRET);

    // Short ID to map to JWT
    const shortId = crypto.randomUUID().replace(/-/g, '').substring(0, 16);
    globalStore.tokenIndex.set(shortId, {
      jwt,
      expiresAt: Date.now() + 120 * 1000 // 2 min (matches JWT exp)
    });

    return shortId;
  }

  static async verifyMagicLink(
    shortId: string,
    ip: string,
    ua: string
  ): Promise<{ status: 'success'; token: string } | { status: 'error'; reason: string }> {
    try {
      const entry = globalStore.tokenIndex.get(shortId);
      if (!entry) return { status: 'error', reason: 'invalid_or_missing' };
      const jwt = entry.jwt;

      const { payload } = await jwtVerify(jwt, JWT_SECRET);

      if (payload.purpose !== 'magic_link') {
        return { status: 'error', reason: 'invalid_purpose' };
      }

      // Freshness window (≤45s)
      const iat = payload.iat as number;
      const now = Math.floor(Date.now() / 1000);
      if (now - iat > 45) {
        return { status: 'error', reason: 'expired_freshness' };
      }

      // Single-use check
      const nonce = payload.nonce as string;
      if (globalStore.usedNonces.has(nonce)) {
        return { status: 'error', reason: 'reused' };
      }

      // Latest-token-only check
      const email = payload.email as string;
      if (globalStore.activeNonceByEmail.get(email) !== nonce) {
        return { status: 'error', reason: 'not_latest' };
      }

      // Context binding check (small tolerance by using IP prefix)
      const expectedCtx = this.getContextHash(ip, ua);
      if (payload.ctx !== expectedCtx) {
        return { status: 'error', reason: 'ctx_mismatch' };
      }

      // Success - Mark used and explicitly delete from index
      // Store nonce with a 15 min safety window for duplicate prevention
      globalStore.usedNonces.set(nonce, Date.now() + 15 * 60 * 1000);
      globalStore.tokenIndex.delete(shortId);

      // Issue Session
      const sessionToken = await new SignJWT({ role: 'admin', auth: 'magic_link' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m') // 10-20 min expiry
        .sign(JWT_SECRET);

      return { status: 'success', token: sessionToken };
    } catch (err: any) {
      if (err.code === 'ERR_JWT_EXPIRED') {
        return { status: 'error', reason: 'expired' };
      }
      return { status: 'error', reason: 'invalid' };
    }
  }

  static async verifySession(token: string) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.role === 'admin') return payload;
      return null;
    } catch {
      return null;
    }
  }
}
