# NFR Design Patterns - admin-portal

## Design Intent
This design incorporates the approved auth-observability non-functional requirements by keeping authentication and authorization as explicit server-side boundaries, adding lightweight structured diagnostics that are safe for production logs, and separating unexpected auth failures from normal denial behavior without changing the current deployment model.

## Core Patterns

### 1. Structured Auth Event Logging
- Emit event-oriented structured logs from server-side auth boundaries rather than ad-hoc free-form messages.
- Prefer stable fields such as timestamp, level, event name, request path, correlation ID when available, and masked user identifier when relevant.
- Keep the logging contract small enough to work with the current deployment-platform log collection through stdout or stderr.
- This directly supports `SECURITY-03`.

### 2. Centralized Auth Outcome Classification
- Keep auth outcome classification in shared auth modules rather than scattering it across pages and route handlers.
- Explicitly distinguish these outcomes:
  - unauthenticated
  - unauthorized
  - unavailable due to configuration
  - unexpected auth failure
  - authorized
- Use the same outcome model to drive both redirect behavior and logging behavior.
- This supports `SECURITY-08`, `SECURITY-11`, and maintainability requirements.

### 3. Production-Safe Identity Logging
- Never log full email addresses, tokens, secrets, raw provider payloads, or full auth-sensitive query strings.
- When a user reference helps diagnose an event, derive a masked identifier before the log event is emitted.
- Keep redaction or masking logic in one shared helper so privacy behavior stays consistent across the auth flow.
- This supports `SECURITY-03`, `SECURITY-09`, and `SECURITY-12`.

### 4. Non-Blocking Logger Failure Handling
- Treat logging as diagnostically important but not required for auth correctness.
- Wrap log emission so an internal logger failure does not block sign-in, redirects, or safe denial behavior.
- Fall back to continuing the auth flow safely if a log emission path itself throws.
- This preserves reliability while still improving production visibility.

### 5. Dedicated Unexpected-Auth-Error Experience
- Keep access-denied reserved for authenticated-but-unauthorized users only.
- Route unexpected auth failures to a dedicated auth-error surface with non-sensitive copy, retry guidance, and a safe route away from the protected area.
- Ensure this path does not expose stack traces, provider internals, or missing-secret details in the browser.
- This supports `SECURITY-09` and the approved usability requirements.

### 6. Correlation-Aware Request Context
- Capture request path on auth-related events and include a correlation or request identifier when one is available at the boundary being logged.
- Use correlation context to make multi-step login and callback issues reconstructable in platform logs without requiring a tracing platform.
- Avoid broad request dumping; only include the minimal request context needed to connect events safely.

### 7. Security-Preserving Brownfield Integration
- Keep the auth-observability work inside the existing Next.js application and reuse the current security-header and deployment model.
- Extend the current Auth.js route handler, shared auth configuration, and access guard rather than introducing a parallel auth runtime.
- Preserve current public-site behavior and existing successful admin sign-in behavior while improving failure diagnosability.
- This keeps `SECURITY-04`, `SECURITY-10`, and brownfield reliability expectations intact.

### 8. Verification-Oriented Design
- Make auth logging and outcome classification testable through pure helpers where practical.
- Prefer deterministic helpers for masking identifiers and mapping auth failures so unit tests can assert the behavior without requiring live provider interaction.
- Keep the user-facing auth-error surface isolated enough for component-level rendering tests.

## Security Extension Compliance Summary
- **SECURITY-03**: Compliant. The design introduces structured application-level auth logging with explicit redaction boundaries.
- **SECURITY-04**: Compliant. Existing auth-related HTML routes remain inside the application-wide security-header model.
- **SECURITY-08**: Compliant. Protected admin routes continue to rely on server-side access control with explicit auth outcome classes.
- **SECURITY-09**: Compliant. Unexpected auth failures use a dedicated safe UI path that avoids sensitive detail leakage.
- **SECURITY-10**: Compliant. The design stays within the current application and dependency-management model.
- **SECURITY-11**: Compliant. Security-critical logging and auth classification remain isolated in dedicated modules.
- **SECURITY-12**: Compliant. Secrets and session handling remain environment-backed and are excluded from logs.
- **SECURITY-01**: N/A. No persistence store is introduced.
- **SECURITY-02**: N/A. No network intermediary is introduced.
- **SECURITY-05**: N/A. No custom API parameter surface is added in this stage.
- **SECURITY-06**: N/A. No IAM-style permission resource is introduced.
- **SECURITY-07**: N/A. No network-configuration resource is introduced.
