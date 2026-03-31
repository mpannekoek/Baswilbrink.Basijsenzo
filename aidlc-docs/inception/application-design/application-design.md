# Application Design

## Summary
The Bas IJs & Zo site is designed as a single-unit Next.js application with one primary landing page composed from modular section components and thin configuration/content services. The design deliberately avoids over-engineering while still making space for strong branding, mobile-first UX, secure public-site defaults, Dockerized delivery, and a single editable content resource for all rendered page text.

## Core Design Decisions
- Use one page-composition entry point that assembles all approved landing-page sections.
- Keep sections modular so content and visual treatment can evolve independently.
- Keep content and brand configuration centralized rather than scattered across components.
- Treat all visitor-facing copy as content data, not as component-local literals. This includes section titles, descriptions, CTA labels, navigation labels, review text, image alt text, accessibility labels, and metadata text.
- Expand the content model so section components render supplied text only; presentational components should not own page copy except for purely decorative symbols.
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
- `LandingPageContentService`: central content assembly from a single editable resource file or equivalent typed source
- `BrandAssetService`: logo and branded fallback configuration
- `SiteMetadataService`: page metadata derived from the same content source or a tightly paired metadata resource
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
- It keeps placeholder and final approved content easy to replace later from one maintained resource.
- It creates a clean path into the upcoming NFR, infrastructure, and code-generation stages.
