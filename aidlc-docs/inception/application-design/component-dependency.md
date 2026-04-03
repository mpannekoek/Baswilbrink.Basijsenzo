# Component Dependency

## Dependency Summary
The admin portal uses a guarded composition model:
- global app concerns stay in the existing root application shell
- auth route handling and access control form the protected boundary
- the admin layout renders only after authentication and allowlist authorization succeed
- presentational admin components depend on mapped session data and navigation models rather than raw auth internals

## Dependency Matrix

| Component / Service | Depends On | Relationship Type | Notes |
|---|---|---|---|
| `RootLayout` | global styles, shared site metadata | Direct | Shared by public and admin routes |
| `Auth Route Handler` | `AuthConfigurationService` | Direct | Exposes provider auth endpoints |
| `AdminAccessGuard` | `AdminAccessService` | Direct | Protected-route boundary for admin rendering |
| `AdminLayout` | `AdminSidebar`, `AdminProfileCard`, `SignOutAction`, `AdminSessionViewModel`, `AdminNavItem[]` | Direct | Shared shell for authorized admin routes |
| `AdminSidebar` | `AdminNavItem[]` | Direct | First-version navigation shell |
| `AdminDashboardPage` | `AdminSessionViewModel` | Direct | Placeholder dashboard content |
| `AdminProfileCard` | `AdminSessionViewModel` | Direct | Signed-in user summary |
| `SignOutAction` | Auth.js client/server sign-out hook | Direct | Safe session exit |
| `AccessDeniedPage` | public-site links or sign-out affordance | Direct | Unauthorized outcome |
| `AuthConfigurationService` | environment-backed auth secrets and provider credentials | Service | Produces Auth.js configuration |
| `AllowedAccountService` | environment-backed allowlist configuration | Service | Produces allowlist data and auth checks |
| `AdminAccessService` | Auth.js session, `AllowedAccountService`, redirect helpers | Service | Central access decision layer |
| `AdminNavigationService` | static first-version nav definitions | Service | Produces sidebar items |
| `AdminSessionViewService` | Auth.js session | Service | Maps raw session to UI-safe model |

## Communication Pattern
- The auth route handler delegates sign-in protocol and callback work to Auth.js configuration.
- A protected admin route or admin layout invokes `AdminAccessGuard`.
- `AdminAccessGuard` relies on `AdminAccessService` to decide whether to redirect or continue.
- On success, session data is mapped into an `AdminSessionViewModel` and passed into `AdminLayout`.
- `AdminLayout` renders sidebar, profile context, sign-out affordances, and the active admin page.
- Unauthorized users are redirected to the dedicated denial route instead of seeing partial protected UI.

## Data Flow
1. A request enters `/admin`.
2. The protected-route boundary resolves the current session.
3. If no session exists, the user is redirected into Microsoft sign-in.
4. If a session exists, the allowlist is loaded from environment-backed configuration.
5. If the account is not allowlisted, the user is redirected to the access-denied page.
6. If authorized, session data is mapped into a UI view model and rendered through `AdminLayout`.
7. The dashboard page renders placeholder content inside the protected shell.

## Boundary Decisions
- Public landing-page components remain outside the admin dependency chain.
- Raw environment access should stay inside configuration/loading services rather than leaking into page components.
- Raw Auth.js session objects should not be passed throughout the UI tree unchanged.
- The first version does not introduce a database or separate backend service.
- Future admin modules should plug into the admin shell without changing the protected-route boundary pattern.
