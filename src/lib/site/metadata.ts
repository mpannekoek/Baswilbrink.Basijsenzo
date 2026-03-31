import type { Metadata } from "next";

import { siteContent } from "@/lib/content/site-content";

export function getSiteMetadata(): Metadata {
  const { metadata } = siteContent;

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
