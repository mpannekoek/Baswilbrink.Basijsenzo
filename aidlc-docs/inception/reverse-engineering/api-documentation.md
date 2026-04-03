# API Documentation

## REST APIs
- No custom REST endpoints are implemented in the current repository state.

## Internal APIs

### `Home()`
- **Location**: `src/web/app/page.tsx`
- **Purpose**: Render the root homepage route
- **Parameters**: None
- **Return Type**: React element

### `LandingPage(props)`
- **Location**: `src/web/components/landing/landing-page.tsx`
- **Purpose**: Compose the full homepage from structured content
- **Parameters**:
  - `content: LandingPageContent`
- **Return Type**: React element

### `getSiteMetadata()`
- **Location**: `src/web/lib/site/metadata.ts`
- **Purpose**: Convert centralized content metadata into the Next.js `Metadata` shape
- **Parameters**: None
- **Return Type**: `Metadata`

### `getSecurityHeaders(isDevelopment)`
- **Location**: `src/web/lib/site/security-headers.ts`
- **Purpose**: Provide the global HTTP response header set for the Next.js app
- **Parameters**:
  - `isDevelopment: boolean`
- **Return Type**: `Array<{ key: string; value: string }>`

### `proxy(request)`
- **Location**: `src/web/proxy.ts`
- **Purpose**: Enforce a lightweight request budget for public routes and return HTTP 429 on burst abuse
- **Parameters**:
  - `request: NextRequest`
- **Return Type**: `NextResponse`

## Data Models

### `LandingPageContent`
- **Location**: `src/web/types/site.ts`
- **Fields**:
  - `metadata`
  - `header`
  - `brand`
  - `navItems`
  - `socialLinks`
  - `primaryActions`
  - `hero`
  - `practicalInfo`
  - `openingHours`
  - `contact`
  - `featuredTaste`
  - `story`
  - `reviews`
  - `reviewSummary`
  - `visitContact`
  - `siteFooter`
- **Relationships**: Aggregates all other page-specific content types
- **Validation**: Compile-time typing only; no runtime schema validation is currently present

### Supporting Content Types
- **ActionLink**: CTA model with href, label, variant, and test id
- **NavItem**: Anchor target and label
- **SocialLink**: Social destination plus test id
- **BrandConfig**: Logo source, fallback label, tagline
- **HeaderContent**: Accessibility labels for navigation controls
- **HeroContent**: Main hero copy, imagery labels, and quick info content
- **OpeningHoursEntry**: Day and hours, optional `isToday`
- **ContactInfo**: Address, phone, route target, and helper note
- **ReviewQuote / ReviewSummary**: Social-proof data structures

## External Contract Notes
- The site exposes one user-facing HTML route at `/`.
- The response contract also includes global HTTP headers configured in `next.config.ts`.
- A route-level abuse-control contract now exists through `src/web/proxy.ts`, which returns HTTP 429 with `Retry-After` when a single client exceeds the configured request window.
- Outbound navigation contracts exist for `tel:` links, Google Maps, Instagram, Facebook, and the creator site.
