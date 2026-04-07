"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";

import { INITIAL_CONTENT_ACTION_STATE, type ContentActionState } from "@/lib/content/content-action-state";
import {
  getFieldTestId,
  type ContentFieldConfig,
  type ContentSectionConfig,
} from "@/lib/content/content-keys";
import { saveGroupedContentAction } from "@/lib/content/content-actions";

interface ContentSectionEditorFormProps {
  action: (
    previousState: ContentActionState | undefined,
    formData: FormData,
  ) => Promise<ContentActionState>;
  formTestId: string;
  initialValues: Record<string, string>;
  pendingLabel: string;
  saveButtonTestId: string;
  saveLabel: string;
  sections: ContentSectionConfig[];
  statusTestId: string;
  controlledFields?: Partial<Record<string, { onChange: (value: string) => void; value: string }>>;
  fieldExtensions?: Partial<Record<string, ReactNode>>;
}

function FieldControl({
  controlledField,
  field,
  fieldError,
  fieldExtension,
  initialValue,
}: {
  controlledField?: { onChange: (value: string) => void; value: string };
  field: ContentFieldConfig;
  fieldError?: string;
  fieldExtension?: ReactNode;
  initialValue: string;
}) {
  const testId = getFieldTestId(field.name);

  return (
    <label className="grid gap-2" htmlFor={field.name}>
      <span className="text-sm font-semibold text-[color:var(--admin-ink-strong)]">{field.label}</span>
      {field.multiline ? (
        <textarea
          className="min-h-28 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[color:var(--brand-orange)] focus:ring-2 focus:ring-[rgba(255,117,24,0.16)]"
          data-testid={testId}
          id={field.name}
          maxLength={field.maxLength}
          name={field.name}
          onChange={controlledField ? (event) => controlledField.onChange(event.target.value) : undefined}
          {...(controlledField ? { value: controlledField.value } : { defaultValue: initialValue })}
        />
      ) : (
        <input
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[color:var(--brand-orange)] focus:ring-2 focus:ring-[rgba(255,117,24,0.16)]"
          data-testid={testId}
          id={field.name}
          maxLength={field.maxLength}
          name={field.name}
          onChange={controlledField ? (event) => controlledField.onChange(event.target.value) : undefined}
          type="text"
          {...(controlledField ? { value: controlledField.value } : { defaultValue: initialValue })}
        />
      )}
      {fieldExtension ? <div>{fieldExtension}</div> : null}
      {fieldError ? (
        <span className="text-sm text-[#8a2f11]" data-testid={`${testId}-error`}>
          {fieldError}
        </span>
      ) : null}
    </label>
  );
}

export function ContentSectionEditorForm({
  action,
  controlledFields,
  fieldExtensions,
  formTestId,
  initialValues,
  pendingLabel,
  saveButtonTestId,
  saveLabel,
  sections,
  statusTestId,
}: ContentSectionEditorFormProps) {
  const [state, formAction, isPending] = useActionState(action, INITIAL_CONTENT_ACTION_STATE);

  return (
    <form action={formAction} className="grid gap-8" data-testid={formTestId}>
      {state.message ? (
        <p
          className={`rounded-2xl border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-[#b9d7b3] bg-[#eff8ec] text-[#1e5c28]"
              : "border-[#efc7bc] bg-[#fff6f2] text-[#8a2f11]"
          }`}
          data-testid={statusTestId}
        >
          {state.message}
        </p>
      ) : null}

      {sections.map((section) => (
        <section
          className="grid gap-4 rounded-[1.75rem] border border-black/8 bg-white/70 p-5"
          data-testid={`content-section-${section.id}`}
          key={section.id}
        >
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--admin-ink-strong)]">
              {section.title}
            </h2>
            {section.description ? (
              <p className="mt-2 text-sm leading-6 text-[color:var(--admin-ink-soft)]">
                {section.description}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {section.fields.map((field) => (
              <FieldControl
                controlledField={controlledFields?.[field.name]}
                field={field}
                fieldError={state.fieldErrors[field.name]}
                fieldExtension={fieldExtensions?.[field.name]}
                initialValue={initialValues[field.name] ?? ""}
                key={field.name}
              />
            ))}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="rounded-full border border-[color:var(--brand-black)] bg-[color:var(--brand-black)] px-5 py-3 text-sm font-semibold text-white transition hover:border-[color:var(--brand-orange)] hover:bg-[color:var(--brand-orange)] disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/40"
          data-testid={saveButtonTestId}
          disabled={isPending}
          type="submit"
        >
          {isPending ? pendingLabel : saveLabel}
        </button>
        <p className="text-sm text-[color:var(--admin-ink-soft)]">
          Wijzigingen worden server-side gevalideerd en daarna direct opgeslagen.
        </p>
      </div>
    </form>
  );
}

export function GroupedContentForm({
  initialValues,
  sections,
}: {
  initialValues: Record<string, string>;
  sections: ContentSectionConfig[];
}) {
  return (
    <ContentSectionEditorForm
      action={saveGroupedContentAction}
      formTestId="admin-grouped-content-form"
      initialValues={initialValues}
      pendingLabel="Content opslaan..."
      saveButtonTestId="admin-grouped-content-save-button"
      saveLabel="Gegroepeerde content opslaan"
      sections={sections}
      statusTestId="admin-grouped-content-status"
    />
  );
}
