import type { LandingPageContent } from "@/types/site";

import {
  ALL_EDITABLE_FIELDS,
  buildInitialFieldValues,
  buildPersistableFieldValues,
  FEATURED_TASTE_FIELDS,
  GALLERY_SHOWCASE_FIELDS,
  getFieldNameForStoredRepeatedValue,
  GROUPED_CONTENT_FIELDS,
  OPENING_HOURS_FIELDS,
  setFieldValueInContent,
  type ContentFieldConfig,
} from "./content-keys";
import { defaultSiteContent } from "./default-site-content";
import type { StoredContentSnapshot } from "./content-repository";

export type ContentFieldValues = Record<string, string>;

function buildStoredValueMap(snapshot: StoredContentSnapshot): Map<string, string> {
  const storedValues = new Map<string, string>();

  for (const entry of snapshot.entries) {
    storedValues.set(entry.key, entry.value);
  }

  for (const entry of snapshot.repeatedEntries) {
    storedValues.set(getFieldNameForStoredRepeatedValue(entry.collection, entry.itemKey), entry.value);
  }

  return storedValues;
}

export function buildFieldValuesFromSnapshot(
  fields: ContentFieldConfig[],
  snapshot: StoredContentSnapshot,
): ContentFieldValues {
  const storedValues = buildStoredValueMap(snapshot);
  const defaults = buildInitialFieldValues(fields);

  return Object.fromEntries(
    fields.map((field) => [field.name, storedValues.get(field.name) ?? defaults[field.name] ?? ""]),
  );
}

export function toLandingPageContent(snapshot: StoredContentSnapshot): LandingPageContent {
  const content = structuredClone(defaultSiteContent);
  const values = buildFieldValuesFromSnapshot(ALL_EDITABLE_FIELDS, snapshot);

  for (const field of ALL_EDITABLE_FIELDS) {
    setFieldValueInContent(content, field.name, values[field.name] ?? "");
  }

  const legacyGalleryNavLabel = content.navItems[2]?.label.trim().toLowerCase();

  if (legacyGalleryNavLabel === "reviews" && defaultSiteContent.navItems[2]) {
    content.navItems[2].label = defaultSiteContent.navItems[2].label;
  }

  return content;
}

export function toGroupedContentFormValues(snapshot: StoredContentSnapshot): ContentFieldValues {
  return buildFieldValuesFromSnapshot(GROUPED_CONTENT_FIELDS, snapshot);
}

export function toOpeningHoursFormValues(snapshot: StoredContentSnapshot): ContentFieldValues {
  return buildFieldValuesFromSnapshot(OPENING_HOURS_FIELDS, snapshot);
}

export function toFeaturedTasteFormValues(snapshot: StoredContentSnapshot): ContentFieldValues {
  return buildFieldValuesFromSnapshot(FEATURED_TASTE_FIELDS, snapshot);
}

export function toGalleryShowcaseFormValues(snapshot: StoredContentSnapshot): ContentFieldValues {
  return buildFieldValuesFromSnapshot(GALLERY_SHOWCASE_FIELDS, snapshot);
}

export function buildDefaultPersistableValues() {
  return buildPersistableFieldValues(ALL_EDITABLE_FIELDS, buildInitialFieldValues(ALL_EDITABLE_FIELDS));
}
