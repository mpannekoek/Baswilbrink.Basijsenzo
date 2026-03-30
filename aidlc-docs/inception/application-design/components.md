# Components

## Design Scope
This application is a single Next.js site with one primary landing page. The component model is intentionally lean: a small number of reusable shell and section components, plus simple data/config structures that support future content replacement.

## Component 1: RootLayout
- **Purpose**: Provide document shell, global styling hooks, metadata, and shared page-level wrappers.
- **Responsibilities**:
  - Apply global font and theme scaffolding
  - Inject site metadata and common layout structure
  - Provide a consistent frame for the landing page
- **Interface**:
  - `children: React.ReactNode`

## Component 2: LandingPage
- **Purpose**: Compose the full landing-page experience from reusable sections and data models.
- **Responsibilities**:
  - Arrange sections in the approved information order
  - Pass structured content into presentational sections
  - Keep page composition easy to evolve later
- **Interface**:
  - `content: LandingPageContent`

## Component 3: HeaderBar
- **Purpose**: Display the Bas IJs & Zo brand, lightweight navigation cues, and primary calls to action.
- **Responsibilities**:
  - Render logo or branded fallback wordmark
  - Support anchor navigation to major sections
  - Keep key actions visible and mobile-aware
- **Interface**:
  - `brand: BrandConfig`
  - `navItems: NavItem[]`
  - `primaryActions: ActionLink[]`

## Component 4: HeroSection
- **Purpose**: Deliver the strongest first impression and immediate practical invitation.
- **Responsibilities**:
  - Present key headline and supporting copy
  - Surface one or more direct actions such as call or route
  - Balance expressive visuals with readability
- **Interface**:
  - `hero: HeroContent`
  - `actions: ActionLink[]`

## Component 5: PracticalInfoSection
- **Purpose**: Present opening hours, address, phone, and quick visit-related details.
- **Responsibilities**:
  - Make practical information highly scannable
  - Support action-oriented contact affordances
  - Maintain clarity on small screens
- **Interface**:
  - `hours: OpeningHoursEntry[]`
  - `contact: ContactInfo`
  - `visitNotes: string[]`

## Component 6: TasteOfWeekSection
- **Purpose**: Spotlight a featured taste in a playful, update-friendly format.
- **Responsibilities**:
  - Present featured flavor title, description, and accent styling
  - Keep the section visually appetizing without dominating the page
  - Support simple content swapping later
- **Interface**:
  - `featuredTaste: TasteHighlight`

## Component 7: StorySection
- **Purpose**: Communicate history, local identity, and family-friendly warmth.
- **Responsibilities**:
  - Present the parlor story with a readable narrative structure
  - Reinforce trust and village character
  - Connect emotionally without slowing access to practical information
- **Interface**:
  - `story: StoryContent`

## Component 8: ReviewsSection
- **Purpose**: Present social proof in a believable and friendly format.
- **Responsibilities**:
  - Display review excerpts, scores, and reviewer labels
  - Preserve a trustworthy tone
  - Make later replacement with real reviews straightforward
- **Interface**:
  - `reviews: ReviewQuote[]`
  - `summary: ReviewSummary`

## Component 9: VisitContactSection
- **Purpose**: Close the page with route, contact, and visit encouragement.
- **Responsibilities**:
  - Repeat important contact and location cues
  - Provide a strong but friendly last action point
  - Support footer-style site closure
- **Interface**:
  - `contact: ContactInfo`
  - `actions: ActionLink[]`

## Component 10: SectionShell
- **Purpose**: Provide consistent spacing, heading treatment, and decorative framing for sections.
- **Responsibilities**:
  - Standardize section padding and max-width behavior
  - Support visual variation through tokens or modifiers
  - Reduce duplicated layout code
- **Interface**:
  - `id?: string`
  - `eyebrow?: string`
  - `title: string`
  - `description?: string`
  - `tone?: "light" | "dark" | "accent" | "split"`
  - `children: React.ReactNode`

## Component 11: ActionPill
- **Purpose**: Provide reusable branded CTA styling.
- **Responsibilities**:
  - Render primary and secondary action links
  - Maintain touch-friendly presentation across screen sizes
  - Encode black/orange brand treatment consistently
- **Interface**:
  - `href: string`
  - `label: string`
  - `variant: "primary" | "secondary" | "ghost"`

## Component 12: ReviewCard / InfoCard Primitives
- **Purpose**: Encapsulate repeated card patterns for reviews, facts, and small highlights.
- **Responsibilities**:
  - Keep repeated UI structures consistent
  - Reduce duplication in section composition
  - Support future content expansion with minimal redesign
- **Interface**:
  - `children: React.ReactNode`
  - Variant-specific props as needed

## Supporting Non-Visual Structures

### LandingPageContent
- **Purpose**: Aggregate all page content into one typed object for composition.

### BrandConfig
- **Purpose**: Hold logo path, fallback label, and brand metadata.

### ActionLink
- **Purpose**: Represent CTA or navigation actions.

### OpeningHoursEntry
- **Purpose**: Represent day/time pairs.

### ContactInfo
- **Purpose**: Hold address, phone, and optional maps/reference links.

### TasteHighlight
- **Purpose**: Hold featured flavor content.

### StoryContent
- **Purpose**: Hold history/about copy blocks.

### ReviewQuote / ReviewSummary
- **Purpose**: Hold placeholder review data in a format that can later accept approved real data.
