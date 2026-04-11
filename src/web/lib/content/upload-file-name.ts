import { randomUUID } from "node:crypto";

function padNumber(value: number): string {
  return String(value).padStart(2, "0");
}

function buildUtcTimestamp(now = new Date()): string {
  const year = now.getUTCFullYear();
  const month = padNumber(now.getUTCMonth() + 1);
  const day = padNumber(now.getUTCDate());
  const hour = padNumber(now.getUTCHours());
  const minute = padNumber(now.getUTCMinutes());
  const second = padNumber(now.getUTCSeconds());

  return `${year}${month}${day}-${hour}${minute}${second}`;
}

export function buildContentUploadFileName({
  extension,
  sectionSlug,
  slotSlug,
}: {
  extension: string;
  sectionSlug: "featured-taste" | "gallery-showcase";
  slotSlug: string;
}): string {
  const timestamp = buildUtcTimestamp();
  const shortId = randomUUID().replace(/-/g, "").slice(0, 8);

  return `basijsenzo-${sectionSlug}-${slotSlug}-${timestamp}-${shortId}${extension}`;
}
