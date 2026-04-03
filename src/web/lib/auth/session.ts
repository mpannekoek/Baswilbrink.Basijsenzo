import type { Session } from "next-auth";

import type { AdminSessionViewModel } from "@/types/admin";

function getDisplayName(session: Session): string {
  const name = session.user?.name?.trim();

  if (name) {
    return name;
  }

  const email = session.user?.email?.trim();

  if (email) {
    return email.split("@")[0] ?? "Admin";
  }

  return "Admin";
}

function getEmailAddress(session: Session): string {
  return session.user?.email?.trim() || "unknown@example.com";
}

function getInitials(displayName: string): string {
  const parts = displayName
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "AD";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function toAdminSessionViewModel(session: Session): AdminSessionViewModel {
  const displayName = getDisplayName(session);

  return {
    displayName,
    email: getEmailAddress(session),
    image: session.user?.image ?? null,
    initials: getInitials(displayName),
  };
}
