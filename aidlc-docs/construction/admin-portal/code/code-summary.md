# Code Summary - admin-portal

## Overview
The first protected admin slice is now implemented inside the existing `src/web` Next.js application. The generated code adds Auth.js-based Microsoft personal-account sign-in, environment-backed allowlist authorization, a dedicated access-denied flow, and a lightweight dashboard shell for future expansion.

## Modified Files
- `README.md`
  - Added admin-portal environment-variable guidance for local testing.
- `src/web/app/globals.css`
  - Added admin-shell color tokens, background treatment, and layout helpers.
- `src/web/package.json`
  - Added the `next-auth` dependency.
- `src/web/package-lock.json`
  - Pinned the auth dependency graph.

## Created Files
- `src/web/app/api/auth/[...nextauth]/route.ts`
  - Added Auth.js route handlers with safe configuration checks.
- `src/web/app/admin/(protected)/layout.tsx`
  - Added the protected admin layout boundary.
- `src/web/app/admin/(protected)/page.tsx`
  - Added the starter admin dashboard route.
- `src/web/app/admin/access-denied/page.tsx`
  - Added the dedicated unauthorized-access page.
- `src/web/components/admin/access-denied-panel.tsx`
  - Added the denial UX with sign-out and return-home actions.
- `src/web/components/admin/admin-dashboard-home.tsx`
  - Added the starter dashboard content area.
- `src/web/components/admin/admin-profile-card.tsx`
  - Added signed-in profile presentation.
- `src/web/components/admin/admin-shell.tsx`
  - Added the shared protected admin shell.
- `src/web/components/admin/admin-sidebar.tsx`
  - Added the sidebar navigation frame.
- `src/web/components/admin/sign-out-button.tsx`
  - Added the reusable sign-out control.
- `src/web/lib/auth/admin-access.ts`
  - Added the server-side access-decision orchestration and pure access helper.
- `src/web/lib/auth/allowed-accounts.ts`
  - Added allowlist parsing and normalization helpers.
- `src/web/lib/auth/config.ts`
  - Added Auth.js provider and route-path configuration.
- `src/web/lib/auth/navigation.ts`
  - Added first-version admin navigation data.
- `src/web/lib/auth/session.ts`
  - Added session-to-view-model mapping.
- `src/web/tests/admin-portal/admin-portal.test.tsx`
  - Added admin-portal helper and UI tests.
- `src/web/types/admin.ts`
  - Added shared admin-shell types.

## Story Coverage
- **US-1 Protected Admin Entry**
  - Protected route boundary and direct Microsoft sign-in redirect implemented.
- **US-2 Unauthorized Account Denial**
  - Dedicated access-denied route and safe denial actions implemented.
- **US-3 Admin Dashboard Foundation**
  - Shared shell, sidebar, placeholder content, and restrained admin styling implemented.
- **US-4 Signed-In Context And Exit**
  - Profile summary, welcome text, and sign-out flow implemented.

## Verification
- `npm run lint` ✅
- `npm test` ✅
- `npm run build` ✅

## Security Extension Compliance Summary
- **SECURITY-04**: Compliant. Existing global security headers continue to cover admin HTML routes.
- **SECURITY-08**: Compliant. Protected admin routes enforce server-side auth and allowlist checks.
- **SECURITY-09**: Compliant. Unauthorized and unavailable flows avoid exposing sensitive internals.
- **SECURITY-10**: Compliant. Auth dependencies are pinned via the committed lockfile.
- **SECURITY-11**: Compliant. Auth, allowlist, access evaluation, and UI rendering are separated into dedicated modules.
- **SECURITY-12**: Compliant. Secrets remain environment-backed and sign-out returns to a non-protected destination.
- **SECURITY-01**: N/A. No persistence store was introduced.
- **SECURITY-02**: N/A. No network intermediary was added.
- **SECURITY-05**: N/A. No custom API parameter validation surface was introduced in this slice.
- **SECURITY-06**: N/A. No IAM-style permission layer was introduced.
- **SECURITY-07**: N/A. No network infrastructure was introduced.
