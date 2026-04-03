# Components

## Design Scope
This design extends the existing `src/web` Next.js application with a protected admin area rooted at `/admin`. The component model separates public-site concerns from authentication, authorization, and dashboard-shell concerns while keeping the first portal slice intentionally lightweight.

## Component 1: RootLayout
- **Purpose**: Provide the global app shell, document structure, fonts, and shared site-wide configuration.
- **Responsibilities**:
  - Keep global site concerns shared between public and admin routes
  - Expose metadata and common visual tokens
  - Remain agnostic to admin-specific business logic
- **Interface**:
  - `children: React.ReactNode`

## Component 2: Auth Route Handler
- **Purpose**: Expose Auth.js route handling within the App Router.
- **Responsibilities**:
  - Handle Microsoft sign-in and callback processing
  - Delegate provider/session behavior to Auth.js configuration
  - Keep provider wiring out of page components
- **Interface**:
  - HTTP GET/POST handler interface as required by Auth.js

## Component 3: AdminAccessGuard
- **Purpose**: Protect `/admin` routes by enforcing authentication and allowlist authorization before rendering protected content.
- **Responsibilities**:
  - Detect whether a session exists
  - Redirect unauthenticated users into the sign-in flow
  - Redirect unauthorized authenticated users to the access-denied page
  - Allow authorized users to proceed to the admin layout
- **Interface**:
  - `children: React.ReactNode`
  - Optional route-context inputs if nested layouts require them

## Component 4: AdminLayout
- **Purpose**: Provide the shared layout frame for the admin area.
- **Responsibilities**:
  - Render the sidebar region and content region
  - Surface signed-in context such as profile details and welcome summary
  - Provide a consistent place for sign-out controls
  - Support future nested admin routes without redesigning the shell
- **Interface**:
  - `children: React.ReactNode`
  - `session: AdminSessionViewModel`
  - `navigation: AdminNavItem[]`

## Component 5: AdminSidebar
- **Purpose**: Render the left-side admin navigation shell.
- **Responsibilities**:
  - Display one dummy navigation item in the first version
  - Present branding cues suitable for an admin context
  - Support later navigation expansion
- **Interface**:
  - `items: AdminNavItem[]`
  - `currentPath?: string`

## Component 6: AdminDashboardPage
- **Purpose**: Render the first admin landing page at `/admin`.
- **Responsibilities**:
  - Show the lightweight placeholder content area
  - Reinforce that the user has entered the protected portal successfully
  - Avoid implementing deferred business functionality
- **Interface**:
  - `session: AdminSessionViewModel`

## Component 7: AdminProfileCard
- **Purpose**: Show the signed-in user’s basic profile information and welcome summary.
- **Responsibilities**:
  - Surface display name, email, or equivalent profile fields
  - Confirm which account is currently active
  - Support future enrichment if more admin context is needed
- **Interface**:
  - `session: AdminSessionViewModel`

## Component 8: SignOutAction
- **Purpose**: Provide a safe exit control for the admin area.
- **Responsibilities**:
  - Trigger sign-out through Auth.js
  - Return the user to a sensible public or signed-out destination
- **Interface**:
  - `callbackUrl?: string`

## Component 9: AccessDeniedPage
- **Purpose**: Present a dedicated denial outcome for authenticated but unauthorized users.
- **Responsibilities**:
  - Explain that sign-in succeeded but access is not permitted
  - Avoid exposing internal authorization details
  - Provide a safe next action such as sign-out or return to the public site
- **Interface**:
  - Optional presentational props if copy is later externalized

## Supporting Non-Visual Structures

### AdminNavItem
- **Purpose**: Represent admin navigation entries for the sidebar.
- **Required Coverage**:
  - label
  - href
  - optional icon or state metadata

### AdminSessionViewModel
- **Purpose**: Present the subset of Auth.js session data needed by admin UI components.
- **Required Coverage**:
  - display name
  - email
  - optional avatar image
  - authorization-relevant identifiers where needed internally

### AllowedAccountConfig
- **Purpose**: Represent the configured Microsoft accounts permitted to use the portal.
- **Required Coverage**:
  - allowlisted email/account identifiers
  - configuration source abstraction suitable for environment-backed loading
