# Tech Stack Decisions - landing-page

## Core Framework
- **Decision**: Use Next.js as the application framework
- **Rationale**:
  - Explicit project requirement
  - Good fit for a content-oriented landing page
  - Supports metadata, static content, optimized assets, and production deployment patterns cleanly

## Language
- **Decision**: Use TypeScript across the application
- **Rationale**:
  - Explicit project requirement
  - Improves maintainability for content models, section props, and configuration structures

## Styling
- **Decision**: Use Tailwind CSS for styling and theme composition
- **Rationale**:
  - Explicit project requirement
  - Good fit for creating a branded, section-rich responsive UI quickly
  - Supports consistent black/orange theming and reusable UI primitives

## Rendering And Content Strategy
- **Decision**: Use local/static content for the first version
- **Rationale**:
  - No backend or CMS is required for v1
  - Improves reliability and performance
  - Makes placeholder content easy to replace later

## Asset Strategy
- **Decision**: Use repository assets where appropriate, including the provided logo, while keeping a code-based fallback path available
- **Rationale**:
  - Matches approved requirements
  - Keeps the final UI tied to the real brand mark without depending on a full asset pipeline

## Accessibility Strategy
- **Decision**: Target a strong baseline accessibility level rather than formal AA certification language for this first version
- **Rationale**:
  - Matches the approved NFR answer
  - Keeps scope practical while still requiring semantic markup, keyboard access, and visible focus treatment

## Performance Strategy
- **Decision**: Balance performance and visual richness
- **Rationale**:
  - Matches the approved NFR answer
  - Supports an expressive branded experience without allowing heavy visuals to dominate implementation decisions

## Browser Support Strategy
- **Decision**: Support current major mobile and desktop browsers
- **Rationale**:
  - Matches the approved NFR answer
  - Appropriate for a public consumer-facing landing page

## Security Strategy
- **Decision**: Implement secure public-site defaults at framework/config level
- **Rationale**:
  - Matches enabled security extension requirements
  - The app needs security headers, disciplined dependencies, and safe production behavior even without backend logic

## Docker Delivery Strategy
- **Decision**: Use a production-oriented but practical Docker baseline
- **Included**:
  - production build path
  - production runtime command
  - committed Docker configuration
  - lean image structure
- **Excluded for v1**:
  - extra container-hardening work
  - dedicated image-scanning workflow setup
  - orchestration-specific production architecture
- **Rationale**:
  - Preserves the previously approved production-oriented hosting requirement
  - Avoids unnecessary scope expansion

## Testing Implications
- **Decision**: Favor practical app-level validation over deep infrastructure testing for v1
- **Rationale**:
  - The app is a single public-facing site without service-to-service integration
  - Most meaningful tests will center on build correctness, rendering, and responsive behavior
