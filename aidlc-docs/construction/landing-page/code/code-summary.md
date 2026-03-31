# Code Summary - landing-page

## Implementation Overview
The `landing-page` unit has been implemented as a greenfield Next.js App Router application using TypeScript and Tailwind CSS. A targeted regeneration pass moved the application root into `src/web` so the runtime entrypoints, assets, tests, package/config files, and Docker build surface now align with the approved repository structure.

## Created Application Files
- `src/web/package.json`
- `src/web/tsconfig.json`
- `src/web/next.config.ts`
- `src/web/postcss.config.mjs`
- `src/web/eslint.config.mjs`
- `src/web/.gitignore`
- `src/web/.dockerignore`
- `src/web/Dockerfile`
- `.github/workflows/publish-image.yml`
- `src/web/next-env.d.ts`
- `src/web/vitest.config.ts`
- `src/web/public/logo.png`
- `src/web/public/basijs1.jpg`
- `src/web/public/basijs2.jpg`
- `src/web/public/basijs3.jpg`
- `src/web/app/layout.tsx`
- `src/web/app/page.tsx`
- `src/web/app/globals.css`
- `src/web/components/landing/header-bar.tsx`
- `src/web/components/landing/hero-section.tsx`
- `src/web/components/landing/practical-info-section.tsx`
- `src/web/components/landing/taste-of-week-section.tsx`
- `src/web/components/landing/story-section.tsx`
- `src/web/components/landing/reviews-section.tsx`
- `src/web/components/landing/visit-contact-section.tsx`
- `src/web/components/landing/landing-page.tsx`
- `src/web/components/ui/action-pill.tsx`
- `src/web/components/ui/section-shell.tsx`
- `src/web/components/ui/info-card.tsx`
- `src/web/components/ui/review-card.tsx`
- `src/web/components/ui/reveal.tsx`
- `src/web/lib/content/site-content.ts`
- `src/web/lib/site/metadata.ts`
- `src/web/lib/site/security-headers.ts`
- `src/web/scripts/prepare-standalone.mjs`
- `src/web/types/site.ts`
- `src/web/tests/setup.ts`
- `src/web/tests/landing-page/page.test.tsx`

## Story Coverage
- `US-1`: Implemented via branded header, bold hero, real logo usage, and local visual identity
- `US-2`: Implemented via practical info section, opening-hours list, call and route actions
- `US-3`: Implemented via story section and local identity copy
- `US-4`: Implemented via the dedicated taste-of-the-week section
- `US-5`: Implemented via review summary and placeholder review cards
- `US-6`: Implemented via mobile-first layout choices, touch-friendly actions, and responsive section structure

## Verification Performed
- `cd src/web && npm run lint` ✅
- `cd src/web && npm test` ✅
- `cd src/web && npm run build` ✅

## Notes
- Placeholder content remains centralized and easy to replace later.
- Follow-up regeneration moved the remaining rendered copy, metadata text, image alt text, and accessibility labels into the centralized content layer so section components no longer own editable page copy.
- Follow-up regeneration also moved the full Next.js app boundary from the repository root to `src/web`, including package/config files, App Router entrypoints, tests, assets, Docker packaging, and the GHCR workflow build context.
- The implementation keeps the earlier user-provided design reference as inspiration only; the final UI is re-anchored to black/orange branding and the real logo asset.
- Docker remains production-oriented but practical, matching the approved scope.
- GitHub Actions now provides an automated GHCR publish path for the Docker image.
