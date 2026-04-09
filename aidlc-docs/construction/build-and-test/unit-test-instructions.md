# Unit Test Execution

## Run Unit Tests

### 1. Execute All Unit Tests
```bash
cd src/web
npm test
```

### 2. Execute High-Value Suites for This Unit
```bash
cd src/web
npm test -- --run \
  tests/landing-page/page.test.tsx \
  tests/content-management/content-actions.test.ts \
  tests/content-management/content-services.test.ts \
  tests/content-management/gallery-showcase-image-upload.test.ts \
  tests/content-management/featured-taste-image-upload.test.ts \
  tests/admin-portal/admin-portal.test.tsx
```

### 3. Review Test Results
- **Expected**:
- all tests pass
- 0 failures
- **Current Baseline**:
- approximately 34 tests are present in `src/web/tests` (subject to future changes)
- **Coverage**:
- no coverage threshold is configured in current test scripts
- **Report Location**:
- terminal output from `vitest`

### 4. Fix Failing Tests
If tests fail:
1. Inspect the first failing test and stack trace in terminal output.
2. Reproduce with a single-file run, for example:
```bash
cd src/web
npm test -- --run tests/landing-page/page.test.tsx
```
3. Fix implementation or test assumptions.
4. Rerun full suite (`npm test`) until all pass.
