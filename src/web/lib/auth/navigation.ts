import type { AdminNavItem } from "@/types/admin";

export function getAdminNavigation(): AdminNavItem[] {
  return [
    {
      href: "/admin",
      icon: "dashboard",
      label: "Overzicht",
      description: "Snelle ingang naar alle contentonderdelen",
      testId: "admin-nav-dashboard-link",
    },
    {
      href: "/admin/content/opening-hours",
      icon: "clock",
      label: "Openingstijden",
      description: "Open direct de editor voor de openingstijden",
      testId: "admin-nav-opening-hours-link",
    },
    {
      href: "/admin/content/taste-of-the-week",
      icon: "sparkles",
      label: "Smaak van de week",
      description: "Open direct de editor voor de smaak van de week",
      testId: "admin-nav-featured-taste-link",
    },
    {
      href: "/admin/content",
      icon: "stack",
      label: "Overig",
      description: "Open direct de editor voor de overige homepage-content",
      testId: "admin-nav-other-content-link",
    },
  ];
}
