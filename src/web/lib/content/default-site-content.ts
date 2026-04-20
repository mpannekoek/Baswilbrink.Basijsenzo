import type { LandingPageContent } from "@/types/site";

export const defaultSiteContent: LandingPageContent = {
  metadata: {
    title: "Bas IJs & Zo | Ambachtelijk ijs in het hart van het dorp",
    description:
      "Bas IJs & Zo is de warme dorpsijssalon voor ambachtelijk ijs, duidelijke openingstijden en een gezellig bezoek in het hart van het dorp.",
    metadataBaseUrl: "https://www.basijsenzo.local",
    openGraphTitle: "Bas IJs & Zo",
    openGraphDescription:
      "Warm, ambachtelijk en vertrouwd: Bas IJs & Zo brengt smaak van de week, praktische info en dorpsgezelligheid samen op een rustige homepage.",
  },
  header: {
    menuOpenLabel: "Menu openen",
    menuCloseLabel: "Menu sluiten",
    mobileNavAriaLabel: "Mobiele hoofdnavigatie",
    navAriaLabel: "Hoofdnavigatie",
  },
  brand: {
    logoSrc: "/logo.png",
    fallbackLabel: "Bas IJs & Zo",
    tagline: "Ambachtelijk ijs in het hart van het dorp",
  },
  navItems: [
    { href: "#openingstijden", label: "Openingstijden" },
    { href: "#smaak", label: "Smaak van de week" },
    { href: "#impressie", label: "Sfeerimpressie" },
  ],
  socialLinks: [
    {
      href: "https://www.instagram.com/basijsenz",
      label: "Instagram",
      dataTestId: "social-instagram-link",
    },
    {
      href: "https://www.facebook.com/profile.php?id=100057594933642",
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
      href: "https://maps.google.com/?q=Dorpsstraat+11+8181+HL+Heerde",
      label: "Plan je route",
      variant: "secondary",
      dataTestId: "header-visit-button",
    },
  ],
  hero: {
    eyebrow: "Bas IJs & Zo in dorpssfeer",
    title: "Ambachtelijk ijs voor",
    highlight: "een klein ommetje dat altijd de moeite waard is.",
    description:
      "Van een snelle stop na school tot een rustig rondje op zondag: bij Bas IJs & Zo draait het om echt schepijs, een vriendelijke begroeting en een plek waar je graag nog even blijft staan.",
    asideTitle: "Smaak van deze week",
    asideText:
      "Zwarte sinaasappel met knapperige karamelstukjes. Fris van toon, romig in de basis en precies uitgesproken genoeg voor een tweede bol.",
    detailChips: [],
    featureImageAlt: "De vitrine en het interieur van Bas IJs & Zo",
    quickInfo: {
      eyebrow: "Snel geregeld",
      questionLabel: "Wat je meteen ziet",
      question: "Openingstijden, adres en telefoonnummer",
      answerLabel: "Waarom dat fijn is",
      answer: "De site zet openingstijden, route en belknoppen meteen vooraan.",
    },
  },
  practicalInfo: {
    eyebrow: "Praktisch & duidelijk",
    title: "Vandaag langskomen? Alles staat meteen op een rij.",
    description:
      "Voor een lokale zaak telt vooral duidelijkheid. Daarom zie je hier eerst wanneer we open zijn, waar je ons vindt en hoe je zonder zoeken vertrekt.",
    hoursTitle: "Openingstijden",
    hoursNote: "Bel rond feestdagen of bij twijfel even voor de zekerheid.",
    todayBadge: "Vandaag",
    contactAccent: "Adres & contact",
    routeLabel: "Route plannen",
    visitHighlights: [
      {
        accent: "Snel",
        title: "Zo gevonden",
        body: "Je ziet direct waar we zitten, wanneer we open zijn en hoe je het snelst rijdt.",
      },
      {
        accent: "Lokaal",
        title: "Vertrouwd adres",
        body: "Midden in het dorp, met ruimte voor een spontaan ijsje of een vaste stop na het eten.",
      },
      {
        accent: "Gezellig",
        title: "Even blijven hangen",
        body: "Een plek waar gezinnen, buren en passanten elkaar makkelijk tegenkomen op een zomerse avond.",
      },
    ],
  },
  openingHours: [
    { day: "Maandag", hours: "Gesloten" },
    { day: "Dinsdag", hours: "12:00 - 20:00" },
    { day: "Woensdag", hours: "12:00 - 20:00" },
    { day: "Donderdag", hours: "12:00 - 20:30" },
    { day: "Vrijdag", hours: "12:00 - 21:00" },
    { day: "Zaterdag", hours: "11:30 - 21:00" },
    { day: "Zondag", hours: "13:00 - 20:00" },
  ],
  contact: {
    phoneLabel: "024 - 000 00 00",
    phoneHref: "tel:+31240000000",
    address: "Dorpsstraat 12, 6678 AB Voorbeelddorp",
    townLabel: "Makkelijk te vinden in het hart van het dorp, vlak bij de dagelijkse loop van buurt en bezoekers.",
    routeHref: "https://maps.google.com/?q=Dorpsstraat+12+6678+AB+Voorbeelddorp",
    note: "Bel bij grotere bestellingen of controleer rond feestdagen even de actuele openingstijd.",
  },
  featuredTaste: {
    eyebrow: "Smaak van de week",
    title: "Zwarte Sinaasappel & Karamel",
    sectionDescription:
      "Een kleine seizoensspecial verdient net wat meer aandacht, zonder dat de pagina er druk van wordt.",
    description:
      "Een volle roombasis met diepe sinaasappeltonen en krokante karamel. Bekend genoeg om direct lekker te voelen, verrassend genoeg om speciaal voor om te rijden.",
    flavor: "Zwarte Sinaasappel & Karamel",
    pairings: ["Lekker op een hoorntje", "Ook fijn in een beker", "Mooi met een extra wafeltje"],
    accentLabel: "Deze week extra geliefd",
    supportTitle: "Fris, romig en net eigenwijs genoeg voor een tweede bol.",
    imagePrimarySrc: "/basijs2.jpg",
    imageSecondarySrc: "/basijs3.jpg",
    imagePrimaryAlt: "Foto van de smaak van de week in de vitrine",
    imageSecondaryAlt: "Tweede foto van de smaak van de week",
    impressionEyebrow: "Uit de vitrine",
    impressionText:
      "Met echte beelden uit de vitrine voelt deze smaak als een uitnodiging van de toonbank zelf, niet als losse promotietekst.",
  },
  galleryShowcase: {
    eyebrow: "Uit de vitrine",
    title: "De sfeer proef je hier al voordat je binnenstapt.",
    description:
      "Laat dit blok een korte, warme introductie zijn op de beelden eronder: ambachtelijk ijs, een volle vitrine en een plek waar je meteen zin krijgt om even te stoppen.",
    images: [
      {
        alt: "Eerste sfeerfoto van de vitrine bij Bas IJs & Zo",
        src: "/basijs1.jpg",
      },
      {
        alt: "Tweede sfeerfoto van het schepijs bij Bas IJs & Zo",
        src: "/basijs2.jpg",
      },
      {
        alt: "Derde sfeerfoto van het ijs in de vitrine",
        src: "/basijs3.jpg",
      },
      {
        alt: "Extra sfeerfoto van de toonbank met ambachtelijk ijs",
        src: "/basijs2.jpg",
      },
      {
        alt: "Vijfde sfeerfoto van de vitrine met vers schepijs",
        src: "/basijs1.jpg",
      },
    ],
  },
  visitContact: {
    eyebrow: "Laatste zetje",
    title: "Zin in een ijsje? Bel even of rijd gewoon langs.",
    description:
      "Voor bezoekers die eigenlijk al bijna onderweg zijn, mag het laatste blok vooral duidelijk en uitnodigend zijn.",
    bodyText:
      "Bel direct voor een vraag, open je route en stap daarna gewoon binnen. Bas IJs & Zo is bedoeld als een fijne dorpsstop: makkelijk, warm en zonder gedoe.",
    contactTitle: "Adres & contact",
    followTitle: "Volg ons",
  },
  siteFooter: {
    copyrightText: "© 2026 Bas IJs & Zo. Alle rechten voorbehouden.",
    creatorIntro: "Website gemaakt door",
    creatorName: "Martijn Pannekoek",
    creatorHref: "https://martijnpannekoek.nl",
    creatorCta: "Ook een applicatie of website nodig?",
  },
};
