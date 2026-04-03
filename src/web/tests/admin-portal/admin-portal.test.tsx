import { fireEvent, render, screen } from "@testing-library/react";
import type { Session } from "next-auth";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AccessDeniedPanel } from "@/components/admin/access-denied-panel";
import { AdminDashboardHome } from "@/components/admin/admin-dashboard-home";
import { AdminSignInPanel } from "@/components/admin/admin-sign-in-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAllowedAccountsFromEnv, parseAllowedAccountList } from "@/lib/auth/allowed-accounts";
import { resolveAdminAccess } from "@/lib/auth/admin-access";
import { getAdminNavigation } from "@/lib/auth/navigation";
import { toAdminSessionViewModel } from "@/lib/auth/session";

const signInMock = vi.fn();
const signOutMock = vi.fn();

vi.mock("next-auth/react", () => ({
  signIn: (...args: unknown[]) => signInMock(...args),
  signOut: (...args: unknown[]) => signOutMock(...args),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

function createSession(email: string | null): Session {
  return {
    expires: "2099-01-01T00:00:00.000Z",
    user: {
      email,
      image: null,
      name: "Beheerder Britt",
    },
  };
}

describe("admin portal helpers and components", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    signInMock.mockReset();
    signOutMock.mockReset();
  });

  it("parses and normalizes the configured allowlist", () => {
    expect(parseAllowedAccountList(" Bas@Example.com,\nadmin@example.com ; owner@example.com ")).toEqual(
      ["bas@example.com", "admin@example.com", "owner@example.com"],
    );

    expect(Array.from(getAllowedAccountsFromEnv("Bas@example.com bas@example.com"))).toEqual([
      "bas@example.com",
    ]);
  });

  it("returns a sign-in redirect for unauthenticated access", () => {
    expect(
      resolveAdminAccess({
        session: null,
        allowedAccounts: new Set(["bas@example.com"]),
        isConfigured: true,
        signInPath: "/admin/sign-in?callbackUrl=%2Fadmin",
        accessDeniedPath: "/admin/access-denied",
      }),
    ).toEqual({
      kind: "unauthenticated",
      redirectTo: "/admin/sign-in?callbackUrl=%2Fadmin",
    });
  });

  it("returns an access-denied redirect for non-allowlisted accounts", () => {
    expect(
      resolveAdminAccess({
        session: createSession("visitor@example.com"),
        allowedAccounts: new Set(["bas@example.com"]),
        isConfigured: true,
        signInPath: "/admin/sign-in?callbackUrl=%2Fadmin",
        accessDeniedPath: "/admin/access-denied",
      }),
    ).toEqual({
      kind: "unauthorized",
      redirectTo: "/admin/access-denied",
    });
  });

  it("returns an authorized view model for allowlisted accounts", () => {
    const decision = resolveAdminAccess({
      session: createSession("bas@example.com"),
      allowedAccounts: new Set(["bas@example.com"]),
      isConfigured: true,
      signInPath: "/admin/sign-in?callbackUrl=%2Fadmin",
      accessDeniedPath: "/admin/access-denied",
    });

    expect(decision.kind).toBe("authorized");

    if (decision.kind === "authorized") {
      expect(decision.sessionViewModel.email).toBe("bas@example.com");
      expect(decision.sessionViewModel.displayName).toBe("Beheerder Britt");
    }
  });

  it("renders the admin shell with navigation, profile details, and sign-out control", () => {
    const sessionViewModel = toAdminSessionViewModel(createSession("bas@example.com"));

    render(
      <AdminShell navigation={getAdminNavigation()} session={sessionViewModel}>
        <AdminDashboardHome session={sessionViewModel} />
      </AdminShell>,
    );

    expect(screen.getByTestId("admin-nav-dashboard-link")).toBeInTheDocument();
    expect(screen.getByTestId("admin-profile-card")).toBeInTheDocument();
    expect(screen.getByTestId("admin-dashboard-summary")).toBeInTheDocument();
    expect(screen.getByTestId("admin-signout-button")).toBeInTheDocument();
  });

  it("renders the access-denied panel with safe actions", () => {
    render(<AccessDeniedPanel />);

    expect(screen.getByTestId("admin-access-denied-panel")).toBeInTheDocument();
    expect(screen.getByTestId("access-denied-home-link")).toHaveAttribute("href", "/");

    fireEvent.click(screen.getByTestId("access-denied-signout-button"));

    expect(signOutMock).toHaveBeenCalledWith({ callbackUrl: "/" });
  });

  it("renders the custom admin sign-in page and starts Microsoft sign-in", () => {
    render(<AdminSignInPanel callbackUrl="/admin" />);

    expect(screen.getByTestId("admin-signin-button")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("admin-signin-button"));

    expect(signInMock).toHaveBeenCalledWith("azure-ad", { callbackUrl: "/admin" });
  });

  it("shows the custom sign-in page error state for callback failures", () => {
    render(<AdminSignInPanel callbackUrl="/admin" error="Callback" />);

    expect(screen.getByTestId("admin-signin-error")).toBeInTheDocument();
  });
});
