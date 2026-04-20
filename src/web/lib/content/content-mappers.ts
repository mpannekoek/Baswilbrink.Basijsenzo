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
import { toRuntimeImagePath } from "./upload-public-path";

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

  const callAction = content.primaryActions.find((action) => action.dataTestId === "header-call-button");
  if (callAction) {
    callAction.href = content.contact.phoneHref;
  }

  const routeAction = content.primaryActions.find((action) => action.dataTestId === "header-visit-button");
  if (routeAction) {
    routeAction.href = content.contact.routeHref;
  }

  content.featuredTaste.imagePrimarySrc = toRuntimeImagePath(content.featuredTaste.imagePrimarySrc);
  content.featuredTaste.imageSecondarySrc = toRuntimeImagePath(content.featuredTaste.imageSecondarySrc);
  content.galleryShowcase.images = content.galleryShowcase.images.map((image) => ({
    ...image,
    src: toRuntimeImagePath(image.src),
  }));

  return content;
}

export function toGroupedContentFormValues(snapshot: StoredContentSnapshot): ContentFieldValues {
  return buildFieldValuesFromSnapshot(GROUPED_CONTENT_FIELDS, snapshot);
}

export function toOpeningHoursFormValues(snapshot: StoredContentSnapshot): ContentFieldValues {
  return buildFieldValuesFromSnapshot(OPENING_HOURS_FIELDS, snapshot);
}

export function toFeaturedTasteFormValues(snapshot: StoredContentSnapshot): ContentFieldValues {
  const values = buildFieldValuesFromSnapshot(FEATURED_TASTE_FIELDS, snapshot);

  return {
    ...values,
    "featuredTaste.imagePrimarySrc": toRuntimeImagePath(values["featuredTaste.imagePrimarySrc"] ?? ""),
    "featuredTaste.imageSecondarySrc": toRuntimeImagePath(values["featuredTaste.imageSecondarySrc"] ?? ""),
  };
}

export function toGalleryShowcaseFormValues(snapshot: StoredContentSnapshot): ContentFieldValues {
  const values = buildFieldValuesFromSnapshot(GALLERY_SHOWCASE_FIELDS, snapshot);

  return Object.fromEntries(
    Object.entries(values).map(([fieldName, value]) => {
      if (/^galleryShowcase\.images\.\d+\.src$/.test(fieldName)) {
        return [fieldName, toRuntimeImagePath(value)];
      }

      return [fieldName, value];
    }),
  );
}

export function buildDefaultPersistableValues() {
  return buildPersistableFieldValues(ALL_EDITABLE_FIELDS, buildInitialFieldValues(ALL_EDITABLE_FIELDS));
}
