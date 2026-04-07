import { getAdminAccessDecision } from "@/lib/auth/admin-access";

import {
  FEATURED_TASTE_FIELDS,
  FEATURED_TASTE_SECTIONS,
  GALLERY_SHOWCASE_SECTIONS,
  GROUPED_CONTENT_SECTIONS,
  OPENING_HOURS_FIELDS,
} from "./content-keys";
import {
  toFeaturedTasteFormValues,
  toGalleryShowcaseFormValues,
  toGroupedContentFormValues,
  toOpeningHoursFormValues,
} from "./content-mappers";
import { logContentEvent } from "./content-logging";
import { getStoredContentSnapshot } from "./content-repository";
import { ensureContentSeeded } from "./content-seed";

export interface ContentMutationActor {
  displayName: string;
  email: string;
}

export async function requireContentAdminActor(currentPath: string): Promise<ContentMutationActor> {
  const decision = await getAdminAccessDecision(currentPath);

  if (decision.kind !== "authorized") {
    logContentEvent({
      event: "content_admin_unauthorized",
      level: "warn",
      targetSection: currentPath,
    });
    throw new Error("UNAUTHORIZED_CONTENT_ADMIN");
  }

  return {
    displayName: decision.sessionViewModel.displayName,
    email: decision.session.user?.email ?? decision.sessionViewModel.email,
  };
}

export async function getGroupedContentPageModel() {
  await ensureContentSeeded();

  return {
    sections: GROUPED_CONTENT_SECTIONS,
    values: toGroupedContentFormValues(getStoredContentSnapshot()),
  };
}

export async function getOpeningHoursPageModel() {
  await ensureContentSeeded();

  return {
    fields: OPENING_HOURS_FIELDS,
    values: toOpeningHoursFormValues(getStoredContentSnapshot()),
  };
}

export async function getFeaturedTastePageModel() {
  await ensureContentSeeded();

  return {
    sections: FEATURED_TASTE_SECTIONS,
    values: toFeaturedTasteFormValues(getStoredContentSnapshot()),
  };
}

export async function getGalleryShowcasePageModel() {
  await ensureContentSeeded();

  return {
    sections: GALLERY_SHOWCASE_SECTIONS,
    values: toGalleryShowcaseFormValues(getStoredContentSnapshot()),
  };
}
