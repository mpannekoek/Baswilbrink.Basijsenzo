import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import type { TasteHighlight } from "@/types/site";

type TasteOfWeekSectionProps = {
  featuredTaste: TasteHighlight;
};

export function TasteOfWeekSection({
  featuredTaste,
}: TasteOfWeekSectionProps) {
  return (
    <SectionShell
      description="Een compact podium voor iets nieuws, zonder dat het de rest van de pagina verdringt."
      eyebrow="Smaak in de spotlights"
      id="smaak"
      title={featuredTaste.flavor}
      tone="dark"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,98,17,0.18)_0%,rgba(255,255,255,0.03)_100%)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
            {featuredTaste.accentLabel}
          </p>
          <p className="mt-4 text-3xl font-semibold leading-tight text-white">
            Een smaak die meteen opvalt, maar warm blijft aanvoelen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {featuredTaste.pairings.map((item) => (
              <span
                className="border border-white/14 bg-white/6 px-4 py-2 text-sm text-white/82"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="border border-[rgba(20,20,20,0.14)] bg-[linear-gradient(135deg,#ff7a1a_0%,#ffd59a_100%)] p-6 text-[var(--brand-black)]">
          <div className="grid gap-6 md:grid-cols-[0.92fr_1.08fr] md:items-stretch">
            <div className="grid gap-4">
              <div className="relative min-h-[14rem] overflow-hidden border border-white/12">
                <Image
                  alt="Romige Bas IJs & Zo smaak met oranje saus"
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 26vw, 100vw"
                  src="/basijs2.jpg"
                />
              </div>
              <div className="relative min-h-[10rem] overflow-hidden border border-white/12">
                <Image
                  alt="Frisse citroenijs-presentatie in de vitrine"
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 26vw, 100vw"
                  src="/basijs3.jpg"
                />
              </div>
            </div>
            <div>
              <p className="text-base leading-7">{featuredTaste.description}</p>
              <div className="mt-6 border border-[rgba(20,20,20,0.1)] bg-white/72 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-orange)]">
                  Echte indruk
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                  Met echte beelden uit de vitrine voelt de smaak van de week minder bedacht en veel meer als een uitnodiging om langs te komen.
                </p>
              </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
