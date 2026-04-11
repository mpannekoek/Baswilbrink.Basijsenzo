import { defaultSiteContent } from "./default-site-content";

export interface ContentFieldConfig {
  label: string;
  maxLength: number;
  multiline?: boolean;
  name: string;
  section: string;
}

export interface ContentSectionConfig {
  description?: string;
  fields: ContentFieldConfig[];
  id: string;
  title: string;
}

export interface PersistableContentValue {
  fieldName: string;
  section: string;
  storage:
    | {
        key: string;
        kind: "single";
      }
    | {
        collection: string;
        itemKey: string;
        kind: "repeat";
        position: number;
      };
  value: string;
}

const repeatedCollectionPrefixes = [
  { collection: "openingHours", prefix: "openingHours" },
  { collection: "navItems", prefix: "navItems" },
  { collection: "socialLinks", prefix: "socialLinks" },
  { collection: "primaryActions", prefix: "primaryActions" },
  { collection: "visitHighlights", prefix: "practicalInfo.visitHighlights" },
  { collection: "galleryImages", prefix: "galleryShowcase.images" },
  { collection: "featuredTastePairings", prefix: "featuredTaste.pairings" },
] as const;

function input(name: string, label: string, maxLength = 160): Omit<ContentFieldConfig, "section"> {
  return {
    label,
    maxLength,
    name,
  };
}

function textarea(name: string, label: string, maxLength = 400): Omit<ContentFieldConfig, "section"> {
  return {
    label,
    maxLength,
    multiline: true,
    name,
  };
}

function defineSection(
  id: string,
  title: string,
  description: string,
  fields: Array<Omit<ContentFieldConfig, "section">>,
): ContentSectionConfig {
  return {
    description,
    fields: fields.map((field) => ({
      ...field,
      section: title,
    })),
    id,
    title,
  };
}

export const GROUPED_CONTENT_SECTIONS: ContentSectionConfig[] = [
  defineSection(
    "hero",
    "Hero en snelle info",
    "De kop, introductietekst en de snelle samenvatting bovenaan de pagina.",
    [
      input("hero.eyebrow", "Hero eyebrow", 80),
      input("hero.title", "Hero titel", 120),
      input("hero.highlight", "Hero highlight", 160),
      textarea("hero.description", "Hero beschrijving", 360),
      input("hero.quickInfo.eyebrow", "Quick info eyebrow", 80),
      input("hero.quickInfo.questionLabel", "Quick info label vraag", 80),
      input("hero.quickInfo.question", "Quick info vraag", 120),
      input("hero.quickInfo.answerLabel", "Quick info label antwoord", 80),
      textarea("hero.quickInfo.answer", "Quick info antwoord", 180),
    ],
  ),
  defineSection(
    "practical-info",
    "Praktische info",
    "De intro en samenvatting rond openingstijden, adres en bezoekinformatie.",
    [
      input("practicalInfo.eyebrow", "Eyebrow", 80),
      input("practicalInfo.title", "Titel", 140),
      textarea("practicalInfo.description", "Beschrijving", 320),
      input("practicalInfo.hoursTitle", "Bloktitel openingstijden", 80),
      textarea("practicalInfo.hoursNote", "Notitie openingstijden", 180),
      input("practicalInfo.todayBadge", "Badge voor vandaag", 30),
      input("practicalInfo.contactAccent", "Accent adres en contact", 80),
      input("practicalInfo.routeLabel", "Label routeknop", 40),
    ],
  ),
  defineSection(
    "visit-highlights",
    "Bezoek-highlights",
    "Drie korte highlights die de locatie en sfeer samenvatten.",
    [
      input("practicalInfo.visitHighlights.0.accent", "Highlight 1 accent", 40),
      input("practicalInfo.visitHighlights.0.title", "Highlight 1 titel", 80),
      textarea("practicalInfo.visitHighlights.0.body", "Highlight 1 tekst", 180),
      input("practicalInfo.visitHighlights.1.accent", "Highlight 2 accent", 40),
      input("practicalInfo.visitHighlights.1.title", "Highlight 2 titel", 80),
      textarea("practicalInfo.visitHighlights.1.body", "Highlight 2 tekst", 180),
      input("practicalInfo.visitHighlights.2.accent", "Highlight 3 accent", 40),
      input("practicalInfo.visitHighlights.2.title", "Highlight 3 titel", 80),
      textarea("practicalInfo.visitHighlights.2.body", "Highlight 3 tekst", 180),
    ],
  ),
  defineSection(
    "contact",
    "Adres en contact",
    "Zichtbare contactcopy op de homepage.",
    [
      input("contact.phoneLabel", "Telefoonlabel", 40),
      input("contact.address", "Adres", 140),
      textarea("contact.townLabel", "Korte omschrijving locatie", 180),
      textarea("contact.note", "Contactnotitie", 180),
    ],
  ),
  defineSection(
    "visit-contact",
    "Laatste CTA en footer",
    "De afsluitende oproep, contactlabels en footercopy.",
    [
      input("visitContact.eyebrow", "Laatste CTA eyebrow", 80),
      input("visitContact.title", "Laatste CTA titel", 140),
      textarea("visitContact.description", "Laatste CTA beschrijving", 220),
      textarea("visitContact.bodyText", "Laatste CTA hoofdtekst", 260),
      input("visitContact.contactTitle", "Contacttitel", 80),
      input("visitContact.followTitle", "Volgtitel", 80),
    ],
  ),
];

