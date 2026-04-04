"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { AdminNavItem } from "@/types/admin";

interface AdminSidebarProps {
  isMobile?: boolean;
  items: AdminNavItem[];
  onClose?: () => void;
  onNavigate?: () => void;
}

function DashboardIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4.75 5.75h6.5v5.5h-6.5zm8 0h6.5v8h-6.5zm-8 7h6.5v5.5h-6.5zm8 2.5h6.5v3h-6.5z"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ContentIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 6.75h10m-10 4.5h10m-10 4.5h6m-7.25-11h12.5a1 1 0 0 1 1 1v12.5a1 1 0 0 1-1 1H5.75a1 1 0 0 1-1-1V5.75a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function AdminNavIcon({ icon }: Pick<AdminNavItem, "icon">) {
  switch (icon) {
    case "dashboard":
      return <DashboardIcon />;
    case "content":
      return <ContentIcon />;
    default:
      return null;
  }
}

export function AdminSidebar({
  isMobile = false,
  items,
  onClose,
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`admin-shell-panel border-b border-[color:var(--admin-sidebar-border)] bg-[color:var(--admin-sidebar-bg)] px-4 py-6 text-white lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:border-r lg:border-b-0 lg:px-5 lg:py-6 ${isMobile ? "min-h-screen" : ""}`}
      id={isMobile ? "admin-mobile-sidebar" : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white text-[color:var(--brand-orange)]">
            <DashboardIcon />
          </span>
          <div>
            <p className="text-lg font-semibold text-white">Bas IJs &amp; Zo</p>
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--admin-sidebar-ink)]">
              Control portal
            </p>
          </div>
        </div>
        {isMobile ? (
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white"
            data-testid="admin-mobile-menu-close"
            type="button"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>

      <nav aria-label="Admin navigatie" className="mt-8 lg:mt-10">
        <p className="mb-3 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--admin-sidebar-ink)]">
          Main
        </p>
        <ul className="grid gap-3">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={`${item.testId}-${item.label}`}>
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center gap-3 px-2 py-2 transition ${
                    isActive ? "text-white" : "text-white hover:text-white"
                  }`}
                  data-testid={item.testId}
                  href={item.href}
                  onClick={onNavigate}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-[color:var(--brand-orange)] text-white" : "bg-transparent text-white"
                    }`}
                  >
                    <AdminNavIcon icon={item.icon} />
                  </span>
                  <span className="block min-w-0 text-sm font-semibold text-white">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={`mt-auto border-t border-white/10 pt-6 ${isMobile ? "block" : "hidden lg:block"}`}>
        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--admin-sidebar-ink)]">
          Powered by
        </p>
        <p className="mt-3 text-sm leading-6 text-white/84">
          Website gemaakt door{" "}
          <a
            className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
            href="https://martijnpannekoek.duckdns.org"
            rel="noreferrer"
            target="_blank"
          >
            Martijn Pannekoek
          </a>
          . Ook een applicatie of website nodig?
        </p>
      </div>
    </aside>
  );
}
