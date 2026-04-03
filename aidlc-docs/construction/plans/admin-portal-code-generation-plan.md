# Code Generation Plan - admin-portal

## Single Source Of Truth
This plan is the single source of truth for the `admin-portal` code-generation stage. Generation must follow these steps in order and mark each step complete in the same interaction where the work is done.

## Unit Context
- **Unit Name**: `admin-portal`
- **Project Type**: Brownfield Next.js application in `src/web`
- **Code Location**: `src/web` only for application changes, with markdown summaries under `aidlc-docs/construction/admin-portal/code/`
- **Dependencies**:
  - existing App Router structure in `src/web/app`
  - existing security headers in `src/web/lib/site/security-headers.ts`
  - existing package manifest and lockfile in `src/web/package.json` and `src/web/package-lock.json`
  - current Vitest setup in `src/web/tests`
- **Database Entities Owned By This Unit**: None
- **Service Boundaries And Responsibilities**:
  - auth configuration and provider wiring
  - allowlist configuration loading and normalization
  - protected-route access enforcement
  - admin-shell rendering and sign-out UX
  - denial routing and safe signed-out outcomes

## Story Traceability
- **US-1 Protected Admin Entry**: Steps 2, 3, 4, 8
- **US-2 Unauthorized Account Denial**: Steps 3, 5, 8
- **US-3 Admin Dashboard Foundation**: Steps 6, 7, 8
- **US-4 Signed-In Context And Exit**: Steps 4, 6, 8

## Planned Steps

### Step 1
- [ ] Update dependencies and runtime configuration in `src/web/package.json` and `src/web/package-lock.json` for Auth.js and any required provider-compatible packages, keeping versions pinned and compatible with the existing build.
- [ ] Verify whether supporting config files such as `src/web/tsconfig.json` or `src/web/next-env.d.ts` need minimal updates for the auth integration.

### Step 2
- [ ] Create the core auth and authorization modules under `src/web/lib/` for:
  - Auth.js configuration and provider setup
  - environment-backed allowlist loading and normalization
  - admin-session view-model mapping
  - reusable access-evaluation helpers
- [ ] Keep secrets and allowlist values environment-backed and fail closed when required auth configuration is invalid.

### Step 3
- [ ] Add App Router auth endpoints and protected access orchestration under `src/web/app/` so `/admin` requests enforce server-side authentication and authorization before protected content renders.
- [ ] Implement the unauthenticated redirect into the Microsoft sign-in flow and the unauthorized redirect into the dedicated access-denied route.

### Step 4
- [ ] Implement session-aware admin actions and shared admin route wiring, including safe sign-out behavior and any shared session helpers needed by protected routes.
- [ ] Ensure sign-out returns the user to a non-protected destination and does not leave protected UI reachable through stale client state.

### Step 5
- [ ] Create the dedicated access-denied page and supporting UI states under `src/web/app/` and `src/web/components/` with safe copy and clear recovery actions.
- [ ] Add stable `data-testid` attributes to the denial-path actions and any auth-facing interactive controls.

### Step 6
- [ ] Create the admin-shell UI under `src/web/components/` and `src/web/app/admin/`, including:
  - shared admin layout
  - sidebar with one dummy navigation item
  - signed-in profile summary
  - welcome summary
  - main placeholder content panel
- [ ] Keep the design brand-consistent but more restrained than the public landing page.

### Step 7
- [ ] Extend styling support for the admin shell in existing style files such as `src/web/app/globals.css` and create any small supporting UI primitives needed for the protected area.
- [ ] Preserve baseline focus visibility, keyboard reachability, and mobile-safe layout behavior.

### Step 8
- [ ] Add or expand unit tests under `src/web/tests/` to cover:
  - protected admin entry behavior
  - unauthorized access-denied behavior
  - authorized dashboard-shell rendering
  - signed-in profile and sign-out affordances
  - public landing-page non-regression where touched
- [ ] Use stable `data-testid` values for new interactive admin elements.

### Step 9
- [ ] Update delivery and usage documentation where needed for the admin feature, including any auth-related environment-variable guidance in repository docs if required by the implementation.
- [ ] Create `aidlc-docs/construction/admin-portal/code/code-summary.md` summarizing created and modified files after generation is complete.

### Step 10
- [ ] Verify that no duplicate brownfield files were introduced and that all implementation changes remain inside the existing `src/web` application structure.
- [ ] Re-read this plan, mark all completed steps `[x]`, and prepare the final code-generation review summary.

## Generation Approach Summary
- Start with dependencies and auth foundations so route protection has a stable base.
- Add the protected-route and denial flow before building the dashboard shell.
- Layer the UI shell and tests after the access boundary is working.
- Finish with documentation and code-summary artifacts to keep the workflow auditable.
