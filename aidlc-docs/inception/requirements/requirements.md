# Requirements

## Intent Analysis Summary
- **User request**: Extend the existing AI-DLC-generated Node.js application so authenticated admins can manage plain-text landing-page content from the existing control portal.
- **Request type**: New feature / enhancement
- **Scope estimate**: Multiple components in one application package
- **Complexity estimate**: Moderate
- **Brownfield context**: Existing Next.js application with a static landing page, an Auth.js-protected admin portal, and no database layer yet

## Goals
- Allow authenticated admins who already have control-portal access to manage the plain-text content shown on the public landing page.
- Keep the implementation simple, reliable, and easy to extend.
- Reuse the current app structure, existing Auth.js authorization flow, and current landing-page rendering components where possible.

## Confirmed Decisions From Requirements Questions
- All public-facing plain-text landing-page content is in scope for editing.
- URL-like values stay in code for this first version; only labels and text content move into the CMS.
- Admin workflow uses:
  - one shared page for most landing-page text,
  - one separate `Opening Hours` page,
  - one separate `Taste of the Week` page.
- Seed content should populate the database only when the content table is empty and must never overwrite admin edits afterward.
- Security extension rules are enabled and must be enforced as blocking constraints.
- Property-based testing rules are disabled for this project.

## Functional Requirements

### FR-1 Public content source
- The public landing page must load its displayed plain-text content from a SQLite database instead of the current hardcoded content module.
- The solution must preserve the existing public page structure and visual layout unless a small implementation-driven adjustment is required.
- The landing page must continue to render successfully when seeded default content is the only content present.

### FR-2 Content model
- The database model must support all current plain-text fields rendered on the public landing page.
- The content model must remain straightforward and easy to extend when more editable text fields are added later.
- URL-like values, image paths, and layout/styling configuration must remain code-managed in this first version.

### FR-3 Admin access control
- Only authenticated users who already pass the existing control-portal authorization checks may read or update content-management pages and actions.
- No unauthenticated or unauthorized user may update landing-page content.
- Admin content update flows must reuse the existing Auth.js session handling and allowlist-based authorization boundary.

### FR-4 Admin editing workflow
- The control portal must expose a clear navigation path to content management.
- The first version must provide:
  - one grouped page for most landing-page text fields,
  - one dedicated page for opening hours,
  - one dedicated page for the taste-of-the-week content.
- Each page must provide a plain and functional editing experience with straightforward save behavior.
- Admins must be able to update existing content without touching source code.

### FR-5 Persistence and defaults
- The system must include Drizzle ORM schema definitions for the SQLite content store.
- The system must include Drizzle migration setup for creating the required tables.
- The system must include seed data derived from the current landing-page copy.
- Seed execution must be idempotent in the sense that it only initializes an empty content store and does not overwrite existing edits.

### FR-6 Data access layer
- The implementation must include a small query/data access layer that separates:
  - database schema and configuration,
  - data loading and update operations,
  - landing-page rendering,
  - admin route/page logic.
- The data access layer must expose a reliable way to:
  - fetch content for public rendering,
  - fetch content for admin forms,
  - update grouped content sections,
  - update opening hours,
  - update taste-of-the-week content.

### FR-7 Metadata continuity
- Public metadata that currently depends on the landing-page content must continue to work after the content source moves to SQLite.
- The metadata implementation must remain compatible with the chosen server-side loading approach.

### FR-8 Testing
- The feature must include automated test coverage for the new content-management behavior at an appropriate level for this application.
- Existing public-page and admin-portal tests must be updated where necessary to reflect the new content-loading path and admin route structure.

## Non-Functional Requirements

### NFR-1 Simplicity and maintainability
- Prefer the smallest viable architecture that cleanly fits the current application.
- Avoid introducing unnecessary frameworks, generic CMS abstractions, or flexible page-builder concepts.
- Keep the code understandable for future extension by developers working in this codebase.

