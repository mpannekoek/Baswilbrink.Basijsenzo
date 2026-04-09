"use client";

import { useState } from "react";

import type { ContentSectionConfig } from "@/lib/content/content-keys";
import {
  saveGalleryShowcaseAction,
  uploadGalleryShowcaseImageAction,
} from "@/lib/content/content-actions";

import { ContentImageUploadControl } from "./content-image-upload-control";
import { ContentSectionEditorForm } from "./grouped-content-form";

const galleryImageFieldNames = [
  "galleryShowcase.images.0.src",
  "galleryShowcase.images.1.src",
  "galleryShowcase.images.2.src",
  "galleryShowcase.images.3.src",
  "galleryShowcase.images.4.src",
] as const;

export function GalleryShowcaseForm({
  initialValues,
  sections,
}: {
  initialValues: Record<string, string>;
  sections: ContentSectionConfig[];
}) {
  const [imageValues, setImageValues] = useState<Record<string, string>>(
    Object.fromEntries(galleryImageFieldNames.map((fieldName) => [fieldName, initialValues[fieldName] ?? ""])),
  );

  return (
    <ContentSectionEditorForm
      action={saveGalleryShowcaseAction}
      controlledFields={Object.fromEntries(
        galleryImageFieldNames.map((fieldName) => [
          fieldName,
          {
            onChange: (value: string) =>
              setImageValues((current) => ({
                ...current,
                [fieldName]: value,
              })),
            value: imageValues[fieldName] ?? "",
          },
        ]),
      )}
      fieldExtensions={Object.fromEntries(
        galleryImageFieldNames.map((fieldName, index) => [
          fieldName,
          (
            <ContentImageUploadControl
              action={uploadGalleryShowcaseImageAction}
              currentValue={imageValues[fieldName] ?? ""}
              fieldName={fieldName}
              helperText={`Upload hier slide ${index + 1} voor de homepage-slider. Het pad wordt automatisch ingevuld.`}
              inputId={`gallery-showcase-image-${index + 1}-upload`}
              key={fieldName}
              onUploaded={(uploadedPath) =>
                setImageValues((current) => ({
                  ...current,
                  [fieldName]: uploadedPath,
                }))
              }
              previewAlt={`Voorvertoning van sliderafbeelding ${index + 1}`}
            />
          ),
        ]),
      )}
      formTestId="admin-gallery-showcase-form"
      initialValues={initialValues}
      pendingLabel="Slider opslaan..."
      saveButtonTestId="admin-gallery-showcase-save-button"
      saveLabel="Slider-content opslaan"
      sections={sections}
      statusTestId="admin-gallery-showcase-status"
    />
  );
}
