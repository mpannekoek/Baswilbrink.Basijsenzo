import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  buildInitialFieldValues,
  FEATURED_TASTE_FIELDS,
  GROUPED_CONTENT_FIELDS,
  OPENING_HOURS_FIELDS,
} from "@/lib/content/content-keys";

const {
  ensureContentSeededMock,
  getStoredContentSnapshotMock,
  revalidatePathMock,
  requireContentAdminActorMock,
  saveContentMutationMock,
} = vi.hoisted(() => ({
  ensureContentSeededMock: vi.fn(),
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
});
