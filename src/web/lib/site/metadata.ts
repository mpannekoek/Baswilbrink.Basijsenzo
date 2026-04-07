import type { Metadata } from "next";

import { getLandingMetadataContent } from "@/lib/content/public-content";

export async function getSiteMetadata(): Promise<Metadata> {
  const metadata = await getLandingMetadataContent();

  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(metadata.metadataBaseUrl),
    openGraph: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      type: "website",
    },
  };
}
