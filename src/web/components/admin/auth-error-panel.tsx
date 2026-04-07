import Link from "next/link";

import { ADMIN_HOME_PATH, getAdminSignInPath } from "@/lib/auth/config";

interface AuthErrorPanelProps {
  callbackUrl?: string;
  error?: string;
}

function getAuthErrorCopy(error?: string) {
  if (error === "Configuration") {
    return {
      message:
        "De admin-aanmelding is tijdelijk niet beschikbaar. Probeer het later opnieuw of ga terug naar de website.",
      title: "Aanmelden is nu niet beschikbaar.",
    };
  }

  return {
    message:
      "De Microsoft-aanmelding kon niet normaal worden afgerond. Probeer het opnieuw vanuit het admin-portaal.",
    title: "Aanmelden is niet gelukt.",
  };
}

export function AuthErrorPanel({ callbackUrl = ADMIN_HOME_PATH, error }: AuthErrorPanelProps) {
  const copy = getAuthErrorCopy(error);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section
        className="admin-shell-panel w-full max-w-2xl border-y border-[var(--border-soft)] bg-[var(--surface)] px-6 py-8 sm:px-8 sm:py-10"
        data-testid="admin-auth-error-panel"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)]">
          Aanmeldfout
        </p>
        <h1 className="display-font mt-3 text-5xl leading-none text-[color:var(--admin-ink-strong)]">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--admin-ink-soft)]">
          {copy.message}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-md border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-5 py-3 text-sm font-semibold text-[var(--surface)] transition hover:border-[var(--brand-orange-soft)] hover:bg-[var(--brand-orange-soft)] hover:text-[var(--surface)] visited:text-[var(--surface)]"
            data-testid="auth-error-retry-link"
            href={getAdminSignInPath(callbackUrl)}
          >
            Opnieuw proberen
          </Link>
          <Link
            className="border border-[color:var(--admin-border-strong)] px-5 py-3 text-sm font-semibold text-[color:var(--admin-ink-strong)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
            data-testid="auth-error-home-link"
            href="/"
          >
            Terug naar de site
          </Link>
        </div>
      </section>
    </main>
  );
}
