# Unit Test Instructions

## Run Unit Tests

### 1. Execute The Unit Test Suite
```bash
npm test
```

### 2. Review Test Results
- **Expected**: 2 tests pass, 0 failures
- **Coverage Focus**:
  - hero rendering
  - practical information presence
  - review summary presence
- **Current Test File**:
  - `tests/landing-page/page.test.tsx`

### 3. Fix Failing Tests
If tests fail:
1. review the failing assertion output
2. inspect the affected component or content file
3. update the test or implementation as needed
4. rerun `npm test`

## Recommended Additional Unit Tests
- verify CTA labels and hrefs
- verify opening-hours “today” emphasis
- verify major sections render with expected headings
- verify mobile-critical content remains present in the page output
