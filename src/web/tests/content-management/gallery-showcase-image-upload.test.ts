import { existsSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  storeGalleryShowcaseImageUpload,
  validateGalleryShowcaseImageUpload,
} from "@/lib/content/gallery-showcase-image-upload";

describe("gallery showcase image upload", () => {
  it("rejects unsupported file types", () => {
    const file = new File(["demo"], "demo.gif", { type: "image/gif" });

    expect(validateGalleryShowcaseImageUpload(file)).toBe("Gebruik een JPG, PNG, WEBP of AVIF afbeelding.");
  });

  it("stores a valid upload in the gallery uploads directory", async () => {
    const rootDirectory = mkdtempSync(path.join(os.tmpdir(), "gallery-showcase-upload-"));
    const file = new File([new Uint8Array([1, 2, 3, 4])], "counter.jpg", { type: "image/jpeg" });

    try {
      const result = await storeGalleryShowcaseImageUpload({
        fieldName: "galleryShowcase.images.1.src",
        file,
        rootDirectory,
      });

      expect(result.publicPath.startsWith("/uploads/gallery-showcase/basijsenzo-gallery-showcase-slide-2-")).toBe(
        true,
      );
      expect(existsSync(path.join(rootDirectory, "public", result.publicPath.slice(1)))).toBe(true);
    } finally {
      rmSync(rootDirectory, { force: true, recursive: true });
    }
  });
});
