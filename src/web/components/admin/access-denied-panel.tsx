import Link from "next/link";

import { ADMIN_SIGN_OUT_REDIRECT_PATH } from "@/lib/auth/config";

import { SignOutButton } from "./sign-out-button";

export function AccessDeniedPanel() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section
        className="admin-shell-panel w-full max-w-2xl border-y border-[var(--border-soft)] bg-[var(--surface)] px-6 py-8 sm:px-8 sm:py-10"
        data-testid="admin-access-denied-panel"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)]">
          Toegang geweigerd
        </p>
        <h1 className="display-font mt-3 text-5xl leading-none text-[color:var(--admin-ink-strong)]">
          Je bent wel ingelogd, maar niet toegelaten tot het admin-portaal.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--admin-ink-soft)]">
          Deze omgeving is alleen beschikbaar voor expliciet goedgekeurde Microsoft-accounts. Er
          is geen beschermde inhoud getoond.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <SignOutButton
            callbackUrl={ADMIN_SIGN_OUT_REDIRECT_PATH}
            className="border border-[var(--brand-black)] bg-[var(--brand-black)] px-5 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-orange)] hover:bg-[var(--brand-orange)]"
            testId="access-denied-signout-button"
          />
          <Link
            className="border border-[color:var(--admin-border-strong)] px-5 py-3 text-sm font-semibold text-[color:var(--admin-ink-strong)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
            data-testid="access-denied-home-link"
            href="/"
          >
            Terug naar de site
          </Link>
        </div>
      </section>
    </main>
  );
}
