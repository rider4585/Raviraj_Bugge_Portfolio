// lib/rateLimit.ts
/**
 * Very small best-effort in-memory rate limiter.
 * - Uses a global Map to try to preserve counts across warm invocations
 * - Not perfect on serverless platforms (cold starts reset counts)
 * - Still helpful to slow down basic abuse
 *
 * Usage:
 *   const ok = rateLimit(ip, maxRequests, windowMs);
 */

type Entry = {
  count: number;
  windowStart: number;
};

const GLOBAL_KEY = "__PORTFOLIO_RATE_LIMIT_MAP__";

declare global {
  // attach to globalThis so values persist across module reloads in same instance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var __PORTFOLIO_RATE_LIMIT_MAP__: Map<string, Entry> | undefined;
}

if (!globalThis[GLOBAL_KEY]) {
  globalThis[GLOBAL_KEY] = new Map<string, Entry>();
}

const map = globalThis[GLOBAL_KEY]!;

export function rateLimit(
  ip: string,
  maxRequests = 6,
  windowMs = 60 * 60 * 1000
): boolean {
  try {
    const now = Date.now();
    const entry = map.get(ip);
    if (!entry) {
      map.set(ip, { count: 1, windowStart: now });
      return true;
    }
    if (now - entry.windowStart > windowMs) {
      // reset
      map.set(ip, { count: 1, windowStart: now });
      return true;
    }
    if (entry.count >= maxRequests) {
      return false;
    }
    entry.count += 1;
    map.set(ip, entry);
    return true;
  } catch (err) {
    // on error, allow (fail open)
    return true;
  }
}
