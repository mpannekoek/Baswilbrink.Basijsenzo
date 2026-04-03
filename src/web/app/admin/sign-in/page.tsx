import { AdminSignInPanel } from "@/components/admin/admin-sign-in-panel";
import { ADMIN_HOME_PATH } from "@/lib/auth/config";

interface AdminSignInPageProps {
  searchParams?: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
}

export default async function AdminSignInPage({ searchParams }: AdminSignInPageProps) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl || ADMIN_HOME_PATH;
  const error = params?.error;

  return <AdminSignInPanel callbackUrl={callbackUrl} error={error} />;
}
