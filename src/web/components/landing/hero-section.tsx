import { HeroAnimatedHighlight } from "@/components/landing/hero-animated-highlight";
import { SocialRail } from "@/components/landing/social-rail";
import { ActionPill } from "@/components/ui/action-pill";
import type { ActionLink, HeroContent, SocialLink } from "@/types/site";

type HeroSectionProps = {
  hero: HeroContent;
  actions: ActionLink[];
  socialLinks: SocialLink[];
};

export function HeroSection({ hero, actions, socialLinks }: HeroSectionProps) {
  const routeActions = actions.filter((action) => action.dataTestId === "header-visit-button");
  const visibleActions = routeActions.length > 0 ? routeActions : actions.slice(-1);

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#151311] px-4 pb-16 pt-14 text-white md:px-6 md:pb-24 md:pt-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/hero-bg1.png')] bg-cover bg-center bg-no-repeat"
        data-testid="hero-background-image"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.66)_0%,rgba(8,8,8,0.5)_34%,rgba(8,8,8,0.24)_64%,rgba(8,8,8,0.44)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,10,9,0.42)_0%,rgba(11,10,9,0.08)_32%,rgba(11,10,9,0.46)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute left-[-10rem] top-20 h-72 w-72 rounded-full bg-[rgba(200,101,34,0.12)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-4rem] right-[-8rem] h-80 w-80 rounded-full bg-[rgba(200,101,34,0.1)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(126deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_48%,rgba(200,101,34,0.14)_70%,rgba(200,101,34,0.03)_100%)] lg:block" />

      <div className="mx-auto w-full max-w-[76rem]">
        <div className="relative z-10 max-w-[44rem] p-6 sm:p-8 md:p-10 text-white">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
            {hero.eyebrow}
          </p>
          <h1 className="display-font balanced-text max-w-[15ch] text-5xl leading-[0.9] text-white sm:text-6xl md:max-w-[11ch] lg:text-[5.2rem]">
            {hero.title}{" "}
            <HeroAnimatedHighlight className="text-[var(--brand-orange)]" text={hero.highlight} />
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-8 text-white/82">{hero.description}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            {visibleActions.map((action) => (
              <ActionPill key={action.label} {...action} variant="primary" />
            ))}
          </div>

          {socialLinks.length > 0 ? (
            <div className="mt-8 flex">
              <SocialRail bare iconOnly socialLinks={socialLinks} />
            </div>
          ) : null}

          {hero.detailChips.length > 0 ? (
            <ul className="mt-12 flex flex-wrap gap-3">
              {hero.detailChips.map((chip) => (
                <li
                  className="rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm text-white/82"
                  key={chip}
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
