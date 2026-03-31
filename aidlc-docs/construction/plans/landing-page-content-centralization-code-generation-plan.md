# Code Generation Follow-Up Plan - landing-page content centralization

## Unit Context
- **Unit Name**: `landing-page`
- **Change Scope**: Targeted regeneration for the centralized editable content-resource design correction
- **Stories Impacted**:
  - `US-1` Welcoming First Impression
  - `US-2` Fast Practical Information
  - `US-4` Taste Of The Week Spotlight
  - `US-5` Natural Social Proof
  - `US-6` Comfortable Mobile Experience
- **Dependencies on Other Units/Services**: None
- **Expected Interfaces and Contracts**:
  - `LandingPageContent` must carry all rendered visitor-facing copy
  - landing-page section components must render supplied content rather than embed copy locally
  - site metadata should derive copy from the same centralized content layer
  - tests should validate rendering against the centralized content source

## Target Code Locations
- `src/types/site.ts`
- `src/lib/content/site-content.ts`
- `src/lib/site/metadata.ts`
- `src/components/landing/header-bar.tsx`
- `src/components/landing/hero-section.tsx`
- `src/components/landing/practical-info-section.tsx`
- `src/components/landing/taste-of-week-section.tsx`
- `src/components/landing/story-section.tsx`
- `src/components/landing/reviews-section.tsx`
- `src/components/landing/visit-contact-section.tsx`
- `tests/landing-page/page.test.tsx`
- `aidlc-docs/construction/landing-page/code/code-summary.md`

## Numbered Generation Steps

### Step 1
- [x] Re-read the approved design correction and identify the exact files whose contracts are affected
  - Story mapping: `US-1`, `US-2`, `US-4`, `US-5`, `US-6`

### Step 2
- [x] Expand the typed content model so all rendered page copy, image alt text, accessibility labels, and metadata copy can be sourced centrally
  - Story mapping: `US-1`, `US-2`, `US-4`, `US-5`, `US-6`

### Step 3
- [x] Regenerate the centralized content source to provide the new structured copy fields
  - Story mapping: `US-1`, `US-2`, `US-4`, `US-5`

### Step 4
- [x] Refactor only the affected landing-page components so they consume centralized copy instead of hardcoded strings
  - Story mapping: `US-1`, `US-2`, `US-4`, `US-5`, `US-6`

### Step 5
- [x] Refactor metadata generation so SEO/document copy stays aligned with the centralized content source
  - Story mapping: `US-1`

### Step 6
- [x] Update rendering tests so they remain stable while validating the centralized content behavior
  - Story mapping: `US-1`, `US-2`, `US-5`, `US-6`

### Step 7
- [x] Run targeted verification for the affected files
  - Story mapping: quality support for all impacted stories

### Step 8
- [x] Update the construction code summary to record the follow-up regeneration work
  - Story mapping: implementation traceability

## Follow-Up Generation Approach Summary
- Keep the change set limited to the content contract and the components that still own page copy.
- Do not introduce unrelated structural or styling changes.
- Preserve existing data-testid values and user-visible behavior while moving copy into the centralized content layer.
