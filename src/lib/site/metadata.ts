import type { Metadata } from "next";

export function getSiteMetadata(): Metadata {
  return {
    title: "Bas IJs & Zo | Dorps ijssalon met karakter",
    description:
      "Een warme, speelse en mobiele landing page voor Bas IJs & Zo met openingstijden, verhaal, contact en smaak van de week.",
    metadataBase: new URL("https://www.basijsenzo.local"),
    openGraph: {
      title: "Bas IJs & Zo",
      description:
        "Dorps ijssalon met een warm welkom, duidelijke praktische info en een smaakvolle eerste indruk.",
      type: "website",
    },
  };
}
