# Component Dependency

## Dependency Summary
The application uses a top-down dependency model:
- composition starts at the page level
- page sections depend on shared content models and small UI primitives
- visitor-facing text flows from centralized content structures into sections rather than originating inside section components
- configuration services feed content, branding, metadata, and security settings into the app shell

## Dependency Matrix

| Component / Service | Depends On | Relationship Type | Notes |
|---|---|---|---|
| `RootLayout` | `SiteMetadataService`, global styles | Direct | Owns document shell and shared app frame |
| `LandingPage` | `LandingPageContentService`, `BrandAssetService`, section components | Direct | Main composition entry point |
| `HeaderBar` | `BrandConfig`, `ActionPill`, shared content labels | Direct | Uses brand data, CTA primitives, and centralized navigation/menu copy |
| `HeroSection` | `HeroContent`, `ActionPill` | Direct | Depends on hero data, CTA primitives, and centralized quick-info/media copy |
| `PracticalInfoSection` | `ContactInfo`, `OpeningHoursEntry`, `InfoCard`, `SectionShell`, shared content labels | Direct | Practical information presentation with centralized helper copy |
| `TasteOfWeekSection` | `TasteHighlight`, `SectionShell`, optional `InfoCard` | Direct | Featured flavor presentation with centralized support copy |
| `StorySection` | `StoryContent`, `SectionShell` | Direct | About/history rendering with content-supplied framing copy |
| `ReviewsSection` | `ReviewSummary`, `ReviewQuote`, `ReviewCard`, `SectionShell` | Direct | Social-proof rendering with centralized framing copy |
| `VisitContactSection` | `ContactInfo`, `ActionLink`, `ActionPill`, `SectionShell`, shared content labels | Direct | Footer-style CTA and visit section with centralized prompts |
| `SectionShell` | none beyond shared style tokens | Primitive | Layout wrapper for sections |
| `ActionPill` | none beyond shared style tokens | Primitive | Reusable branded action control |
| `ReviewCard` | `ReviewQuote` | Primitive | Encapsulates review presentation |
| `InfoCard` | simple text props | Primitive | Encapsulates small card content |
| `LandingPageContentService` | static content definitions | Service | Produces typed content object |
| `BrandAssetService` | static asset reference | Service | Resolves logo/fallback branding |
| `SiteMetadataService` | static metadata values | Service | Produces metadata object |
| `SecurityConfigService` | static security policies | Service | Produces security header config |
| `DeploymentConfigService` | static deployment assumptions | Service | Supports Docker-oriented delivery |

## Communication Pattern
- `RootLayout` initializes the global environment.
- `LandingPage` composes all sections using service-provided content.
- Section components receive props only; they do not fetch or derive business data independently.
- Section components should also avoid owning editable page copy locally; they render supplied content slices.
- UI primitives are reused by sections to keep visual treatment consistent.
- Security and deployment concerns are kept outside section rendering logic.

## Data Flow
1. A centralized editable content resource feeds typed content/config factories.
2. `LandingPage` receives or constructs the page content object.
3. `LandingPage` passes section-specific slices into presentational components.
4. Shared primitives render repeated patterns such as buttons, cards, and section shells.
5. Global framework configuration applies metadata and security headers using the same content-aligned metadata inputs.

## Boundary Decisions
- No server-side data layer is needed for v1.
- No client-side state manager is needed for v1.
- No API integration boundary is required for v1.
- No section component should become a second source of truth for editable page copy.
- Containerization is treated as delivery configuration, not a runtime application dependency.
