"use server";

import { revalidatePath } from "next/cache";

import {
  buildPersistableFieldValues,
  FEATURED_TASTE_FIELDS,
  GROUPED_CONTENT_FIELDS,
  OPENING_HOURS_FIELDS,
  type ContentFieldConfig,
} from "./content-keys";
import { requireContentAdminActor } from "./admin-content";
import { INITIAL_CONTENT_ACTION_STATE, type ContentActionState } from "./content-action-state";
import {
  buildFieldValuesFromSnapshot,
  toFeaturedTasteFormValues,
  toGroupedContentFormValues,
  toOpeningHoursFormValues,
} from "./content-mappers";
import { logContentEvent } from "./content-logging";
import { getStoredContentSnapshot, saveContentMutation } from "./content-repository";
import { ensureContentSeeded } from "./content-seed";
import { validateContentFieldValues } from "./content-validation";

function readFormValues(fields: ContentFieldConfig[], formData: FormData): Record<string, string> {
  return Object.fromEntries(
    fields.map((field) => {
      const value = formData.get(field.name);
      return [field.name, typeof value === "string" ? value : ""];
    }),
  );
}

async function saveContentSection(options: {
  currentPath: string;
  fields: ContentFieldConfig[];
  previousState: ContentActionState;
  successMessage: string;
  targetSection: string;
  formData: FormData;
}) {
  void options.previousState;

  await ensureContentSeeded();

  try {
    const actor = await requireContentAdminActor(options.currentPath);
    const rawValues = readFormValues(options.fields, options.formData);
    const validation = validateContentFieldValues(options.fields, rawValues);

    if (!validation.isValid) {
      return {
        fieldErrors: validation.fieldErrors,
        message: "Controleer de gemarkeerde velden en probeer opnieuw.",
        status: "error" as const,
      };
    }

    const snapshot = getStoredContentSnapshot();
    const currentValues = buildFieldValuesFromSnapshot(options.fields, snapshot);

    saveContentMutation({
      actor,
      afterSnapshot: JSON.stringify(validation.cleanedValues),
      beforeSnapshot: JSON.stringify(currentValues),
      fieldValues: buildPersistableFieldValues(options.fields, validation.cleanedValues),
      targetSection: options.targetSection,
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/content");
    revalidatePath("/admin/content/opening-hours");
    revalidatePath("/admin/content/taste-of-the-week");

    logContentEvent({
      actorIdentifier: actor.email,
      details: {
        fieldCount: options.fields.length,
      },
      event: "content_save_succeeded",
      level: "info",
      targetSection: options.targetSection,
    });

    return {
      fieldErrors: {},
      message: options.successMessage,
      status: "success" as const,
    };
  } catch (error) {
    logContentEvent({
      error,
      event: "content_save_failed",
      level: "error",
      targetSection: options.targetSection,
    });

    return {
      fieldErrors: {},
      message: "Opslaan is niet gelukt. Probeer het opnieuw zonder de pagina te verversen.",
      status: "error" as const,
    };
  }
}

export async function saveGroupedContentAction(
  previousState: ContentActionState = INITIAL_CONTENT_ACTION_STATE,
  formData: FormData,
) {
  return saveContentSection({
    currentPath: "/admin/content",
    fields: GROUPED_CONTENT_FIELDS,
    formData,
    previousState,
    successMessage: "De homepage-content is opgeslagen.",
    targetSection: "grouped-content",
  });
}

export async function saveOpeningHoursAction(
  previousState: ContentActionState = INITIAL_CONTENT_ACTION_STATE,
  formData: FormData,
) {
  return saveContentSection({
    currentPath: "/admin/content/opening-hours",
    fields: OPENING_HOURS_FIELDS,
    formData,
    previousState,
    successMessage: "De openingstijden zijn opgeslagen.",
    targetSection: "opening-hours",
  });
}

export async function saveFeaturedTasteAction(
  previousState: ContentActionState = INITIAL_CONTENT_ACTION_STATE,
  formData: FormData,
) {
  return saveContentSection({
    currentPath: "/admin/content/taste-of-the-week",
    fields: FEATURED_TASTE_FIELDS,
    formData,
    previousState,
    successMessage: "De smaak van de week is opgeslagen.",
    targetSection: "featured-taste",
  });
}

export async function getLatestGroupedContentValues() {
  await ensureContentSeeded();
  return toGroupedContentFormValues(getStoredContentSnapshot());
}

export async function getLatestOpeningHoursValues() {
  await ensureContentSeeded();
  return toOpeningHoursFormValues(getStoredContentSnapshot());
}

export async function getLatestFeaturedTasteValues() {
  await ensureContentSeeded();
  return toFeaturedTasteFormValues(getStoredContentSnapshot());
}
