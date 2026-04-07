import { ContentFormShell } from "@/components/admin/content-form-shell";
import { FeaturedTasteForm } from "@/components/admin/featured-taste-form";
import { getFeaturedTastePageModel } from "@/lib/content/admin-content";

export default async function AdminFeaturedTastePage() {
  let model:
    | Awaited<ReturnType<typeof getFeaturedTastePageModel>>
    | null = null;

  try {
    model = await getFeaturedTastePageModel();
  } catch {
    model = null;
  }

  return (
    <ContentFormShell
      description={
        model
          ? "Houd hier de uitgelichte smaak, de twee foto's en de bijbehorende korte aanbevelingen actueel."
          : "De content voor de smaak van de week kon niet worden geladen. Probeer het later opnieuw."
      }
      eyebrow="Content management"
      title="Smaak van de week"
    >
      {model ? (
        <FeaturedTasteForm initialValues={model.values} sections={model.sections} />
      ) : (
        <p className="text-sm text-[#8a2f11]" data-testid="admin-featured-taste-load-error">
          De smaak van de week is tijdelijk niet beschikbaar.
        </p>
      )}
    </ContentFormShell>
  );
}
