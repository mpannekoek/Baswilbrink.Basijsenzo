# Implementation Summary - landing-page-content-management

## Outcome
- Replaced the public landing-page text source with a SQLite + Drizzle-backed content layer while keeping the existing `LandingPageContent` render contract intact.
- Added protected admin content-management pages for grouped homepage text, opening hours, and the featured taste workflow.
- Extended the featured taste workflow so the two homepage photos can also be updated from the admin page via public image paths.
- Added upload controls for the two featured-taste photos so editors can upload replacement images directly from the admin page and then save the updated content without hand-editing paths.
- Added server-side validation, authorization re-checks, audit logging, default seeding, and route revalidation around content writes.

## Story Coverage
- [x] Story 1: Public landing-page content rendering
- [x] Story 2: Grouped landing-page text management
- [x] Story 3: Opening Hours management
- [x] Story 4: Taste-of-the-Week management

## Main Code Areas
- Persistence and migrations:
  - `src/web/lib/db/*`
  - `src/web/drizzle.config.ts`
  - `src/web/drizzle/*`
- Content domain and services:
  - `src/web/lib/content/*`
  - `src/web/scripts/seed-content.ts`
- Public app integration:
  - `src/web/app/page.tsx`
  - `src/web/app/layout.tsx`
  - `src/web/lib/site/metadata.ts`
- Admin UX integration:
  - `src/web/app/admin/(protected)/content/**`
  - `src/web/components/admin/*content*`
  - `src/web/components/admin/admin-dashboard-home.tsx`
  - `src/web/lib/auth/navigation.ts`
- Tests:
  - `src/web/tests/content-management/*`
  - `src/web/tests/admin-portal/admin-portal.test.tsx`

## Verification
- `npm run db:seed`
- `npm run lint`
- `npm test`
- `npm run build`

## Notes
- The SQLite path resolver now uses Turbopack ignore annotations around `process.cwd()` so standalone builds do not emit the previous project-wide tracing warning.
- The local SQLite file lives under `src/web/data/content.db` by default and is ignored via `.gitignore`.
- `siteFooter.copyrightText`, `siteFooter.creatorIntro`, `siteFooter.creatorName`, and `siteFooter.creatorCta` remain code-managed and are not editable through the admin content UI.
- The featured-taste editor now manages the two photo sources as public paths such as `/basijs2.jpg`; external image URLs are rejected by validation to stay compatible with the current Next.js image setup.
- The featured-taste editor now includes upload buttons for both photos; uploads are validated to JPG, PNG, WEBP, or AVIF and stored under `public/uploads/featured-taste`.
