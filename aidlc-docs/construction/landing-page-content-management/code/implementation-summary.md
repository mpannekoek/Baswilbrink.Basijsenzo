# Implementation Summary - landing-page-content-management

## Outcome
- Replaced the public landing-page text source with a SQLite + Drizzle-backed content layer while keeping the existing `LandingPageContent` render contract intact.
- Added protected admin content-management pages for grouped homepage text, opening hours, and the featured taste workflow.
- Extended the featured taste workflow so the two homepage photos can also be updated from the admin page via public image paths.
- Added upload controls for the two featured-taste photos so editors can upload replacement images directly from the admin page and then save the updated content without hand-editing paths.
- Added a dedicated sticky black mobile topbar in the admin portal so the sidebar visual identity also stays present on smaller screens.
- Refined the mobile admin shell so the hamburger and close controls share the exact same fixed position, while the light dashboard header also stays sticky beneath the black topbar.
- Replaced the complete reviews section with a Swiper-based image slider while keeping the green introduction block as editable homepage copy.
- Refined the homepage gallery into a Swiper thumbs gallery loop so the main slide and thumbnail strip stay synchronized and render correctly across screen sizes.
- Removed the extra arrow and pagination controls from the homepage gallery so only the main slide and thumbnail strip remain visible.
- Tightened the shared admin form field alignment so multiline text areas and neighboring controls line up consistently across the content pages.
- Added a dedicated admin page to manage the slider intro text and gallery images separately from the other homepage content.
- Added server-side validation, authorization re-checks, audit logging, default seeding, and route revalidation around content writes.
- Added repo-root deployment artifacts for VPS rollout: a `deploy/compose.yml`, a `deploy/deploy.sh` runner, and a `deploy-azure-vps.yml` workflow that syncs those files to the server and deploys a specific GHCR image tag.
- Updated the deployment compose defaults so the VPS publishes the app on host port `3001` unless `APP_PORT` is explicitly overridden.
- Added beginner-friendly inline documentation to `deploy/deploy.sh` so the remote deployment flow is easier to understand for Bash newcomers without changing its behavior.
- Updated the GitHub workflow checkout steps from `actions/checkout@v4` to `actions/checkout@v6` to align the repository with Node 24-compatible GitHub Actions runtimes.

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
- Deployment:
  - `deploy/compose.yml`
  - `deploy/deploy.sh`
  - `.github/workflows/deploy-azure-vps.yml`

## Verification
- `npm run db:seed`
- `npm run lint`
- `npm test`
- `npm run build`
- `bash -n deploy/deploy.sh`
- `docker compose -f deploy/compose.yml config` with placeholder env values

## Notes
- The SQLite path resolver now uses Turbopack ignore annotations around `process.cwd()` so standalone builds do not emit the previous project-wide tracing warning.
- The local SQLite file lives under `src/web/data/content.db` by default and is ignored via `.gitignore`.
- `siteFooter.copyrightText`, `siteFooter.creatorIntro`, `siteFooter.creatorName`, and `siteFooter.creatorCta` remain code-managed and are not editable through the admin content UI.
- The featured-taste editor now manages the two photo sources as public paths such as `/basijs2.jpg`; external image URLs are rejected by validation to stay compatible with the current Next.js image setup.
- The featured-taste editor now includes upload buttons for both photos; uploads are validated to JPG, PNG, WEBP, or AVIF and stored under `public/uploads/featured-taste`.
- Review cards and review summary content are removed from the app and replaced by gallery slider content plus a separate gallery image collection.
- The homepage slider now uses Swiper React's `Thumbs` pattern together with FreeMode, A11y, and Autoplay, following the official Swiper React docs: `https://swiperjs.com/react`.
- The VPS deployment flow expects a server-local `deploy/.env` file that is not committed; `.gitignore` now ignores `deploy/.env*` to reduce accidental secret commits.
