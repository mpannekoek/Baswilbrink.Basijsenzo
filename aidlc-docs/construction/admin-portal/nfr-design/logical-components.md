# Logical Components - admin-portal

## Overview
The auth-observability increment does not add new infrastructure components. Its non-functional design is expressed through application-layer logical components inside the existing Next.js application and current Auth.js integration.

## Logical Components

### 1. Auth Route Layer
- **Purpose**: Host the Auth.js route handlers and provider callback flow.
- **Responsibilities**:
  - process sign-in and callback requests
  - emit safe structured auth events at route-entry and failure boundaries
  - avoid exposing raw provider failures directly to users

### 2. Auth Configuration Module
- **Purpose**: Build provider, secret, page-path, and auth-option configuration.
- **Responsibilities**:
  - read environment-backed auth settings
  - detect configuration-unavailable states
  - support safe logging of configuration failure class without exposing secret values

### 3. Auth Logging Helper
- **Purpose**: Centralize structured auth log emission.
- **Responsibilities**:
  - build consistent log-event shapes
  - attach request path and correlation context when available
  - emit masked user identifiers only
  - swallow internal logging failures so auth flow remains operational

### 4. Auth Identity Masking Helper
- **Purpose**: Convert raw user identifiers into safe log representations.
- **Responsibilities**:
  - mask email addresses consistently
  - prevent accidental full-identifier leakage
  - give operators enough context to correlate repeated failures

### 5. Admin Access Guard
- **Purpose**: Act as the protected-route orchestration boundary for `/admin`.
- **Responsibilities**:
  - read the current server-side session
  - distinguish authorized, unauthenticated, unauthorized, unavailable, and unexpected-failure states
  - trigger the correct redirect and matching log events before protected content is rendered

### 6. Auth Outcome Mapper
- **Purpose**: Normalize raw auth and access results into explicit application-level outcomes.
- **Responsibilities**:
  - keep redirect behavior and logging behavior aligned
  - reserve access-denied for authorization failure only
  - map unexpected failures to the dedicated auth-error route or state

### 7. Auth-Error Surface
- **Purpose**: Handle unexpected authentication failures safely for end users.
- **Responsibilities**:
  - present non-sensitive retry guidance
  - provide a safe path back to sign-in or the public site
  - stay visually and behaviorally distinct from access-denied

### 8. Existing Shared Runtime
- **Purpose**: Continue supplying security headers, styling, build settings, and deployment packaging.
- **Responsibilities**:
  - keep admin routes and auth error routes inside the same application runtime
  - preserve compatibility with the current Next.js, Docker, and test setup
  - avoid a second deployment surface or monitoring stack in this increment

## Design Constraints
- No external monitoring platform is introduced.
- No local file logging is introduced.
- No database-backed audit log is introduced.
- No new queue, cache, or messaging component is required.
- No additional infrastructure-design artifact is needed because the approved execution plan skips Infrastructure Design for this increment.

## Next-Stage Implementation Focus
- Build the shared auth logging and identifier-masking helpers first.
- Refine the auth route and access guard to classify and log auth outcomes consistently.
- Add the dedicated auth-error surface and align existing sign-in and denial flows with the new outcome model.
- Expand tests around auth classification, auth-error rendering, and safe logging behavior last.
