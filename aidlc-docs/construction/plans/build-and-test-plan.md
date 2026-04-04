# Build And Test Plan

## Single Source Of Truth
This plan is the single source of truth for the Build and Test stage after the `admin-portal` code-generation review approval.

## Scope
- **Application Root**: `src/web`
- **Units Covered**:
  - `landing-page`
  - `admin-portal`
- **Current Goal**: refresh the build-and-test instruction set so it reflects the current protected admin flow and the latest verified build status

## Planned Steps

### Step 1
- [x] Load the current workflow state, code-generation artifacts, and the relevant `src/web` build, auth, and test files before refreshing the stage artifacts.

### Step 2
- [x] Run the current verification commands from `src/web`:
  - `npm run lint`
  - `npm test`
  - `npm run build`

### Step 3
- [x] Refresh `aidlc-docs/construction/build-and-test/build-instructions.md` with the current Node/npm versions, build prerequisites, environment variables, and runtime verification steps.

### Step 4
- [x] Refresh `aidlc-docs/construction/build-and-test/unit-test-instructions.md` to cover both landing-page and admin-portal unit tests with the current test count and file list.

### Step 5
- [x] Refresh `aidlc-docs/construction/build-and-test/integration-test-instructions.md` with production-runtime checks for public routes, protected admin redirects, allowlisted access, and Docker parity.

### Step 6
- [x] Refresh `aidlc-docs/construction/build-and-test/performance-test-instructions.md`, `aidlc-docs/construction/build-and-test/security-test-instructions.md`, and `aidlc-docs/construction/build-and-test/e2e-test-instructions.md` so they include the current admin auth flow and current security baseline checks.

### Step 7
- [x] Refresh `aidlc-docs/construction/build-and-test/build-and-test-summary.md` with the latest executed verification results and the applicable security-extension compliance summary for this stage.

### Step 8
- [x] Update `aidlc-docs/aidlc-state.md` and append the required audit entries for session continuity, code-generation review approval, build-and-test execution, and the next approval gate.
