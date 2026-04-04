# Requirements Document

## Intent Analysis Summary
- **User Request**: Add production-useful logging and failure diagnostics around the existing `admin-portal` authentication flow so auth problems can be understood when production currently falls through to the access-denied screen without enough visibility.
- **Request Type**: Enhancement
- **Scope Estimate**: Multiple components across auth configuration, auth route handling, protected access decisions, user-facing failure handling, and verification
- **Complexity Estimate**: Moderate
- **Requirements Depth**: Standard

## Product Goal
Extend the existing Bas IJs & Zo `admin-portal` so authentication and authorization problems become diagnosable in production. The increment should preserve the current Microsoft-based sign-in flow while adding structured diagnostics, clearer failure-path separation, and a user-facing auth-error experience for unexpected failures.

## Brownfield Context
- The existing application is a Next.js site in `src/web` with a previously approved `admin-portal` slice already implemented.
- The current admin auth flow includes Auth.js, Microsoft personal-account sign-in, allowlist authorization, a custom sign-in page, and an access-denied page.
- The current production symptom is that multiple auth failure modes can end with the same visible denial experience, making root-cause diagnosis difficult.
- The increment must fit the existing brownfield structure and avoid regressing the public site or the working parts of the admin experience.

## Primary Users
- **Admin operators**: Need a stable auth flow and a clearer message when an unexpected sign-in problem occurs.
- **Developers and maintainers**: Need production-safe logs that explain whether failures come from configuration, provider callback behavior, unavailable auth setup, unauthenticated access, unauthorized access, or unexpected runtime issues.
- **Unauthorized users**: Must continue to receive a safe denial experience without internal details leaking to the browser.

## Confirmed Decisions
- The increment should log all failed authentication or authorization outcomes plus unexpected auth-related errors.
- The first version should emit structured server logs to stdout or stderr so the deployment platform can collect them.
- Masked email identifiers may appear in logs; full email addresses must not be logged.
- The UI should show a dedicated auth-error experience with a short, non-sensitive message and retry guidance for unexpected authentication failures.
- The implementation should add lightweight checkpoint logging around auth flow start, callback handling, success, and failure, without logging secrets or raw provider payloads.
- Baseline Security Rules remain enabled as blocking constraints for this increment.

## Functional Requirements

### FR-1: Structured Authentication Event Logging
- The application must emit structured server-side log events for authentication and authorization outcomes relevant to the `admin-portal`.
- Log events must be machine-readable and suitable for deployment-platform log collection from stdout or stderr.
- The logging design must distinguish expected access outcomes from unexpected failures.

### FR-2: Auth Flow Coverage Points
- The implementation must log meaningful checkpoints that help reconstruct the authentication path.
- At minimum, the checkpoint model must cover:
  - auth flow entry or start
  - callback or provider-return handling
  - successful authenticated access
  - unauthenticated redirect behavior
  - unauthorized allowlist denial behavior
  - configuration-unavailable behavior
  - unexpected auth-related failures
- The implementation must avoid logging secrets, raw tokens, or full provider payloads.

### FR-3: Production-Safe User Identification In Logs
- When a user identifier is included in auth logs, it must use a masked email representation rather than the full Microsoft account email address.
- The masking approach must preserve enough information to correlate repeated failures for the same account without exposing full PII in logs.
- The implementation may also include request or event context that helps correlate related auth events.

### FR-4: Dedicated Unexpected Auth Error Experience
- The application must provide a dedicated user-facing auth-error experience for unexpected authentication failures.
- The auth-error experience must use short, non-sensitive messaging and basic retry guidance.
- The auth-error experience must be distinct from the existing access-denied experience so authorization failures and unexpected auth failures are no longer collapsed into the same user-facing screen.

### FR-5: Failure Cause Separation
- The implementation must separate these auth outcomes at the application level:
  - unauthenticated user
  - authenticated but unauthorized user
  - auth configuration unavailable or incomplete
  - unexpected auth runtime or provider-related failure
- Each outcome must map to the correct redirect, page, and logging behavior.

