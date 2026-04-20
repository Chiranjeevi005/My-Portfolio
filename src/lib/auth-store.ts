export const usedNonces = new Set<string>();

type RateLimitData = {
  count: number;
  resetAt: number;
};
export const rateLimitMap = new Map<string, RateLimitData>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const data = rateLimitMap.get(ip);

  // Allow 3 requests per minute
  if (!data || now > data.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return true;
  }

  if (data.count >= 3) {
    // Cooldown, block
    // Apply 5 minute ban if they spam up to 5 times
    if (data.count >= 5) {
        data.resetAt = now + 5 * 60 * 1000;
    }
    data.count += 1;
    return false;
  }

  data.count += 1;
  return true;
}
