export type ActionLink = {
  href: string;
  label: string;
  variant: "primary" | "secondary" | "ghost";
  dataTestId: string;
};

export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  href: string;
  label: "Instagram" | "Facebook";
  dataTestId: string;
};

export type BrandConfig = {
  logoSrc: string;
  fallbackLabel: string;
  tagline: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  asideTitle: string;
  asideText: string;
  detailChips: string[];
};

export type OpeningHoursEntry = {
  day: string;
  hours: string;
  isToday?: boolean;
};

export type ContactInfo = {
  phoneLabel: string;
  phoneHref: string;
  address: string;
  townLabel: string;
  routeHref: string;
  note: string;
};

export type TasteHighlight = {
  flavor: string;
  description: string;
  pairings: string[];
  accentLabel: string;
};

export type StoryContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  timeline: Array<{
    label: string;
    value: string;
  }>;
};

export type ReviewQuote = {
  name: string;
  quote: string;
  rating: number;
};

export type ReviewSummary = {
  averageRating: string;
  sourceLabel: string;
  note: string;
};

export type SiteFooterContent = {
  copyrightText: string;
  creatorIntro: string;
  creatorName: string;
  creatorHref: string;
  creatorCta: string;
};

export type LandingPageContent = {
  brand: BrandConfig;
  navItems: NavItem[];
  socialLinks: SocialLink[];
  primaryActions: ActionLink[];
  hero: HeroContent;
  openingHours: OpeningHoursEntry[];
  contact: ContactInfo;
  visitNotes: string[];
  featuredTaste: TasteHighlight;
  story: StoryContent;
  reviews: ReviewQuote[];
  reviewSummary: ReviewSummary;
  footerTitle: string;
  footerText: string;
  siteFooter: SiteFooterContent;
};
