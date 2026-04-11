import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { FEATURED_TASTE_IMAGE_UPLOAD_ACCEPTED_TYPES } from "./featured-taste-image-upload-config";
import { buildContentUploadFileName } from "./upload-file-name";
import { buildUploadApiPath } from "./upload-public-path";
import { validateUploadBinarySignature } from "./upload-signature-validation";

const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

const MIME_TYPE_TO_EXTENSION: Record<(typeof FEATURED_TASTE_IMAGE_UPLOAD_ACCEPTED_TYPES)[number], string> = {
  "image/avif": ".avif",
  "image/jpg": ".jpg",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const FILE_NAME_EXTENSION_TO_OUTPUT_EXTENSION: Record<string, string> = {
  ".avif": ".avif",
  ".jpeg": ".jpg",
  ".jpg": ".jpg",
  ".png": ".png",
  ".webp": ".webp",
};

function sanitizeGalleryFieldName(fieldName: string): string {
  const match = fieldName.match(/^galleryShowcase\.images\.(\d+)\.src$/);
  return match ? `slide-${Number(match[1]) + 1}` : "slide";
}

function resolveGalleryUploadDirectory(root = process.cwd()): string {
  return path.join(/* turbopackIgnore: true */ root, "public", "uploads", "gallery-showcase");
}

function resolveUploadExtension(file: File): string | null {
  const normalizedMimeType = file.type.trim().toLowerCase();
  const extensionFromMime = MIME_TYPE_TO_EXTENSION[normalizedMimeType as keyof typeof MIME_TYPE_TO_EXTENSION];

  if (extensionFromMime) {
    return extensionFromMime;
  }

  const fileName = file.name.trim().toLowerCase();
  const extensionFromName = path.extname(fileName);

  return FILE_NAME_EXTENSION_TO_OUTPUT_EXTENSION[extensionFromName] ?? null;
}

export function validateGalleryShowcaseImageUpload(file: File): string | null {
  const extension = resolveUploadExtension(file);

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
  const extension = resolveUploadExtension(file);

  if (!extension) {
    throw new Error("Gebruik een JPG, PNG, WEBP of AVIF afbeelding.");
  }

  const fileName = buildContentUploadFileName({
    extension,
    sectionSlug: "gallery-showcase",
    slotSlug: slot,
  });
  const outputPath = path.join(uploadDirectory, fileName);
  const publicPath = buildUploadApiPath("gallery-showcase", fileName);
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const signatureValidationError = validateUploadBinarySignature(fileBuffer, extension);

  if (signatureValidationError) {
    throw new Error(signatureValidationError);
  }

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(outputPath, fileBuffer);

  return { publicPath };
}
