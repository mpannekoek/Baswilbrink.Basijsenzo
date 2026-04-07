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
      href: "/admin/content",
      icon: "content",
      label: "Content",
      description: "Homepage-teksten, openingstijden en smaak van de week",
      testId: "admin-nav-content-link",
    },
  ];
}
