import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  buildInitialFieldValues,
  FEATURED_TASTE_FIELDS,
  GALLERY_SHOWCASE_FIELDS,
  GROUPED_CONTENT_FIELDS,
  OPENING_HOURS_FIELDS,
} from "@/lib/content/content-keys";

const {
  ensureContentSeededMock,
  storeFeaturedTasteImageUploadMock,
  storeGalleryShowcaseImageUploadMock,
  getStoredContentSnapshotMock,
  revalidatePathMock,
  requireContentAdminActorMock,
  saveContentMutationMock,
} = vi.hoisted(() => ({
  ensureContentSeededMock: vi.fn(),
  storeFeaturedTasteImageUploadMock: vi.fn(),
  storeGalleryShowcaseImageUploadMock: vi.fn(),
  getStoredContentSnapshotMock: vi.fn(),
  revalidatePathMock: vi.fn(),
  requireContentAdminActorMock: vi.fn(),
  saveContentMutationMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: (...args: unknown[]) => revalidatePathMock(...args),
}));

vi.mock("@/lib/content/content-seed", () => ({
  ensureContentSeeded: (...args: unknown[]) => ensureContentSeededMock(...args),
}));

vi.mock("@/lib/content/content-repository", () => ({
  getStoredContentSnapshot: (...args: unknown[]) => getStoredContentSnapshotMock(...args),
  saveContentMutation: (...args: unknown[]) => saveContentMutationMock(...args),
}));

vi.mock("@/lib/content/featured-taste-image-upload", () => ({
  storeFeaturedTasteImageUpload: (...args: unknown[]) => storeFeaturedTasteImageUploadMock(...args),
}));

vi.mock("@/lib/content/gallery-showcase-image-upload", () => ({
  storeGalleryShowcaseImageUpload: (...args: unknown[]) => storeGalleryShowcaseImageUploadMock(...args),
}));

vi.mock("@/lib/content/admin-content", async () => {
  const actual = await vi.importActual<typeof import("@/lib/content/admin-content")>(
    "@/lib/content/admin-content",
  );

  return {
    ...actual,
    requireContentAdminActor: (...args: unknown[]) => requireContentAdminActorMock(...args),
  };
});

