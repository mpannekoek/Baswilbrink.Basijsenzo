# NFR Design Patterns - landing-page

## Responsive Layout Pattern
- **Pattern**: Mobile-first section composition
- **Application**:
  - start with small-screen layout decisions first
  - scale into larger split layouts only where content meaningfully benefits
  - keep practical information and primary actions near the top of the mobile flow
- **Reasoning**: Mobile friendliness is a core success condition, not a later enhancement.

## Information Hierarchy Pattern
- **Pattern**: Practical-first expressive landing page
- **Application**:
  - keep hero emotionally strong, but ensure practical information remains prominent early in the page
  - use expressive visuals to support identity, not hide the utility of the site
- **Reasoning**: The site must feel branded and warm while still answering “when, where, how do I visit?” quickly.

## Accessibility Pattern
- **Pattern**: Baseline accessible semantic markup
- **Application**:
  - use semantic landmarks such as header, main, section, footer
  - preserve heading hierarchy
  - ensure keyboard reachability for interactive elements
  - provide visible focus states aligned with the brand
  - preserve readable contrast against black/orange-heavy visuals
- **Reasoning**: Strong baseline accessibility is required even without formal AA-target language.

## CTA Pattern
- **Pattern**: Touch-friendly branded actions
- **Application**:
  - use consistent pill/button primitives
  - preserve comfortable touch targets on mobile
  - support direct actions such as call and route
- **Reasoning**: CTAs are central to the page and must stay usable across devices.

## Content Pattern
- **Pattern**: Static structured content model
- **Application**:
  - centralize page content in typed content/config objects backed by one editable resource file or equivalent typed source
  - keep placeholder content realistic and easy to replace
  - source section headings, helper text, CTA labels, navigation labels, image alt text, accessibility labels, and metadata copy from the same content layer
  - avoid embedding editable visitor-facing strings directly in section components
  - avoid runtime fetching for core page content in v1
- **Reasoning**: This supports maintainability, performance, and delivery simplicity.

## Visual Performance Pattern
- **Pattern**: Controlled expressive styling
- **Application**:
  - use local assets and optimized framework image handling where appropriate
  - keep layered backgrounds and decorative elements lightweight
  - avoid motion or visual treatments that degrade mobile usability
- **Reasoning**: The approved performance bias is balanced, not maximalist.

## Security Pattern
- **Pattern**: Framework-level secure public-site defaults
- **Application**:
  - configure required HTTP security headers centrally
  - avoid unnecessary client-side script complexity
  - keep production configuration free from exposed debug behavior
- **Reasoning**: Security requirements apply even to a simple public informational site.

## Maintainability Pattern
- **Pattern**: Section modularity with shared primitives
- **Application**:
  - use reusable section shells, cards, and action primitives
  - keep styling tokens and repeated layout choices centralized
  - avoid premature abstraction beyond the page’s current scope
- **Reasoning**: The codebase should stay clean and easy to extend.

## Docker Delivery Pattern
- **Pattern**: Practical production container packaging
- **Application**:
  - use a production-oriented Docker build path
  - keep the container lean and maintainable
  - avoid extra hardening or scanning workflow scope for v1
- **Reasoning**: Matches the approved Docker baseline.
