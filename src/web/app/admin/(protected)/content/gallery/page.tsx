import { ContentFormShell } from "@/components/admin/content-form-shell";
import { GalleryShowcaseForm } from "@/components/admin/gallery-showcase-form";
import { getGalleryShowcasePageModel } from "@/lib/content/admin-content";

export default async function AdminGalleryShowcasePage() {
  let model:
    | Awaited<ReturnType<typeof getGalleryShowcasePageModel>>
    | null = null;

  try {
    model = await getGalleryShowcasePageModel();
  } catch {
    model = null;
  }

  return (
    <ContentFormShell
      description={
        model
          ? "Werk hier het groene introductieblok en de afbeeldingen van de homepage-slider bij."
          : "De slider-content kon niet worden geladen. Probeer het later opnieuw."
      }
      eyebrow="Content management"
      title="Afbeeldingen en slider"
    >
      {model ? (
        <GalleryShowcaseForm initialValues={model.values} sections={model.sections} />
      ) : (
        <p className="text-sm text-[#8a2f11]" data-testid="admin-gallery-showcase-load-error">
          De slider-content is tijdelijk niet beschikbaar.
        </p>
      )}
    </ContentFormShell>
  );
}
