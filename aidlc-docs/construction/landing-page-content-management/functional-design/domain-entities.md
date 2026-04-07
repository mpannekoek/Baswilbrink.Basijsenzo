# Domain Entities

## Entity: Content Entry
- **Purpose**: Represents one editable plain-text value keyed by section and field.
- **Core Attributes**:
  - section identifier
  - field identifier
  - plain-text value
  - optional grouping metadata
  - timestamps
- **Used For**:
  - grouped landing-page text
  - featured-taste text
  - any future non-repeated text field additions

## Entity: Repeated Content Item
- **Purpose**: Represents an ordered repeated record that cannot be modeled as a single scalar value.
- **Core Attributes**:
  - collection type
  - stable order index
  - item field values
  - timestamps
- **Used For**:
  - opening-hours rows
  - review rows
  - future repeated content groups

## Entity: Opening Hours Item
- **Purpose**: Specialized repeated content item for weekly schedule display.
- **Core Attributes**:
  - day label
  - displayed hours text
  - order index
- **Relationship**:
  - belongs to the opening-hours collection

## Entity: Review Item
- **Purpose**: Specialized repeated content item for public reviews.
- **Core Attributes**:
  - reviewer name
  - quote text
  - rating
  - order index
- **Relationship**:
  - belongs to the reviews collection

## Entity: Content Audit Entry
- **Purpose**: Records a business-relevant trace of one content mutation.
- **Core Attributes**:
  - acting admin identity
  - target page/section
  - mutation timestamp
  - before snapshot
  - after snapshot
- **Relationship**:
  - references a business event rather than a single storage row

## Entity: Grouped Content Form Model
- **Purpose**: Represents the admin-facing grouped text fields prepared for editing.
- **Core Attributes**:
  - grouped field values
  - display labels
  - validation errors
  - save feedback state
- **Relationship**:
  - derived from multiple content entries

## Entity: Opening Hours Form Model
- **Purpose**: Represents the ordered weekly hours editor state.
- **Core Attributes**:
  - list of day/hour rows
  - validation errors
  - save feedback state
- **Relationship**:
  - derived from opening-hours items

## Entity: Featured Taste Form Model
- **Purpose**: Represents the dedicated featured-taste editor state.
- **Core Attributes**:
  - featured-taste field values
  - validation errors
  - save feedback state
- **Relationship**:
  - derived from a focused subset of content entries

## Relationship Summary
- Many content entries combine to form one public landing-page model.
- Many repeated content items combine to form ordered public sections.
- Admin form models are derived projections over stored entities.
- Every successful mutation produces one content audit entry summarizing the business change.
