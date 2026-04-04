import { AuthErrorPanel } from "@/components/admin/auth-error-panel";
import { ADMIN_HOME_PATH } from "@/lib/auth/config";

interface AdminAuthErrorPageProps {
  searchParams?: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
}

export default async function AdminAuthErrorPage({ searchParams }: AdminAuthErrorPageProps) {
  const params = await searchParams;

  return (
    <AuthErrorPanel callbackUrl={params?.callbackUrl || ADMIN_HOME_PATH} error={params?.error} />
  );
}
