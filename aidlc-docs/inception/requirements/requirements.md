# Requirements Document

## Intent Analysis Summary
- **User Request**: Add an authenticated admin portal at `/admin` to the existing Bas IJs & Zo site using Auth.js with direct Microsoft login for personal Microsoft accounts only, enforce an allowlist of permitted accounts, show an access-denied page for unauthorized users, and provide a starter dashboard shell for later expansion.
- **Request Type**: New Feature
- **Scope Estimate**: Multiple components across routing, authentication, authorization, protected layout, and admin UI shell
- **Complexity Estimate**: Complex
- **Requirements Depth**: Standard

## Product Goal
Extend the existing public landing-page application with a protected internal admin area that gives allowed Bas IJs & Zo operators a secure starting point for future portal functionality. The first version should establish the authentication and authorization boundary, a clear denial path for unauthorized accounts, and a dashboard-style interface that can be expanded in later stages.

## Brownfield Context
- The existing application is a Next.js site with one public landing page in `src/web`.
- The new `/admin` functionality must coexist with the existing public experience without regressing the public landing page.
- The admin feature should reuse the current technical foundation where sensible, but introduce clear separation between public and protected areas.

## Primary Users
- **Allowed admin users**: Specific Microsoft personal-account holders who are permitted to access the portal.
- **Unauthorized Microsoft users**: Users who can complete Microsoft sign-in but are not on the configured allowlist and must be denied.
- **Public site visitors**: Indirectly affected users who must continue to experience the public landing page unchanged.

## Confirmed Decisions
- Use Auth.js for authentication.
- Use Microsoft login directly as the only sign-in method for the first version.
- Support Microsoft personal accounts only.
- Maintain the allowed-account list through environment variables or configuration in the first version rather than a database.
- Redirect unauthenticated visitors to the Microsoft sign-in flow when they request `/admin`.
- Redirect authenticated but unauthorized users to a dedicated access-denied page.
- Use standard Auth.js session handling with secure defaults for the first version.
- The initial admin dashboard should include:
  - a left sidebar
  - one dummy navigation item
  - a dummy content area
  - basic signed-in profile information
  - a sign-out control and small welcome summary
- The admin area should reuse the existing brand colors, but adopt a more restrained dashboard-style visual language.
- Delivery expectation for this workflow is to plan and implement the first admin slice now if scope remains reasonable.

## Functional Requirements

### FR-1: Protected Admin Entry Point
- The application must expose a protected route at `/admin`.
- Requests to `/admin` and any protected admin child routes must enforce authentication before showing protected content.
- Unauthenticated requests to the protected admin area must redirect into the Microsoft sign-in flow.

### FR-2: Authentication Provider
- The first version must use Auth.js as the authentication framework.
- The only supported provider for the first version must be Microsoft.
- The implementation must be configured specifically for Microsoft personal accounts only.
- The system must not expose alternative sign-in methods in the first version.

### FR-3: Authorization Allowlist
- The application must contain logic that determines whether the signed-in Microsoft account is allowed to access the admin portal.
- The first version must source the allowlist from configuration or environment variables rather than a persistent data store.
- Authorization must be enforced server-side before protected admin content is rendered.
- Users who authenticate successfully but are not allowlisted must not be able to access the protected admin area.

### FR-4: Access Denied Flow
- The application must provide a dedicated access-denied page for users who are authenticated but not authorized.
- The access-denied experience must clearly communicate that sign-in succeeded but access is not permitted.
- The access-denied page must offer a safe next action such as signing out or returning to the public site.

### FR-5: Admin Dashboard Shell
- The `/admin` area must render a dashboard-style layout.
- The layout must include a left sidebar navigation region.
- The sidebar must include one dummy navigation item for the first version.
- The main content region must render a dummy placeholder page or panel on the right.
- The layout must be structured so additional admin routes and modules can be added later without redesigning the shell.

### FR-6: Signed-In User Context
- The initial admin dashboard must show basic profile information for the signed-in user.
- The initial admin dashboard must show a welcome summary or equivalent orientation text.
- The admin area must provide a sign-out control.

