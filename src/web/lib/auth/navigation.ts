import type { AdminNavItem } from "@/types/admin";

export function getAdminNavigation(): AdminNavItem[] {
  return [
    {
      href: "/admin",
      icon: "dashboard",
      label: "Overzicht",
      description: "Realtime status en kerncijfers",
      testId: "admin-nav-dashboard-link",
    },
    {
      href: "/admin",
      icon: "content",
      label: "Content",
      description: "Pagina-inhoud en publicatiestatus",
      testId: "admin-nav-content-link",
    },
  ];
}
