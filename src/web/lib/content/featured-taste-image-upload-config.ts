export const FEATURED_TASTE_IMAGE_UPLOAD_ACCEPTED_TYPES = [
  "image/avif",
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const FEATURED_TASTE_IMAGE_UPLOAD_ACCEPT = [
  ...FEATURED_TASTE_IMAGE_UPLOAD_ACCEPTED_TYPES,
  ".avif",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
].join(",");
