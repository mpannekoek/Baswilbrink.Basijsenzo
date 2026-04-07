"use client";

import { useEffect } from "react";

import Link from "next/link";

import type { AdminSessionViewModel } from "@/types/admin";

interface AdminDashboardHomeProps {
  session: AdminSessionViewModel;
}

function OverviewPanel({
  body,
  ctaLabel,
  eyebrow,
  href,
  sectionId,
  testId,
  title,
}: {
  body: string;
  ctaLabel: string;
  eyebrow: string;
  href: string;
  sectionId: string;
  testId: string;
  title: string;
}) {
  return (
    <section
      className="admin-shell-panel scroll-mt-28 rounded-[1.75rem] border border-[color:var(--admin-card-border)] bg-[color:var(--admin-card-bg)] p-5 transition hover:border-[color:var(--brand-orange)]"
      data-testid={testId}
      id={sectionId}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">{eyebrow}</p>
      <h3 className="mt-3 text-lg font-semibold text-[color:var(--admin-ink-strong)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[color:var(--admin-ink-soft)]">{body}</p>
      <Link
        className="mt-5 inline-flex rounded-full border border-[color:var(--brand-black)] px-4 py-2 text-sm font-semibold text-[color:var(--brand-black)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
        data-testid={`${testId}-cta`}
        href={href}
      >
        {ctaLabel}
      </Link>
    </section>
  );
}

export function AdminDashboardHome({ session }: AdminDashboardHomeProps) {
  useEffect(() => {
    const scrollToHashTarget = () => {
      const targetId = window.location.hash.replace(/^#/, "");

      if (!targetId) {
        return;
      }

      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  return (
    <div className="grid gap-6" data-testid="admin-dashboard-home">
      <p
        className="max-w-3xl text-sm leading-7 text-black/62"
        data-testid="admin-dashboard-summary"
      >
        Welkom terug, {session.displayName}.
      </p>

      <div className="grid gap-4 lg:grid-cols-3">
        <OverviewPanel
          body="Pas per dag de zichtbare openingstijd aan en houd de publieke openingstijden actueel."
          ctaLabel="Openingstijden bewerken"
          eyebrow="Openingstijden"
          href="/admin/content/opening-hours"
          sectionId="openingstijden"
          testId="admin-dashboard-opening-hours-panel"
          title="Dagelijkse uren"
        />
        <OverviewPanel
          body="Werk de uitgelichte smaak en de bijbehorende pairings voor deze week bij."
          ctaLabel="Smaak van de week bewerken"
          eyebrow="Smaak van de week"
          href="/admin/content/taste-of-the-week"
          sectionId="smaak-van-de-week"
          testId="admin-dashboard-featured-taste-panel"
          title="Uitgelichte smaak"
        />
        <OverviewPanel
          body="Werk hier de overige homepage-teksten bij die niet onder openingstijden of de smaak van de week vallen."
          ctaLabel="Overige content bewerken"
          eyebrow="Overig"
          href="/admin/content"
          sectionId="overig"
          testId="admin-dashboard-other-content-panel"
          title="Overige homepage-content"
        />
      </div>
    </div>
  );
}
