export interface AdminNavItem {
  href: string;
  icon: "clock" | "dashboard" | "sparkles" | "stack";
  label: string;
  description: string;
  testId: string;
}

export interface AdminSessionViewModel {
  displayName: string;
  email: string;
  image: string | null;
  initials: string;
}
