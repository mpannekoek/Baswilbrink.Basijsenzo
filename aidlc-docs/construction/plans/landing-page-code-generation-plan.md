# Code Generation Plan - landing-page

## Unit Context
- **Unit Name**: `landing-page`
- **Stories Implemented by This Unit**:
  - `US-1` Welcoming First Impression
  - `US-2` Fast Practical Information
  - `US-3` Local Story And Personality
  - `US-4` Taste Of The Week Spotlight
  - `US-5` Natural Social Proof
  - `US-6` Comfortable Mobile Experience
- **Dependencies on Other Units/Services**: None
- **Expected Interfaces and Contracts**:
  - typed content/config objects for page sections
  - shared UI component props
  - framework-level metadata and security-header configuration
- **Database Entities Owned by This Unit**: None
- **Service Boundaries and Responsibilities**:
  - page content/config assembly
  - brand and metadata configuration
  - security header configuration
  - Dockerized production delivery setup

## Target Code Locations
- **Application Code**:
  - `README.md`
  - `src/web/package.json`
  - `src/web/tsconfig.json`
  - `src/web/next.config.ts`
  - `src/web/postcss.config.mjs`
  - `src/web/eslint.config.mjs`
  - `src/web/.gitignore`
  - `src/web/.dockerignore`
  - `src/web/Dockerfile`
  - `.github/workflows/publish-image.yml`
  - `src/web/public/logo.png`
  - `src/web/app/layout.tsx`
  - `src/web/app/page.tsx`
  - `src/web/app/globals.css`
  - `src/web/app/favicon.ico` or equivalent generated asset if needed
  - `src/web/components/landing/*`
  - `src/web/components/ui/*`
  - `src/web/lib/content/site-content.ts`
  - `src/web/lib/site/metadata.ts`
  - `src/web/lib/site/security-headers.ts`
  - `src/web/types/site.ts`
- **Tests**:
  - `src/web/tests/landing-page/*.test.tsx` or minimal equivalent test structure appropriate to the chosen toolchain
- **Documentation**:
  - `aidlc-docs/construction/landing-page/code/code-summary.md`

## Numbered Generation Steps

### Step 1
- [x] Initialize the greenfield Next.js + TypeScript + Tailwind project structure inside `src/web`
  - Story mapping: foundation for `US-1` through `US-6`

### Step 2
- [x] Add project-level configuration files for Next.js, TypeScript, linting, Tailwind/PostCSS, and ignore rules
  - Story mapping: supports all stories through maintainable scaffolding

### Step 3
- [x] Add Docker delivery artifacts with a practical production-oriented baseline
  - include Dockerfile and `.dockerignore`
  - Story mapping: supports deployment expectations for all stories

### Step 4
- [x] Add static public assets and brand wiring
  - copy the approved logo asset into the app’s public asset path
  - wire brand asset usage with fallback-friendly structure
  - Story mapping: `US-1`

### Step 5
- [x] Implement typed site content and configuration models in `src/web/types` and `src/web/lib`
  - include placeholder content for hero, practical info, taste of the week, story, reviews, and CTA links
  - Story mapping: `US-1` through `US-5`

### Step 6
- [x] Implement shared UI primitives and layout helpers
  - section shell
  - action pill/button
  - review/info card primitives
  - Story mapping: `US-1`, `US-2`, `US-4`, `US-5`, `US-6`

### Step 7
- [x] Implement landing-page section components
  - header bar
  - hero section
  - practical info section
  - taste of the week section
  - story section
  - reviews section
  - visit/contact section
  - Story mapping: `US-1` through `US-6`

### Step 8
- [x] Compose the full landing page and global app shell
  - implement `src/web/app/layout.tsx`, `src/web/app/page.tsx`, and global styling in `src/web/app/globals.css`
  - apply the branded visual system with black/orange emphasis and inspiration from the earlier user-provided design reference
  - Story mapping: `US-1` through `US-6`

### Step 9
- [x] Implement framework-level metadata and security-header configuration
  - Story mapping: quality support for all stories

### Step 10
- [x] Add basic automated tests for rendering-critical components and page composition
  - prioritize responsive-safe rendering and practical-information presence
  - Story mapping: validates `US-1`, `US-2`, `US-5`, `US-6`

### Step 11
- [x] Add a concise construction-stage code summary in `aidlc-docs/construction/landing-page/code/code-summary.md`
  - Story mapping: implementation traceability for all stories

### Step 12
- [x] Verify the generated structure is ready for the later Build and Test stage
  - Story mapping: readiness support for all stories

### Step 13
- [x] Add GitHub Actions workflow support for publishing the production Docker image to GHCR
  - include repository-derived image naming and default-branch publish tags
  - Story mapping: supports deployment expectations for all stories

### Step 14
- [x] Add a root `README.md` for the repository
  - describe the project purpose and current scope
  - explain that the Next.js application root is `src/web`
  - include local development, test, build, and Docker commands
  - Story mapping: maintainability and onboarding support for all stories

## Unit Generation Approach Summary
- Build the app as a single App Router-based Next.js project rooted at `src/web`
- Keep content static and typed for easy later replacement
- Prefer modular section components over a single large page file
- Keep Docker practical and production-oriented without expanding into broader platform engineering
- Keep testing lightweight but meaningful for a single landing page
- Include a root repository `README.md` for human-readable project onboarding and usage guidance
- Do not generate web runtime code at repository root, repository-root `public`, or repository-root `src` outside `src/web`

## Single Source Of Truth
This plan is the single source of truth for the `landing-page` code generation stage. The subsequent implementation step should follow this sequence directly.
