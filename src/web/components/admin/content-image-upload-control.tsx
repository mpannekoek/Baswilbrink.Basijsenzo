"use client";

import Image from "next/image";
import { useActionState, useEffect, useTransition } from "react";

import {
  INITIAL_CONTENT_IMAGE_UPLOAD_ACTION_STATE,
  type ContentImageUploadActionState,
} from "@/lib/content/content-image-upload-action-state";
import { FEATURED_TASTE_IMAGE_UPLOAD_ACCEPT } from "@/lib/content/featured-taste-image-upload-config";

export function ContentImageUploadControl({
  action,
  currentValue,
  fieldName,
  inputId,
  onUploaded,
  previewAlt,
}: {
  action: (
    previousState: ContentImageUploadActionState | undefined,
    formData: FormData,
  ) => Promise<ContentImageUploadActionState>;
  currentValue: string;
  fieldName: string;
  inputId: string;
  onUploaded: (uploadedPath: string) => void;
  previewAlt: string;
}) {
  const [state, formAction, isPending] = useActionState(action, INITIAL_CONTENT_IMAGE_UPLOAD_ACTION_STATE);
  const [isAutoUploading, startAutoUpload] = useTransition();

  useEffect(() => {
    if (state.status === "success" && state.fieldName === fieldName && state.uploadedPath) {
      onUploaded(state.uploadedPath);
    }
  }, [fieldName, onUploaded, state.fieldName, state.status, state.uploadedPath]);

  const isUploading = isPending || isAutoUploading;

  return (
    <div className="grid gap-3 rounded-2xl border border-black/8 bg-black/[0.02] p-4">
      <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <Image
            alt={previewAlt}
            className="h-24 w-full object-cover"
            height={96}
            src={currentValue}
            width={128}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="grid gap-2" htmlFor={inputId}>
          <span className="text-sm font-semibold text-[color:var(--admin-ink-strong)]">Nieuwe foto uploaden</span>
          <input
            accept={FEATURED_TASTE_IMAGE_UPLOAD_ACCEPT}
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black file:mr-3 file:rounded-full file:border-0 file:bg-[rgba(255,117,24,0.14)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[color:var(--brand-orange)]"
            data-testid={`${fieldName}-upload-input`}
            id={inputId}
            name={`${fieldName}.file`}
            onChange={(event) => {
              const selectedFile = event.currentTarget.files?.[0];

              if (!selectedFile) {
                return;
              }

              const formData = new FormData();
              formData.set("uploadFieldName", fieldName);
              formData.set(`${fieldName}.file`, selectedFile);
              event.currentTarget.value = "";

              startAutoUpload(() => {
                formAction(formData);
              });
            }}
            type="file"
          />
        </label>
      </div>

      {isUploading ? (
        <p className="text-sm text-[color:var(--admin-ink-soft)]" data-testid={`${fieldName}-upload-status`}>
          Uploaden...
        </p>
      ) : null}

      {!isUploading && state.message ? (
        <p
          className={`text-sm ${state.status === "success" ? "text-[#1e5c28]" : "text-[#8a2f11]"}`}
          data-testid={`${fieldName}-upload-status`}
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
