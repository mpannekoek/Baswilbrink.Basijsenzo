# Services

## Service 1: Landing Content Service
- **Purpose**: Provide a single read-oriented service for public page rendering and metadata generation.
- **Responsibilities**:
  - Orchestrate repository reads
  - Call the mapper to build `LandingPageContent`
  - Return metadata-ready content without exposing persistence details upward
- **Interactions**:
  - Uses the Content Repository Layer
  - Uses the Landing Content Mapper
  - Serves the public route and metadata loader

## Service 2: Admin Content Query Service
- **Purpose**: Provide admin pages with the correct form-ready content models.
- **Responsibilities**:
  - Load grouped content values
  - Load opening-hours values
  - Load featured-taste values
  - Keep admin-page data loading separate from public rendering concerns
- **Interactions**:
  - Uses the Content Repository Layer
  - Uses the Landing Content Mapper
  - Serves protected admin pages

## Service 3: Admin Content Mutation Service
- **Purpose**: Orchestrate protected write operations for all admin content updates.
- **Responsibilities**:
  - Resolve the acting admin identity
  - Validate input through server-side validation rules
  - Persist updates through the repository layer
  - Write audit records
  - Trigger cache refresh/revalidation for affected public content
- **Interactions**:
  - Uses auth access helpers
  - Uses validation utilities
  - Uses the Content Repository Layer
  - Uses the Content Audit Layer

## Service 4: Content Seed Service
- **Purpose**: Initialize the content store from the current hardcoded copy on first setup.
- **Responsibilities**:
  - Detect empty-store state
  - Insert initial keyed entries and repeated items
  - Avoid overwriting existing content
- **Interactions**:
  - Uses the Content Repository Layer
  - Uses seed-source constants derived from the current landing-page content

## Orchestration Pattern
- Protected admin pages load initial values through the Admin Content Query Service.
- Those pages submit forms to server actions.
- Server actions delegate to the Admin Content Mutation Service.
- Public rendering and metadata generation depend only on the Landing Content Service.
- Seed initialization remains isolated so first-time setup does not leak into normal read/write flows.

## Why This Service Split Fits
- It keeps public reads and admin writes separate.
- It avoids overengineering with a large generic CMS service.
- It reuses existing auth boundaries while making validation and audit handling explicit.
