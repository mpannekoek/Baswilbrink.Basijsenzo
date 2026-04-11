import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const ALLOWED_SECTIONS = new Set(["featured-taste", "gallery-showcase"]);

const EXTENSION_TO_CONTENT_TYPE: Record<string, string> = {
  ".avif": "image/avif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function resolveUploadsRootDirectory(root = process.cwd()): string {
  return path.join(/* turbopackIgnore: true */ root, "public", "uploads");
}

function isSafeFileName(fileName: string): boolean {
  if (!fileName || fileName.includes("/") || fileName.includes("\\")) {
    return false;
  }

  if (fileName.includes("..")) {
    return false;
  }

  return true;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ filename: string; section: string }> },
) {
  const { filename, section } = await context.params;

  if (!ALLOWED_SECTIONS.has(section) || !isSafeFileName(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const extension = path.extname(filename).toLowerCase();
  const contentType = EXTENSION_TO_CONTENT_TYPE[extension];

  if (!contentType) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(resolveUploadsRootDirectory(), section, filename);

  try {
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
