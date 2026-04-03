# Component Methods

## Note
These method signatures describe high-level component and orchestration interfaces for the first admin slice. Detailed business rules remain intentionally lightweight because the current workflow skips a separate Functional Design stage.

## RootLayout
- `function RootLayout(props: { children: React.ReactNode }): JSX.Element`
  - Provide the global document shell for both public and protected routes.

## Auth Route Handler
- `export const GET = authHandler`
- `export const POST = authHandler`
  - Delegate provider auth flow and callback handling to the Auth.js runtime.

## AdminAccessGuard
- `async function AdminAccessGuard(props: { children: React.ReactNode }): Promise<JSX.Element>`
  - Resolve the current session, enforce authentication and allowlist authorization, and either render children or redirect.

## AdminLayout
- `function AdminLayout(props: { children: React.ReactNode; session: AdminSessionViewModel; navigation: AdminNavItem[] }): JSX.Element`
  - Render the shared admin shell with sidebar, profile context, and content region.

## AdminSidebar
- `function AdminSidebar(props: { items: AdminNavItem[]; currentPath?: string }): JSX.Element`
  - Render the first-version sidebar navigation and active-route affordances.

## AdminDashboardPage
- `function AdminDashboardPage(props: { session: AdminSessionViewModel }): JSX.Element`
  - Render the placeholder dashboard content for the signed-in admin user.

## AdminProfileCard
- `function AdminProfileCard(props: { session: AdminSessionViewModel }): JSX.Element`
  - Render the signed-in user summary and welcome context.

## SignOutAction
- `function SignOutAction(props: { callbackUrl?: string }): JSX.Element`
  - Trigger Auth.js sign-out and return the user to a safe destination.

## AccessDeniedPage
- `function AccessDeniedPage(): JSX.Element`
  - Render the dedicated unauthorized-access outcome.

## Service / Factory Methods

### Auth Configuration Factory
- `function createAuthConfig(): AuthConfig`
  - Build the Auth.js configuration, provider wiring, session behavior, and callbacks.

### Allowed Accounts Loader
- `function getAllowedAccounts(): AllowedAccountConfig`
  - Load the configured allowlist from environment-backed configuration.

### Authorization Evaluator
- `function isAllowedAdminAccount(input: { email?: string | null }): boolean`
  - Determine whether the signed-in Microsoft account is permitted to access the portal.

### Admin Navigation Factory
- `function getAdminNavigation(): AdminNavItem[]`
  - Return the first-version sidebar navigation model.

### Session ViewModel Mapper
- `function toAdminSessionViewModel(session: AuthSession): AdminSessionViewModel`
  - Map raw Auth.js session data into UI-safe admin-session props.
