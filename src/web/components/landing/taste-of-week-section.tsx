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
      description={featuredTaste.sectionDescription}
      eyebrow={featuredTaste.eyebrow}
      id="smaak"
      title={featuredTaste.title}
      tone="dark-split-reverse"
    >
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal>
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(200,101,34,0.12)_0%,rgba(255,255,255,0.02)_100%)] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
              {featuredTaste.accentLabel}
            </p>
            <p className="mt-4 text-[2rem] font-semibold leading-tight text-white">
              {featuredTaste.supportTitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {featuredTaste.pairings.map((item) => (
                <span
                  className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white/76"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="rounded-[36px] border border-[rgba(200,101,34,0.14)] bg-[linear-gradient(135deg,rgba(255,246,237,0.96)_0%,rgba(246,228,205,0.9)_100%)] p-5 text-[var(--brand-black)] md:p-7">
            <div className="grid gap-6 md:grid-cols-[0.92fr_1.08fr] md:items-stretch">
              <div className="grid gap-4">
                <div className="relative min-h-[14rem] overflow-hidden rounded-[26px] border border-white/20">
                  <Image
                    alt={featuredTaste.imagePrimaryAlt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 768px) 26vw, 100vw"
                    src={featuredTaste.imagePrimarySrc}
                  />
                </div>
                <div className="relative min-h-[10rem] overflow-hidden rounded-[26px] border border-white/20">
                  <Image
                    alt={featuredTaste.imageSecondaryAlt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 768px) 26vw, 100vw"
                    src={featuredTaste.imageSecondarySrc}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
                    {featuredTaste.flavor}
                  </p>
                  <p className="mt-4 text-lg leading-8">{featuredTaste.description}</p>
                </div>
                <div className="rounded-[24px] border border-[rgba(20,20,20,0.1)] bg-white/[0.64] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-orange)]">
                    {featuredTaste.impressionEyebrow}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                    {featuredTaste.impressionText}
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
