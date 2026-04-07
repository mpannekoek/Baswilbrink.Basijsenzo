import { maskAuthIdentifier } from "@/lib/auth/logging";

type ContentLogLevel = "info" | "warn" | "error";
type ContentLogDetailValue = boolean | number | string | null | undefined;

interface ContentLogDetails {
  [key: string]: ContentLogDetailValue;
}

interface ContentLogEvent {
  actorIdentifier?: string | null;
  details?: ContentLogDetails;
  error?: unknown;
  event: string;
  level: ContentLogLevel;
  targetSection?: string;
}

function serializeError(error: unknown): { errorMessage?: string; errorName?: string } {
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

function sanitizeDetails(details?: ContentLogDetails): Record<string, Exclude<ContentLogDetailValue, undefined>> {
  if (!details) {
    return {};
  }

  return Object.fromEntries(Object.entries(details).filter(([, value]) => value !== undefined)) as Record<
    string,
    Exclude<ContentLogDetailValue, undefined>
  >;
}

export function logContentEvent({
  actorIdentifier,
  details,
  error,
  event,
  level,
  targetSection,
}: ContentLogEvent): void {
  try {
    const payload = JSON.stringify({
      ...sanitizeDetails(details),
      ...serializeError(error),
      actorIdentifier: maskAuthIdentifier(actorIdentifier),
      event,
      level,
      scope: "landing-page-content",
      targetSection,
      timestamp: new Date().toISOString(),
    });

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
    // Logging must never block content reads or writes.
  }
}
