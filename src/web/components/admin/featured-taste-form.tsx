"use client";

import type { ContentSectionConfig } from "@/lib/content/content-keys";
import { saveFeaturedTasteAction } from "@/lib/content/content-actions";

import { ContentSectionEditorForm } from "./grouped-content-form";

export function FeaturedTasteForm({
  initialValues,
  sections,
}: {
  initialValues: Record<string, string>;
  sections: ContentSectionConfig[];
}) {
  return (
    <ContentSectionEditorForm
      action={saveFeaturedTasteAction}
      formTestId="admin-featured-taste-form"
      initialValues={initialValues}
      pendingLabel="Smaak opslaan..."
      saveButtonTestId="admin-featured-taste-save-button"
      saveLabel="Smaak van de week opslaan"
      sections={sections}
      statusTestId="admin-featured-taste-status"
    />
  );
}
