import { ContentFormShell } from "@/components/admin/content-form-shell";
import { OpeningHoursForm } from "@/components/admin/opening-hours-form";
import { getOpeningHoursPageModel } from "@/lib/content/admin-content";

export default async function AdminOpeningHoursPage() {
  let model:
    | Awaited<ReturnType<typeof getOpeningHoursPageModel>>
    | null = null;

  try {
    model = await getOpeningHoursPageModel();
  } catch {
    model = null;
  }

  return (
    <ContentFormShell
      description={
        model
          ? "Pas per dag de zichtbare openingstijd aan. De daglabels blijven gelijk zodat de publieke pagina altijd in dezelfde volgorde blijft staan."
          : "De openingstijden konden niet worden geladen. Probeer het later opnieuw."
      }
      eyebrow="Content management"
      title="Openingstijden"
    >
      {model ? (
        <OpeningHoursForm fields={model.fields} initialValues={model.values} />
      ) : (
        <p className="text-sm text-[#8a2f11]" data-testid="admin-opening-hours-load-error">
          De openingstijden zijn tijdelijk niet beschikbaar.
        </p>
      )}
    </ContentFormShell>
  );
}
