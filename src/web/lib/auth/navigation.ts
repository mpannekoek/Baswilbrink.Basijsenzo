import type { AdminNavItem } from "@/types/admin";

export function getAdminNavigation(): AdminNavItem[] {
  return [
    {
      href: "/admin",
      label: "Dashboard",
      description: "Startpunt voor toekomstige beheerfuncties",
      testId: "admin-nav-dashboard-link",
    },
  ];
}
