# Unit Test Instructions

## Run Unit Tests

### 1. Execute The Unit Test Suite
```bash
cd src/web && npm test
```

### 2. Review Test Results
- **Expected**: 15 tests pass, 0 failures
- **Coverage Focus**:
  - landing-page hero and practical-information rendering
  - admin allowlist normalization and access decisions
  - masked auth identifier behavior
  - unavailable-auth and auth-error routing behavior
  - protected admin-shell rendering and current sidebar composition
  - custom admin sign-in page action wiring
  - access-denied recovery actions
  - auth-error retry and return-home actions
- **Current Test Files**:
  - `src/web/tests/landing-page/page.test.tsx`
  - `src/web/tests/admin-portal/admin-portal.test.tsx`

### 3. Fix Failing Tests
If tests fail:
1. review the failing assertion output
2. inspect the affected component, auth helper, or content file
3. update the test or implementation as needed
4. rerun `cd src/web && npm test`

## Recommended Additional Unit Tests
- verify Auth.js logger integration through isolated helper tests if the logging layer grows
- verify production-host sign-out callback handling from additional entry surfaces
- verify configuration-unavailable flows use the dedicated auth-error route consistently
