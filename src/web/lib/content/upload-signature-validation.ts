function hasJpegSignature(bytes: Uint8Array): boolean {
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function hasPngSignature(bytes: Uint8Array): boolean {
  return (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  );
}

function hasWebpSignature(bytes: Uint8Array): boolean {
  return (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  );
}

function hasAvifSignature(bytes: Uint8Array): boolean {
  if (
    bytes.length < 12 ||
    bytes[4] !== 0x66 ||
    bytes[5] !== 0x74 ||
    bytes[6] !== 0x79 ||
    bytes[7] !== 0x70
  ) {
    return false;
  }

  const firstBytesAsAscii = new TextDecoder("ascii").decode(bytes.slice(0, 32));

  return firstBytesAsAscii.includes("avif") || firstBytesAsAscii.includes("avis");
}

export function validateUploadBinarySignature(fileBuffer: Uint8Array, extension: string): string | null {
  const normalizedExtension = extension.trim().toLowerCase();

  if (normalizedExtension === ".jpg" || normalizedExtension === ".jpeg") {
    return hasJpegSignature(fileBuffer) ? null : "Het bestand lijkt geen geldige JPG-afbeelding te zijn.";
  }

  if (normalizedExtension === ".png") {
    return hasPngSignature(fileBuffer) ? null : "Het bestand lijkt geen geldige PNG-afbeelding te zijn.";
  }

  if (normalizedExtension === ".webp") {
    return hasWebpSignature(fileBuffer) ? null : "Het bestand lijkt geen geldige WEBP-afbeelding te zijn.";
  }

  if (normalizedExtension === ".avif") {
    return hasAvifSignature(fileBuffer) ? null : "Het bestand lijkt geen geldige AVIF-afbeelding te zijn.";
  }

  return "Gebruik een JPG, PNG, WEBP of AVIF afbeelding.";
}
