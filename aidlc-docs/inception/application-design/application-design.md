# Application Design

## Summary
The Bas IJs & Zo site remains a single Next.js application rooted in `src/web`, but now grows into a mixed public/protected application. The new design introduces a protected `/admin` boundary based on Auth.js, Microsoft personal-account login, environment-backed allowlist authorization, a dedicated access-denied outcome, and a lightweight dashboard shell that later portal capabilities can extend.

## Core Design Decisions
- Keep `src/web` as the sole application boundary; do not create a second app for admin functionality.
- Use App Router-compatible Auth.js route handling for sign-in and callback flow.
- Keep authentication, authorization, and UI-shell concerns separated instead of mixing them into page components.
- Enforce protected-route access before any admin layout or page content is rendered.
- Load allowlisted account identifiers from environment-backed configuration in the first version.
- Map raw session data into a dedicated admin-session view model before passing it to presentational components.
- Treat the dashboard as a foundation shell, not as the place to prematurely implement later admin business logic.
- Keep the admin visual language aligned with the existing brand, but more restrained and utility-oriented than the public marketing page.

## Main Components
- `RootLayout`: shared global shell across public and admin routes
- `Auth Route Handler`: Auth.js entrypoint for Microsoft sign-in flow
- `AdminAccessGuard`: protected-route boundary enforcing auth and allowlist checks
- `AdminLayout`: shared admin shell
- `AdminSidebar`: left navigation region with one dummy item
- `AdminDashboardPage`: first placeholder dashboard content page
- `AdminProfileCard`: signed-in user summary
- `SignOutAction`: safe sign-out affordance
- `AccessDeniedPage`: dedicated unauthorized-access outcome

## Service Layer
- `AuthConfigurationService`: Auth.js provider and session configuration
- `AllowedAccountService`: allowlist loading and account authorization checks
- `AdminAccessService`: protected-route orchestration and redirect decisions
- `AdminNavigationService`: first-version sidebar navigation model
- `AdminSessionViewService`: mapping of raw session data into UI-ready admin context

## Dependency Model
- Public-site routes continue to depend on the existing landing-page composition.
- Admin routes depend first on the protected access boundary, then on admin-layout composition.
- Configuration and authorization logic stay in thin services/factories rather than leaking into presentational components.
- The admin layout depends on mapped session data and static navigation models.
- The current Docker/test/build setup remains a shared application-level concern rather than becoming admin-specific infrastructure.

## Why This Design Fits
- It introduces a secure admin boundary without fragmenting the existing codebase.
- It keeps the first portal slice intentionally lightweight while still making future growth straightforward.
- It preserves brownfield safety by minimizing disruption to the public site.
- It gives the upcoming NFR and code-generation stages clear component and service boundaries for auth-sensitive work.
