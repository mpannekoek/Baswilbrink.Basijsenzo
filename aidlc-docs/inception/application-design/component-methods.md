# Component Methods

## Content Schema Layer

### `defineContentEntrySchema()`
- **Purpose**: Provide the keyed plain-text table definition
- **Input**: None
- **Output**: Drizzle schema object for content entries

### `defineRepeatedContentSchema()`
- **Purpose**: Provide table definitions for repeated ordered content such as opening hours and reviews
- **Input**: None
- **Output**: Drizzle schema objects for repeated items

### `defineContentAuditSchema()`
- **Purpose**: Provide the audit-log table definition
- **Input**: None
- **Output**: Drizzle schema object for audit entries

## Content Repository Layer

### `getAllContentEntries()`
- **Purpose**: Load keyed content-entry rows
- **Input**: None
- **Output**: Array of content-entry records

### `getOpeningHoursEntries()`
- **Purpose**: Load ordered opening-hours rows
- **Input**: None
- **Output**: Array of opening-hours records

### `getReviewEntries()`
- **Purpose**: Load ordered review rows
- **Input**: None
- **Output**: Array of review records

### `updateGroupedContent(values, actor)`
- **Purpose**: Persist grouped landing-page text updates and audit them
- **Input**:
  - grouped key/value updates
  - actor identity
- **Output**: mutation result with updated keys and audit metadata

### `updateOpeningHours(values, actor)`
- **Purpose**: Persist opening-hours updates and audit them
- **Input**:
  - ordered opening-hours payload
  - actor identity
- **Output**: mutation result with updated rows and audit metadata

### `updateFeaturedTaste(values, actor)`
- **Purpose**: Persist featured-taste updates and audit them
- **Input**:
  - featured-taste payload
  - actor identity
- **Output**: mutation result with updated keys and audit metadata

### `initializeSeedContent()`
- **Purpose**: Seed the content store only when empty
- **Input**: None
- **Output**: initialization result indicating whether seeding occurred

## Landing Content Mapper

### `toLandingPageContent(records)`
- **Purpose**: Convert stored records into the existing `LandingPageContent` shape
- **Input**:
  - keyed content-entry records
  - repeated-item records
  - code-managed constants
- **Output**: `LandingPageContent`

### `toGroupedContentFormModel(records)`
- **Purpose**: Convert stored values into the grouped admin form model
- **Input**: keyed content-entry records
- **Output**: grouped admin form model

### `toOpeningHoursFormModel(records)`
- **Purpose**: Convert stored values into the opening-hours admin form model
- **Input**: ordered opening-hours records
- **Output**: opening-hours form model

### `toFeaturedTasteFormModel(records)`
- **Purpose**: Convert stored values into the featured-taste admin form model
- **Input**: keyed featured-taste records
- **Output**: featured-taste form model

## Public Content Reader

### `getLandingPageContent()`
- **Purpose**: Load public landing-page content from the DB-backed source
- **Input**: None
- **Output**: `LandingPageContent`

### `getLandingMetadataContent()`
- **Purpose**: Load the metadata-specific content subset for Next.js metadata generation
- **Input**: None
- **Output**: metadata view model

## Admin Content Management Pages

### `renderGroupedContentPage()`
- **Purpose**: Render the grouped admin content page with initial values
- **Input**: authorized admin request context
- **Output**: protected admin page response

### `renderOpeningHoursPage()`
- **Purpose**: Render the dedicated opening-hours page
- **Input**: authorized admin request context
- **Output**: protected admin page response

### `renderFeaturedTastePage()`
- **Purpose**: Render the dedicated featured-taste page
- **Input**: authorized admin request context
- **Output**: protected admin page response

## Protected Content Mutation Actions

### `saveGroupedContentAction(formData)`
- **Purpose**: Validate and persist grouped landing-page text updates
- **Input**: server-action form payload
- **Output**: success/error state for the admin page

### `saveOpeningHoursAction(formData)`
- **Purpose**: Validate and persist opening-hours updates
- **Input**: server-action form payload
- **Output**: success/error state for the admin page

### `saveFeaturedTasteAction(formData)`
- **Purpose**: Validate and persist featured-taste updates
- **Input**: server-action form payload
- **Output**: success/error state for the admin page

## Content Audit Layer

### `recordContentAuditEntry(input)`
- **Purpose**: Persist a before/after audit record for a content mutation
- **Input**:
  - actor
  - target section/page
  - before snapshot
  - after snapshot
  - timestamp
- **Output**: persisted audit record metadata
