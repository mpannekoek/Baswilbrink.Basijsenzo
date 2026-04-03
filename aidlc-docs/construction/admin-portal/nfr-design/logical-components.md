# Logical Components - admin-portal

## Overview
The admin portal does not introduce new infrastructure components in this stage. Its non-functional design is expressed through logical application-layer components inside the existing Next.js application.

## Logical Components

### 1. Auth Route Layer
- **Purpose**: Host the Auth.js route handlers and Microsoft-provider flow.
- **Responsibilities**:
  - process sign-in and callback requests
  - keep provider wiring outside page components
  - centralize auth runtime integration

### 2. Auth Configuration Module
- **Purpose**: Build provider, secret, session, and callback configuration.
- **Responsibilities**:
  - read environment-backed auth settings
  - enforce safe defaults and callback structure
  - avoid hardcoded credentials

### 3. Allowed Account Module
- **Purpose**: Interpret the configured allowlist for authorized admin access.
- **Responsibilities**:
  - load allowed identities from environment-backed configuration
  - normalize configured values for stable comparison
  - fail closed when configuration is invalid

### 4. Admin Access Guard
- **Purpose**: Act as the protected-route orchestration boundary for `/admin`.
- **Responsibilities**:
  - read the current server-side session
  - distinguish unauthenticated and unauthorized states
  - redirect into sign-in or access-denied flows before rendering protected content

### 5. Session View Model Mapper
- **Purpose**: Convert raw Auth.js session data into UI-safe admin props.
- **Responsibilities**:
  - expose display name, email, and optional avatar fields
  - keep raw auth structures out of presentational components
  - limit UI coupling to auth-library internals

### 6. Admin Shell Layout
- **Purpose**: Render the persistent protected layout after access is approved.
- **Responsibilities**:
  - provide sidebar, header/profile region, and main content area
  - preserve responsive behavior for desktop and mobile browsers
  - host the sign-out control and welcome summary

### 7. Access-Denied Surface
- **Purpose**: Handle the authenticated-but-unauthorized outcome.
- **Responsibilities**:
  - explain denial clearly without exposing internal authorization logic
  - provide safe next actions such as sign-out or return to the public site
  - avoid loops or partial protected rendering

### 8. Existing Shared Runtime
- **Purpose**: Continue supplying site-wide security headers, styling tokens, build settings, and deployment packaging.
- **Responsibilities**:
  - keep admin routes inside the same application runtime
  - preserve compatibility with the current Next.js, Docker, and test setup
  - avoid a separate admin deployment topology in v1

## Design Constraints
- No new persistence component is introduced for authorization.
- No new queue, cache, or messaging component is required.
- No separate admin API service is required in this slice.
- No additional infrastructure-design artifact is needed because the approved execution plan skips Infrastructure Design for `admin-portal`.

## Next-Stage Implementation Focus
- Build the auth modules and route handlers first.
- Implement the `/admin` access guard and access-denied route next.
- Add the lightweight dashboard shell and session-aware UI last.
