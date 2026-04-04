import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import NextAuth from "next-auth/next";

import {
  ADMIN_HOME_PATH,
  authOptions,
  getAdminAuthErrorPath,
  getMissingAuthConfigKeys,
  isAuthConfigured,
} from "@/lib/auth/config";
import { createAuthRequestContext, logAuthEvent } from "@/lib/auth/logging";

const authHandler = NextAuth(authOptions);

interface RouteContext {
  params: Promise<{ nextauth: string[] }>;
}

function getCallbackUrl(request: NextRequest): string {
  return request.nextUrl.searchParams.get("callbackUrl") ?? ADMIN_HOME_PATH;
}

function getUnavailableAuthResponse(request: NextRequest) {
  return NextResponse.redirect(
    new URL(getAdminAuthErrorPath("Configuration", getCallbackUrl(request)), request.url),
    303,
  );
}

export async function GET(request: NextRequest, context: RouteContext) {
  const resolvedParams = await context.params;
  const authAction = resolvedParams.nextauth[0] ?? "unknown";
  const authRequestContext = createAuthRequestContext(request);

  logAuthEvent({
    correlationId: authRequestContext.correlationId,
    details: {
      action: authAction,
      method: "GET",
    },
    event: "auth_route_entry",
    level: "info",
    path: authRequestContext.path,
  });

  if (!isAuthConfigured()) {
    logAuthEvent({
      correlationId: authRequestContext.correlationId,
      details: {
        action: authAction,
        method: "GET",
        missingConfigKeys: getMissingAuthConfigKeys(),
      },
      event: "auth_configuration_unavailable",
      level: "error",
      path: authRequestContext.path,
    });

    return getUnavailableAuthResponse(request);
  }

  try {
    const response = await authHandler(request, {
      params: Promise.resolve(resolvedParams),
    });

    if (authAction === "callback") {
      logAuthEvent({
        correlationId: authRequestContext.correlationId,
        details: {
          action: authAction,
          status: response.status,
        },
        event: "auth_callback_handled",
        level: "info",
        path: authRequestContext.path,
      });
    }

    return response;
  } catch (error) {
    logAuthEvent({
      correlationId: authRequestContext.correlationId,
      details: {
        action: authAction,
        method: "GET",
      },
      event: "auth_route_failure",
      level: "error",
      path: authRequestContext.path,
      error,
    });

    return NextResponse.redirect(
      new URL(getAdminAuthErrorPath("RouteFailure", getCallbackUrl(request)), request.url),
      303,
    );
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  const resolvedParams = await context.params;
  const authAction = resolvedParams.nextauth[0] ?? "unknown";
  const authRequestContext = createAuthRequestContext(request);

  logAuthEvent({
    correlationId: authRequestContext.correlationId,
    details: {
      action: authAction,
      method: "POST",
    },
    event: "auth_route_entry",
    level: "info",
    path: authRequestContext.path,
  });

  if (!isAuthConfigured()) {
    logAuthEvent({
      correlationId: authRequestContext.correlationId,
      details: {
        action: authAction,
        method: "POST",
        missingConfigKeys: getMissingAuthConfigKeys(),
      },
      event: "auth_configuration_unavailable",
      level: "error",
      path: authRequestContext.path,
    });

    return getUnavailableAuthResponse(request);
  }

  try {
    const response = await authHandler(request, {
      params: Promise.resolve(resolvedParams),
    });

    if (authAction === "callback") {
      logAuthEvent({
        correlationId: authRequestContext.correlationId,
        details: {
          action: authAction,
          status: response.status,
        },
        event: "auth_callback_handled",
        level: "info",
        path: authRequestContext.path,
      });
    }

    return response;
  } catch (error) {
    logAuthEvent({
      correlationId: authRequestContext.correlationId,
      details: {
        action: authAction,
        method: "POST",
      },
      event: "auth_route_failure",
      level: "error",
      path: authRequestContext.path,
      error,
    });

    return NextResponse.redirect(
      new URL(getAdminAuthErrorPath("RouteFailure", getCallbackUrl(request)), request.url),
      303,
    );
  }
}
