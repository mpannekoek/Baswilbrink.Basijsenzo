import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

import { logAuthEvent } from "./logging";

export const ADMIN_AUTH_PROVIDER_ID = "azure-ad";
export const ADMIN_HOME_PATH = "/admin";
export const ADMIN_SIGN_IN_PATH = "/admin/sign-in";
export const ADMIN_ACCESS_DENIED_PATH = "/admin/access-denied";
export const ADMIN_AUTH_ERROR_PATH = "/admin/auth-error";
export const ADMIN_SIGN_OUT_REDIRECT_PATH = "/";

const AUTH_ENV_KEYS = [
  "AUTH_SECRET",
  "AUTH_MICROSOFT_CLIENT_ID",
  "AUTH_MICROSOFT_CLIENT_SECRET",
] as const;

type AuthEnvKey = (typeof AUTH_ENV_KEYS)[number];

export function getMissingAuthConfigKeys(env = process.env): AuthEnvKey[] {
  return AUTH_ENV_KEYS.filter((key) => !env[key]?.trim());
}

export function isAuthConfigured(env = process.env): boolean {
  return getMissingAuthConfigKeys(env).length === 0;
}

export function getAdminSignInPath(callbackUrl = ADMIN_HOME_PATH): string {
  const params = new URLSearchParams({
    callbackUrl,
  });

  return `${ADMIN_SIGN_IN_PATH}?${params.toString()}`;
}

export function getAdminAuthErrorPath(error = "Default", callbackUrl = ADMIN_HOME_PATH): string {
  const params = new URLSearchParams({
    callbackUrl,
    error,
  });

  return `${ADMIN_AUTH_ERROR_PATH}?${params.toString()}`;
}

function getMetadataKeys(metadata: unknown): string[] {
  if (!metadata || typeof metadata !== "object") {
    return [];
  }

  return Object.keys(metadata as Record<string, unknown>);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "",
  pages: {
    signIn: ADMIN_SIGN_IN_PATH,
    error: ADMIN_AUTH_ERROR_PATH,
  },
  session: {
    strategy: "jwt",
  },
  events: {
    async signIn({ account, user }) {
      logAuthEvent({
        details: {
          provider: account?.provider ?? ADMIN_AUTH_PROVIDER_ID,
        },
        event: "auth_sign_in_success",
        level: "info",
        path: ADMIN_HOME_PATH,
        userEmail: user.email,
      });
    },
  },
  logger: {
    error(code, metadata) {
      logAuthEvent({
        details: {
          code,
          metadataKeys: getMetadataKeys(metadata),
        },
        event: "auth_provider_error",
        level: "error",
        path: ADMIN_SIGN_IN_PATH,
      });
    },
    warn(code) {
      logAuthEvent({
        details: {
          code,
        },
        event: "auth_provider_warning",
        level: "warn",
        path: ADMIN_SIGN_IN_PATH,
      });
    },
  },
  providers: [
    AzureADProvider({
      clientId: process.env.AUTH_MICROSOFT_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH_MICROSOFT_CLIENT_SECRET ?? "",
      tenantId: "consumers",
    }),
  ],
};