export const FEATURED_TASTE_SECTIONS: ContentSectionConfig[] = [
  defineSection(
    "taste-intro",
    "Smaak van de week",
    "De belangrijkste copy voor de uitgelichte smaak.",
    [
      input("featuredTaste.eyebrow", "Eyebrow", 80),
      input("featuredTaste.title", "Titel", 120),
      textarea("featuredTaste.sectionDescription", "Sectiebeschrijving", 220),
      input("featuredTaste.flavor", "Naam van de smaak", 120),
      textarea("featuredTaste.description", "Beschrijving", 260),
      input("featuredTaste.accentLabel", "Accentlabel", 80),
      input("featuredTaste.supportTitle", "Ondersteunende titel", 140),
      input("featuredTaste.impressionEyebrow", "Impressie eyebrow", 80),
      textarea("featuredTaste.impressionText", "Impressietekst", 220),
    ],
  ),
  defineSection(
    "taste-images",
    "Foto's",
    "Gebruik publieke afbeeldingspaden uit de app, bijvoorbeeld /basijs2.jpg.",
    [
      input("featuredTaste.imagePrimarySrc", "Primaire foto", 160),
      input("featuredTaste.imageSecondarySrc", "Secundaire foto", 160),
    ],
  ),
  defineSection(
    "taste-pairings",
    "Aanbevolen combinaties",
    "Drie korte pairing-regels voor de uitgelichte smaak.",
    [
      input("featuredTaste.pairings.0", "Pairing 1", 80),
      input("featuredTaste.pairings.1", "Pairing 2", 80),
      input("featuredTaste.pairings.2", "Pairing 3", 80),
    ],
  ),
];

export const GALLERY_SHOWCASE_SECTIONS: ContentSectionConfig[] = [
  defineSection(
    "gallery-intro",
    "Sfeerimpressie",
    "De tekst van het groene introductieblok boven de slider.",
    [
      input("galleryShowcase.eyebrow", "Eyebrow", 80),
      input("galleryShowcase.title", "Titel", 140),
      textarea("galleryShowcase.description", "Beschrijving", 260),
    ],
  ),
  defineSection(
    "gallery-images",
    "Slider-afbeeldingen",
    "Beheer hier de afbeeldingen die in de homepage-slider verschijnen.",
    [
      input("galleryShowcase.images.0.src", "Slide 1 foto", 160),
      input("galleryShowcase.images.1.src", "Slide 2 foto", 160),
      input("galleryShowcase.images.2.src", "Slide 3 foto", 160),
      input("galleryShowcase.images.3.src", "Slide 4 foto", 160),
      input("galleryShowcase.images.4.src", "Slide 5 foto", 160),
    ],
  ),
];

