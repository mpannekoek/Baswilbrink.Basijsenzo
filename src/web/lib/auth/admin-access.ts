import { cache } from "react";

import type { Session } from "next-auth";
import { getServerSession } from "next-auth";

import type { AdminSessionViewModel } from "@/types/admin";

import { getAllowedAccountsFromEnv, isAllowedAdminAccount } from "./allowed-accounts";
import {
  ADMIN_ACCESS_DENIED_PATH,
  ADMIN_AUTH_ERROR_PATH,
  ADMIN_HOME_PATH,
  authOptions,
  getAdminAuthErrorPath,
  getAdminSignInPath,
  getMissingAuthConfigKeys,
  isAuthConfigured,
} from "./config";
import { logAuthEvent } from "./logging";
import { toAdminSessionViewModel } from "./session";

interface ResolveAdminAccessInput {
  authErrorPath: string;
  session: Session | null;
  allowedAccounts: Set<string>;
  isConfigured: boolean;
  signInPath: string;
  accessDeniedPath: string;
}

export type AdminAccessDecision =
  | { kind: "unauthenticated"; redirectTo: string }
  | { kind: "unauthorized"; redirectTo: string }
  | { kind: "unavailable"; redirectTo: string }
  | { kind: "unexpected_auth_failure"; redirectTo: string }
  | { kind: "authorized"; session: Session; sessionViewModel: AdminSessionViewModel };

export function resolveAdminAccess({
  authErrorPath,
  session,
  allowedAccounts,
  isConfigured,
  signInPath,
  accessDeniedPath,
}: ResolveAdminAccessInput): AdminAccessDecision {
  if (!isConfigured) {
    return {
      kind: "unavailable",
      redirectTo: authErrorPath,
    };
  }

  const sessionEmail = session?.user?.email;

  if (!session || !sessionEmail) {
    return {
      kind: "unauthenticated",
      redirectTo: signInPath,
    };
  }

  if (!isAllowedAdminAccount(sessionEmail, allowedAccounts)) {
    return {
      kind: "unauthorized",
      redirectTo: accessDeniedPath,
    };
  }

  return {
    kind: "authorized",
    session,
    sessionViewModel: toAdminSessionViewModel(session),
  };
}

export const getAdminAccessDecision = cache(
  async (currentPath = ADMIN_HOME_PATH): Promise<AdminAccessDecision> => {
  const configured = isAuthConfigured();
  const callbackUrl = currentPath || ADMIN_HOME_PATH;
  const authErrorPath = getAdminAuthErrorPath("Default", callbackUrl);

  if (!configured) {
    logAuthEvent({
      details: {
        missingConfigKeys: getMissingAuthConfigKeys(),
      },
      event: "admin_auth_unavailable",
      level: "error",
      path: currentPath,
    });

    return {
      kind: "unavailable",
      redirectTo: getAdminAuthErrorPath("Configuration", callbackUrl),
    };
  }

  try {
    const session = await getServerSession(authOptions);
    const decision = resolveAdminAccess({
      authErrorPath,
      session,
      allowedAccounts: getAllowedAccountsFromEnv(),
      isConfigured: configured,
      signInPath: getAdminSignInPath(callbackUrl),
      accessDeniedPath: ADMIN_ACCESS_DENIED_PATH,
    });

    if (decision.kind === "authorized") {
      logAuthEvent({
        event: "admin_auth_authorized",
        level: "info",
        path: currentPath,
        userEmail: decision.session.user?.email,
      });
      return decision;
    }

    if (decision.kind === "unauthenticated") {
      logAuthEvent({
        details: {
          redirectTo: decision.redirectTo,
        },
        event: "admin_auth_redirect_sign_in",
        level: "info",
        path: currentPath,
      });
      return decision;
    }

    logAuthEvent({
      details: {
        redirectTo: decision.redirectTo,
      },
      event: "admin_access_denied",
      level: "warn",
      path: currentPath,
      userEmail: session?.user?.email,
    });

    return decision;
  } catch (error) {
    logAuthEvent({
      event: "admin_auth_session_failure",
      level: "error",
      path: currentPath,
      error,
    });

    return {
      kind: "unexpected_auth_failure",
      redirectTo: getAdminAuthErrorPath("Session", callbackUrl),
    };
  }
  },
);
