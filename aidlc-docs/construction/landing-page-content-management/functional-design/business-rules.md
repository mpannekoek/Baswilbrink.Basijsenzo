# Business Rules

## Authorization Rules
- Only authenticated users already authorized for the control portal may access content-management pages.
- Every mutation must re-check server-side authorization even if the page was already protected.
- Unauthorized or unauthenticated mutation attempts must not modify content.

## Content Scope Rules
- Only public-facing plain-text content is editable in this version.
- URLs, phone/map destinations, image paths, styling, and layout configuration remain code-managed.
- The grouped content page contains most text fields, while opening hours and featured taste are edited on dedicated pages.

## Seed Rules
- Seed content is inserted only when the content store is empty.
- Seed runs must never overwrite existing admin edits.
- Seed content must reflect the current baseline landing-page copy so first-time setup remains coherent.

## Validation Rules
- Every editable field must be treated as plain text input.
- All submitted text must be validated server-side for expected type and reasonable length bounds.
- HTML/script content must be rejected or normalized so stored content cannot introduce rendered script injection.
- Opening-hours updates must preserve the expected day ordering and one displayed value per day.
- Featured-taste updates must preserve the required set of text fields needed for the public section to render coherently.

## Persistence Rules
- All updates must use parameterized Drizzle-backed persistence operations.
- Grouped content writes must update only the targeted grouped fields.
- Opening-hours writes must update the opening-hours records as an ordered set.
- Featured-taste writes must update only the targeted featured-taste fields.
- The persisted content model must remain easy to extend with new text fields later.

## Audit Rules
- Every successful content mutation must record:
  - the acting admin,
  - the target page/section,
  - the mutation timestamp,
  - the before snapshot,
  - the after snapshot.
- Audit information must remain server-side only.
- Audit logging must avoid secrets and unrelated personal data.

## Public Rendering Rules
- Public page rendering must continue to use the existing `LandingPageContent` contract.
- Metadata generation must use the same authoritative content source as page rendering.
- Public failures must return controlled behavior without exposing stack traces, internal paths, or database details.

## Consistency Rules
- After a successful write, stale public content must be refreshed through revalidation or equivalent cache-refresh behavior.
- The same stored values must drive both admin readback and public rendering to avoid divergent content.
