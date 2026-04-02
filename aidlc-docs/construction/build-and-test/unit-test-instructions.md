# Unit Test Instructions

## Run Unit Tests

### 1. Execute The Unit Test Suite
```bash
cd src/web && npm test
```

### 2. Review Test Results
- **Expected**: 3 tests pass, 0 failures
- **Coverage Focus**:
  - hero rendering
  - eager loading on the above-the-fold hero image
  - practical information presence
  - review summary presence
- **Current Test File**:
  - `src/web/tests/landing-page/page.test.tsx`

### 3. Fix Failing Tests
If tests fail:
1. review the failing assertion output
2. inspect the affected component or content file
3. update the test or implementation as needed
4. rerun `cd src/web && npm test`

## Recommended Additional Unit Tests
- verify CTA labels and hrefs
- verify opening-hours “today” emphasis
- verify major sections render with expected headings
- verify mobile-critical content remains present in the page output
