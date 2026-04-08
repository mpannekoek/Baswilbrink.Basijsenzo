# Code Generation Plan - landing-page-content-management

## Single Source Of Truth
- This plan is the single source of truth for Code Generation Part 2 for `landing-page-content-management`.
- Application code changes must be made in `/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web`, never in `aidlc-docs/`.
- Stage documentation created during generation belongs in `aidlc-docs/construction/landing-page-content-management/code/`.

## Unit Context
- **Unit**: `landing-page-content-management`
- **Stories implemented by this unit**:
  - [x] Story 1: Public landing-page content rendering
  - [x] Story 2: Grouped landing-page text management
  - [x] Story 3: Opening Hours management
  - [x] Story 4: Taste-of-the-Week management
- **Dependencies on existing modules**:
  - `src/web/types/site.ts`
  - `src/web/lib/auth/admin-access.ts`
  - `src/web/lib/auth/config.ts`
  - `src/web/lib/auth/logging.ts`
  - `src/web/lib/auth/navigation.ts`
  - `src/web/app/page.tsx`
  - `src/web/lib/site/metadata.ts`
  - `src/web/lib/site/security-headers.ts`
  - `src/web/proxy.ts`
  - `src/web/components/landing/*`
  - `src/web/components/admin/*`
  - `src/web/tests/landing-page/page.test.tsx`
  - `src/web/tests/admin-portal/admin-portal.test.tsx`
- **Expected interfaces and contracts**:
  - Public rendering and metadata continue to consume one authoritative `LandingPageContent` source.
  - Protected admin pages live under `src/web/app/admin/(protected)/content/`.
  - Mutations use protected server actions with server-side validation, authorization, audit capture, and revalidation.
  - URL-like values, image paths, and layout configuration remain code-managed in this first version.
- **Database entities owned by this unit**:
  - keyed landing-page content entries
  - ordered opening-hours entries
  - ordered review entries
  - content audit entries
- **Service boundaries and responsibilities**:
  - persistence config and schema
  - repository and audit writes
  - mapping and public-read services
  - admin read models, validation, and mutation actions
  - admin routes and form components
  - automated tests and code-stage documentation

## Exact Paths
- **Existing files expected to be modified**:
  - `src/web/package.json`
  - `src/web/package-lock.json`
  - `src/web/app/page.tsx`
  - `src/web/app/layout.tsx`
  - `src/web/lib/site/metadata.ts`
  - `src/web/lib/auth/navigation.ts`
  - `src/web/app/admin/(protected)/page.tsx`
  - `src/web/lib/content/site-content.ts`
  - `src/web/tests/landing-page/page.test.tsx`
  - `src/web/tests/admin-portal/admin-portal.test.tsx`
- **New files/directories expected to be created**:
  - `deploy/compose.yml`
  - `deploy/deploy.sh`
  - `.github/workflows/deploy-azure-vps.yml`
  - `src/web/drizzle.config.ts`
  - `src/web/drizzle/`
  - `src/web/lib/db/client.ts`
  - `src/web/lib/db/schema.ts`
  - `src/web/lib/content/content-keys.ts`
  - `src/web/lib/content/default-site-content.ts`
  - `src/web/lib/content/content-repository.ts`
  - `src/web/lib/content/content-mappers.ts`
  - `src/web/lib/content/public-content.ts`
  - `src/web/lib/content/admin-content.ts`
  - `src/web/lib/content/content-validation.ts`
  - `src/web/lib/content/content-actions.ts`
  - `src/web/lib/content/content-seed.ts`
  - `src/web/components/admin/content-form-shell.tsx`
  - `src/web/components/admin/grouped-content-form.tsx`
  - `src/web/components/admin/opening-hours-form.tsx`
  - `src/web/components/admin/featured-taste-form.tsx`
  - `src/web/app/admin/(protected)/content/page.tsx`
  - `src/web/app/admin/(protected)/content/opening-hours/page.tsx`
  - `src/web/app/admin/(protected)/content/taste-of-the-week/page.tsx`
  - `src/web/tests/content-management/content-services.test.ts`
  - `src/web/tests/content-management/content-actions.test.ts`
  - `aidlc-docs/construction/landing-page-content-management/code/implementation-summary.md`

