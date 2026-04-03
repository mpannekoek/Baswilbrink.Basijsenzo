import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import NextAuth from "next-auth/next";

import { authOptions, getMissingAuthConfigKeys, isAuthConfigured } from "@/lib/auth/config";

const authHandler = NextAuth(authOptions);

interface RouteContext {
  params: Promise<{ nextauth: string[] }>;
}

function getUnavailableAuthResponse() {
  return NextResponse.json(
    {
      message: "Admin sign-in is not configured.",
      missing: getMissingAuthConfigKeys(),
    },
    {
      status: 503,
    },
  );
}

export async function GET(request: NextRequest, context: RouteContext) {
  if (!isAuthConfigured()) {
    return getUnavailableAuthResponse();
  }

  return authHandler(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  if (!isAuthConfigured()) {
    return getUnavailableAuthResponse();
  }

  return authHandler(request, context);
}
