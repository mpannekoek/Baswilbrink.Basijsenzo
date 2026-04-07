import { fireEvent, render, screen } from "@testing-library/react";
import type { Session } from "next-auth";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AccessDeniedPanel } from "@/components/admin/access-denied-panel";
import { AuthErrorPanel } from "@/components/admin/auth-error-panel";
import { AdminDashboardHome } from "@/components/admin/admin-dashboard-home";
import { AdminSignInPanel } from "@/components/admin/admin-sign-in-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAllowedAccountsFromEnv, parseAllowedAccountList } from "@/lib/auth/allowed-accounts";
import { getAdminAuthErrorPath } from "@/lib/auth/config";
import { resolveAdminAccess } from "@/lib/auth/admin-access";
import { maskAuthIdentifier } from "@/lib/auth/logging";
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
        authErrorPath: getAdminAuthErrorPath("Default", "/admin"),
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
        authErrorPath: getAdminAuthErrorPath("Default", "/admin"),
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
      authErrorPath: getAdminAuthErrorPath("Default", "/admin"),
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

  it("returns an auth-error redirect when auth is unavailable", () => {
    expect(
      resolveAdminAccess({
        authErrorPath: getAdminAuthErrorPath("Configuration", "/admin"),
        session: null,
        allowedAccounts: new Set(["bas@example.com"]),
        isConfigured: false,
        signInPath: "/admin/sign-in?callbackUrl=%2Fadmin",
        accessDeniedPath: "/admin/access-denied",
      }),
    ).toEqual({
      kind: "unavailable",
      redirectTo: "/admin/auth-error?callbackUrl=%2Fadmin&error=Configuration",
    });
  });

  it("masks email addresses before they are used in auth logs", () => {
    expect(maskAuthIdentifier("Martijn.Pannekoek@example.com")).toBe("m***@example.com");
    expect(maskAuthIdentifier(null)).toBeNull();
  });

  it("renders the admin shell with navigation, profile details, and sign-out control", () => {
    const sessionViewModel = toAdminSessionViewModel(createSession("bas@example.com"));
    const navigation = getAdminNavigation();

    render(
      <AdminShell
        currentDateTime="zaterdag 4 april 2026 om 11:52"
        navigation={navigation}
        session={sessionViewModel}
      >
        <AdminDashboardHome session={sessionViewModel} />
      </AdminShell>,
    );

    expect(screen.getByTestId("admin-nav-dashboard-link")).toBeInTheDocument();
    expect(screen.getByTestId("admin-nav-opening-hours-link")).toBeInTheDocument();
    expect(screen.getByTestId("admin-nav-featured-taste-link")).toBeInTheDocument();
    expect(screen.getByTestId("admin-nav-gallery-link")).toBeInTheDocument();
    expect(screen.getByTestId("admin-nav-other-content-link")).toBeInTheDocument();
    expect(screen.queryByTestId("admin-nav-orders-link")).not.toBeInTheDocument();
    expect(screen.queryByTestId("admin-nav-analytics-link")).not.toBeInTheDocument();
    expect(screen.getByTestId("admin-profile-card")).toBeInTheDocument();
    expect(screen.getByTestId("admin-dashboard-summary")).toBeInTheDocument();
    expect(screen.getAllByTestId("admin-mobile-topbar").length).toBeGreaterThan(0);
    expect(screen.getByTestId("admin-dashboard-gallery-panel")).toBeInTheDocument();
    expect(screen.getByTestId("admin-dashboard-opening-hours-panel-cta")).toHaveAttribute(
      "href",
      "/admin/content/opening-hours",
    );
    expect(screen.getByTestId("admin-dashboard-featured-taste-panel-cta")).toHaveAttribute(
      "href",
      "/admin/content/taste-of-the-week",
    );
    expect(screen.getByTestId("admin-dashboard-other-content-panel-cta")).toHaveAttribute(
      "href",
      "/admin/content",
    );
    expect(screen.getByTestId("admin-dashboard-gallery-panel-cta")).toHaveAttribute(
      "href",
      "/admin/content/gallery",
    );
    expect(screen.getByTestId("admin-signout-button")).toBeInTheDocument();
    expect(navigation[1]).toMatchObject({
      href: "/admin/content/opening-hours",
      testId: "admin-nav-opening-hours-link",
    });
    expect(navigation[2]).toMatchObject({
      href: "/admin/content/taste-of-the-week",
      testId: "admin-nav-featured-taste-link",
    });
    expect(navigation[3]).toMatchObject({
      href: "/admin/content/gallery",
      testId: "admin-nav-gallery-link",
    });
    expect(navigation[4]).toMatchObject({
      href: "/admin/content",
      testId: "admin-nav-other-content-link",
    });
  });

  it("opens the sidebar as a full mobile menu", () => {
    const sessionViewModel = toAdminSessionViewModel(createSession("bas@example.com"));

    render(
      <AdminShell
        currentDateTime="zaterdag 4 april 2026 om 11:52"
        navigation={getAdminNavigation()}
        session={sessionViewModel}
      >
        <AdminDashboardHome session={sessionViewModel} />
      </AdminShell>,
    );

    expect(screen.getAllByTestId("admin-mobile-topbar").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Overzicht").length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByTestId("admin-mobile-menu-button")[0]);

    expect(screen.getByTestId("admin-mobile-menu-close")).toBeInTheDocument();
    expect(screen.getAllByTestId("admin-nav-dashboard-link").length).toBeGreaterThan(0);
  });

  it("renders the access-denied panel with safe actions", () => {
    render(<AccessDeniedPanel />);

    expect(screen.getByTestId("admin-access-denied-panel")).toBeInTheDocument();
    expect(screen.getByTestId("access-denied-home-link")).toHaveAttribute("href", "/");

    fireEvent.click(screen.getByTestId("access-denied-signout-button"));

    expect(signOutMock).toHaveBeenCalledWith({ callbackUrl: "http://localhost:3000/" });
  });

  it("renders the auth-error panel with retry guidance", () => {
    render(<AuthErrorPanel callbackUrl="/admin" error="Configuration" />);

    expect(screen.getByTestId("admin-auth-error-panel")).toBeInTheDocument();
    expect(screen.getByTestId("auth-error-retry-link")).toHaveAttribute(
      "href",
      "/admin/sign-in?callbackUrl=%2Fadmin",
    );
    expect(screen.getByTestId("auth-error-home-link")).toHaveAttribute("href", "/");
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
