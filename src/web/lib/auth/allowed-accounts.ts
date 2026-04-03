const ACCOUNT_SEPARATOR = /[\s,;]+/;

export function normalizeAccountIdentifier(value: string): string {
  return value.trim().toLowerCase();
}

export function parseAllowedAccountList(rawValue: string | undefined): string[] {
  if (!rawValue) {
    return [];
  }

  return rawValue
    .split(ACCOUNT_SEPARATOR)
    .map(normalizeAccountIdentifier)
    .filter(Boolean);
}

export function getAllowedAccountsFromEnv(rawValue = process.env.AUTH_ALLOWED_EMAILS): Set<string> {
  return new Set(parseAllowedAccountList(rawValue));
}

export function isAllowedAdminAccount(
  email: string | null | undefined,
  allowedAccounts = getAllowedAccountsFromEnv(),
): boolean {
  if (!email) {
    return false;
  }

  return allowedAccounts.has(normalizeAccountIdentifier(email));
}
