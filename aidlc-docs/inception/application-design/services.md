# Services

## Service Philosophy
The admin portal does not require a traditional backend domain layer in the first version, but it does require a clear application-service layer for authentication, authorization, configuration loading, and admin-shell composition. These services should stay thin and focused on orchestration rather than business-domain complexity.

## Service 1: AuthConfigurationService
- **Purpose**: Centralize Auth.js configuration and provider wiring.
- **Responsibilities**:
  - Configure the Microsoft provider
  - Apply secure session defaults suitable for the first admin slice
  - Define callback behavior needed for authorization-aware session handling
  - Keep provider credentials sourced from environment variables
- **Inputs**:
  - Environment-backed auth secrets and Microsoft provider credentials
- **Outputs**:
  - Auth.js configuration object

## Service 2: AllowedAccountService
- **Purpose**: Resolve and interpret which Microsoft accounts are permitted to use the portal.
- **Responsibilities**:
  - Load allowlisted account identifiers from environment-backed configuration
  - Normalize account identifiers for reliable comparisons
  - Expose a simple authorization decision function to the route guard
- **Inputs**:
  - Environment-backed allowlist configuration
- **Outputs**:
  - `AllowedAccountConfig`
  - authorization decision helpers

## Service 3: AdminAccessService
- **Purpose**: Orchestrate protected-route access decisions.
- **Responsibilities**:
  - Read the current session
  - Distinguish between unauthenticated and unauthorized states
  - Redirect unauthenticated users to sign-in
  - Redirect disallowed users to the access-denied page
  - Produce authorized session data for the admin shell
- **Inputs**:
  - Auth.js session
  - allowlist data
  - route context
- **Outputs**:
  - access decisions
  - redirect destinations
  - authorized admin-session view model

## Service 4: AdminNavigationService
- **Purpose**: Provide the sidebar navigation model for the admin shell.
- **Responsibilities**:
  - Define the first dummy navigation item
  - Keep navigation generation independent from layout rendering
  - Support future expansion to multiple admin modules
- **Inputs**:
  - Static first-version navigation definitions
- **Outputs**:
  - `AdminNavItem[]`

## Service 5: AdminSessionViewService
- **Purpose**: Convert session data into safe, presentation-ready admin UI data.
- **Responsibilities**:
  - Select the profile fields needed by the admin layout
  - Keep raw auth/session structures out of presentational components
  - Support future enrichment without coupling components to Auth.js internals
- **Inputs**:
  - Auth.js session object
- **Outputs**:
  - `AdminSessionViewModel`

## Orchestration Pattern
- Auth.js handles provider protocol and session lifecycle.
- `AdminAccessService` sits at the protected-route boundary and decides whether to redirect or render.
- `AllowedAccountService` supplies the authorization rule used by the access layer.
- `AdminSessionViewService` adapts raw session data for UI consumption.
- `AdminLayout` and its child components remain mostly presentational once access control is satisfied.
