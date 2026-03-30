# Requirements Document

## Intent Analysis Summary
- **User Request**: Build a landing page from scratch for Bas IJs & Zo, a Dutch ice cream parlor, using Next.js, TypeScript, and Tailwind CSS.
- **Request Type**: New Project
- **Scope Estimate**: Single web application with a single high-quality landing page and supporting scaffold
- **Complexity Estimate**: Moderate
- **Requirements Depth**: Standard

## Product Goal
Create a polished, production-ready landing page that helps local customers and some tourists quickly understand when Bas IJs & Zo is open, where it is, what makes it special, and why it is trusted in the village. The experience should feel warm, playful, and family-friendly while remaining modern and easy to extend.

## Primary Audiences
- **Local customers**: Want practical information fast, such as opening hours, address, and contact details.
- **Families and casual visitors**: Want a welcoming impression, a sense of atmosphere, and simple reasons to visit.
- **Tourists**: Secondary audience; the first version remains Dutch-only.

## Confirmed Content Strategy
- Use realistic placeholder content where exact business details are still missing.
- Use realistic placeholder Google review excerpts and ratings until approved real reviews are available.
- Use realistic placeholder opening hours, contact details, and address for the first version.
- Prefer existing branding assets if found in the repository; an existing logo asset is available at `public/logo.png`.
- Include clear calls to action for visiting, calling, and finding the location.
- Use the earlier user-provided design inspiration as a reference for overall energy and layout direction, not as a literal template.

## Functional Requirements

### FR-1: Application Scaffold
- The project must be scaffolded as a new Next.js application.
- The implementation must use TypeScript.
- The styling system must use Tailwind CSS.
- The scaffold must be clean, production-oriented, and easy to extend.
- The application must be prepared to run in a Docker container for deployment.

### FR-2: Landing Page Information Architecture
The landing page should include these core sections in a clear and practical order:
- **Hero / Welcome**: Brand presence, local tone, short introduction, immediate key actions.
- **Practical Information**: Opening hours, address, phone/contact, and how to visit.
- **Taste of the Week**: A small featured product spotlight with playful seasonal tone.
- **About / History**: Short story of the parlor with village character and trust-building context.
- **Reviews / Social Proof**: A natural-looking section with strong review highlights.
- **Visit / Contact Footer Area**: Contact details, route cue, and useful closing actions.

### FR-3: Practical Information Clarity
- Opening hours must be easy to scan.
- Contact details must be prominent and easy to act on.
- Address and visit guidance must be visible without requiring deep scrolling.
- The page should support quick practical actions such as calling or getting directions.

### FR-4: Local Brand Storytelling
- The page must communicate a strong local village feel.
- The tone must feel warm, welcoming, and trustworthy.
- The history section must help visitors understand the parlor's identity and community presence.

### FR-5: Product Highlight
- The page must include a small product-information area.
- The initial version should prominently feature a "taste of the week."
- The product section should be easy to update later without structural redesign.

### FR-6: Review Presentation
- Reviews should be integrated as social proof in a natural and trustworthy way.
- The initial implementation may use realistic placeholder review quotes, star ratings, and reviewer labels.
- The section should be structured so real Google review content can be swapped in later.

### FR-7: Branding
- The design must prominently use black and orange because they are core brand colors.
- The implementation should align to the existing design direction while adapting color usage to match the brand.
- If the repository logo asset works well in the design, it should be used; otherwise, a code-based fallback brand treatment is acceptable.

### FR-8: Content Language
- The first version should be Dutch only.
- The copy should still be understandable in structure for occasional tourists through strong visual cues and practical layout.

## User Experience Requirements
- The page must feel warm, local, playful, and family-friendly.
- The page must also feel polished and modern rather than rustic or amateur.
- The design should avoid generic template aesthetics and feel intentional to the brand.
- The practical information must remain immediately understandable even within a more expressive visual design.
- Mobile friendliness is a high-priority UX requirement, not a secondary optimization.

