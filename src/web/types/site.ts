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

export type HeaderContent = {
  menuOpenLabel: string;
  menuCloseLabel: string;
  mobileNavAriaLabel: string;
  navAriaLabel: string;
};

export type SectionIntroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  asideTitle: string;
  asideText: string;
  detailChips: string[];
  featureImageAlt: string;
  quickInfo: {
    eyebrow: string;
    questionLabel: string;
    question: string;
    answerLabel: string;
    answer: string;
  };
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

export type PracticalInfoContent = SectionIntroContent & {
  hoursTitle: string;
  hoursNote: string;
  todayBadge: string;
  contactAccent: string;
  routeLabel: string;
  visitHighlights: Array<{
    accent: string;
    title: string;
    body: string;
  }>;
};

export type TasteHighlight = Omit<SectionIntroContent, "description"> & {
  sectionDescription: string;
  flavor: string;
  description: string;
  pairings: string[];
  accentLabel: string;
  supportTitle: string;
  imagePrimaryAlt: string;
  imageSecondaryAlt: string;
  impressionEyebrow: string;
  impressionText: string;
};

export type ReviewQuote = {
  name: string;
  quote: string;
  rating: number;
};

export type ReviewSummary = SectionIntroContent & {
  averageRating: string;
  sourceLabel: string;
  note: string;
};

export type VisitContactContent = SectionIntroContent & {
  bodyText: string;
  routeLabel: string;
  contactTitle: string;
  followTitle: string;
};

export type SiteFooterContent = {
  copyrightText: string;
  creatorIntro: string;
  creatorName: string;
  creatorHref: string;
  creatorCta: string;
};

export type SiteMetadataContent = {
  title: string;
  description: string;
  metadataBaseUrl: string;
  openGraphTitle: string;
  openGraphDescription: string;
};

export type LandingPageContent = {
  metadata: SiteMetadataContent;
  header: HeaderContent;
  brand: BrandConfig;
  navItems: NavItem[];
  socialLinks: SocialLink[];
  primaryActions: ActionLink[];
  hero: HeroContent;
  practicalInfo: PracticalInfoContent;
  openingHours: OpeningHoursEntry[];
  contact: ContactInfo;
  featuredTaste: TasteHighlight;
  reviews: ReviewQuote[];
  reviewSummary: ReviewSummary;
  visitContact: VisitContactContent;
  siteFooter: SiteFooterContent;
};
