import { SocialRail } from "@/components/landing/social-rail";
import { ActionPill } from "@/components/ui/action-pill";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import type {
  ActionLink,
  ContactInfo,
  SocialLink,
  VisitContactContent,
} from "@/types/site";

type VisitContactSectionProps = {
  visitContact: VisitContactContent;
  contact: ContactInfo;
  actions: ActionLink[];
  socialLinks: SocialLink[];
};

export function VisitContactSection({
  visitContact,
  contact,
  actions,
  socialLinks,
}: VisitContactSectionProps) {
  const orderedActions = [...actions].sort((left, right) => {
    if (left.dataTestId === "header-visit-button") {
      return -1;
    }

    if (right.dataTestId === "header-visit-button") {
      return 1;
    }

    return 0;
  });
  const creamyPanelClass =
    "rounded-[32px] border border-[rgba(200,101,34,0.14)] bg-[linear-gradient(135deg,rgba(255,246,237,0.96)_0%,rgba(246,228,205,0.9)_100%)] p-7 text-[var(--brand-black)] shadow-[0_16px_34px_rgba(17,17,17,0.08)]";

  return (
    <SectionShell
      description={visitContact.description}
      eyebrow={visitContact.eyebrow}
      id="bezoek"
      title={visitContact.title}
      tone="dark-split"
    >
      <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
        <Reveal>
          <div className={creamyPanelClass}>
            <p className="max-w-[35rem] text-lg leading-8 text-[var(--brand-black)]/82">
              {visitContact.bodyText}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {orderedActions.map((action) => (
                <ActionPill
                  key={action.label}
                  {...action}
                  variant={action.dataTestId === "header-visit-button" ? "primary" : "secondary"}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className={creamyPanelClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-orange)]">
              {visitContact.contactTitle}
            </p>
            <p className="mt-4 text-2xl font-semibold text-[var(--brand-black)]">{contact.address}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--brand-black)]/66">{contact.townLabel}</p>
            <a
              className="mt-6 inline-flex text-lg font-semibold text-[var(--brand-black)] underline decoration-[var(--brand-orange)] underline-offset-4"
              data-testid="visit-call-link"
              href={contact.phoneHref}
            >
              {contact.phoneLabel}
            </a>
            <div className="mt-6 border-t border-[rgba(17,17,17,0.08)] pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-black)]/52">
                {visitContact.followTitle}
              </p>
              <SocialRail bare iconOnly socialLinks={socialLinks} />
            </div>
          </div>
        </Reveal>
      </div>
      <div className="mt-8 flex justify-center -mb-12 lg:mt-10 lg:-mb-[3.5rem]">
        <a
          className="inline-flex items-center gap-2.5 text-lg font-medium tracking-[-0.01em] text-white/94 transition hover:text-white md:text-xl"
          data-testid="back-to-top-link"
          href="#top"
        >
          <span>Back to top</span>
          <span aria-hidden="true" className="text-xl leading-none md:text-2xl">
            ↑
          </span>
        </a>
      </div>
    </SectionShell>
  );
}
