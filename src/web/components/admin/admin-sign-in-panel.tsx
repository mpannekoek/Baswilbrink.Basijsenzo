"use client";

import { useTransition } from "react";

import { signIn } from "next-auth/react";

import { ADMIN_AUTH_PROVIDER_ID } from "@/lib/auth/config";

interface AdminSignInPanelProps {
  callbackUrl: string;
  error?: string;
}

function getErrorMessage(error?: string) {
  if (!error) {
    return null;
  }

  if (error === "Callback") {
    return "De Microsoft-aanmelding is afgebroken of mislukt. Probeer het opnieuw.";
  }

  return "De aanmelding kon niet worden afgerond. Probeer het opnieuw.";
}

export function AdminSignInPanel({ callbackUrl, error }: AdminSignInPanelProps) {
  const [isPending, startTransition] = useTransition();
  const errorMessage = getErrorMessage(error);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="admin-shell-panel w-full max-w-xl border-y border-[var(--border-soft)] bg-[var(--surface)] px-6 py-8 sm:px-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)]">
          Admin portal
        </p>
        <h1 className="display-font mt-3 text-5xl leading-none text-[color:var(--admin-ink-strong)]">
          Beheeromgeving aanmelden
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-[color:var(--admin-ink-soft)]">
          Meld je aan met je Microsoft-account om toegang te krijgen tot het afgeschermde
          beheerdersgedeelte van Bas IJs &amp; Zo.
        </p>

        {errorMessage ? (
          <p
            className="mt-6 border border-[#d15a52] bg-[#fff1ef] px-4 py-3 text-sm font-medium text-[#b23e37]"
            data-testid="admin-signin-error"
          >
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-8">
          <button
            className="border border-[var(--brand-black)] bg-[var(--brand-black)] px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-orange)] hover:bg-[var(--brand-orange)]"
            data-testid="admin-signin-button"
            disabled={isPending}
            type="button"
            onClick={() => {
              startTransition(() => {
                void signIn(ADMIN_AUTH_PROVIDER_ID, { callbackUrl });
              });
            }}
          >
            {isPending ? "Bezig..." : "Sign in with Microsoft"}
          </button>
        </div>
      </section>
    </main>
  );
}