## Design Requirements
- The visual system should make black and orange dominant brand anchors.
- The layout should feel inviting and lively, suitable for an ice cream parlor and village audience.
- The design should balance expressive branding with readability and fast information access.
- The page should use strong typography, layered backgrounds, and purposeful section variation rather than a flat default landing-page treatment.
- The design may borrow inspiration from the earlier user-provided design reference in these specific ways:
  - bold, high-contrast hero composition
  - playful rounded action elements
  - prominent product imagery as an emotional focal point
  - energetic visual rhythm and layered decorative accents
- The implementation should not copy the sample palette directly; the final palette must remain centered on black and orange to match Bas IJs & Zo branding.

## Technical Requirements
- Use Next.js with a maintainable app structure suitable for future expansion.
- Use TypeScript across the codebase.
- Use Tailwind CSS for styling and theming.
- Keep the implementation modular enough that sections can be expanded or replaced later.
- Keep content structures simple enough to support future replacement of placeholders with real business content.
- Provide containerization support for the application using Docker.
- The project should include a production-oriented Docker setup suitable for building and running the Next.js app in a container.

## Non-Functional Requirements

### NFR-1: Extensibility
- The codebase must be easy to extend with more pages or richer content later.
- Content-heavy sections should be straightforward to update.

### NFR-2: Production Readiness
- The initial scaffold and page should be suitable as a production-ready starting point.
- The project should avoid unnecessary complexity in the first version.
- The delivery setup should support predictable containerized deployment.

### NFR-3: Responsiveness
- The page must work well on both desktop and mobile.
- Important practical information must remain accessible on small screens.
- The design should be comfortable and effective on mobile-first viewing, since mobile usability is explicitly important to the project.

### NFR-4: Maintainability
- The structure, naming, and styling approach should be understandable for future iteration.
- Repeated visual patterns should be organized cleanly.
- The container setup should be straightforward for future local development and deployment workflows.

### NFR-5: Security Baseline
- Baseline security extension rules are enabled for this project.
- The web application must account for secure defaults relevant to a public informational site, including secure headers, supported dependency management, and safe handling of any future external content or integrations.

### NFR-6: Containerization
- The application should build and run reliably inside a Docker container.
- The container setup should be appropriate for production use rather than a dev-only container.
- Container-related files should avoid unnecessary bloat and support clean rebuilds.

## Security Requirements Derived From Enabled Extension
- **SECURITY-04**: The application must set required HTTP security headers for HTML responses.
- **SECURITY-09**: The production configuration must avoid exposing internal errors or debug details to end users.
- **SECURITY-10**: Dependency management must use committed lock files and avoid unpinned production tooling patterns.
- **SECURITY-10**: Any Dockerfile or container build configuration must avoid unpinned `latest` tags for production images.
- **SECURITY-11**: The design should account for secure public-site defaults and future misuse considerations.
- **SECURITY-01, SECURITY-02, SECURITY-05, SECURITY-06, SECURITY-07, SECURITY-08, SECURITY-12, SECURITY-13**: Not currently in scope for the first version unless later stages introduce data stores, authenticated flows, APIs, or infrastructure artifacts that make them applicable.

## Assumptions
- Exact business details are not yet available and will be represented with realistic placeholders.
- Final approved Google review text is not yet available.
- Final production photography and complete brand asset set are not yet available.
- The existing `public/logo.png` may be usable, but suitability will be confirmed during design and implementation.
- The earlier user-provided sample reference expresses preferred visual energy, but not final brand colors or exact composition requirements.
- Final hosting environment details beyond Docker containerization are not yet defined.

## Success Criteria
- Visitors can quickly find opening hours, contact details, and location cues.
- The site leaves a warm, trustworthy first impression aligned with Bas IJs & Zo.
- The page clearly communicates local identity and product personality.
- The project has a clean technical foundation for future expansion.
