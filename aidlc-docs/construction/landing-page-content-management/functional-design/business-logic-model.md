# Business Logic Model

## Functional Scope
This unit manages the full lifecycle of editable landing-page text:
- initialize default content when the store is empty,
- load normalized content into the public landing-page model,
- expose protected admin edit flows,
- validate and persist content changes,
- record auditable before/after snapshots.

## Core Functional Flows

### Flow 1: First-Time Initialization
1. The application or setup command checks whether editable content exists.
2. If no content exists, the seed source derived from the current static landing-page copy is transformed into normalized entries.
3. The seed data is inserted once.
4. Future runs do not overwrite any existing admin-managed content.

### Flow 2: Public Content Read
1. A public request for the landing page or metadata triggers the content read flow.
2. Normalized keyed entries and repeated-item records are loaded.
3. Stored text is mapped into the existing `LandingPageContent` structure.
4. Code-managed URLs, image paths, and similar non-editable values are layered back in.
5. The page or metadata is rendered from the assembled model.

### Flow 3: Grouped Content Update
1. An authorized admin opens the grouped content page.
2. Existing grouped text fields are loaded into a form model.
3. The admin submits changes through a protected server action.
4. The mutation flow re-checks authorization, validates input, captures before-state, persists changes, writes an audit entry, and triggers revalidation.

### Flow 4: Opening Hours Update
1. An authorized admin opens the opening-hours page.
2. Ordered day/hour rows are loaded into the page.
3. The admin updates one or more day/hour values.
4. The mutation flow validates structure and text constraints, persists the ordered rows, records before/after snapshots, and triggers revalidation.

### Flow 5: Taste-of-the-Week Update
1. An authorized admin opens the featured-taste page.
2. The current featured-taste fields are loaded into a dedicated form model.
3. The admin submits updates through a protected server action.
4. The mutation flow validates input, persists keyed values, records the audit snapshot, and triggers revalidation.

## Transformation Logic
- Stored content is normalized for persistence but denormalized for rendering.
- Repeated data keeps a stable ordering field so the public page can reconstruct ordered sections.
- Form submissions are converted into a canonical update payload before persistence.
- Audit snapshots capture the business-level before and after values associated with each save.

## Read/Write Separation
- Public rendering is read-only and must never depend on admin form state.
- Admin query behavior prepares form-ready models for editors.
- Admin mutation behavior is distinct and always goes through validation and audit recording.

## Controlled Failure Behavior
- Public read failures must degrade in a controlled way and must not reveal database internals.
- Validation failures return user-facing form feedback rather than partial writes.
- Authorization failures block writes before persistence begins.
- Audit failure handling must not silently drop security-relevant information; write success and audit persistence should be treated as one protected workflow.
