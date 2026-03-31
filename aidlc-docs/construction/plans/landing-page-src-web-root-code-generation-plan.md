# Code Generation Follow-Up Plan - landing-page src-web root alignment

## Unit Context
- **Unit Name**: `landing-page`
- **Change Scope**: Targeted regeneration for the approved `src/web` application-root correction
- **Stories Impacted**:
  - `US-1` Welcoming First Impression
  - `US-2` Fast Practical Information
  - `US-3` Local Story And Personality
  - `US-4` Taste Of The Week Spotlight
  - `US-5` Natural Social Proof
  - `US-6` Comfortable Mobile Experience
- **Dependencies on Other Units/Services**: None
- **Expected Interfaces and Contracts**:
  - the Next.js application root must be `src/web`
  - runtime assets must resolve from `src/web/public`
  - App Router entrypoints must resolve from `src/web/app`
  - path aliases and test tooling must resolve from the `src/web` application root
  - Docker packaging and GHCR publishing must build from `src/web`

## Target Code Locations
- `src/web/package.json`
- `src/web/package-lock.json`
- `src/web/tsconfig.json`
- `src/web/next.config.ts`
- `src/web/postcss.config.mjs`
- `src/web/eslint.config.mjs`
- `src/web/.gitignore`
- `src/web/.dockerignore`
- `src/web/Dockerfile`
- `src/web/next-env.d.ts`
- `src/web/vitest.config.ts`
- `src/web/scripts/prepare-standalone.mjs`
- `src/web/public/*`
- `src/web/app/*`
- `src/web/components/**/*`
- `src/web/lib/**/*`
- `src/web/types/**/*`
- `src/web/tests/**/*`
- `.github/workflows/publish-image.yml`
- `aidlc-docs/construction/landing-page/code/code-summary.md`

## Numbered Generation Steps

### Step 1
- [x] Re-read the approved design correction and identify the exact root-level files that must move under `src/web`
  - Story mapping: structural support for `US-1` through `US-6`

### Step 2
- [x] Move the Next.js application files, runtime assets, tests, and local package surface into `src/web`
  - Story mapping: structural support for `US-1` through `US-6`

### Step 3
- [x] Refactor the moved configuration files so alias resolution, framework imports, Docker packaging, and GHCR publishing work from the new app root
  - Story mapping: quality support for all stories

### Step 4
- [x] Update the construction code summary to record the `src/web` root alignment
  - Story mapping: implementation traceability for all stories

### Step 5
- [x] Run targeted verification from `src/web`
  - Story mapping: quality support for all stories

## Follow-Up Generation Approach Summary
- Keep the change set limited to the app-root move and the supporting config/build files that become invalid after that move.
- Preserve user-visible behavior and existing imports wherever the `@/` contract can remain stable from the new app root.
- Avoid unrelated UI or content changes during this regeneration pass.
