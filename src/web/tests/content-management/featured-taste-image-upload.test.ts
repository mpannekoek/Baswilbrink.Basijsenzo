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

  it("stores a valid upload in the public uploads directory", async () => {
    const rootDirectory = mkdtempSync(path.join(os.tmpdir(), "featured-taste-upload-"));
    const file = new File([new Uint8Array([1, 2, 3, 4])], "gelato.jpg", { type: "image/jpeg" });

    try {
      const result = await storeFeaturedTasteImageUpload({
        fieldName: "featuredTaste.imagePrimarySrc",
        file,
        rootDirectory,
      });

      expect(result.publicPath.startsWith("/uploads/featured-taste/primary-")).toBe(true);
      expect(existsSync(path.join(rootDirectory, "public", result.publicPath.slice(1)))).toBe(true);
    } finally {
      rmSync(rootDirectory, { force: true, recursive: true });
    }
  });
});
