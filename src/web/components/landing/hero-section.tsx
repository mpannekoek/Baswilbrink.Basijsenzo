import Image from "next/image";

import { SocialRail } from "@/components/landing/social-rail";
import { ActionPill } from "@/components/ui/action-pill";
import type { ActionLink, HeroContent, SocialLink } from "@/types/site";

type HeroSectionProps = {
  hero: HeroContent;
  actions: ActionLink[];
  socialLinks: SocialLink[];
};

export function HeroSection({ hero, actions, socialLinks }: HeroSectionProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#151311_0%,#151311_78%,#1a1512_100%)] px-4 pb-16 pt-14 text-white md:px-6 md:pb-24 md:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute left-[-10rem] top-20 h-72 w-72 rounded-full bg-[rgba(200,101,34,0.12)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-4rem] right-[-8rem] h-80 w-80 rounded-full bg-[rgba(200,101,34,0.1)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(128deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_52%,rgba(200,101,34,0.22)_52%,rgba(200,101,34,0.14)_72%,rgba(200,101,34,0.04)_100%)] lg:block" />
      <div className="pointer-events-none absolute bottom-10 right-[12%] hidden h-[24rem] w-[24rem] rounded-full bg-[rgba(200,101,34,0.14)] blur-[120px] lg:block" />
      <div className="pointer-events-none absolute bottom-0 right-[22%] hidden h-[22rem] w-px rotate-[24deg] bg-[linear-gradient(180deg,rgba(200,101,34,0)_0%,rgba(200,101,34,0.34)_42%,rgba(200,101,34,0)_100%)] lg:block" />

      <div className="mx-auto grid w-full max-w-[76rem] gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(25rem,0.98fr)] lg:items-start">
        <div className="relative z-10 max-w-[42rem] text-white">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
            {hero.eyebrow}
          </p>
          <h1 className="display-font balanced-text max-w-[15ch] text-5xl leading-[0.9] text-white sm:text-6xl md:max-w-[11ch] lg:text-[5.2rem]">
            {hero.title} <span className="text-[var(--brand-orange)]">{hero.highlight}</span>
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-8 text-white/72">{hero.description}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            {actions.map((action) => (
              <ActionPill key={action.label} {...action} />
            ))}
          </div>

          {hero.detailChips.length > 0 ? (
            <ul className="mt-12 flex flex-wrap gap-3">
              {hero.detailChips.map((chip) => (
                <li
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/68"
                  key={chip}
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative z-10">
          <div className="grid gap-5 lg:ml-auto lg:max-w-[35rem]">
            <div className="hidden justify-end lg:flex">
              <SocialRail bare iconOnly socialLinks={socialLinks} />
            </div>

            <div className="relative min-h-[25rem] overflow-hidden rounded-[34px] border border-white/10">
              <Image
                alt={hero.featureImageAlt}
                className="object-cover object-[center_42%] scale-[1.22] sm:scale-[1.12] lg:scale-100"
                fill
                loading="eager"
                sizes="(min-width: 1024px) 38vw, 100vw"
                src="/basijs1.jpg"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04)_0%,rgba(17,17,17,0.18)_42%,rgba(17,17,17,0.74)_100%)]" />
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
                {hero.asideTitle}
              </p>
              <p className="mt-3 max-w-[30rem] text-[0.95rem] leading-7 text-white/72">
                {hero.asideText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
