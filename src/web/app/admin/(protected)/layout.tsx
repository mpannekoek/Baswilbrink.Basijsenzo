import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminAccessDecision } from "@/lib/auth/admin-access";
import { getAdminNavigation } from "@/lib/auth/navigation";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessDecision = await getAdminAccessDecision();

  if (accessDecision.kind !== "authorized") {
    redirect(accessDecision.redirectTo);
  }

  return (
    <AdminShell navigation={getAdminNavigation()} session={accessDecision.sessionViewModel}>
      {children}
    </AdminShell>
  );
}
