import Link from "next/link";

import type { AdminSessionViewModel } from "@/types/admin";

interface AdminDashboardHomeProps {
  session: AdminSessionViewModel;
}

export function AdminDashboardHome({ session }: AdminDashboardHomeProps) {
  return (
    <div className="grid gap-6" data-testid="admin-dashboard-home">
      <p
        className="max-w-3xl text-sm leading-7 text-black/62"
        data-testid="admin-dashboard-summary"
      >
        Welkom terug, {session.displayName}.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          className="admin-shell-panel rounded-[1.75rem] border border-[color:var(--admin-card-border)] bg-[color:var(--admin-card-bg)] p-5 transition hover:border-[color:var(--brand-orange)]"
          data-testid="admin-dashboard-content-link"
          href="/admin/content"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">Content</p>
          <h3 className="mt-3 text-lg font-semibold text-[color:var(--admin-ink-strong)]">
            Homepage-content
          </h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--admin-ink-soft)]">
            Werk de algemene homepage-teksten bij.
          </p>
        </Link>

        <Link
          className="admin-shell-panel rounded-[1.75rem] border border-[color:var(--admin-card-border)] bg-[color:var(--admin-card-bg)] p-5 transition hover:border-[color:var(--brand-orange)]"
          data-testid="admin-dashboard-opening-hours-link"
          href="/admin/content/opening-hours"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">
            Openingstijden
          </p>
          <h3 className="mt-3 text-lg font-semibold text-[color:var(--admin-ink-strong)]">
            Dagelijkse uren
          </h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--admin-ink-soft)]">
            Pas per dag de zichtbare openingstijd aan.
          </p>
        </Link>

        <Link
          className="admin-shell-panel rounded-[1.75rem] border border-[color:var(--admin-card-border)] bg-[color:var(--admin-card-bg)] p-5 transition hover:border-[color:var(--brand-orange)]"
          data-testid="admin-dashboard-featured-taste-link"
          href="/admin/content/taste-of-the-week"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">
            Smaak van de week
          </p>
          <h3 className="mt-3 text-lg font-semibold text-[color:var(--admin-ink-strong)]">
            Uitgelichte smaak
          </h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--admin-ink-soft)]">
            Houd de smaak en pairings van deze week actueel.
          </p>
        </Link>
      </div>
    </div>
  );
}
