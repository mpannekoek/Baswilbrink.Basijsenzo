# Frontend Components

## Admin UI Scope
The functional design covers only the protected admin editing surfaces needed for this feature. Public landing-page visual components remain structurally unchanged and continue to consume the assembled `LandingPageContent` model.

## Page 1: Grouped Content Page
- **Purpose**: Edit most landing-page plain-text fields from one page.
- **Component Structure**:
  - page shell inside existing admin layout
  - grouped content form
  - section-based field groups
  - save action/status area
- **State Needs**:
  - initial field values
  - current field values
  - validation errors
  - save success/failure message
- **User Interactions**:
  - edit text inputs and textareas
  - submit one save action for the grouped page
  - see clear validation or success feedback

## Page 2: Opening Hours Page
- **Purpose**: Edit the weekly schedule separately from general marketing copy.
- **Component Structure**:
  - page shell inside existing admin layout
  - ordered opening-hours form rows
  - save action/status area
- **State Needs**:
  - ordered day/hour rows
  - row-level validation errors
  - save success/failure message
- **User Interactions**:
  - adjust day/hour values
  - submit a focused save action
  - see feedback without leaving the page

## Page 3: Taste-of-the-Week Page
- **Purpose**: Edit featured-taste text independently of other content.
- **Component Structure**:
  - page shell inside existing admin layout
  - featured-taste form fields
  - save action/status area
- **State Needs**:
  - current featured-taste field values
  - validation errors
  - save success/failure message
- **User Interactions**:
  - update featured flavor title, description, and related text fields
  - submit a focused save action
  - see clear save feedback

## Form Validation Rules
- Validation occurs server-side for every save.
- Client-side hints may exist for usability, but they do not replace server-side checks.
- Fields must enforce plain-text expectations and reject unsafe HTML/script content.
- Opening-hours rows must remain complete enough for the public section to render predictably.

## API / Integration Points
- Grouped content page -> `saveGroupedContentAction`
- Opening hours page -> `saveOpeningHoursAction`
- Taste-of-the-week page -> `saveFeaturedTasteAction`
- All pages load initial state from admin query services rather than direct persistence calls in UI components

## Public UI Continuity
- Existing landing-page components remain consumers of the mapped `LandingPageContent`.
- No new public editing interface or client-visible CMS behavior is introduced.
