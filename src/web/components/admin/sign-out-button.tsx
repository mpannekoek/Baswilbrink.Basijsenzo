"use client";

import { useTransition } from "react";

import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  callbackUrl?: string;
  className?: string;
  label?: string;
  testId?: string;
}

function resolveSignOutCallbackUrl(callbackUrl: string): string {
  if (callbackUrl.startsWith("/") && typeof window !== "undefined") {
    return new URL(callbackUrl, window.location.origin).toString();
  }

  return callbackUrl;
}

export function SignOutButton({
  callbackUrl = "/",
  className,
  label = "Uitloggen",
  testId = "admin-signout-button",
}: SignOutButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className={className}
      data-testid={testId}
      disabled={isPending}
      type="button"
      onClick={() => {
        startTransition(() => {
          void signOut({ callbackUrl: resolveSignOutCallbackUrl(callbackUrl) });
        });
      }}
    >
      {isPending ? "Bezig..." : label}
    </button>
  );
}
