import { SignJWT, jwtVerify } from 'jose';

// Keep the secret highly protected inside environment variables
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-fallback-for-local-dev-only'
);

export async function createMagicLinkToken(email: string, nonce: string) {
  return await new SignJWT({ email, purpose: 'magic_link', nonce })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m') // 5 minutes validity
    .sign(JWT_SECRET);
}

export async function createSessionToken() {
  return await new SignJWT({ role: 'admin', fingerprint_verified: false })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30m') // 30 minutes access duration
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}
