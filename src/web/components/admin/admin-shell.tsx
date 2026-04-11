"use client";

import { useState } from "react";

import Link from "next/link";

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

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="m6 6 12 12M18 6 6 18"
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
            onNavigate={() => setIsMobileSidebarOpen(false)}
          />
        </div>
      ) : null}

      <div className="hidden lg:block">
        <AdminSidebar items={navigation} />
      </div>

      <main className="bg-transparent pb-8 lg:pb-10">
        <div className="grid gap-0 lg:gap-8">
          <div
            className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[color:var(--admin-sidebar-bg)] px-4 py-4 text-white shadow-[0_10px_24px_rgba(17,17,17,0.22)] sm:px-6 lg:hidden"
            data-testid="admin-mobile-topbar"
          >
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-white">Bas IJs &amp; Zo</p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/56">
                Control portal
              </p>
            </div>
          </div>

          <button
            aria-controls="admin-mobile-sidebar"
            aria-expanded={isMobileSidebarOpen}
            className="fixed right-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white lg:hidden"
            data-testid={isMobileSidebarOpen ? "admin-mobile-menu-close" : "admin-mobile-menu-button"}
            type="button"
            onClick={() => setIsMobileSidebarOpen((current) => !current)}
          >
            {isMobileSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>

          <header className="sticky top-[4.625rem] z-20 flex min-h-[4.5rem] flex-col gap-4 border-b border-black/10 bg-[rgba(255,246,236,0.94)] px-4 py-4 backdrop-blur sm:px-6 lg:top-0 lg:z-20 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="min-w-0 flex-1">
              <div className="min-w-0">
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
              <AdminProfileCard
                action={
                  <div className="flex items-center gap-2">
                    <Link
                      className="rounded-full border border-[color:var(--brand-orange)] px-4 py-2 text-sm font-semibold text-[color:var(--brand-orange)] transition hover:bg-[color:var(--brand-orange)] hover:text-white"
                      data-testid="admin-open-homepage-link"
                      href="/"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Bekijk site
                    </Link>
                    <SignOutButton
                      callbackUrl={ADMIN_SIGN_OUT_REDIRECT_PATH}
                      className="rounded-full border border-[color:var(--brand-black)] bg-[color:var(--brand-black)] px-4 py-2 text-sm font-semibold text-white transition hover:border-[color:var(--brand-orange)] hover:bg-[color:var(--brand-orange)]"
                      label="Uitloggen"
                    />
                  </div>
                }
                session={session}
              />
            </div>
          </header>

          <div className="px-4 pt-6 sm:px-6 lg:px-8 lg:pt-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
