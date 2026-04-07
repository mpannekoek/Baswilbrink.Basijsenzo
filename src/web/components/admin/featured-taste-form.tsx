"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";

import type { ContentSectionConfig } from "@/lib/content/content-keys";
import {
  INITIAL_FEATURED_TASTE_IMAGE_UPLOAD_ACTION_STATE,
  saveFeaturedTasteAction,
  uploadFeaturedTasteImageAction,
} from "@/lib/content/content-actions";
import { FEATURED_TASTE_IMAGE_UPLOAD_ACCEPT } from "@/lib/content/featured-taste-image-upload-config";

import { ContentSectionEditorForm } from "./grouped-content-form";

function FeaturedTasteImageUploadControl({
  currentValue,
  fieldName,
  helperText,
  inputId,
  onUploaded,
}: {
  currentValue: string;
  fieldName: "featuredTaste.imagePrimarySrc" | "featuredTaste.imageSecondarySrc";
  helperText: string;
  inputId: string;
  onUploaded: (uploadedPath: string) => void;
}) {
  const [state, formAction, isPending] = useActionState(
    uploadFeaturedTasteImageAction,
    INITIAL_FEATURED_TASTE_IMAGE_UPLOAD_ACTION_STATE,
  );

  useEffect(() => {
    if (state.status === "success" && state.fieldName === fieldName && state.uploadedPath) {
      onUploaded(state.uploadedPath);
    }
  }, [fieldName, onUploaded, state.fieldName, state.status, state.uploadedPath]);

  return (
    <div className="grid gap-3 rounded-2xl border border-black/8 bg-black/[0.02] p-4">
      <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <Image
            alt="Voorvertoning van de geselecteerde smaakfoto"
            className="h-24 w-full object-cover"
            height={96}
            src={currentValue}
            width={128}
          />
        </div>
        <div className="text-sm leading-6 text-[color:var(--admin-ink-soft)]">
          <p>{helperText}</p>
          <p className="mt-1 font-mono text-xs text-black/55">{currentValue}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <input name="uploadFieldName" type="hidden" value={fieldName} />
        <label className="grid gap-2" htmlFor={inputId}>
          <span className="text-sm font-semibold text-[color:var(--admin-ink-strong)]">Nieuwe foto uploaden</span>
          <input
            accept={FEATURED_TASTE_IMAGE_UPLOAD_ACCEPT}
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black file:mr-3 file:rounded-full file:border-0 file:bg-[rgba(255,117,24,0.14)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[color:var(--brand-orange)]"
            data-testid={`${fieldName}-upload-input`}
            id={inputId}
            name={`${fieldName}.file`}
            type="file"
          />
        </label>
        <button
          className="rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[color:var(--admin-ink-strong)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)] disabled:cursor-not-allowed disabled:opacity-60"
          data-testid={`${fieldName}-upload-button`}
          disabled={isPending}
          formAction={formAction}
          type="submit"
        >
          {isPending ? "Uploaden..." : "Upload foto"}
        </button>
      </div>

      {state.message ? (
        <p
          className={`text-sm ${
            state.status === "success" ? "text-[#1e5c28]" : "text-[#8a2f11]"
          }`}
          data-testid={`${fieldName}-upload-status`}
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

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
          <FeaturedTasteImageUploadControl
            currentValue={imagePrimarySrc}
            fieldName="featuredTaste.imagePrimarySrc"
            helperText="Upload hier de hoofdafbeelding voor de smaak van de week. Het pad wordt automatisch ingevuld."
            inputId="featured-taste-image-primary-upload"
            onUploaded={setImagePrimarySrc}
          />
        ),
        "featuredTaste.imageSecondarySrc": (
          <FeaturedTasteImageUploadControl
            currentValue={imageSecondarySrc}
            fieldName="featuredTaste.imageSecondarySrc"
            helperText="Upload hier de tweede sfeerfoto. Ook deze vult daarna automatisch het veld hieronder."
            inputId="featured-taste-image-secondary-upload"
            onUploaded={setImageSecondarySrc}
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