## Execution Steps
- [x] Step 1: Update `src/web/package.json` and `src/web/package-lock.json` with pinned SQLite/Drizzle dependencies and add migration/seed scripts that fit the existing npm workflow.
- [x] Step 2: Create persistence configuration in `src/web/drizzle.config.ts`, add the schema and database client in `src/web/lib/db/`, and create the `src/web/drizzle/` migration location used by the feature.
- [x] Step 3: Refactor the static landing-page content baseline into `src/web/lib/content/default-site-content.ts`, keep code-managed values in code, and narrow `src/web/lib/content/site-content.ts` to compatibility/default responsibilities needed by the new content system.
- [x] Step 4: Implement the content repository, content keys, seed/bootstrap logic, audit persistence, and canonical mappers in `src/web/lib/content/` so Story 1, Story 2, Story 3, and Story 4 all share one authoritative data model.
- [x] Step 5: Implement public-read services in `src/web/lib/content/public-content.ts`, then update `src/web/app/page.tsx`, `src/web/lib/site/metadata.ts`, and `src/web/app/layout.tsx` so public rendering and metadata load from the database-backed source without weakening existing security headers or public rate limiting.
- [x] Step 6: Implement admin read models, validation, and protected mutation actions in `src/web/lib/content/admin-content.ts`, `src/web/lib/content/content-validation.ts`, and `src/web/lib/content/content-actions.ts`, including authorization re-checks, bounded plain-text validation, audit snapshots, generic error handling, and post-write revalidation.
- [x] Step 7: Add the protected content-management UI under `src/web/app/admin/(protected)/content/` plus focused admin form components in `src/web/components/admin/`, each with stable `data-testid` attributes and straightforward success/error feedback for grouped content, opening hours, and taste-of-the-week workflows.
- [x] Step 8: Update `src/web/lib/auth/navigation.ts` and `src/web/app/admin/(protected)/page.tsx` so the portal clearly exposes the new content-management entry points while keeping the existing protected admin shell and Auth.js access boundary intact.
- [x] Step 9: Add or update automated tests in `src/web/tests/landing-page/`, `src/web/tests/admin-portal/`, and `src/web/tests/content-management/` to cover public DB-backed rendering, protected admin reads/writes, validation failures, and audit/revalidation behavior where practical in the current test setup.
- [x] Step 10: Create `aidlc-docs/construction/landing-page-content-management/code/implementation-summary.md` summarizing the final code changes, story coverage, test additions, and any follow-up notes needed for Build and Test.
- [x] Step 11: Add deployment artifacts for the existing published container flow by creating `deploy/compose.yml`, `deploy/deploy.sh`, and `.github/workflows/deploy-azure-vps.yml`, ensuring the VPS deploy path can pull the requested GHCR image, persist SQLite and upload data, enforce required runtime env validation, and run `docker compose up` non-interactively.
- [x] Step 12: Adjust the deployment compose defaults so the application is exposed on host port `3001` by default while the container continues listening on port `3000`.
- [x] Step 13: Add beginner-friendly inline documentation to `deploy/deploy.sh` so the VPS deployment flow is easier to understand without changing its behavior.
- [x] Step 14: Update the GitHub workflow checkout action versions to a Node 24-compatible release so the repository no longer relies on `actions/checkout@v4`.
- [x] Step 15: Remove `aidlc-docs` references from `README.md` so the repository README stays focused on the application and deployment surface.
- [x] Step 16: Refresh `README.md` so its overview, structure, scripts, and deployment notes match the current application, CMS, and VPS workflow.

## Story Traceability
- **Story 1** is primarily delivered by Steps 3, 4, 5, and 9.
- **Story 2** is primarily delivered by Steps 4, 6, 7, 8, and 9.
- **Story 3** is primarily delivered by Steps 4, 6, 7, and 9.
- **Story 4** is primarily delivered by Steps 4, 6, 7, and 9.

## Notes
- Brownfield rule: existing files will be modified in place; no duplicate `*_new` or `*_modified` files may be created.
- Security baseline enforcement remains mandatory during generation, especially for authorization, validation, logging hygiene, controlled errors, auditability, and dependency pinning.
- Build execution is deferred to the separate Build and Test stage, but generation must leave the app and tests in a ready-to-run state.
