# Implementation Summary - landing-page-content-management

## Outcome
- Replaced the public landing-page text source with a SQLite + Drizzle-backed content layer while keeping the existing `LandingPageContent` render contract intact.
- Added protected admin content-management pages for grouped homepage text, opening hours, and the featured taste workflow.
- Extended the featured taste workflow so the two homepage photos can also be updated from the admin page via public image paths.
- Added upload controls for the two featured-taste photos so editors can upload replacement images directly from the admin page and then save the updated content without hand-editing paths.
- Simplified the homepage hero so it now emphasizes only the orange route CTA, without the previous hero-side photo or the small featured-taste teaser card.
- Updated the homepage hero to use `public/hero-bg1.png` as a full background image, combined with darker layered overlays and a translucent content panel to keep the text and actions readable.
- Refined that hero background treatment by softening the overlays so more of the photo remains visible and removing the border around the text panel.
- Removed the remaining background fill behind the hero copy so the text now sits directly on the image, with readability handled by the hero-wide overlays.
- Reworked the mobile menu layout so the main navigation links are substantially larger, use more of the available height, and give the CTA/social areas more breathing room.
- Reordered the mobile menu CTA stack so `Plan je route` is now the top orange button and `Bel direct` appears beneath it as the secondary action.
- Updated `Praktisch & duidelijk` to use the same shared diagonal `split` section background treatment as `Uit de vitrine`.
- Added a mirrored `split-reverse` section tone and applied it to `Uit de vitrine`, so the gallery section now uses the reflected diagonal for a more playful rhythm next to `Praktisch & duidelijk`.
- Extended that alternating diagonal background system to `Smaak van de week` and `Laatste zetje`, so those sections now also participate in the playful split-direction rhythm.
- Corrected that treatment so the formerly dark sections stay black via new `dark-split` variants, removed the diagonal from `Uit de vitrine`, and rebalanced the alternating split rhythm across the rest of the page.
- Removed all diagonal section backgrounds and replaced the shared section tones with softer layered gradients, glows, and a subtle grain texture so the landing page feels calmer and less busy.
- Strengthened the visible grain/glow treatment for the black section backgrounds so `Smaak van de week` and `Laatste zetje` keep their dark look while showing more atmospheric blur/noise.
- Added a dedicated sticky black mobile topbar in the admin portal so the sidebar visual identity also stays present on smaller screens.
- Refined the mobile admin shell so the hamburger and close controls share the exact same fixed position, while the light dashboard header also stays sticky beneath the black topbar.
- Replaced the complete reviews section with an image slider while keeping the green introduction block as editable homepage copy.
- Migrated the homepage gallery from Swiper to Embla Carousel with autoplay and an opacity-based active-slide emphasis effect.
- Removed gallery thumbnails, added left/right navigation buttons plus progress dots, and kept the interactions in the same full-width gallery module.
- Expanded the `Uit de vitrine` gallery to a full-width, full-bleed presentation and removed the remaining side spacing so the slider reaches the viewport edges.
- Added a desktop max-height cap to the `Uit de vitrine` slider media so the gallery remains bold but no longer appears oversized on larger monitors.
- Expanded the slider content model and admin gallery editor to 5 slides, including a fifth upload slot and fifth editable alt/src pair so editors can fully manage all 5 photos from the portal.
- Resolved a Next.js server-actions runtime failure on the Overig content save flow by moving the image-upload action state object/type into a dedicated non-`"use server"` module.
- Removed the grouped-admin "Navigatie en snelle acties" edit section so navigation labels, header CTA labels, and social-link labels are no longer user-editable and remain code-managed defaults.
- Removed the grouped-admin `Homepage en SEO` edit section so homepage metadata and the brand tagline are no longer user-editable and remain code-managed defaults.
- Added auto-scroll-to-top behavior for grouped admin content forms after save completion so editors always see the success/error status message without manual scrolling.
- Refined grouped admin form scrolling so it now scrolls the full page to absolute top only when save succeeds, avoiding scroll jumps on non-success statuses.
- Removed `visitContact.routeLabel` from both CMS editing and frontend rendering so the extra "Plan je route" CTA is no longer shown in the final landing-page section.
- Updated final-section CTA presentation so `Plan je route` is shown first with primary orange styling, while `Bel direct` remains visible as a non-orange secondary action.
- Updated gallery slider image sizing/rendering by aligning `next/image` `sizes` with Embla slide-width breakpoints and increasing slide basis on medium/large viewports.
- Fixed a desktop gallery rendering artifact where right-side white space could appear inside the active slide by ensuring `.gallery-main-media` spans the full slide-card width.
- Increased desktop gallery media height slightly so the slider appears more prominent while retaining the existing max-height cap behavior.
- Resolved npm audit findings by updating dependency resolution for `drizzle-kit`/`esbuild`, removing the previously reported moderate vulnerabilities.
- Tightened the shared admin form field alignment so multiline text areas and neighboring controls line up consistently across the content pages.
- Added a dedicated admin page to manage the slider intro text and gallery images separately from the other homepage content.
- Added server-side validation, authorization re-checks, audit logging, default seeding, and route revalidation around content writes.
- Added repo-root deployment artifacts for VPS rollout: a `deploy/compose.yml`, a `deploy/deploy.sh` runner, and a `deploy-azure-vps.yml` workflow that syncs those files to the server and deploys a specific GHCR image tag.
- Updated the deployment compose defaults so the VPS publishes the app on host port `3001` unless `APP_PORT` is explicitly overridden.
- Added beginner-friendly inline documentation to `deploy/deploy.sh` so the remote deployment flow is easier to understand for Bash newcomers without changing its behavior.
- Updated the GitHub workflow checkout steps from `actions/checkout@v4` to `actions/checkout@v6` to align the repository with Node 24-compatible GitHub Actions runtimes.
- Refreshed `README.md` so it now reflects the admin CMS, SQLite/Drizzle setup, database scripts, and GitHub Actions VPS deployment workflow.

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
  - `src/web/lib/content/content-keys.ts`
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
- The homepage slider now uses Embla Carousel (`embla-carousel-react`) with `embla-carousel-autoplay`; slide prominence is handled through CSS opacity states, while navigation and progress controls are rendered in the section UI.
- Upload action state types/defaults now live in `src/web/lib/content/content-image-upload-action-state.ts`, while `src/web/lib/content/content-actions.ts` only exports async server functions to satisfy Next.js server action constraints.
- `navItems.*.label`, `primaryActions.*.label`, and `socialLinks.*.label` are no longer part of editable grouped-content fields, so runtime rendering always uses the static defaults from `default-site-content.ts`.
- `metadata.*` and `brand.tagline` are no longer part of editable grouped-content fields, so public metadata/tagline rendering always uses the static defaults from `default-site-content.ts`.
- `ContentSectionEditorForm` now uses `window.scrollTo({ top: 0 })` on successful save status, ensuring deterministic full-page top positioning.
- The `VisitContactContent` contract no longer includes `routeLabel`, and `VisitContactSection` now renders only the configured `primaryActions`.
- `VisitContactSection` now applies section-specific CTA ordering/styling: route action first (`header-visit-button` -> primary) and call action after it (`header-call-button` -> secondary).
- Gallery slide `Image` components now use responsive `sizes` (`74vw/80vw/90vw`) that match actual layout width and remove the Next.js performance warning.
- `.gallery-main-media` now has explicit `width: 100%`, preventing aspect-ratio/height interactions from shrinking media width inside wider desktop slides.
- Desktop gallery media sizing now uses `min-height: 26rem`, `height: min(36vw, 32rem)`, and `max-height: 32rem` for a taller but still controlled presentation.
- `package.json` now enforces `drizzle-kit: 0.31.10` plus `overrides.esbuild: 0.28.0`, and `package-lock.json` has been refreshed accordingly.
- The VPS deployment flow expects a server-local `deploy/.env` file that is not committed; `.gitignore` now ignores `deploy/.env*` to reduce accidental secret commits.