### NFR-2 Security
- All content write operations must enforce server-side authentication and authorization.
- All content update inputs must be validated server-side for type, bounds, and allowed format before persistence.
- Database operations must use parameterized Drizzle queries rather than string-built SQL.
- The implementation must not expose secrets, session data, or sensitive identifiers in logs.
- Existing HTTP security headers and current public-route hardening must remain intact.

### NFR-3 Reliability
- The system must provide sensible default content for first-time setup so the public page remains functional on a fresh database.
- Failures to load editable content should degrade in a controlled manner that keeps diagnosis possible without exposing internal details to end users.

### NFR-4 Extensibility
- The content schema and mapping approach should make it easy to add more editable text fields later without a major redesign.
- The admin route structure should be simple to grow if more dedicated content pages are added later.

## Security Requirements Derived From Enabled Extension

### SR-1 Application-level access control
- All admin content pages and any server-side update handlers must deny access by default and require the existing admin authorization decision.
- Privileged operations must be enforced server-side, not only hidden in the client UI.

### SR-2 Input validation and injection prevention
- Every content update path must validate user-submitted strings for expected type and reasonable maximum length.
- HTML or script input must be rejected or safely normalized so stored content cannot introduce script injection into the rendered site.
- All persistence operations must use Drizzle APIs or parameterized SQL generated by Drizzle.

### SR-3 Logging hygiene
- Authentication and content-management logs must avoid secrets, tokens, and unnecessary personal data.
- Content update logging must be structured and must not expose full sensitive request payloads.

### SR-4 Data protection and credential hygiene
- The SQLite database file must remain server-side only and must not be exposed directly to clients.
- The deployment approach for the SQLite file and any persisted backups must use encrypted storage provided by the hosting environment.
- No hardcoded credentials, secrets, or database connection secrets may be introduced as part of this feature.

### SR-5 Auditability of content changes
- Content mutations are considered important business changes and must be auditable.
- The implemented solution must record enough information to know what content changed and when.
- If practical within the existing app structure, the solution should also capture which authenticated admin performed the change.

### SR-6 Authentication and session continuity
- The feature must continue to rely on the existing Auth.js configuration for admin authentication and secure session handling.
- The implementation must not weaken the current authentication posture and must remain compatible with provider-managed MFA or account protections for admin users.

### SR-7 Error handling and hardening
- Content-management failures must return generic end-user errors and must not expose stack traces, internal file paths, or database internals in browser responses.
- The implementation must continue to use supported framework and dependency versions compatible with the current application stack.

### SR-8 Supply-chain hygiene
- New dependencies added for SQLite and Drizzle must be necessary, pinned through the existing lock file, and sourced from standard package registries.
- Build/test instructions must include vulnerability scanning or a documented dependency-check step.

### SR-9 Secure design continuity
- Authentication and authorization logic must remain isolated in dedicated modules.
- The design must continue to use layered controls: auth checks plus validation plus safe persistence.
- Existing public-route rate limiting and security headers must remain in place after the feature is added.

## Out of Scope
- Styling or layout editing
- Media uploads or asset management
- Visual page builder functionality
- Editing route destinations, map URLs, phone hrefs, image sources, or other non-text configuration values
- Multi-page CMS support beyond the current landing page

## Assumptions
- A local SQLite database file is acceptable for the target deployment model of this application.
- The current landing-page component structure should remain largely intact, with data loading adapted underneath it.
- The current admin access model is sufficient for the first version and does not need new roles beyond the existing allowlist-based access.

## Key Architectural Direction
- Introduce Drizzle + SQLite as a small server-side persistence layer inside `src/web`.
- Keep presentational landing-page components as they are and adapt the data source/mapping layer.
- Add a protected content-management route structure under the existing admin portal.
- Use a straightforward content-sections/keyed-values approach that maps database values back into the existing `LandingPageContent` shape for rendering.

## Requirements Depth Assessment
- **Selected depth**: Standard
- **Reasoning**: The request is clear and bounded, but it affects persistence, admin workflow, public rendering, metadata, and security controls, so more than minimal documentation is warranted.
