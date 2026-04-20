"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { AdminNavItem } from "@/types/admin";

interface AdminSidebarProps {
  isMobile?: boolean;
  items: AdminNavItem[];
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

function ClockIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8.75v3.75l2.75 1.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 4.5 13.4 9l4.6 1.4-4.6 1.4L12 16.3l-1.4-4.5L6 10.4 10.6 9 12 4.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="m18.5 4.5.55 1.8 1.8.55-1.8.55-.55 1.8-.55-1.8-1.8-.55 1.8-.55.55-1.8ZM6 15.25l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4.75 8.25 12 4.75l7.25 3.5L12 11.75l-7.25-3.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M6.75 12 12 14.5 17.25 12M6.75 15.75 12 18.25l5.25-2.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ImagesIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <rect x="4.75" y="6.25" width="10.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m7.5 14.5 2.8-3 2.4 2.4 1.8-1.9 2.75 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17 8.75h1.25a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1H9.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <circle cx="10.25" cy="9.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function AdminNavIcon({ icon }: Pick<AdminNavItem, "icon">) {
  switch (icon) {
    case "dashboard":
      return <DashboardIcon />;
    case "clock":
      return <ClockIcon />;
    case "sparkles":
      return <SparklesIcon />;
    case "stack":
      return <StackIcon />;
    case "images":
      return <ImagesIcon />;
    default:
      return <ContentIcon />;
  }
}

export function AdminSidebar({
  isMobile = false,
  items,
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setCurrentHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  return (
    <aside
      className={`admin-shell-panel flex flex-col border-b border-[color:var(--admin-sidebar-border)] bg-[color:var(--admin-sidebar-bg)] px-4 py-6 text-white lg:sticky lg:top-0 lg:min-h-screen lg:border-r lg:border-b-0 lg:px-5 lg:py-6 ${isMobile ? "min-h-screen pt-[5.5rem]" : ""}`}
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
      </div>

      <nav aria-label="Admin navigatie" className="mt-8 lg:mt-10">
        <p className="mb-3 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--admin-sidebar-ink)]">
          Main
        </p>
        <ul className="grid gap-3">
          {items.map((item) => {
            const [itemPathname, itemHash = ""] = item.href.split("#");
            const normalizedItemHash = itemHash ? `#${itemHash}` : "";
            const isActive =
              pathname === itemPathname &&
              (normalizedItemHash ? currentHash === normalizedItemHash : currentHash === "");

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
            href="https://martijnpannekoek.nl"
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
