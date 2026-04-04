"use client";

import { useState } from "react";

import type { AdminNavItem, AdminSessionViewModel } from "@/types/admin";

import { ADMIN_SIGN_OUT_REDIRECT_PATH } from "@/lib/auth/config";

import { AdminProfileCard } from "./admin-profile-card";
import { AdminSidebar } from "./admin-sidebar";
import { SignOutButton } from "./sign-out-button";

interface AdminShellProps {
  children: React.ReactNode;
  currentDateTime: string;
  navigation: AdminNavItem[];
  session: AdminSessionViewModel;
}

function HamburgerIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 7.5h16M4 12h16M4 16.5h16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function AdminShell({
  children,
  currentDateTime,
  navigation,
  session,
}: AdminShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="admin-shell-grid min-h-screen bg-transparent">
      {isMobileSidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <AdminSidebar
            isMobile
            items={navigation}
            onClose={() => setIsMobileSidebarOpen(false)}
            onNavigate={() => setIsMobileSidebarOpen(false)}
          />
        </div>
      ) : null}

      {!isMobileSidebarOpen ? (
        <button
          aria-controls="admin-mobile-sidebar"
          aria-expanded={isMobileSidebarOpen}
          className="fixed right-4 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black shadow-[0_10px_24px_rgba(17,17,17,0.08)] lg:hidden"
          data-testid="admin-mobile-menu-button"
          type="button"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <HamburgerIcon />
        </button>
      ) : null}

      <div className="hidden lg:block">
        <AdminSidebar items={navigation} />
      </div>

      <main className="bg-transparent pb-8 lg:pb-10">
        <div className="grid gap-8">
          <header className="sticky top-0 z-20 flex min-h-[4.5rem] flex-col gap-4 border-b border-black/10 bg-[rgba(255,246,236,0.88)] px-4 py-4 backdrop-blur sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="min-w-0 flex-1">
              <div className="min-w-0 pr-14 lg:pr-0">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-black/44">
                  Admin dashboard
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-black md:text-[2rem]">
                  Overzicht
                </h2>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-3 lg:w-auto lg:flex-row lg:flex-wrap lg:items-center lg:justify-end">
              <p className="text-sm font-medium text-black/56">{currentDateTime}</p>
              <AdminProfileCard session={session} />
              <SignOutButton
                callbackUrl={ADMIN_SIGN_OUT_REDIRECT_PATH}
                className="rounded-full border border-[color:var(--brand-black)] bg-[color:var(--brand-black)] px-4 py-2 text-sm font-semibold text-white transition hover:border-[color:var(--brand-orange)] hover:bg-[color:var(--brand-orange)]"
                label="Uitloggen"
              />
            </div>
          </header>

          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
