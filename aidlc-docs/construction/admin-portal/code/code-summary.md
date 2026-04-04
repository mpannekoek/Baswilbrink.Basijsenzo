# Code Summary - admin-portal

## Overview
The auth-observability increment is now implemented inside the existing `src/web` Next.js application. The generated code adds structured auth-event logging, masked identifier handling, explicit unexpected-auth-failure routing, and a dedicated auth-error experience while preserving the current Microsoft sign-in and allowlist access model.

## Modified Files
- `README.md`
  - Added admin authentication diagnostics guidance covering the new structured logging behavior and the dedicated `/admin/auth-error` route.
- `src/web/app/globals.css`
  - Extended the admin background treatment so the new auth-error surface matches the existing admin route presentation.
- `src/web/app/api/auth/[...nextauth]/route.ts`
  - Added route-entry, configuration-unavailable, callback, and route-failure logging plus safe redirects into the auth-error path.
- `src/web/app/admin/(protected)/layout.tsx`
  - Marked the protected admin tree as explicitly dynamic and continued using the shared access-decision boundary.
- `src/web/app/admin/(protected)/page.tsx`
  - Aligned the page-level access decision call with the centralized auth outcome helper.
- `src/web/lib/auth/admin-access.ts`
  - Added the expanded auth outcome model, centralized auth decision logging, safe unexpected-failure handling, and request-scoped memoization for access decisions.
- `src/web/lib/auth/config.ts`
  - Added the auth-error route path, auth-error URL builder, Auth.js success and provider-error logging hooks, and the new custom error page mapping.
- `src/web/tests/admin-portal/admin-portal.test.tsx`
  - Expanded coverage for masked identifier behavior, unavailable auth routing, the dedicated auth-error UI, and the production-safe sign-out callback behavior.
- `src/web/components/admin/sign-out-button.tsx`
  - Resolved root-relative sign-out callback URLs against the current browser origin so production sign-out no longer falls back to an incorrect localhost base URL.

## Created Files
- `src/web/app/admin/auth-error/page.tsx`
  - Added the dedicated admin auth-error route.
- `src/web/components/admin/auth-error-panel.tsx`
  - Added the non-sensitive retry-oriented auth-error surface.
- `src/web/lib/auth/logging.ts`
  - Added the shared structured auth logging, correlation context, and identifier masking helper.

## Requirements Coverage
- **FR-1 / FR-2 / FR-5**
  - Structured auth-event logging and explicit auth outcome separation are implemented across the shared auth helpers and route layer.
- **FR-3**
  - User identifiers are masked before they reach production log output.
- **FR-4**
  - Unexpected authentication failures now route to a dedicated `/admin/auth-error` experience with retry guidance.
- **FR-6**
  - The increment remains inside the existing `src/web` application and preserves public-site behavior.

## Verification
- `npm test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Security Extension Compliance Summary
- **SECURITY-03**: Compliant. Auth logging is structured, server-side, and redacted.
- **SECURITY-04**: Compliant. Auth-related HTML routes remain inside the existing security-header model.
- **SECURITY-08**: Compliant. Protected admin routes still enforce server-side auth and authorization.
- **SECURITY-09**: Compliant. Unexpected auth failures now use a dedicated safe UI path with no sensitive internals.
- **SECURITY-10**: Compliant. The increment stays within the current dependency and build workflow.
- **SECURITY-11**: Compliant. Auth logging and outcome classification remain isolated in shared auth modules.
- **SECURITY-12**: Compliant. Secrets and session details remain environment-backed and excluded from logs.
- **SECURITY-01**: N/A. No persistence store was introduced.
- **SECURITY-02**: N/A. No network intermediary was introduced.
- **SECURITY-05**: N/A. No custom API parameter surface was introduced.
- **SECURITY-06**: N/A. No IAM-style permission resource was introduced.
- **SECURITY-07**: N/A. No network configuration was introduced.
