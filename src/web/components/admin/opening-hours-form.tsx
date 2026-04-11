"use client";

import { useActionState, useEffect } from "react";

import { INITIAL_CONTENT_ACTION_STATE } from "@/lib/content/content-action-state";
import { getFieldTestId, type ContentFieldConfig } from "@/lib/content/content-keys";
import { saveOpeningHoursAction } from "@/lib/content/content-actions";

export function OpeningHoursForm({
  fields,
  initialValues,
}: {
  fields: ContentFieldConfig[];
  initialValues: Record<string, string>;
}) {
  const [state, formAction, isPending] = useActionState(
    saveOpeningHoursAction,
    INITIAL_CONTENT_ACTION_STATE,
  );

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    try {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [state.status]);

  return (
    <form action={formAction} className="grid gap-6" data-testid="admin-opening-hours-form">
      {state.message ? (
        <p
          className={`rounded-2xl border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-[#b9d7b3] bg-[#eff8ec] text-[#1e5c28]"
              : "border-[#efc7bc] bg-[#fff6f2] text-[#8a2f11]"
          }`}
          data-testid="admin-opening-hours-status"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-3">
        {fields.map((field) => {
          const testId = getFieldTestId(field.name);

          return (
            <label
              className="grid gap-2 rounded-[1.5rem] border border-black/8 bg-white/70 p-4 md:grid-cols-[10rem_minmax(0,1fr)] md:items-center"
              htmlFor={field.name}
              key={field.name}
            >
              <span className="text-sm font-semibold text-[color:var(--admin-ink-strong)]">
                {field.label}
              </span>
              <span className="grid gap-2">
                <input
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[color:var(--brand-orange)] focus:ring-2 focus:ring-[rgba(255,117,24,0.16)]"
                  data-testid={testId}
                  defaultValue={initialValues[field.name] ?? ""}
                  id={field.name}
                  maxLength={field.maxLength}
                  name={field.name}
                  type="text"
                />
                {state.fieldErrors[field.name] ? (
                  <span className="text-sm text-[#8a2f11]" data-testid={`${testId}-error`}>
                    {state.fieldErrors[field.name]}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="rounded-full border border-[color:var(--brand-black)] bg-[color:var(--brand-black)] px-5 py-3 text-sm font-semibold text-white transition hover:border-[color:var(--brand-orange)] hover:bg-[color:var(--brand-orange)] disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/40"
          data-testid="admin-opening-hours-save-button"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Openingstijden opslaan..." : "Openingstijden opslaan"}
        </button>
        <p className="text-sm text-[color:var(--admin-ink-soft)]">
          De volgorde van de dagen blijft vast; je past alleen de zichtbare tijden aan.
        </p>
      </div>
    </form>
  );
}
