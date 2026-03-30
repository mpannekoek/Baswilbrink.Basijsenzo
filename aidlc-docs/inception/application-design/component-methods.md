# Component Methods

## Note
These method signatures describe high-level component and orchestration interfaces. Detailed business rules are intentionally deferred because this project does not require a separate functional-design stage.

## RootLayout
- `function RootLayout(props: { children: React.ReactNode }): JSX.Element`
  - Wrap the app with global HTML structure and shared visual scaffolding.

## LandingPage
- `function LandingPage(props: { content: LandingPageContent }): JSX.Element`
  - Compose the end-to-end landing page from structured content and sections.

## HeaderBar
- `function HeaderBar(props: { brand: BrandConfig; navItems: NavItem[]; primaryActions: ActionLink[] }): JSX.Element`
  - Render brand mark, navigation anchors, and top-level actions.

## HeroSection
- `function HeroSection(props: { hero: HeroContent; actions: ActionLink[] }): JSX.Element`
  - Render the first-screen branded introduction and key actions.

## PracticalInfoSection
- `function PracticalInfoSection(props: { hours: OpeningHoursEntry[]; contact: ContactInfo; visitNotes: string[] }): JSX.Element`
  - Render scannable practical information optimized for mobile and desktop.

## TasteOfWeekSection
- `function TasteOfWeekSection(props: { featuredTaste: TasteHighlight }): JSX.Element`
  - Render the highlighted featured flavor block.

## StorySection
- `function StorySection(props: { story: StoryContent }): JSX.Element`
  - Render the parlor history and community identity section.

## ReviewsSection
- `function ReviewsSection(props: { reviews: ReviewQuote[]; summary: ReviewSummary }): JSX.Element`
  - Render social-proof summary and individual review excerpts.

## VisitContactSection
- `function VisitContactSection(props: { contact: ContactInfo; actions: ActionLink[] }): JSX.Element`
  - Render closing contact cues and repeat primary visit actions.

## SectionShell
- `function SectionShell(props: { id?: string; eyebrow?: string; title: string; description?: string; tone?: "light" | "dark" | "accent" | "split"; children: React.ReactNode }): JSX.Element`
  - Provide shared section framing and heading structure.

## ActionPill
- `function ActionPill(props: { href: string; label: string; variant: "primary" | "secondary" | "ghost" }): JSX.Element`
  - Render a reusable branded action control.

## ReviewCard
- `function ReviewCard(props: { review: ReviewQuote }): JSX.Element`
  - Render a single review excerpt with rating and reviewer metadata.

## InfoCard
- `function InfoCard(props: { title: string; body: string; accent?: string }): JSX.Element`
  - Render compact informational card content such as fact blurbs or highlights.

## Content / Service Methods

### Page Content Factory
- `function getLandingPageContent(): LandingPageContent`
  - Return all content used to render the landing page.

### Brand Configuration Factory
- `function getBrandConfig(): BrandConfig`
  - Return logo and fallback brand settings.

### Metadata Factory
- `function getSiteMetadata(): SiteMetadata`
  - Return SEO and document metadata for the page.

### Security Header Configuration
- `function getSecurityHeaders(): HeaderRule[]`
  - Return required security-header definitions for the public site.
