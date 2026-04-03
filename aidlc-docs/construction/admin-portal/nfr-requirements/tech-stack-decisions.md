# Tech Stack Decisions - admin-portal

## Core Framework
- **Decision**: Keep the admin portal inside the existing Next.js application
- **Rationale**:
  - Matches the approved brownfield strategy
  - Avoids unnecessary application fragmentation
  - Lets public and protected routes share deployment, routing, and build infrastructure

## Authentication Framework
- **Decision**: Use Auth.js for the first admin slice
- **Rationale**:
  - Explicit product requirement
  - Appropriate fit for provider-based auth inside App Router
  - Provides a clean foundation for session handling and protected-route integration

## Identity Provider Strategy
- **Decision**: Use Microsoft login only, scoped to personal Microsoft accounts
- **Rationale**:
  - Explicit product requirement
  - Keeps the first portal slice focused and avoids supporting multiple providers prematurely

## Authorization Strategy
- **Decision**: Use an environment-backed allowlist in the first version
- **Rationale**:
  - Matches approved requirements
  - Avoids introducing a database before real portal logic exists
  - Keeps future migration to persistent authorization data possible

## Session Strategy
- **Decision**: Use standard secure Auth.js defaults for v1
- **Rationale**:
  - Matches the approved NFR answer
  - Keeps implementation practical while still using secure defaults suitable for a protected area

## Browser Support Strategy
- **Decision**: Support current major desktop and mobile browsers equally
- **Rationale**:
  - Matches the approved NFR answer
  - Reduces surprises when admin users access the portal from non-desktop devices

## Accessibility Strategy
- **Decision**: Accept a minimal internal-accessibility target, while preserving basic semantic structure, keyboard reachability, and focus visibility where practical
- **Rationale**:
  - Matches the approved NFR answer
  - Keeps scope aligned with an internal first version without endorsing broken interaction patterns

## Observability Strategy
- **Decision**: Keep observability lightweight in v1
- **Included**:
  - framework-default error-safe behavior
  - production-safe handling of auth and denial paths
- **Excluded for v1**:
  - full monitoring and alerting design
  - expanded structured logging system for auth flow
- **Rationale**:
  - Matches the approved NFR answer
  - Avoids operational overreach before the portal carries real business workflows

## Maintainability Strategy
- **Decision**: Strongly separate auth config, allowlist logic, session mapping, and admin UI components
- **Rationale**:
  - Matches the approved NFR answer
  - Aligns with enabled security-extension expectations around security-critical module isolation
  - Creates a cleaner path for later portal growth

## Security Strategy
- **Decision**: Treat auth and authorization as first-class architecture boundaries
- **Rationale**:
  - Multiple enabled security rules become directly in-scope with authenticated routes
  - The portal must enforce server-side access control, secure session behavior, and safe denial responses

## Deployment Compatibility Strategy
- **Decision**: Preserve the existing deployment model and Docker path while adding auth dependencies
- **Rationale**:
  - The portal is an app extension, not a platform migration
  - Keeps build and release workflows stable while the protected surface is introduced

## Testing Implications
- **Decision**: Expand verification toward auth-sensitive route behavior while preserving existing public-site checks
- **Rationale**:
  - This unit introduces new protected/denied/signed-out states that are more important to test than deep infrastructure behavior