### FR-7: Visual Direction
- The admin area should visually relate to the existing Bas IJs & Zo brand.
- The admin interface should reuse the black/orange brand anchors where appropriate.
- The dashboard should use a more restrained and utility-oriented style than the public marketing page.
- The admin interface must prioritize clarity and usability over decorative presentation.

### FR-8: Brownfield Safety
- The existing public landing page at `/` must remain intact and functional.
- New admin functionality must not break the current public routing, content rendering, or responsive behavior.
- The admin feature must fit the current `src/web` application structure rather than introducing a separate application.

## User Experience Requirements
- Admin users should understand quickly whether they are signed in, denied, or successfully inside the dashboard.
- The admin area should feel clearly distinct from the public marketing surface while still belonging to the same brand family.
- The sidebar and content area should remain usable on desktop and reasonable on smaller screens.
- Access-denied messaging should be direct and non-confusing.

## Technical Requirements
- The implementation must remain within the existing Next.js application in `src/web`.
- The solution should follow current App Router conventions for protected routes, auth endpoints, and layout composition.
- Auth configuration and secrets must be sourced from environment variables rather than hardcoded credentials.
- The allowlist must be configurable without modifying component markup.
- The admin shell should be organized so future portal modules can be added through route expansion or nested layouts.
- The implementation should preserve the current Docker-based deployment approach.
- The implementation should preserve compatibility with the existing lint, test, and build setup.

## Non-Functional Requirements

### NFR-1: Security
- Authentication and authorization checks must be treated as blocking gates to admin content.
- Session handling must use secure defaults suitable for a protected internal portal.
- Unauthorized users must be denied consistently and predictably.

### NFR-2: Maintainability
- The auth setup, allowlist logic, and admin layout should be separated cleanly so they can evolve later.
- The first version should create a clear foundation for future portal capabilities rather than a throwaway scaffold.

### NFR-3: Extensibility
- Future admin routes and modules should be addable without redesigning the base shell.
- The first version should make it straightforward to replace configuration-based allowlists with persistent data later if needed.

### NFR-4: Usability
- The admin shell must be immediately understandable.
- The sign-in and denial flows must minimize ambiguity for both allowed and disallowed users.

### NFR-5: Brownfield Reliability
- The feature must integrate safely with the existing public site and should not degrade the current visitor experience.

## Security Requirements Derived From Enabled Extension
- **SECURITY-04**: All HTML-serving admin routes must continue to emit the required HTTP security headers.
- **SECURITY-08**: The admin area must enforce authentication and server-side authorization on every protected route.
- **SECURITY-11**: The design must continue to consider abuse scenarios for the public entrypoint and the new admin entry path.
- **SECURITY-12**: Authentication configuration must avoid hardcoded credentials, use secure session behavior, and handle sign-in/logout safely.
- **SECURITY-10**: Any added dependencies or auth-related tooling must remain pinned through the committed lockfile.
- **SECURITY-09**: Production behavior must not leak sensitive internal auth or authorization details to end users beyond the intended access-denied message.
- **SECURITY-01, SECURITY-02, SECURITY-05, SECURITY-06, SECURITY-07**: Not currently in scope unless later stages add persistent storage, custom APIs, infrastructure resources, or network-policy definitions.

## Assumptions
- Microsoft provider credentials and related Auth.js secrets will be supplied through environment variables.
- The first version does not require a database.
- The allowlist size is small enough for configuration-based management initially.
- The first version establishes portal structure only; real admin business logic will be added later.

## Success Criteria
- Allowed Microsoft personal-account users can sign in and reach `/admin`.
- Non-allowlisted Microsoft users are redirected to a dedicated access-denied page.
- Unauthenticated users requesting `/admin` are sent into the sign-in flow.
- The `/admin` area renders a usable dashboard shell with sidebar, dummy navigation, dummy content, signed-in user context, and sign-out control.
- The public landing page remains functional and visually intact.
