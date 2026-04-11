import { existsSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  storeFeaturedTasteImageUpload,
  validateFeaturedTasteImageUpload,
} from "@/lib/content/featured-taste-image-upload";

describe("featured taste image upload", () => {
  it("rejects unsupported file types", () => {
    const file = new File(["demo"], "demo.gif", { type: "image/gif" });

    expect(validateFeaturedTasteImageUpload(file)).toBe("Gebruik een JPG, PNG, WEBP of AVIF afbeelding.");
  });

  it("accepts jpg uploads when mobile browsers omit the mime type", () => {
    const file = new File([new Uint8Array([1, 2, 3])], "vitrine.jpg", { type: "" });

    expect(validateFeaturedTasteImageUpload(file)).toBeNull();
  });

  it("stores a valid upload in the public uploads directory", async () => {
    const rootDirectory = mkdtempSync(path.join(os.tmpdir(), "featured-taste-upload-"));
    const file = new File([new Uint8Array([0xff, 0xd8, 0xff, 0xdb, 0x00, 0x43, 0x00])], "gelato.jpg", {
      type: "image/jpeg",
    });

    try {
      const result = await storeFeaturedTasteImageUpload({
        fieldName: "featuredTaste.imagePrimarySrc",
        file,
        rootDirectory,
      });

      expect(result.publicPath.startsWith("/api/uploads/featured-taste/basijsenzo-featured-taste-primary-")).toBe(
        true,
      );
      const storedFilePath = path.join(rootDirectory, "public", "uploads", "featured-taste", path.basename(result.publicPath));
      expect(existsSync(storedFilePath)).toBe(true);
    } finally {
      rmSync(rootDirectory, { force: true, recursive: true });
    }
  });

  it("rejects malformed payloads even when extension and mime look valid", async () => {
    const rootDirectory = mkdtempSync(path.join(os.tmpdir(), "featured-taste-upload-malformed-"));
    const file = new File([new Uint8Array([1, 2, 3, 4, 5, 6])], "broken.jpg", { type: "image/jpeg" });

    try {
      await expect(
        storeFeaturedTasteImageUpload({
          fieldName: "featuredTaste.imagePrimarySrc",
          file,
          rootDirectory,
        }),
      ).rejects.toThrow("Het bestand lijkt geen geldige JPG-afbeelding te zijn.");
    } finally {
      rmSync(rootDirectory, { force: true, recursive: true });
    }
  });
});
