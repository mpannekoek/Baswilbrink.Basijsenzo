import type { AdminNavItem, AdminSessionViewModel } from "@/types/admin";

import { ADMIN_SIGN_OUT_REDIRECT_PATH } from "@/lib/auth/config";

import { AdminProfileCard } from "./admin-profile-card";
import { AdminSidebar } from "./admin-sidebar";
import { SignOutButton } from "./sign-out-button";

interface AdminShellProps {
  children: React.ReactNode;
  navigation: AdminNavItem[];
  session: AdminSessionViewModel;
}

export function AdminShell({ children, navigation, session }: AdminShellProps) {
  return (
    <div className="admin-shell-grid min-h-screen bg-[color:var(--admin-background)]">
      <AdminSidebar items={navigation} />

      <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto grid max-w-6xl gap-6">
          <header className="flex flex-col gap-4 rounded-[2rem] border border-[color:var(--admin-border)] bg-[color:var(--admin-panel)] p-5 shadow-[0_20px_50px_rgba(17,17,17,0.08)] lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)]">
                Beheeromgeving
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[color:var(--admin-ink-strong)]">
                Overzicht
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--admin-ink-soft)]">
                De publieke landingspagina blijft ongemoeid, terwijl deze omgeving de afgeschermde
                basis legt voor toekomstige interne functies.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <AdminProfileCard session={session} />
              <SignOutButton
                callbackUrl={ADMIN_SIGN_OUT_REDIRECT_PATH}
                className="rounded-full bg-[color:var(--brand-black)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-orange)]"
              />
            </div>
          </header>

          {children}
        </div>
      </main>
    </div>
  );
}
