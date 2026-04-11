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

  it("accepts jpg uploads when mobile browsers omit the mime type", () => {
    const file = new File([new Uint8Array([1, 2, 3])], "phone-photo.jpg", { type: "" });

    expect(validateGalleryShowcaseImageUpload(file)).toBeNull();
  });

  it("stores a valid upload in the gallery uploads directory", async () => {
    const rootDirectory = mkdtempSync(path.join(os.tmpdir(), "gallery-showcase-upload-"));
    const file = new File([new Uint8Array([0xff, 0xd8, 0xff, 0xdb, 0x00, 0x43, 0x00])], "counter.jpg", {
      type: "image/jpeg",
    });

    try {
      const result = await storeGalleryShowcaseImageUpload({
        fieldName: "galleryShowcase.images.1.src",
        file,
        rootDirectory,
      });

      expect(result.publicPath.startsWith("/api/uploads/gallery-showcase/basijsenzo-gallery-showcase-slide-2-")).toBe(
        true,
      );
      const storedFilePath = path.join(rootDirectory, "public", "uploads", "gallery-showcase", path.basename(result.publicPath));
      expect(existsSync(storedFilePath)).toBe(true);
    } finally {
      rmSync(rootDirectory, { force: true, recursive: true });
    }
  });

  it("rejects malformed payloads even when extension and mime look valid", async () => {
    const rootDirectory = mkdtempSync(path.join(os.tmpdir(), "gallery-showcase-upload-malformed-"));
    const file = new File([new Uint8Array([1, 2, 3, 4, 5, 6])], "broken.jpg", { type: "image/jpeg" });

    try {
      await expect(
        storeGalleryShowcaseImageUpload({
          fieldName: "galleryShowcase.images.0.src",
          file,
          rootDirectory,
        }),
      ).rejects.toThrow("Het bestand lijkt geen geldige JPG-afbeelding te zijn.");
    } finally {
      rmSync(rootDirectory, { force: true, recursive: true });
    }
  });
});
