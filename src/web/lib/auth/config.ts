import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const ADMIN_AUTH_PROVIDER_ID = "azure-ad";
export const ADMIN_HOME_PATH = "/admin";
export const ADMIN_SIGN_IN_PATH = "/admin/sign-in";
export const ADMIN_ACCESS_DENIED_PATH = "/admin/access-denied";
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

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "",
  pages: {
    signIn: ADMIN_SIGN_IN_PATH,
    error: ADMIN_SIGN_IN_PATH,
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    AzureADProvider({
      clientId: process.env.AUTH_MICROSOFT_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH_MICROSOFT_CLIENT_SECRET ?? "",
      tenantId: "consumers",
    }),
  ],
};
