# User Stories

## Story Organization
- **Method**: Hybrid feature-based sections written from persona journeys
- **Granularity**: Lean stories with strong acceptance criteria

## Story 1: Public Landing-Page Content Rendering
**Persona**: Public Visitor

**User Story**:  
As a public visitor, I want the landing page to show current shop text from the managed content store, so that I can rely on the information I read.

**Value**:
- Keeps public-facing information current without requiring code changes
- Preserves a stable visitor experience while the content source moves to SQLite

**Acceptance Criteria**:
- The landing page reads its plain-text content from the SQLite-backed content store rather than the old hardcoded source.
- The public page continues to render the existing sections in the expected layout and order.
- When the database has only seeded default content, the landing page still renders successfully with sensible text.
- URL-like values that are out of scope for editing remain code-managed and continue to work.
- If content loading fails, the user-facing experience remains controlled and does not expose stack traces, internal file paths, or database internals.

## Story 2: Grouped Landing-Page Text Management
**Persona**: Authenticated Admin Content Editor

**User Story**:  
As an authenticated admin, I want one grouped content page for the main landing-page text, so that I can update most public copy from one place without a complex CMS.

**Value**:
- Minimizes admin friction for routine copy changes
- Matches the request for a plain, functional UX

**Acceptance Criteria**:
- Only authenticated, authorized admins can access the grouped content-management page.
- The page loads existing values for the in-scope grouped plain-text fields.
- The page provides a simple editing interface with a straightforward save flow.
- Submitted values are validated server-side for expected type, size, and safe text handling before persistence.
- Saving updates the stored content without requiring source-code edits or application rebuilds.
- The save path does not allow unauthorized access and does not rely on client-side hiding alone.

## Story 3: Opening Hours Management
**Persona**: Authenticated Admin Content Editor

**User Story**:  
As an authenticated admin, I want a dedicated opening-hours page, so that I can quickly update weekly hours without searching through unrelated copy.

**Value**:
- Gives a focused workflow for a frequently changed operational section
- Separates structured hours editing from broader marketing text

**Acceptance Criteria**:
- Only authenticated, authorized admins can access the opening-hours management page.
- The page shows the current opening-hours entries from the content store.
- The admin can update each day’s displayed hours through a focused workflow.
- Server-side validation prevents malformed or unsafe submitted values from being stored.
- Saved hours are reflected on the public landing page after persistence.
- The seed process initializes opening-hours data only when the content store is empty and does not overwrite later admin changes.

## Story 4: Taste-of-the-Week Management
**Persona**: Authenticated Admin Content Editor

**User Story**:  
As an authenticated admin, I want a dedicated taste-of-the-week page, so that I can keep the featured flavor messaging current without editing unrelated content.

**Value**:
- Supports a focused update path for time-sensitive featured content
- Keeps the first version simple while still supporting a distinct editing need

**Acceptance Criteria**:
- Only authenticated, authorized admins can access the taste-of-the-week management page.
- The page loads the current featured-taste text values from the content store.
- The admin can update the featured taste text through a simple save workflow.
- Submitted values are validated server-side before storage.
- Saved updates are reflected in the public featured-taste section.
- The feature preserves current non-text assets and code-managed configuration associated with the section.

## Cross-Cutting Story Criteria
- Content changes are auditable enough to determine what changed and when, and should capture the acting admin when practical.
- The implementation keeps authentication and authorization concerns isolated in dedicated modules.
- Database access uses Drizzle ORM with parameterized operations rather than handwritten string SQL.
- The solution remains easy to extend with more editable fields later.
- The resulting stories are:
  - **Independent** enough to guide implementation in slices
  - **Negotiable** in UI details while fixed on outcomes
  - **Valuable** to either the admin or the public visitor
  - **Estimable** because each story has a bounded workflow
  - **Small** enough for this feature scope
  - **Testable** through explicit acceptance criteria
