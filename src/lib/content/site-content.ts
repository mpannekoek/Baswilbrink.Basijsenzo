import type { LandingPageContent } from "@/types/site";

export const siteContent: LandingPageContent = {
  brand: {
    logoSrc: "/logo.png",
    fallbackLabel: "Bas IJs & Zo",
    tagline: "Dorps ijswinkel met een warm welkom",
  },
  navItems: [
    { href: "#openingstijden", label: "Openingstijden" },
    { href: "#smaak", label: "Smaak van de week" },
    { href: "#verhaal", label: "Ons verhaal" },
    { href: "#reviews", label: "Reviews" },
  ],
  socialLinks: [
    {
      href: "https://www.instagram.com/basijsenzo",
      label: "Instagram",
      dataTestId: "social-instagram-link",
    },
    {
      href: "https://www.facebook.com/basijsenzo",
      label: "Facebook",
      dataTestId: "social-facebook-link",
    },
  ],
  primaryActions: [
    {
      href: "tel:+31240000000",
      label: "Bel direct",
      variant: "primary",
      dataTestId: "header-call-button",
    },
    {
      href: "#bezoek",
      label: "Plan je bezoek",
      variant: "secondary",
      dataTestId: "header-visit-button",
    },
  ],
  hero: {
    eyebrow: "Bas IJs & Zo in dorpssfeer",
    title: "Ambachtelijk ijs voor het hele dorp,",
    highlight: "met een schep vrolijkheid erbij.",
    description:
      "Een warme, lokale ijssalon waar je snel je openingstijden vindt, iets nieuws proeft en meteen voelt waarom families en vaste gasten hier graag terugkomen.",
    asideTitle: "Smaak van deze week",
    asideText:
      "Zwarte sinaasappel met knapperige karamelstukjes. Fris, romig en precies zo uitgesproken als onze kleuren.",
    detailChips: ["Mobiel vriendelijk", "Dorps gevoel", "Voorbeeldcontent klaar om te vervangen"],
  },
  openingHours: [
    { day: "Maandag", hours: "Gesloten" },
    { day: "Dinsdag", hours: "12:00 - 20:00" },
    { day: "Woensdag", hours: "12:00 - 20:00", isToday: true },
    { day: "Donderdag", hours: "12:00 - 20:30" },
    { day: "Vrijdag", hours: "12:00 - 21:00" },
    { day: "Zaterdag", hours: "11:30 - 21:00" },
    { day: "Zondag", hours: "13:00 - 20:00" },
  ],
  contact: {
    phoneLabel: "024 - 000 00 00",
    phoneHref: "tel:+31240000000",
    address: "Dorpsstraat 12, 6678 AB Voorbeelddorp",
    townLabel: "Makkelijk te vinden in het hart van het dorp",
    routeHref: "https://maps.google.com/?q=Dorpsstraat+12+6678+AB+Voorbeelddorp",
    note: "Voorbeeldgegevens voor deze eerste versie. Definitieve contactinfo kan later direct in de contentfile worden vervangen.",
  },
  visitNotes: [
    "Loop binnen voor een snelle tussenstop of neem het hele gezin mee.",
    "Route, belknop en openingstijden blijven ook op mobiel direct zichtbaar.",
    "De eerste versie gebruikt realistische voorbeeldteksten totdat de definitieve gegevens zijn ingevuld.",
  ],
  featuredTaste: {
    flavor: "Zwarte Sinaasappel & Karamel",
    description:
      "Een speelse combinatie van diepe sinaasappeltonen, zachte room en krokante karamel. Lokaal genoeg voor een vaste favoriet, verrassend genoeg voor een omweg.",
    pairings: ["Lekker op een hoorntje", "Ook fijn als beker", "Past goed bij een extra wafeltje"],
    accentLabel: "Nieuw deze week",
  },
  story: {
    eyebrow: "Een plek waar mensen blijven hangen",
    title: "Bas IJs & Zo voelt als het dorp in zomerse vorm.",
    paragraphs: [
      "Bas IJs & Zo draait om een vriendelijke glimlach, herkenbare gezichten en ijs waar je meteen zin in krijgt. Niet groot of afstandelijk, maar juist dichtbij en vertrouwd.",
      "De eerste indruk moet voelen als een bezoek aan een fijne dorpsplek: vrolijk, duidelijk en verzorgd. Daarom staat praktische informatie hier net zo centraal als sfeer en verhaal.",
    ],
    timeline: [
      { label: "Dorpsgevoel", value: "Warm, lokaal en laagdrempelig" },
      { label: "Familieproof", value: "Speels zonder onrustig te worden" },
      { label: "Makkelijk te beheren", value: "Content staat centraal en is snel te vervangen" },
    ],
  },
  reviews: [
    {
      name: "Sanne uit de buurt",
      quote:
        "Je merkt meteen dat dit zo'n plek is waar mensen elkaar kennen. Fijn ijs, vriendelijke service en precies de juiste dorpssfeer.",
      rating: 5,
    },
    {
      name: "Tom & gezin",
      quote:
        "We zochten vooral een gezellige stop voor de kinderen en bleven veel langer hangen dan gepland. Overzichtelijke site, leuke smaak van de week en goede sfeer.",
      rating: 5,
    },
    {
      name: "Bezoeker onderweg",
      quote:
        "Zelfs zonder het dorp te kennen wist ik snel waar ik moest zijn en wanneer het open was. Dat vertrouwen voel je ook op de pagina.",
      rating: 4,
    },
  ],
  reviewSummary: {
    averageRating: "4,8/5",
    sourceLabel: "Google reviews als inspiratie",
    note: "Voorbeeldquotes voor de eerste versie. De structuur is klaar om later echte, goedgekeurde reviews in te voegen.",
  },
  footerTitle: "Zin in een dorps omweg met goed ijs?",
  footerText:
    "Bel, plan je route of loop gewoon binnen. De pagina is zo opgezet dat bezoekers snel hun informatie vinden en jij later zonder gedoe echte gegevens kunt invullen.",
  siteFooter: {
    copyrightText: "© 2026 Bas IJs & Zo! Alle rechten voorbehouden.",
    creatorIntro: "Website gemaakt door",
    creatorName: "Martijn Pannekoek",
    creatorHref: "https://martijnpannekoek.duckdns.org/",
    creatorCta: "Ook een applicatie of website nodig?",
  },
};
