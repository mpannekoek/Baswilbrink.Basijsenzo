# Application Design

## Summary
The Bas IJs & Zo site is designed as a single-unit Next.js application with one primary landing page composed from modular section components and thin configuration/content services. The design deliberately avoids over-engineering while still making space for strong branding, mobile-first UX, secure public-site defaults, and Dockerized delivery.

## Core Design Decisions
- Use one page-composition entry point that assembles all approved landing-page sections.
- Keep sections modular so content and visual treatment can evolve independently.
- Keep content and brand configuration centralized rather than scattered across components.
- Use lightweight services/factories instead of introducing a backend or complex domain layer.
- Treat security headers and deployment configuration as first-class design concerns because they are explicit requirements.

## Main Components
- `RootLayout`: global shell and metadata frame
- `LandingPage`: top-level page composition
- `HeaderBar`: logo, anchor navigation, and top actions
- `HeroSection`: first impression and primary CTA area
- `PracticalInfoSection`: hours, address, and contact emphasis
- `TasteOfWeekSection`: featured flavor spotlight
- `StorySection`: local story and history
- `ReviewsSection`: social proof
- `VisitContactSection`: final contact and route encouragement
- Shared primitives: `SectionShell`, `ActionPill`, `ReviewCard`, `InfoCard`

## Service Layer
- `LandingPageContentService`: central content assembly
- `BrandAssetService`: logo and branded fallback configuration
- `SiteMetadataService`: page metadata
- `SecurityConfigService`: public-site security defaults
- `DeploymentConfigService`: Docker-oriented delivery assumptions

## Dependency Model
- Composition flows from `LandingPage` down into section components.
- Shared primitives reduce duplication and keep branding consistent.
- Static services/factories feed typed content and configuration into the page.
- No runtime backend, persistent data store, or API integration is required for v1.

## Why This Design Fits
- It supports a strong branded landing page without introducing unnecessary architectural weight.
- It keeps mobile friendliness central by ensuring sections remain prop-driven and layout-focused.
- It keeps placeholder content easy to replace later.
- It creates a clean path into the upcoming NFR, infrastructure, and code-generation stages.
