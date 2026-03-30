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
  - `package.json`
  - `tsconfig.json`
  - `next.config.ts`
  - `postcss.config.mjs`
  - `eslint.config.mjs`
  - `.gitignore`
  - `.dockerignore`
  - `Dockerfile`
  - `public/logo.png`
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/app/globals.css`
  - `src/app/favicon.ico` or equivalent generated asset if needed
  - `src/components/landing/*`
  - `src/components/ui/*`
  - `src/lib/content/site-content.ts`
  - `src/lib/site/metadata.ts`
  - `src/lib/site/security-headers.ts`
  - `src/types/site.ts`
- **Tests**:
  - `tests/landing-page/*.test.tsx` or minimal equivalent test structure appropriate to the chosen toolchain
- **Documentation**:
  - `aidlc-docs/construction/landing-page/code/code-summary.md`

## Numbered Generation Steps

### Step 1
- [x] Initialize the greenfield Next.js + TypeScript + Tailwind project structure in the workspace root
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
- [x] Implement typed site content and configuration models in `src/types` and `src/lib`
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
  - implement `src/app/layout.tsx`, `src/app/page.tsx`, and global styling
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

## Unit Generation Approach Summary
- Build the app as a single App Router-based Next.js project under `src/`
- Keep content static and typed for easy later replacement
- Prefer modular section components over a single large page file
- Keep Docker practical and production-oriented without expanding into broader platform engineering
- Keep testing lightweight but meaningful for a single landing page

## Single Source Of Truth
This plan is the single source of truth for the `landing-page` code generation stage. The subsequent implementation step should follow this sequence directly.
