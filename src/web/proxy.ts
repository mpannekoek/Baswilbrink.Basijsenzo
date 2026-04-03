import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 120;
const buckets = new Map<string, { count: number; resetAt: number }>();

function shouldBypassRateLimit(pathname: string) {
  if (pathname.startsWith("/_next")) {
    return true;
  }

  return /\.(?:css|js|map|png|jpg|jpeg|gif|webp|svg|ico|woff2?)$/i.test(pathname);
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypassRateLimit(pathname)) {
    return NextResponse.next();
  }

  const now = Date.now();
  const key = `${getClientKey(request)}:${pathname}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return NextResponse.next();
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));

    return NextResponse.json(
      {
        error: "Too many requests",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  current.count += 1;
  buckets.set(key, current);

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
