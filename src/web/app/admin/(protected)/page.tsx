import { getAdminAccessDecision } from "@/lib/auth/admin-access";

import { AdminDashboardHome } from "@/components/admin/admin-dashboard-home";

export default async function AdminHomePage() {
  const accessDecision = await getAdminAccessDecision("/admin");

  if (accessDecision.kind !== "authorized") {
    return null;
  }

  return <AdminDashboardHome session={accessDecision.sessionViewModel} />;
}
