# NFR Requirements - admin-portal

## Scope
This unit covers the existing `admin-portal` authentication flow inside the Bas IJs & Zo Next.js application, with focus on structured diagnostics, safe production logging, auth outcome separation, and the dedicated unexpected-auth-error experience.

## NFR Summary
- **Observability Baseline**: Structured server logs only, collected through stdout or stderr, with no external monitoring platform added in this increment
- **Correlation Context**: Include event timestamp, level, event name, request path, correlation or request ID when available, and masked user identifier when relevant
- **Logging Failure Behavior**: Auth flow must continue safely even if a log event cannot be emitted
- **User-Facing Error UX**: Simple dedicated auth-error experience with retry guidance and a safe route back to the site
- **Privacy Boundary**: Never log tokens, secrets, raw provider payloads, or full query strings that may contain sensitive auth details

## Security
- Authentication and authorization remain security boundaries, not just UX conventions.
- Structured auth logs must not contain secrets, tokens, raw callback payloads, or full email addresses.
- Masked user identifiers may be logged only when they materially help diagnose an auth event.
- Unexpected auth failures must remain generic in the browser and must not expose stack traces, framework internals, or missing-secret details to end users.
- Protected admin routes must continue to enforce server-side authentication and authorization on every request.

## Observability
- The auth flow must become diagnosable from deployment-platform logs without attaching a debugger to production.
- Structured log events should cover:
  - auth flow entry or start
  - callback or provider return handling
  - successful authenticated access where useful as a checkpoint
  - unauthenticated redirect decisions
  - unauthorized allowlist denial decisions
  - auth configuration unavailable decisions
  - unexpected auth runtime failures
- Each emitted auth log should favor concise structured fields over free-form text only.
- Request path and a correlation or request ID should be included when available to make multi-step auth failures traceable.
- No external monitoring or alerting system is required in this increment.

## Reliability
- Successful sign-in for allowlisted users must continue to work after logging and failure-separation changes are introduced.
- If logging itself fails, the auth flow must continue safely without blocking sign-in, redirects, or safe denial behavior.
- Unexpected auth failures should fail closed and route users to a safe non-protected state or dedicated auth-error path.
- The implementation must continue to build and run in the current local and containerized environments.

## Privacy And Data Handling
- Masked email identifiers should be preferred when a per-user auth event needs to be correlated.
- Full Microsoft account email addresses must not be written to logs in production behavior.
- Full query strings must not be logged when they may contain auth-sensitive details such as callback parameters, codes, or transient error data.
- Provider responses should be summarized through safe event metadata rather than raw payload logging.

## Usability
- The dedicated auth-error experience should clearly indicate that sign-in did not complete normally without implying authorization denial.
- The error experience should give users a sensible retry action and a safe route back to the site.
- Existing access-denied messaging should remain reserved for authenticated-but-unauthorized users only.

## Maintainability
- Logging logic should be isolated in shared auth-related helpers rather than scattered across unrelated UI components.
- Auth outcome classification should remain centralized so sign-in, protected-route, and error-page behavior stays consistent.
- The implementation should create a clean foundation for future observability improvements such as centralized logging or alerting without requiring those now.

## Performance And Scope Control
- The logging approach should remain lightweight and should not introduce heavy runtime dependencies for this increment.
- Structured diagnostics should add minimal overhead to the auth path.
- The increment should stay within the current Next.js application and deployment model.

## Delivery And Deployment
- Structured logs must be emitted in a way that existing deployment-platform logging can collect without extra infrastructure work.
- The solution must preserve compatibility with the current lint, test, build, and Docker workflows.
- Any code or dependency changes must stay within the existing package-management and lockfile controls.

## Security Extension Applicability
- **SECURITY-03**: In scope. Application-level logging is a primary requirement for this increment and must be structured and free of secrets and full PII.
- **SECURITY-04**: In scope. Existing and any new auth-related HTML routes must continue to emit the required security headers.
- **SECURITY-08**: In scope. Protected admin routes must continue to enforce server-side authentication and authorization.
- **SECURITY-09**: In scope. Production auth failures must not expose sensitive internal details to end users.
- **SECURITY-10**: In scope. Any implementation changes must remain compatible with pinned dependencies and documented verification.
- **SECURITY-11**: In scope. Security-critical auth and logging logic must remain isolated in dedicated modules, and misuse or failure cases must be considered explicitly.
- **SECURITY-12**: In scope. Secrets, sessions, and sign-in/sign-out flows must remain safely handled while diagnostics are added.
- **SECURITY-01, SECURITY-02, SECURITY-05, SECURITY-06, SECURITY-07**: Not currently in scope because this increment does not add persistence, network intermediaries, custom API parameter surfaces, IAM resources, or network infrastructure.

## Out Of Scope
- External monitoring or alerting platforms
- Log shipping infrastructure changes
- Database-backed audit logging
- Verbose provider payload inspection in production
- Changes to the public landing-page UX unrelated to auth diagnostics
