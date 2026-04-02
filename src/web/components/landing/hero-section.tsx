import Image from "next/image";
import { ActionPill } from "@/components/ui/action-pill";
import type { ActionLink, HeroContent } from "@/types/site";

type HeroSectionProps = {
  hero: HeroContent;
  actions: ActionLink[];
};

export function HeroSection({ hero, actions }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden border-b border-[var(--border-soft)] bg-[linear-gradient(135deg,#141414_0%,#141414_54%,#ff7a1a_54%,#ffb35d_100%)] px-4 py-10 md:px-6 md:py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_58%)]" />
      <div className="mx-auto grid w-full max-w-[76rem] gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
            {hero.eyebrow}
          </p>
          <h1 className="display-font text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
            {hero.title}{" "}
            <span className="text-[var(--brand-orange)]">{hero.highlight}</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/78">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((action) => (
              <ActionPill key={action.label} {...action} />
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {hero.detailChips.map((chip) => (
              <li
                className="border border-white/14 bg-white/8 px-4 py-2 text-sm text-white/78"
                key={chip}
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <div className="relative overflow-hidden border border-[rgba(20,20,20,0.08)] bg-[rgba(255,249,240,0.94)] p-6 text-[var(--brand-black)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[rgba(255,98,17,0.18)]" />
            <div className="absolute right-12 top-12 h-5 w-5 rounded-full bg-[var(--brand-orange)]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
                {hero.asideTitle}
              </p>
              <p className="mt-3 text-lg font-semibold leading-7">
                {hero.asideText}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_0.82fr]">
            <div className="relative min-h-[18rem] overflow-hidden">
              <Image
                alt={hero.featureImageAlt}
                className="object-cover object-center scale-[1.4]"
                fill
                loading="eager"
                sizes="(min-width: 640px) 40vw, 100vw"
                src="/basijs1.jpg"
              />
            </div>

            <div className="border border-[rgba(20,20,20,0.08)] bg-[rgba(255,249,240,0.88)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
                {hero.quickInfo.eyebrow}
              </p>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm text-[var(--ink-muted)]">
                    {hero.quickInfo.questionLabel}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-[var(--brand-black)]">
                    {hero.quickInfo.question}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--ink-muted)]">
                    {hero.quickInfo.answerLabel}
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-[var(--brand-black)]">
                    {hero.quickInfo.answer}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
