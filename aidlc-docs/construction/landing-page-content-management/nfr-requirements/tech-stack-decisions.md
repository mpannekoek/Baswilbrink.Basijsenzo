# Tech Stack Decisions - landing-page-content-management

## Decision 1: Persistence Stack
- **Choice**: SQLite with Drizzle ORM
- **Rationale**:
  - Matches the explicit project requirement
  - Keeps the first version simple and local to the existing application
  - Supports a lightweight schema + migration workflow without extra service dependencies

## Decision 2: Application Framework Continuity
- **Choice**: Keep Next.js App Router and the existing `src/web` application structure
- **Rationale**:
  - Preserves current routing, rendering, and deployment assumptions
  - Avoids unnecessary structural churn for a bounded feature

## Decision 3: Authentication and Authorization Foundation
- **Choice**: Reuse existing Auth.js/NextAuth session handling and `getAdminAccessDecision` authorization logic
- **Rationale**:
  - Preserves the current allowlist-based admin access boundary
  - Keeps security-critical logic centralized in existing auth modules

## Decision 4: Protected Write Mechanism
- **Choice**: Protected server actions attached to admin pages
- **Rationale**:
  - Fits the existing Next.js application model
  - Keeps write flows close to the protected admin routes without requiring a separate API surface
  - Still allows shared server-side services for validation and persistence

## Decision 5: Content Modeling Strategy
- **Choice**: Normalized keyed content entries plus separate repeated-item rows
- **Rationale**:
  - Supports extensibility for future editable fields
  - Keeps repeated data like opening hours and reviews ordered and explicit
  - Avoids a monolithic JSON blob that would be harder to validate and audit cleanly

## Decision 6: Public Rendering Contract
- **Choice**: Preserve the existing `LandingPageContent` model for rendering
- **Rationale**:
  - Minimizes changes to the presentational landing-page component tree
  - Keeps the migration from static to dynamic content focused below the UI layer

## Decision 7: Audit Strategy
- **Choice**: Persist before/after snapshots together with actor, target, and timestamp
- **Rationale**:
  - Meets the approved audit-detail requirement
  - Supports troubleshooting and future admin accountability needs

## Decision 8: Validation Strategy
- **Choice**: Server-side validation for all writes, with optional client-side hints only for usability
- **Rationale**:
  - Satisfies the enabled security baseline
  - Keeps trust boundaries clear for protected content mutations

## Decision 9: Caching / Freshness Strategy
- **Choice**: Revalidation or equivalent cache-refresh behavior after successful writes
- **Rationale**:
  - Ensures public readers see updated content after admin saves
  - Fits the App Router rendering model better than relying on manual restarts or rebuilds

## Decision 10: Testing Stack Continuity
- **Choice**: Continue with the existing Vitest + Testing Library setup
- **Rationale**:
  - Reuses the current test harness
  - Keeps the feature aligned with the existing codebase conventions
