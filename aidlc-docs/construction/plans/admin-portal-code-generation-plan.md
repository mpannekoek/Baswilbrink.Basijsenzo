# Code Generation Plan - admin-portal

## Single Source Of Truth
This plan is the single source of truth for the `admin-portal` auth-observability code-generation stage. Generation must follow these steps in order and mark each step complete in the same interaction where the work is done.

## Unit Context
- **Unit Name**: `admin-portal`
- **Project Type**: Brownfield Next.js application in `src/web`
- **Code Location**: `src/web` only for application changes, with markdown summaries under `aidlc-docs/construction/admin-portal/code/`
- **Dependencies**:
  - existing App Router structure in `src/web/app`
  - current Auth.js integration in `src/web/app/api/auth/[...nextauth]/route.ts`
  - shared auth helpers in `src/web/lib/auth`
  - current admin sign-in and access-denied surfaces in `src/web/app/admin` and `src/web/components/admin`
  - existing Vitest coverage in `src/web/tests/admin-portal/admin-portal.test.tsx`
- **Database Entities Owned By This Unit**: None
- **Service Boundaries And Responsibilities**:
  - auth configuration and provider wiring
  - structured auth-event logging and identifier masking
  - protected-route access evaluation and auth outcome mapping
  - dedicated unexpected-auth-error routing and UI
  - admin auth verification coverage and documentation

## Story And Requirement Traceability
- **Requirements FR-1 / FR-2 / FR-5**: Steps 1, 2, 3, 6
- **Requirements FR-3**: Steps 1, 2, 6
- **Requirements FR-4**: Steps 3, 4, 6
- **Requirements FR-6**: Steps 2, 3, 5, 6
- **NFR Observability / Reliability / Privacy**: Steps 1, 2, 3, 6
- **NFR Maintainability / Brownfield Reliability**: Steps 1, 2, 5, 6

## Planned Steps

### Step 1
- [x] Create or update shared auth diagnostics helpers under `src/web/lib/auth/` for:
  - structured auth-event logging
  - masked identifier generation
  - correlation-aware event context
- [x] Ensure the helper design never logs secrets, tokens, raw provider payloads, or full email addresses.

### Step 2
- [x] Refine `src/web/lib/auth/config.ts` and `src/web/lib/auth/admin-access.ts` so auth outcomes are classified explicitly as:
  - authorized
  - unauthenticated
  - unauthorized
  - unavailable
  - unexpected auth failure
- [x] Add safe logging hooks to the shared auth boundaries without making logger failures block the auth flow.

### Step 3
- [x] Update `src/web/app/api/auth/[...nextauth]/route.ts` and related auth-facing route wiring so route entry, config-unavailable behavior, callback failures, and other unexpected failures emit safe structured auth events.
- [x] Keep the current Microsoft sign-in path intact while ensuring unexpected auth failures can be routed to a dedicated auth-error experience instead of collapsing into access denial.

### Step 4
- [x] Add the dedicated unexpected-auth-error route and supporting UI under `src/web/app/admin/` and `src/web/components/admin/`.
- [x] Keep access-denied reserved for authenticated-but-unauthorized users only and add stable `data-testid` attributes to any new interactive controls.

### Step 5
- [x] Update existing admin sign-in and protected-route surfaces only where needed to align them with the new auth outcome model and safe retry flows.
- [x] Preserve current public-site behavior and existing successful allowlisted admin sign-in behavior.

### Step 6
- [x] Expand unit tests under `src/web/tests/admin-portal/` to cover:
  - identifier masking behavior
  - auth outcome classification
  - config-unavailable and unexpected-auth-error handling
  - dedicated auth-error rendering and retry navigation
  - continued access-denied behavior for unauthorized users
- [x] Use stable `data-testid` values for new interactive auth elements.

### Step 7
- [x] Update developer-facing documentation where needed for the auth-observability increment, including any repository guidance about production log expectations or auth-failure troubleshooting.
- [x] Create `aidlc-docs/construction/admin-portal/code/code-summary.md` summarizing modified and created files after generation is complete.

### Step 8
- [x] Verify that all implementation changes stay inside the existing `src/web` application structure and that no duplicate brownfield files are introduced.
- [x] Re-read this plan, mark all completed steps `[x]`, and prepare the final code-generation review summary.

## Generation Approach Summary
- Start with shared auth diagnostics and outcome-classification helpers so route and UI changes build on a consistent contract.
- Update the auth route and access guard next, because that is where the current production ambiguity is introduced.
- Add the dedicated auth-error surface after the shared outcome model exists.
- Finish with focused tests and documentation so the new logging and failure separation stay auditable and regression-resistant.
