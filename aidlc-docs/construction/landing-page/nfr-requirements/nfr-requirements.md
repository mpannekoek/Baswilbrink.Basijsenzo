# NFR Requirements - landing-page

## Scope
This unit covers the single public landing page for Bas IJs & Zo, including its visual presentation, responsive behavior, secure public-site defaults, and Dockerized delivery setup.

## NFR Summary
- **Accessibility**: Good baseline accessibility
- **Performance Bias**: Balanced performance and visual richness
- **Browser Support**: Current major mobile and desktop browsers
- **Delivery Baseline**: Production-oriented Docker with a practical baseline, not expanded container hardening scope

## Responsiveness And Mobile Usability
- Mobile friendliness is a core success condition.
- The page must remain usable and visually coherent across common small and large screen sizes.
- Opening hours, contact details, visit actions, and key hero messaging must remain easy to read and interact with on mobile.
- Touch targets, spacing, and typography must remain comfortable on smaller screens.
- Decorative or expressive layout decisions must not reduce clarity of practical information.

## Accessibility
- The application should meet a good baseline accessibility standard for the first version.
- Semantic HTML structure should be used throughout the page.
- Interactive elements must be keyboard reachable.
- Visible focus states must be preserved.
- Text contrast and information hierarchy must remain readable against expressive backgrounds.
- Images or decorative visuals that communicate meaning should have appropriate text alternatives where relevant.

## Performance
- The design should balance visual richness with practical loading performance.
- The page should avoid unnecessarily heavy assets or motion that undermine the mobile experience.
- Hero visuals and branding should remain impactful without turning the page into a slow-loading experience.
- Static/local content should be preferred over runtime fetching for v1 where possible.
- The implementation should preserve a clean path to good Lighthouse-style performance without optimizing prematurely.

## Browser Support
- The application should support current major desktop browsers.
- The application should support current major mobile browsers.
- Visual treatments and layout techniques should avoid brittle behavior in mainstream modern browser environments.

## Security
- Required HTTP security headers must be configured for HTML responses.
- The public site must avoid exposing internal stack traces, debug details, or framework internals in production-facing behavior.
- Dependencies and container tooling must avoid unpinned `latest` production image tags.
- Because there is no authentication, API surface, or persistence layer in v1, deeper authorization and data-protection controls are not currently required.

## Maintainability
- Content should be centralized and easy to replace later.
- Reusable UI patterns should be extracted where that improves consistency and clarity.
- The codebase should remain straightforward for future expansion beyond the initial landing page.
- Styling choices should stay understandable rather than over-abstracted.

## Reliability
- The landing page should build consistently in local and containerized environments.
- The site should not depend on fragile runtime integrations for its core content.
- The delivery setup should be simple enough to understand and troubleshoot without specialized infrastructure.

## Delivery And Deployment
- Docker support remains an explicit requirement.
- The Docker setup should be appropriate for production use in a practical sense:
  - production build
  - production runtime command
  - committed Docker-related config files
  - lean and maintainable image structure
- The delivery path must include an automated GitHub Actions workflow that builds and publishes the production Docker image to GitHub Container Registry (GHCR).
- The publish workflow should support at least:
  - push-based publishing from `main`
  - stable image naming derived from the GitHub repository
  - immutable commit-based tagging for traceability
  - a moving `latest` tag for the default branch
- This version does not require additional container hardening, image scanning workflow setup, or orchestration design.

## Out Of Scope
- High-availability or multi-instance deployment guarantees
- Authenticated user flows
- API rate limiting or backend input validation
- Persistence or encrypted data storage requirements
- Advanced DevSecOps automation beyond sensible Docker and dependency discipline
