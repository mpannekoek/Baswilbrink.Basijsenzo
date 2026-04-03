# NFR Requirements - admin-portal

## Scope
This unit covers the protected `/admin` portal inside the existing Bas IJs & Zo Next.js application, including Auth.js-based Microsoft sign-in, allowlist authorization, access-denied handling, session behavior, and the lightweight dashboard shell.

## NFR Summary
- **Session Security Baseline**: Standard secure Auth.js defaults for v1
- **Browser/Device Support**: Equal support for current major desktop and mobile browsers
- **Accessibility Target**: Minimal accessibility is acceptable for the first internal version
- **Observability Baseline**: Keep auth observability simple and rely on framework defaults plus safe production behavior
- **Maintainability Bias**: Strong separation between auth config, allowlist logic, session mapping, and UI components

## Security
- Authentication and authorization are core quality requirements for this unit, not optional refinements.
- Protected admin routes must enforce authentication before rendering protected content.
- Allowlist authorization must be enforced server-side before any admin shell or admin page content is rendered.
- Auth credentials and secrets must come from environment-backed configuration rather than source code.
- Session handling should use secure Auth.js defaults suitable for an authenticated admin portal.
- Logout must transition the user to a safe non-protected state.
- Access-denied behavior must avoid leaking unnecessary internal authorization details.

## Authorization And Access Control
- The admin area must operate with deny-by-default behavior.
- Only explicitly allowlisted Microsoft personal accounts may enter the portal.
- Unauthenticated requests to `/admin` must enter the sign-in path rather than seeing partial protected UI.
- Authenticated but unauthorized users must be redirected consistently to the dedicated access-denied page.
- Protected routes must continue to enforce authorization on every request path inside the admin boundary.

## Session Behavior
- The first version may use standard secure Auth.js session defaults rather than a custom stricter lifetime policy.
- Session behavior must still be appropriate for an internal admin surface:
  - secure cookies in production
  - correct invalidation through sign-out
  - no exposure of protected content after logout
- The design should preserve a clean path to stricter session policies later if the portal grows in sensitivity.

## Browser And Device Support
- The admin portal should support current major desktop browsers.
- The admin portal should also support current major mobile browsers.
- The UX may still be desktop-biased in layout intent, but the first version must remain functional on mobile and smaller screens.
- Protected flows must not rely on browser-specific behavior outside mainstream current browser support.

## Accessibility
- Minimal accessibility is accepted for the first internal version, but this does not remove the need for basic sound structure.
- The admin shell should still use semantic structure where practical.
- Interactive elements must remain keyboard reachable.
- Visible focus states should be preserved.
- Access-denied and sign-out flows should remain understandable to users navigating without a mouse.

## Maintainability
- Auth configuration, allowlist logic, session mapping, and admin UI components should remain clearly separated.
- Environment-backed configuration should be organized so allowlist and secret changes do not require component rewrites.
- The dashboard shell should be easy to extend with future routes and modules.
- The admin portal should integrate into the existing app without entangling the public landing-page implementation.

## Reliability
- The addition of the admin portal must not regress the current public site.
- Protected-route behavior should be predictable for unauthenticated, unauthorized, and authorized states.
- The unit should build consistently in the existing local and containerized environments.
- Error handling should fail safely for auth or configuration issues and avoid exposing sensitive implementation details.

## Observability
- The first version keeps observability intentionally lightweight.
- No full monitoring or alerting stack is required for this unit yet.
- Auth-related behavior should rely on framework-safe defaults and production-safe behavior rather than extensive new instrumentation in v1.

## Delivery And Deployment
- The admin portal must remain compatible with the current Next.js application deployment model.
- Existing Docker-oriented delivery should continue to work after auth-related dependencies and routes are added.
- New dependencies introduced for authentication must remain pinned through the committed lockfile.
- The feature should preserve compatibility with the existing lint, test, and build workflows.

## Security Extension Applicability
- **SECURITY-04**: In scope. Admin HTML routes must continue to emit the required security headers.
- **SECURITY-08**: In scope. Protected routes require server-side authentication and authorization enforcement.
- **SECURITY-09**: In scope. Production auth and denial behavior must not expose sensitive internals.
- **SECURITY-10**: In scope. Added auth dependencies and delivery artifacts must remain pinned and auditable.
- **SECURITY-11**: In scope. Security-critical auth and authorization logic must remain isolated, and the public entrypoint abuse controls must remain intact.
- **SECURITY-12**: In scope. Sessions, secrets, and sign-in/sign-out behavior must follow secure credential-management practices.
- **SECURITY-01, SECURITY-02, SECURITY-05, SECURITY-06, SECURITY-07**: Not currently in scope because this unit does not add persistence, custom APIs, IAM policy definitions, or network infrastructure.

## Out Of Scope
- Database-backed allowlist management
- Full admin observability or alerting stack
- MFA enforcement beyond what the upstream Microsoft account may already provide
- Expanded admin business logic beyond the starter shell
- Additional infrastructure topology or separate admin deployment surface
