import type { Session } from "next-auth";
import { getServerSession } from "next-auth";

import type { AdminSessionViewModel } from "@/types/admin";

import { getAllowedAccountsFromEnv, isAllowedAdminAccount } from "./allowed-accounts";
import {
  ADMIN_ACCESS_DENIED_PATH,
  ADMIN_HOME_PATH,
  authOptions,
  getAdminSignInPath,
  isAuthConfigured,
} from "./config";
import { toAdminSessionViewModel } from "./session";

interface ResolveAdminAccessInput {
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
  | { kind: "authorized"; session: Session; sessionViewModel: AdminSessionViewModel };

export function resolveAdminAccess({
  session,
  allowedAccounts,
  isConfigured,
  signInPath,
  accessDeniedPath,
}: ResolveAdminAccessInput): AdminAccessDecision {
  if (!isConfigured) {
    return {
      kind: "unavailable",
      redirectTo: accessDeniedPath,
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

export async function getAdminAccessDecision(): Promise<AdminAccessDecision> {
  const configured = isAuthConfigured();
  const session = configured ? await getServerSession(authOptions) : null;

  return resolveAdminAccess({
    session,
    allowedAccounts: getAllowedAccountsFromEnv(),
    isConfigured: configured,
    signInPath: getAdminSignInPath(ADMIN_HOME_PATH),
    accessDeniedPath: ADMIN_ACCESS_DENIED_PATH,
  });
}
