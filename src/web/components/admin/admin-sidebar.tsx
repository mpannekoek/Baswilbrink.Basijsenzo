import Link from "next/link";

import type { AdminNavItem } from "@/types/admin";

interface AdminSidebarProps {
  items: AdminNavItem[];
}

export function AdminSidebar({ items }: AdminSidebarProps) {
  return (
    <aside className="admin-shell-panel border-b border-[color:var(--admin-border)] bg-[color:var(--admin-panel-strong)] p-6 lg:min-h-screen lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between gap-4 lg:block">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)]">
            Bas IJs &amp; Zo
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-[color:var(--admin-ink-strong)]">
            Admin portal
          </h1>
          <p className="mt-2 max-w-48 text-sm leading-6 text-[color:var(--admin-ink-soft)]">
            Interne toegang voor het eerste beheerdersportaal.
          </p>
        </div>
      </div>

      <nav aria-label="Admin navigatie" className="mt-8">
        <ul className="grid gap-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                className="group block rounded-3xl border border-[color:var(--admin-border)] bg-[color:var(--admin-panel)] px-4 py-4 transition hover:-translate-y-0.5 hover:border-[color:var(--brand-orange)] hover:shadow-[0_18px_40px_rgba(17,17,17,0.08)]"
                data-testid={item.testId}
                href={item.href}
              >
                <span className="block text-sm font-semibold text-[color:var(--admin-ink-strong)]">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm text-[color:var(--admin-ink-soft)]">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
