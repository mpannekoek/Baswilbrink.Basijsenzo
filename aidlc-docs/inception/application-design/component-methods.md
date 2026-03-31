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
  - Render brand mark, navigation anchors, top-level actions, and menu accessibility copy using content-supplied labels.

## HeroSection
- `function HeroSection(props: { hero: HeroContent; actions: ActionLink[] }): JSX.Element`
  - Render the first-screen branded introduction, key actions, supporting quick-info copy, and image alt text from the content model.

## PracticalInfoSection
- `function PracticalInfoSection(props: { hours: OpeningHoursEntry[]; contact: ContactInfo; visitNotes: string[] }): JSX.Element`
  - Render scannable practical information, helper labels, and visit-note framing copy optimized for mobile and desktop.

## TasteOfWeekSection
- `function TasteOfWeekSection(props: { featuredTaste: TasteHighlight }): JSX.Element`
  - Render the highlighted featured flavor block, its support copy, and related image alt text from centralized content.

## StorySection
- `function StorySection(props: { story: StoryContent }): JSX.Element`
  - Render the parlor history and community identity section using content-supplied framing copy only.

## ReviewsSection
- `function ReviewsSection(props: { reviews: ReviewQuote[]; summary: ReviewSummary }): JSX.Element`
  - Render social-proof summary, section framing copy, and individual review excerpts from the content model.

## VisitContactSection
- `function VisitContactSection(props: { contact: ContactInfo; actions: ActionLink[] }): JSX.Element`
  - Render closing contact cues, route labels, and repeat primary visit actions from centralized content.

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
  - Return all content used to render the landing page, including all visitor-facing UI copy, image alt text, accessibility labels, and metadata copy references.

### Brand Configuration Factory
- `function getBrandConfig(): BrandConfig`
  - Return logo and fallback brand settings.

### Metadata Factory
- `function getSiteMetadata(): SiteMetadata`
  - Return SEO and document metadata for the page using the shared editable content resource or a tightly paired metadata structure.

### Security Header Configuration
- `function getSecurityHeaders(): HeaderRule[]`
  - Return required security-header definitions for the public site.
