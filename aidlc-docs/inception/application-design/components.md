# Components

## Design Summary
- **Storage choice**: Normalized key/value content-entry model with separate rows for repeated collections
- **Write orchestration**: Protected server actions attached to admin pages
- **Audit detail**: Before/after snapshots recorded per save, alongside actor and timestamp

## Component 1: Content Schema Layer
- **Purpose**: Define the SQLite/Drizzle tables and typed persistence structures for editable landing-page content.
- **Responsibilities**:
  - Define keyed content-entry storage for plain-text fields
  - Define repeated-item storage for opening hours, reviews, and other list-based content
  - Define audit-log storage for content updates
- **Interfaces**:
  - Drizzle table definitions
  - Schema exports for query and migration code

## Component 2: Content Repository Layer
- **Purpose**: Provide low-level database read/write operations behind a focused server-side interface.
- **Responsibilities**:
  - Fetch content entries and repeated-item rows
  - Persist grouped updates and section-specific updates
  - Persist audit records for mutations
  - Support seed initialization checks
- **Interfaces**:
  - Repository functions returning typed persistence records
  - Repository update functions scoped to grouped content, opening hours, and featured taste

## Component 3: Landing Content Mapper
- **Purpose**: Convert normalized stored content into the existing `LandingPageContent` shape used by the public site.
- **Responsibilities**:
  - Merge keyed content entries and repeated-item rows into the existing nested page model
  - Apply code-managed values for URLs, image paths, and other out-of-scope fields
  - Provide deterministic defaults when seeded data is present
- **Interfaces**:
  - Mapping functions from persistence records to `LandingPageContent`
  - Mapping helpers for admin form view models

## Component 4: Public Content Reader
- **Purpose**: Serve DB-backed landing-page content to the public route and metadata generation.
- **Responsibilities**:
  - Load content through the repository and mapper
  - Provide a stable read path for page rendering
  - Provide a stable read path for metadata generation
- **Interfaces**:
  - Public page content loader
  - Metadata content loader

## Component 5: Admin Content Management Pages
- **Purpose**: Present protected admin editing interfaces for grouped content, opening hours, and featured taste.
- **Responsibilities**:
  - Render server-side forms with existing content values
  - Bind forms to protected server actions
  - Surface success and validation feedback in a plain, functional UI
- **Interfaces**:
  - Grouped content page under `/admin/content`
  - Opening-hours page under `/admin/content/opening-hours`
  - Taste-of-the-week page under `/admin/content/taste-of-the-week`

## Component 6: Protected Content Mutation Actions
- **Purpose**: Enforce validation, authorization, persistence, and audit logging for content updates.
- **Responsibilities**:
  - Re-check admin authorization on every mutation
  - Validate submitted strings and repeated-item payloads
  - Persist content changes through the repository layer
  - Write before/after audit snapshots
  - Trigger cache refresh/revalidation for public reads
- **Interfaces**:
  - Grouped content update action
  - Opening-hours update action
  - Featured-taste update action

## Component 7: Seed and Initialization Layer
- **Purpose**: Initialize first-time content using the current landing-page copy.
- **Responsibilities**:
  - Detect whether the content store is empty
  - Populate default entries and repeated items only once
  - Keep seed content aligned with the initial public page experience
- **Interfaces**:
  - Seed runner
  - Empty-store initialization check

## Component 8: Content Audit Layer
- **Purpose**: Capture auditable records of content changes.
- **Responsibilities**:
  - Record actor identity, mutation target, timestamp, and before/after snapshots
  - Keep audit detail server-side only
  - Support future inspection or troubleshooting needs
- **Interfaces**:
  - Audit record writer
  - Audit record schema
