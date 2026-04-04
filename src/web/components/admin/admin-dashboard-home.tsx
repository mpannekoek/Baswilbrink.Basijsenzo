import type { AdminSessionViewModel } from "@/types/admin";

interface AdminDashboardHomeProps {
  session: AdminSessionViewModel;
}

export function AdminDashboardHome({ session }: AdminDashboardHomeProps) {
  return (
    <div data-testid="admin-dashboard-home">
      <p
        className="max-w-3xl text-sm leading-7 text-black/62"
        data-testid="admin-dashboard-summary"
      >
        Welkom terug, {session.displayName}.
      </p>
    </div>
  );
}
