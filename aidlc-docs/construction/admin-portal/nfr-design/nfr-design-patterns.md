# NFR Design Patterns - admin-portal

## Design Intent
This design incorporates the approved non-functional requirements for the first protected admin slice by keeping authentication and authorization as explicit server-side boundaries, preserving the current deployment model, and isolating security-sensitive logic from presentational dashboard code.

## Core Patterns

### 1. Server-Side Access Boundary
- Protect the admin route tree through a server-side access guard at the `/admin` layout boundary.
- Resolve the session before rendering protected layout content.
- Redirect unauthenticated users into the Auth.js sign-in path before any admin UI is rendered.
- Redirect authenticated but unauthorized users to the dedicated access-denied route before protected content is rendered.
- This satisfies the deny-by-default requirement and directly supports `SECURITY-08`.

### 2. Separated Security-Critical Modules
- Keep Auth.js configuration, allowlist parsing, authorization evaluation, and session-to-view-model mapping in separate modules.
- Presentational admin components should receive already-approved session data instead of importing raw auth internals.
- This preserves maintainability and aligns with `SECURITY-11` and `SECURITY-12`.

### 3. Environment-Backed Authorization Configuration
- Load the allowlist from environment-backed configuration rather than component code.
- Normalize configured account identifiers before comparison so authorization behavior remains deterministic.
- Fail closed when the allowlist is missing or malformed for protected access checks.
- This supports safe operations without introducing a database in v1.

### 4. Safe Session and Sign-Out Behavior
- Use Auth.js secure defaults as the baseline session pattern for v1.
- Ensure protected content depends on a fresh server-side session check instead of stale client state.
- Route sign-out through a dedicated action that returns the user to a non-protected destination.
- Prevent access-denied and sign-out flows from exposing sensitive session or provider details.

### 5. Security-Preserving Brownfield Integration
- Keep the admin portal within the existing Next.js application rather than introducing a separate runtime.
- Reuse the current global security-header strategy for admin HTML routes so the protected area inherits the same response-hardening baseline.
- Preserve the public-site route structure and the existing public entrypoint abuse controls without coupling them to admin UI concerns.
- This keeps `SECURITY-04` and current brownfield reliability expectations intact.

### 6. Lightweight Observability by Design
- Avoid adding a new monitoring subsystem in this slice.
- Prefer framework-safe error handling and minimal, non-sensitive auth-path diagnostics only where needed during implementation.
- Do not make structured auth-event logging a hard dependency for the first slice.
- Ensure any future logging omits secrets, tokens, and personal data beyond the minimal operational need.

### 7. Responsive Shell With Baseline Accessibility
- Use a dashboard shell that is desktop-oriented but remains functional on current mobile browsers.
- Preserve semantic layout regions, keyboard reachability, and visible focus states even though the accessibility target is intentionally modest.
- Keep the dashboard visual language more restrained than the public landing page while reusing the existing brand anchors.

### 8. Dependency and Delivery Stability
- Add auth dependencies through the existing `src/web` package manifest and committed lockfile.
- Preserve compatibility with the current lint, test, build, and Docker-based delivery flow.
- Avoid introducing infrastructure-only dependencies or a second deployment surface in this unit.

## Security Extension Compliance Summary
- **SECURITY-04**: Compliant. The design preserves the existing application-wide security-header pattern for admin HTML routes.
- **SECURITY-08**: Compliant. The design uses a server-side auth and authorization gate for the protected route tree.
- **SECURITY-09**: Compliant. Denial and error paths are designed to avoid leaking sensitive internals.
- **SECURITY-10**: Compliant. New auth dependencies stay within the existing pinned package-management flow.
- **SECURITY-11**: Compliant. Security-critical logic is isolated and layered instead of being mixed into UI rendering.
- **SECURITY-12**: Compliant. Secrets remain environment-backed and session/sign-out behavior follows secure handling patterns.
- **SECURITY-01**: N/A. This unit does not add a persistence store.
- **SECURITY-02**: N/A. This unit does not add network intermediaries.
- **SECURITY-05**: N/A. This unit does not add custom API parameter surfaces in this stage.
- **SECURITY-06**: N/A. This unit does not define IAM policies or equivalent infrastructure permissions.
- **SECURITY-07**: N/A. This unit does not add network-configuration resources.
