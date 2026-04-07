import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { FEATURED_TASTE_IMAGE_UPLOAD_ACCEPTED_TYPES } from "./featured-taste-image-upload-config";

const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

const MIME_TYPE_TO_EXTENSION: Record<(typeof FEATURED_TASTE_IMAGE_UPLOAD_ACCEPTED_TYPES)[number], string> = {
  "image/avif": ".avif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

function sanitizeGalleryFieldName(fieldName: string): string {
  const match = fieldName.match(/^galleryShowcase\.images\.(\d+)\.src$/);
  return match ? `slide-${Number(match[1]) + 1}` : "slide";
}

function resolveGalleryUploadDirectory(root = process.cwd()): string {
  return path.join(/* turbopackIgnore: true */ root, "public", "uploads", "gallery-showcase");
}

export function validateGalleryShowcaseImageUpload(file: File): string | null {
  const extension = MIME_TYPE_TO_EXTENSION[file.type as keyof typeof MIME_TYPE_TO_EXTENSION];

  if (file.size === 0) {
    return "Kies eerst een afbeelding om te uploaden.";
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return "De afbeelding mag maximaal 5 MB zijn.";
  }

  if (!extension) {
    return "Gebruik een JPG, PNG, WEBP of AVIF afbeelding.";
  }

  return null;
}

export async function storeGalleryShowcaseImageUpload({
  fieldName,
  file,
  rootDirectory,
}: {
  fieldName: string;
  file: File;
  rootDirectory?: string;
}): Promise<{ publicPath: string }> {
  const validationError = validateGalleryShowcaseImageUpload(file);

  if (validationError) {
    throw new Error(validationError);
  }

  const uploadDirectory = resolveGalleryUploadDirectory(rootDirectory);
  const slot = sanitizeGalleryFieldName(fieldName);
  const extension = MIME_TYPE_TO_EXTENSION[file.type as keyof typeof MIME_TYPE_TO_EXTENSION];
  const fileName = `${slot}-${Date.now()}-${randomUUID()}${extension}`;
  const outputPath = path.join(uploadDirectory, fileName);
  const publicPath = `/uploads/gallery-showcase/${fileName}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(outputPath, fileBuffer);

  return { publicPath };
}
