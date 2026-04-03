"use client";

import { useTransition } from "react";

import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  callbackUrl?: string;
  className?: string;
  label?: string;
  testId?: string;
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
          void signOut({ callbackUrl });
        });
      }}
    >
      {isPending ? "Bezig..." : label}
    </button>
  );
}
