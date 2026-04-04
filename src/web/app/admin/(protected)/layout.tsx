import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminAccessDecision } from "@/lib/auth/admin-access";
import { getAdminNavigation } from "@/lib/auth/navigation";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessDecision = await getAdminAccessDecision("/admin");

  if (accessDecision.kind !== "authorized") {
    redirect(accessDecision.redirectTo);
  }

  const currentDateTime = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(new Date());

  return (
    <AdminShell
      currentDateTime={currentDateTime}
      navigation={getAdminNavigation()}
      session={accessDecision.sessionViewModel}
    >
      {children}
    </AdminShell>
  );
}