describe("content actions", () => {
  beforeEach(() => {
    revalidatePathMock.mockReset();
    ensureContentSeededMock.mockReset();
    requireContentAdminActorMock.mockReset();
    getStoredContentSnapshotMock.mockReset();
    saveContentMutationMock.mockReset();

    ensureContentSeededMock.mockResolvedValue({ seeded: false });
    requireContentAdminActorMock.mockResolvedValue({
      displayName: "Beheerder Bas",
      email: "admin@example.com",
    });
    storeFeaturedTasteImageUploadMock.mockReset();
    storeGalleryShowcaseImageUploadMock.mockReset();
    storeFeaturedTasteImageUploadMock.mockResolvedValue({ publicPath: "/uploads/featured-taste/primary-demo.jpg" });
    storeGalleryShowcaseImageUploadMock.mockResolvedValue({
      publicPath: "/uploads/gallery-showcase/slide-1-demo.jpg",
    });
    getStoredContentSnapshotMock.mockReturnValue({
      entries: [],
      repeatedEntries: [],
    });
  });

  it("rejects unsafe grouped content before persistence", async () => {
    const { saveGroupedContentAction } = await import("@/lib/content/content-actions");
    const formData = new FormData();
    const values = buildInitialFieldValues(GROUPED_CONTENT_FIELDS);

    for (const [fieldName, value] of Object.entries(values)) {
      formData.set(fieldName, value);
    }

    formData.set("hero.title", "<script>alert('xss')</script>");

    const result = await saveGroupedContentAction(undefined, formData);

    expect(result.status).toBe("error");
    expect(result.fieldErrors["hero.title"]).toContain("mag geen HTML");
    expect(saveContentMutationMock).not.toHaveBeenCalled();
  });

  it("saves valid opening-hours updates and triggers revalidation", async () => {
    const { saveOpeningHoursAction } = await import("@/lib/content/content-actions");
    const formData = new FormData();
    const values = buildInitialFieldValues(OPENING_HOURS_FIELDS);

    for (const [fieldName, value] of Object.entries(values)) {
      formData.set(fieldName, value);
    }

    formData.set("openingHours.0.hours", "10:00 - 22:00");

    const result = await saveOpeningHoursAction(undefined, formData);

    expect(result.status).toBe("success");
    expect(saveContentMutationMock).toHaveBeenCalledTimes(1);
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/content/opening-hours");
  });

  it("rejects featured-taste photo paths that are not local public assets", async () => {
    const { saveFeaturedTasteAction } = await import("@/lib/content/content-actions");
    const formData = new FormData();
    const values = buildInitialFieldValues(FEATURED_TASTE_FIELDS);

    for (const [fieldName, value] of Object.entries(values)) {
      formData.set(fieldName, value);
    }

    formData.set("featuredTaste.imagePrimarySrc", "https://example.com/ice-cream.jpg");

    const result = await saveFeaturedTasteAction(undefined, formData);

    expect(result.status).toBe("error");
    expect(result.fieldErrors["featuredTaste.imagePrimarySrc"]).toContain("moet een publiek afbeeldingspad");
    expect(saveContentMutationMock).not.toHaveBeenCalled();
  });

  it("saves gallery showcase updates and triggers gallery revalidation", async () => {
    const { saveGalleryShowcaseAction } = await import("@/lib/content/content-actions");
    const formData = new FormData();
    const values = buildInitialFieldValues(GALLERY_SHOWCASE_FIELDS);

    for (const [fieldName, value] of Object.entries(values)) {
      formData.set(fieldName, value);
    }

    formData.set("galleryShowcase.title", "De toonbank laat meteen zien waarom je even wilt stoppen.");

    const result = await saveGalleryShowcaseAction(undefined, formData);

    expect(result.status).toBe("success");
    expect(saveContentMutationMock).toHaveBeenCalledTimes(1);
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/content/gallery");
  });

  it("uses the selected featured-taste upload field when multiple field-name entries are present", async () => {
    const { uploadFeaturedTasteImageAction } = await import("@/lib/content/content-actions");
    const formData = new FormData();
    const selectedFile = new File([new Uint8Array([1, 2, 3])], "secondary.jpg", { type: "image/jpeg" });

    formData.append("uploadFieldName", "featuredTaste.imagePrimarySrc");
    formData.append("uploadFieldName", "featuredTaste.imageSecondarySrc");
    formData.set("featuredTaste.imageSecondarySrc.file", selectedFile);

    const result = await uploadFeaturedTasteImageAction(undefined, formData);

    expect(result.status).toBe("success");
    expect(storeFeaturedTasteImageUploadMock).toHaveBeenCalledWith({
      fieldName: "featuredTaste.imageSecondarySrc",
      file: selectedFile,
    });
  });

  it("detects the selected featured-taste upload field from file inputs without uploadFieldName", async () => {
    const { uploadFeaturedTasteImageAction } = await import("@/lib/content/content-actions");
    const formData = new FormData();
    const selectedFile = new File([new Uint8Array([7, 8, 9])], "primary.jpg", { type: "image/jpeg" });

    formData.set("featuredTaste.imagePrimarySrc.file", selectedFile);

    const result = await uploadFeaturedTasteImageAction(undefined, formData);

    expect(result.status).toBe("success");
    expect(storeFeaturedTasteImageUploadMock).toHaveBeenCalledWith({
      fieldName: "featuredTaste.imagePrimarySrc",
      file: selectedFile,
    });
  });

  it("uses the selected gallery upload field when multiple field-name entries are present", async () => {
    const { uploadGalleryShowcaseImageAction } = await import("@/lib/content/content-actions");
    const formData = new FormData();
    const selectedFile = new File([new Uint8Array([4, 5, 6])], "slide4.jpg", { type: "image/jpeg" });

    formData.append("uploadFieldName", "galleryShowcase.images.0.src");
    formData.append("uploadFieldName", "galleryShowcase.images.3.src");
    formData.set("galleryShowcase.images.3.src.file", selectedFile);

    const result = await uploadGalleryShowcaseImageAction(undefined, formData);

    expect(result.status).toBe("success");
    expect(storeGalleryShowcaseImageUploadMock).toHaveBeenCalledWith({
      fieldName: "galleryShowcase.images.3.src",
      file: selectedFile,
    });
  });

  it("detects the selected gallery upload field from file inputs without uploadFieldName", async () => {
    const { uploadGalleryShowcaseImageAction } = await import("@/lib/content/content-actions");
    const formData = new FormData();
    const selectedFile = new File([new Uint8Array([10, 11, 12])], "slide2.jpg", { type: "image/jpeg" });

    formData.set("galleryShowcase.images.1.src.file", selectedFile);

    const result = await uploadGalleryShowcaseImageAction(undefined, formData);

    expect(result.status).toBe("success");
    expect(storeGalleryShowcaseImageUploadMock).toHaveBeenCalledWith({
      fieldName: "galleryShowcase.images.1.src",
      file: selectedFile,
    });
  });
});
