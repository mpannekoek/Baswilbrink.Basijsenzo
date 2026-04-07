import { unstable_noStore as noStore } from "next/cache";

import { defaultSiteContent } from "./default-site-content";
import { toLandingPageContent } from "./content-mappers";
import { logContentEvent } from "./content-logging";
import { getStoredContentSnapshot } from "./content-repository";
import { ensureContentSeeded } from "./content-seed";

export async function getLandingPageContent() {
  noStore();

  try {
    await ensureContentSeeded();

    return toLandingPageContent(getStoredContentSnapshot());
  } catch (error) {
    logContentEvent({
      error,
      event: "public_content_load_failed",
      level: "error",
      targetSection: "public-read",
    });

    return structuredClone(defaultSiteContent);
  }
}

export async function getLandingMetadataContent() {
  const content = await getLandingPageContent();
  return content.metadata;
}
