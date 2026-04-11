const ALLOWED_UPLOAD_SECTIONS = ["featured-taste", "gallery-showcase"] as const;

type UploadSection = (typeof ALLOWED_UPLOAD_SECTIONS)[number];

function isAllowedUploadSection(section: string): section is UploadSection {
  return ALLOWED_UPLOAD_SECTIONS.includes(section as UploadSection);
}

export function buildUploadApiPath(section: string, fileName: string): string {
  if (!isAllowedUploadSection(section)) {
    throw new Error("Invalid upload section.");
  }

  return `/api/uploads/${section}/${fileName}`;
}

export function toRuntimeImagePath(pathValue: string): string {
  const match = pathValue.match(/^\/uploads\/(featured-taste|gallery-showcase)\/([^/]+)$/);

  if (!match) {
    return pathValue;
  }

  return `/api/uploads/${match[1]}/${match[2]}`;
}
