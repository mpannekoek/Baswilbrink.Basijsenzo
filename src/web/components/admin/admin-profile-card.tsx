import type { AdminSessionViewModel } from "@/types/admin";

interface AdminProfileCardProps {
  session: AdminSessionViewModel;
}

export function AdminProfileCard({ session }: AdminProfileCardProps) {
  return (
    <section
      aria-label="Ingelogd profiel"
      className="flex w-full min-w-0 items-center gap-3 lg:w-auto"
      data-testid="admin-profile-card"
    >
      <div
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--brand-orange)] bg-[color:var(--brand-orange)] text-xs font-bold text-white"
      >
        {session.initials}
      </div>
      <div className="min-w-0">
        <p className="break-words text-sm font-semibold text-black">
          {session.displayName}
        </p>
        <p className="break-all text-xs text-black/56">{session.email}</p>
      </div>
    </section>
  );
}
