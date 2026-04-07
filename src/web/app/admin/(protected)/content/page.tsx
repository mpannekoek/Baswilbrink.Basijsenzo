import { ContentFormShell } from "@/components/admin/content-form-shell";
import { GroupedContentForm } from "@/components/admin/grouped-content-form";
import { getGroupedContentPageModel } from "@/lib/content/admin-content";

export default async function AdminContentPage() {
  let model:
    | Awaited<ReturnType<typeof getGroupedContentPageModel>>
    | null = null;

  try {
    model = await getGroupedContentPageModel();
  } catch {
    model = null;
  }

  return (
    <ContentFormShell
      description={
        model
          ? "Werk hier de meeste zichtbare homepage-teksten bij. Smaakafbeeldingen en de slider beheer je op de aparte afbeeldingpagina's."
          : "De pagina kon de huidige content niet laden. Probeer het later opnieuw."
      }
      eyebrow="Content management"
      title="Homepage-content"
    >
      {model ? (
        <GroupedContentForm initialValues={model.values} sections={model.sections} />
      ) : (
        <p className="text-sm text-[#8a2f11]" data-testid="admin-grouped-content-load-error">
          De content is tijdelijk niet beschikbaar.
        </p>
      )}
    </ContentFormShell>
  );
}