export const OPENING_HOURS_FIELDS: ContentFieldConfig[] = defaultSiteContent.openingHours.map((entry, index) => ({
  label: entry.day,
  maxLength: 80,
  name: `openingHours.${index}.hours`,
  section: "Openingstijden",
}));

export const GROUPED_CONTENT_FIELDS = GROUPED_CONTENT_SECTIONS.flatMap((section) => section.fields);
export const FEATURED_TASTE_FIELDS = FEATURED_TASTE_SECTIONS.flatMap((section) => section.fields);
export const GALLERY_SHOWCASE_FIELDS = GALLERY_SHOWCASE_SECTIONS.flatMap((section) => section.fields);
export const ALL_EDITABLE_FIELDS = [
  ...GROUPED_CONTENT_FIELDS,
  ...OPENING_HOURS_FIELDS,
  ...FEATURED_TASTE_FIELDS,
  ...GALLERY_SHOWCASE_FIELDS,
];

function parseFieldPath(fieldName: string): Array<number | string> {
  return fieldName.split(".").map((segment) => {
    const maybeIndex = Number(segment);
    return Number.isInteger(maybeIndex) && segment === String(maybeIndex) ? maybeIndex : segment;
  });
}

function getRepeatedCollectionMatch(fieldName: string) {
  return [...repeatedCollectionPrefixes]
    .sort((left, right) => right.prefix.length - left.prefix.length)
    .find((candidate) => fieldName.startsWith(`${candidate.prefix}.`));
}

export function getFieldNameForStoredRepeatedValue(collection: string, itemKey: string): string {
  const repeatedCollection = repeatedCollectionPrefixes.find((candidate) => candidate.collection === collection);

  return repeatedCollection ? `${repeatedCollection.prefix}.${itemKey}` : `${collection}.${itemKey}`;
}

export function getFieldTestId(fieldName: string): string {
  return `content-field-${fieldName.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
}

export function getFieldValueFromContent(content: unknown, fieldName: string): string {
  let current: unknown = content;

  for (const segment of parseFieldPath(fieldName)) {
    if (current == null) {
      return "";
    }

    current = (current as Record<string, unknown> | unknown[])[segment as never];
  }

  return typeof current === "string" ? current : "";
}

export function setFieldValueInContent(content: unknown, fieldName: string, value: string): void {
  const path = parseFieldPath(fieldName);
  const lastSegment = path[path.length - 1];

  let current: unknown = content;

  for (const segment of path.slice(0, -1)) {
    current = (current as Record<string, unknown> | unknown[])[segment as never];
  }

  (current as any)[lastSegment as string | number] = value;
}

export function buildInitialFieldValues(fields: ContentFieldConfig[], content = defaultSiteContent): Record<string, string> {
  return Object.fromEntries(fields.map((field) => [field.name, getFieldValueFromContent(content, field.name)]));
}

export function buildPersistableFieldValues(
  fields: ContentFieldConfig[],
  values: Record<string, string>,
): PersistableContentValue[] {
  return fields.map((field) => {
    const repeatedCollection = getRepeatedCollectionMatch(field.name);

    if (!repeatedCollection) {
      return {
        fieldName: field.name,
        section: field.section,
        storage: {
          key: field.name,
          kind: "single",
        },
        value: values[field.name] ?? "",
      };
    }

    const itemKey = field.name.slice(repeatedCollection.prefix.length + 1);
    const position = Number(itemKey.split(".")[0] ?? 0);

    return {
      fieldName: field.name,
      section: field.section,
      storage: {
        collection: repeatedCollection.collection,
        itemKey,
        kind: "repeat",
        position,
      },
      value: values[field.name] ?? "",
    };
  });
}
