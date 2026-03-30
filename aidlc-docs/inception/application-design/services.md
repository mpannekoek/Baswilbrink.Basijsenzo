# Services

## Service Philosophy
This project does not need backend services or domain services in the traditional sense. The service layer is a lightweight application-orchestration layer used to keep content, branding, metadata, and delivery configuration separate from view components.

## Service 1: LandingPageContentService
- **Purpose**: Provide structured page content to the landing page.
- **Responsibilities**:
  - Assemble placeholder content for hero, practical info, taste of the week, story, reviews, and footer actions
  - Keep content centralized and easy to replace later
  - Support clean separation between content and UI layout
- **Inputs**:
  - Static content definitions
- **Outputs**:
  - `LandingPageContent`

## Service 2: BrandAssetService
- **Purpose**: Resolve logo usage and branded fallback behavior.
- **Responsibilities**:
  - Reference `public/logo.png` or equivalent application asset path
  - Provide fallback brand label and usage metadata
  - Keep branding decisions separate from section rendering
- **Inputs**:
  - Static asset references
- **Outputs**:
  - `BrandConfig`

## Service 3: SiteMetadataService
- **Purpose**: Centralize page metadata configuration.
- **Responsibilities**:
  - Provide title, description, and social-preview metadata
  - Keep metadata easy to update later
- **Inputs**:
  - Static metadata content
- **Outputs**:
  - `SiteMetadata`

## Service 4: SecurityConfigService
- **Purpose**: Centralize secure public-site configuration defaults.
- **Responsibilities**:
  - Provide required HTTP security header definitions
  - Support future framework-level security configuration
  - Keep security requirements visible in one place
- **Inputs**:
  - Static security policy definitions
- **Outputs**:
  - Header configuration structures

## Service 5: DeploymentConfigService
- **Purpose**: Encapsulate container-related delivery decisions.
- **Responsibilities**:
  - Define assumptions for Dockerized production build/run
  - Keep deployment-related constants or docs organized
  - Support build-and-test documentation later
- **Inputs**:
  - Runtime and build configuration choices
- **Outputs**:
  - Container configuration references and build assumptions

## Orchestration Pattern
- `LandingPage` consumes content and brand configuration from lightweight services/factories.
- Presentational sections remain mostly stateless and receive typed props.
- Security and deployment configuration remain outside UI components.
- The service layer is intentionally thin to avoid unnecessary abstraction for a single-page site.
