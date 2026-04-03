import type { AdminSessionViewModel } from "@/types/admin";

interface AdminProfileCardProps {
  session: AdminSessionViewModel;
}

export function AdminProfileCard({ session }: AdminProfileCardProps) {
  return (
    <section
      aria-label="Ingelogd profiel"
      className="admin-shell-panel rounded-[2rem] border border-[color:var(--admin-border)] bg-[color:var(--admin-panel)] p-5"
      data-testid="admin-profile-card"
    >
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--brand-orange)] text-sm font-bold text-white"
        >
          {session.initials}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-orange)]">
            Ingelogd als
          </p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--admin-ink-strong)]">
            {session.displayName}
          </p>
          <p className="text-sm text-[color:var(--admin-ink-soft)]">{session.email}</p>
        </div>
      </div>
    </section>
  );
}
