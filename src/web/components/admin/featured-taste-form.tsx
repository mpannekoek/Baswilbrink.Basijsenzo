"use client";

import { useState } from "react";

import type { ContentSectionConfig } from "@/lib/content/content-keys";
import {
  saveFeaturedTasteAction,
  uploadFeaturedTasteImageAction,
} from "@/lib/content/content-actions";

import { ContentImageUploadControl } from "./content-image-upload-control";
import { ContentSectionEditorForm } from "./grouped-content-form";

export function FeaturedTasteForm({
  initialValues,
  sections,
}: {
  initialValues: Record<string, string>;
  sections: ContentSectionConfig[];
}) {
  const [imagePrimarySrc, setImagePrimarySrc] = useState(initialValues["featuredTaste.imagePrimarySrc"] ?? "");
  const [imageSecondarySrc, setImageSecondarySrc] = useState(initialValues["featuredTaste.imageSecondarySrc"] ?? "");

  return (
    <ContentSectionEditorForm
      action={saveFeaturedTasteAction}
      controlledFields={{
        "featuredTaste.imagePrimarySrc": {
          onChange: setImagePrimarySrc,
          value: imagePrimarySrc,
        },
        "featuredTaste.imageSecondarySrc": {
          onChange: setImageSecondarySrc,
          value: imageSecondarySrc,
        },
      }}
      fieldExtensions={{
        "featuredTaste.imagePrimarySrc": (
          <ContentImageUploadControl
            action={uploadFeaturedTasteImageAction}
            currentValue={imagePrimarySrc}
            fieldName="featuredTaste.imagePrimarySrc"
            helperText="Upload hier de hoofdafbeelding voor de smaak van de week. Het pad wordt automatisch ingevuld."
            inputId="featured-taste-image-primary-upload"
            onUploaded={setImagePrimarySrc}
            previewAlt="Voorvertoning van de geselecteerde smaakfoto"
          />
        ),
        "featuredTaste.imageSecondarySrc": (
          <ContentImageUploadControl
            action={uploadFeaturedTasteImageAction}
            currentValue={imageSecondarySrc}
            fieldName="featuredTaste.imageSecondarySrc"
            helperText="Upload hier de tweede sfeerfoto. Ook deze vult daarna automatisch het veld hieronder."
            inputId="featured-taste-image-secondary-upload"
            onUploaded={setImageSecondarySrc}
            previewAlt="Voorvertoning van de tweede geselecteerde smaakfoto"
          />
        ),
      }}
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