### FR-6: Brownfield-Safe Integration
- The increment must remain inside the existing `src/web` Next.js application.
- Existing public-site behavior at `/` must remain unchanged.
- Existing successful admin sign-in behavior must continue to work after the logging and failure-handling changes are added.

## User Experience Requirements
- Users should continue to see the current sign-in and access-denied experiences for expected auth outcomes.
- Users encountering an unexpected auth failure should see a dedicated error screen or state that avoids internal details while still indicating that login did not complete normally.
- The error experience should provide a sensible next action such as retrying sign-in or returning to a safe location.

## Technical Requirements
- The solution must follow the current App Router structure in `src/web`.
- The implementation should reuse or extend the existing auth modules rather than scattering auth logging logic across unrelated UI code.
- The logging implementation should be isolated in dedicated helpers or modules so future observability expansion is straightforward.
- The logging output must be compatible with the current deployment model and must not require a new external logging service in this first version.
- The solution must preserve compatibility with the current lint, test, and build setup.

## Non-Functional Requirements

### NFR-1: Security
- Logging must not include secrets, tokens, raw provider payloads, or full email addresses.
- Unexpected auth failures must remain generic in the UI and must not expose stack traces or internal framework details to end users.
- Authentication and authorization decisions must remain server-side boundaries.

### NFR-2: Observability
- The auth flow must become diagnosable from deployment-platform logs without requiring an attached debugger.
- Logs should make it possible to tell whether a failure was caused by missing configuration, redirect flow issues, callback problems, allowlist denial, or another unexpected runtime error.
- The first version should stay lightweight and avoid introducing a full observability platform.

### NFR-3: Maintainability
- Auth logging, access-decision logic, and user-facing failure pages should remain modular and clearly separated.
- The logging approach should create a clean foundation for future additions such as request correlation, centralized logging, or alerting.

### NFR-4: Reliability
- The increment must not break successful sign-in for allowlisted users.
- The increment must not regress the current access-denied behavior for unauthorized users.
- Failure handling should fail closed and route users to safe states when auth cannot be completed.

### NFR-5: Brownfield Reliability
- The public landing page and existing site-wide runtime behavior must continue to function normally.
- The Docker-based deployment model and existing verification workflow must continue to work after the change.

## Security Requirements Derived From Enabled Extension
- **SECURITY-03**: Application-level logging is now in scope. Auth diagnostics must use structured server-side logging without secrets, tokens, or full PII.
- **SECURITY-04**: All auth-related HTML routes, including any new auth-error route, must continue to emit the required HTTP security headers.
- **SECURITY-08**: Protected admin routes must continue to enforce server-side authentication and authorization checks.
- **SECURITY-09**: Production auth failure responses must not expose stack traces, framework internals, or sensitive configuration details.
- **SECURITY-10**: Any logging-related dependencies or runtime changes must remain pinned through the committed lockfile and existing supply-chain controls.
- **SECURITY-11**: Security-critical auth and access logic must remain isolated in dedicated modules, and the design must continue to consider auth misuse and failure scenarios.
- **SECURITY-12**: Secrets and session handling must remain environment-backed and safely managed through the sign-in, failure, and sign-out flows.
- **SECURITY-01, SECURITY-02, SECURITY-05, SECURITY-06, SECURITY-07**: Not currently in scope because this increment does not add persistence, network intermediaries, custom API parameter surfaces, IAM resources, or network infrastructure.

## Assumptions
- Deployment-platform logs from stdout or stderr are accessible in the production environment where the auth issue is occurring.
- Microsoft provider credentials and Auth.js secrets continue to be supplied through environment variables.
- The current auth failure symptom can be diagnosed adequately with structured logs and clearer failure-path separation without immediately adding a third-party monitoring service.

## Success Criteria
- Production logs clearly distinguish unauthenticated redirect, unauthorized allowlist denial, auth misconfiguration, and unexpected auth failures.
- Logs contain masked identifiers when user identity needs to be referenced, and do not expose full email addresses, tokens, or secrets.
- Unexpected authentication failures lead to a dedicated auth-error experience instead of being indistinguishable from access denial.
- Allowlisted users can still sign in successfully and reach the existing `admin-portal`.
- The public site and existing build, lint, and test flows remain functional.
