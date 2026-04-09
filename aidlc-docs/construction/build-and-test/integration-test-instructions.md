# Integration Test Instructions

## Purpose
Valideer interacties tussen content-opslag, admin mutaties, upload-flow en publieke rendering.

## Test Scenarios

### Scenario 1: Admin Content Mutation -> Public Landing Render
- **Description**: wijzig slider- of homepage-content via content services en valideer dat publieke data die updates overneemt.
- **Setup**:
- gebruik in-memory SQLite via bestaande tests
- zorg dat dependencies geïnstalleerd zijn
- **Test Steps**:
1. Run `tests/content-management/content-actions.test.ts`
2. Run `tests/content-management/content-services.test.ts`
3. Run `tests/landing-page/page.test.tsx`
- **Expected Results**:
- mutations worden gevalideerd en opgeslagen
- publieke content reflecteert opgeslagen waarden
- **Cleanup**:
- niet nodig voor in-memory runs

### Scenario 2: Gallery Upload -> Persisted Public Path
- **Description**: valideer dat geuploade gallery-bestanden correct onder `public/uploads/gallery-showcase` landen en een bruikbaar publiek pad teruggeven.
- **Setup**:
- gebruik temp-directory flow uit uploadtests
- **Test Steps**:
1. Run `tests/content-management/gallery-showcase-image-upload.test.ts`
- **Expected Results**:
- unsupported types worden afgewezen
- geldige uploads produceren een `/uploads/gallery-showcase/...` pad
- **Cleanup**:
- test ruimt temp-directory zelf op

## Setup Integration Test Environment

### 1. Start Required Services
```bash
cd src/web
npm ci
```

### 2. Configure Environment
```bash
cd src/web
cp .env.example .env.local
# Vul waarden in waar nodig voor lokale app-validatie
```

## Run Integration Tests

### 1. Execute Integration Test Suite
```bash
cd src/web
npm test -- --run \
  tests/content-management/content-actions.test.ts \
  tests/content-management/content-services.test.ts \
  tests/content-management/gallery-showcase-image-upload.test.ts \
  tests/landing-page/page.test.tsx
```

### 2. Verify Service Interactions
- **Key Interaction Checks**:
- content seed -> repository snapshot -> public mapper
- admin save actions -> revalidation triggers
- gallery upload action -> filesystem + public path mapping
- **Expected Results**:
- all selected tests pass
- no auth/content validation regressions
- **Logs Location**:
- terminal output from `vitest`

### 3. Cleanup
```bash
# Geen specifieke cleanup vereist buiten standaard test lifecycle
```
