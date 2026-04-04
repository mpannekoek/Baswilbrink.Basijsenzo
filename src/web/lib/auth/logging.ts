import type { NextRequest } from "next/server";

type AuthLogLevel = "info" | "warn" | "error";
type AuthLogDetailValue = boolean | number | string | string[] | null | undefined;

interface AuthLogEventDetails {
  [key: string]: AuthLogDetailValue;
}

interface AuthLogEvent {
  correlationId?: string;
  details?: AuthLogEventDetails;
  error?: unknown;
  event: string;
  level: AuthLogLevel;
  path?: string;
  userEmail?: string | null;
}

interface AuthRequestContext {
  correlationId: string;
  path: string;
}

const REQUEST_ID_HEADERS = ["x-request-id", "x-correlation-id"] as const;

export function maskAuthIdentifier(userEmail?: string | null): string | null {
  if (!userEmail?.trim()) {
    return null;
  }

  const normalized = userEmail.trim().toLowerCase();
  const [localPart, domain] = normalized.split("@");

  if (!localPart || !domain) {
    return `${normalized.slice(0, 1)}***`;
  }

  return `${localPart.slice(0, 1)}***@${domain}`;
}

export function createAuthRequestContext(
  request: Pick<NextRequest, "headers" | "nextUrl">,
): AuthRequestContext {
  const correlationId =
    REQUEST_ID_HEADERS.map((header) => request.headers.get(header)).find(Boolean) ??
    crypto.randomUUID();

  return {
    correlationId,
    path: request.nextUrl.pathname,
  };
}

function getSerializableError(error: unknown): { errorMessage?: string; errorName?: string } {
  if (error instanceof Error) {
    return {
      errorMessage: error.message,
      errorName: error.name,
    };
  }

  if (typeof error === "string") {
    return {
      errorMessage: error,
      errorName: "UnknownError",
    };
  }

  return {
    errorName: "UnknownError",
  };
}

function sanitizeDetails(details?: AuthLogEventDetails): Record<string, Exclude<AuthLogDetailValue, undefined>> {
  if (!details) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(details).filter(([, value]) => value !== undefined),
  ) as Record<string, Exclude<AuthLogDetailValue, undefined>>;
}

export function logAuthEvent({
  correlationId,
  details,
  error,
  event,
  level,
  path,
  userEmail,
}: AuthLogEvent): void {
  try {
    const logEntry = {
      ...sanitizeDetails(details),
      ...getSerializableError(error),
      correlationId,
      event,
      level,
      path,
      scope: "admin-auth",
      timestamp: new Date().toISOString(),
      userIdentifier: maskAuthIdentifier(userEmail),
    };

    const payload = JSON.stringify(logEntry);

    if (level === "error") {
      console.error(payload);
      return;
    }

    if (level === "warn") {
      console.warn(payload);
      return;
    }

    console.info(payload);
  } catch {
    // Never let auth logging failures break the auth flow.
  }
}
