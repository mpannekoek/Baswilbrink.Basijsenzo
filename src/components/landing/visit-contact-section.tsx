import { ActionPill } from "@/components/ui/action-pill";
import { SocialRail } from "@/components/landing/social-rail";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import type { ActionLink, ContactInfo, SocialLink } from "@/types/site";

type VisitContactSectionProps = {
  contact: ContactInfo;
  actions: ActionLink[];
  socialLinks: SocialLink[];
  footerTitle: string;
  footerText: string;
};

export function VisitContactSection({
  contact,
  actions,
  socialLinks,
  footerTitle,
  footerText,
}: VisitContactSectionProps) {
  return (
    <SectionShell
      description="Laatste zetje voor bezoekers die meteen willen bellen, rijden of binnenlopen."
      eyebrow="Bezoek Bas IJs & Zo"
      id="bezoek"
      title={footerTitle}
      tone="accent"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div>
          <p className="text-lg leading-8 text-[var(--brand-black)]/82">
            {footerText}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((action) => (
              <ActionPill key={action.label} {...action} />
            ))}
            <ActionPill
              dataTestId="visit-route-button"
              href={contact.routeHref}
              label="Open route"
              variant="ghost"
            />
          </div>
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="border border-[rgba(20,20,20,0.12)] bg-white/74 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-orange)]">
            Adres & contact
          </p>
          <p className="mt-4 text-2xl font-semibold text-[var(--brand-black)]">
            {contact.address}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
            {contact.townLabel}
          </p>
          <a
            className="mt-6 inline-flex text-lg font-semibold text-[var(--brand-black)] underline decoration-[var(--brand-orange)] underline-offset-4"
            data-testid="visit-call-link"
            href={contact.phoneHref}
          >
            {contact.phoneLabel}
          </a>
          <div className="mt-6 border-t border-[rgba(20,20,20,0.1)] pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-black)]/56">
              Volg ons
            </p>
            <SocialRail iconOnly socialLinks={socialLinks} />
          </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
