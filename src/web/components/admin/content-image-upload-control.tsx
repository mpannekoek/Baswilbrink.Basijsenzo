"use client";

import Image from "next/image";
import { useActionState, useEffect } from "react";

import {
  INITIAL_CONTENT_IMAGE_UPLOAD_ACTION_STATE,
  type ContentImageUploadActionState,
} from "@/lib/content/content-image-upload-action-state";
import { FEATURED_TASTE_IMAGE_UPLOAD_ACCEPT } from "@/lib/content/featured-taste-image-upload-config";

export function ContentImageUploadControl({
  action,
  currentValue,
  fieldName,
  helperText,
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
  helperText: string;
  inputId: string;
  onUploaded: (uploadedPath: string) => void;
  previewAlt: string;
}) {
  const [state, formAction, isPending] = useActionState(action, INITIAL_CONTENT_IMAGE_UPLOAD_ACTION_STATE);

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
            alt={previewAlt}
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
          className={`text-sm ${state.status === "success" ? "text-[#1e5c28]" : "text-[#8a2f11]"}`}
          data-testid={`${fieldName}-upload-status`}
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
