# Application Design

## Overview

The feature will extend the existing `src/web` Next.js application with a minimal DB-backed content-management architecture:
- normalized keyed storage for editable plain-text content,
- protected server actions for admin writes,
- a mapper-driven read path that preserves the existing `LandingPageContent` rendering contract,
- audit logging with before/after snapshots.

This design intentionally avoids a generic CMS layer and keeps the implementation aligned with the existing app structure and Auth.js-based admin access.

## Core Design Decisions
- **Content storage**: normalized key/value entries plus separate ordered rows for repeated sections such as opening hours and reviews
- **Protected write path**: server actions attached to protected admin pages
- **Audit detail**: actor, section/page, timestamp, and before/after snapshots per save
- **Public contract preservation**: the existing landing-page component tree still consumes `LandingPageContent`
- **Code-managed values**: URLs, phone/map destinations, image paths, and similar non-text configuration remain in code

## Components

### Content Schema Layer
- Defines the Drizzle schema for editable content and audit data.

### Content Repository Layer
- Owns low-level persistence reads/writes.

### Landing Content Mapper
- Converts normalized records into the current nested landing-page content model.

### Landing Content Service
- Provides the public and metadata read path.

### Admin Content Query Service
- Provides page-specific form models for admin pages.

### Admin Content Mutation Service
- Orchestrates authorization-aware writes, validation, persistence, audit logging, and revalidation.

### Protected Content Mutation Actions
- Connect protected admin forms to the mutation service through server actions.

### Seed and Initialization Layer
- Initializes default content only when the store is empty.

### Content Audit Layer
- Persists auditable content-change records.

## Service Boundaries
- Public rendering depends only on read-focused services.
- Admin reads and admin writes are separated so validation and auditing stay explicit.
- Persistence details stay beneath the repository layer.
- Existing auth helpers remain the single source of truth for portal authorization.

## Admin Route Design
- `/admin/content`
  - grouped content page for most landing-page text
- `/admin/content/opening-hours`
  - focused weekly hours management
- `/admin/content/taste-of-the-week`
  - focused featured-taste management

This route split matches the approved UX while remaining easy to extend later.

## High-Level Method Surface
- `getLandingPageContent()`
- `getLandingMetadataContent()`
- `toGroupedContentFormModel()`
- `toOpeningHoursFormModel()`
- `toFeaturedTasteFormModel()`
- `saveGroupedContentAction(formData)`
- `saveOpeningHoursAction(formData)`
- `saveFeaturedTasteAction(formData)`
- `initializeSeedContent()`
- `recordContentAuditEntry(input)`

Detailed signatures are documented in `component-methods.md`.

## Dependency and Communication Model
- Public route -> Landing Content Service -> repository + mapper
- Metadata loader -> Landing Content Service -> repository + mapper
- Admin pages -> Admin Content Query Service -> repository + mapper
- Admin forms -> protected server actions -> auth + validation + mutation service
- Mutation service -> repository + audit layer + revalidation

## Security and Reliability Considerations
- Every mutation re-checks server-side admin authorization.
- Every mutation validates user input before persistence.
- All persistence uses Drizzle-backed parameterized operations.
- Audit snapshots provide a record of what changed and when.
- Public error behavior remains controlled and must not expose DB internals.
- Seed logic only initializes an empty store and never overwrites later edits.

## Design Consistency Check
- **Requirements fit**: Yes. The design covers DB-backed public reads, protected admin writes, seed behavior, metadata continuity, and auditability.
- **Story fit**: Yes. The design directly supports the grouped content page, opening-hours page, featured-taste page, and stable public rendering story.
- **Simplicity fit**: Yes. It keeps one application package, a small set of services, and no generic CMS abstraction.
- **Security fit**: Yes. Auth checks, validation, safe persistence, and audit logging are first-class concerns in the write path.
