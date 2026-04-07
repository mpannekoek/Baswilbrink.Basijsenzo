# API Documentation

## REST APIs

### NextAuth route
- **Method**: GET, POST
- **Path**: `/api/auth/[...nextauth]`
- **Purpose**: Handle sign-in, callback, and session-related Auth.js operations.
- **Request**: Standard Auth.js query parameters and callback payloads.
- **Response**: Redirects, Auth.js-managed responses, or auth-error redirects when configuration is missing or a route failure occurs.

## Internal APIs

### `getAdminAccessDecision(currentPath?: string)`
- **Location**: `src/web/lib/auth/admin-access.ts`
- **Purpose**: Evaluate whether the current request may access the admin portal.
- **Parameters**: Optional current path used for callback and logging context.
- **Return Type**: `Promise<AdminAccessDecision>`

### `resolveAdminAccess(...)`
- **Location**: `src/web/lib/auth/admin-access.ts`
- **Purpose**: Convert auth configuration, session data, and allowlist rules into an authorization decision.
- **Parameters**: Session, config state, allowlist, and redirect paths.
- **Return Type**: `AdminAccessDecision`

### `getAdminNavigation()`
- **Location**: `src/web/lib/auth/navigation.ts`
- **Purpose**: Provide navigation items for the admin sidebar.
- **Return Type**: `AdminNavItem[]`

### `getSiteMetadata()`
- **Location**: `src/web/lib/site/metadata.ts`
- **Purpose**: Build Next.js metadata from site content.
- **Return Type**: `Metadata`

## Data Models

### `LandingPageContent`
- **Location**: `src/web/types/site.ts`
- **Fields**: Metadata, brand config, navigation items, social links, hero content, practical info, opening hours, contact info, featured taste, reviews, review summary, visit/contact block, and site footer.
- **Relationships**: Aggregates smaller typed content sections.
- **Validation**: TypeScript shape enforcement only; no runtime validation yet.

### `AdminNavItem`
- **Location**: `src/web/types/admin.ts`
- **Fields**: `href`, `icon`, `label`, `description`, `testId`.
- **Relationships**: Used by the admin sidebar.

### `AdminSessionViewModel`
- **Location**: `src/web/types/admin.ts`
- **Fields**: `displayName`, `email`, `image`, `initials`.
- **Relationships**: Derived from the Auth.js session for the admin UI.
