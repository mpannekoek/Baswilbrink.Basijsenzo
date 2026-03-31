import { ActionPill } from "@/components/ui/action-pill";
import { InfoCard } from "@/components/ui/info-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import type {
  ContactInfo,
  OpeningHoursEntry,
  PracticalInfoContent,
} from "@/types/site";

type PracticalInfoSectionProps = {
  practicalInfo: PracticalInfoContent;
  hours: OpeningHoursEntry[];
  contact: ContactInfo;
};

export function PracticalInfoSection({
  practicalInfo,
  hours,
  contact,
}: PracticalInfoSectionProps) {
  return (
    <SectionShell
      description={practicalInfo.description}
      eyebrow={practicalInfo.eyebrow}
      id="openingstijden"
      title={practicalInfo.title}
      tone="light"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div className="border border-[var(--border-soft)] bg-[var(--surface-muted)] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--brand-black)]">
                {practicalInfo.hoursTitle}
              </p>
              <p className="text-sm text-[var(--ink-muted)]">{practicalInfo.hoursNote}</p>
            </div>
            <span className="bg-[var(--brand-orange)] px-4 py-2 text-sm font-semibold text-[var(--brand-black)]">
              {practicalInfo.todayBadge}
            </span>
          </div>

          <div className="mt-5 space-y-3" data-testid="practical-hours-list">
            {hours.map((entry) => (
              <div
                className={`flex items-center justify-between border px-4 py-3 ${
                  entry.isToday
                    ? "border-[var(--brand-black)] bg-[var(--brand-black)] text-white"
                    : "border-[var(--border-soft)] bg-white text-[var(--brand-black)]"
                }`}
                key={entry.day}
              >
                <span className="font-medium">{entry.day}</span>
                <span className="text-sm">{entry.hours}</span>
              </div>
            ))}
          </div>
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="grid gap-4">
          <InfoCard
            accent={practicalInfo.contactAccent}
            body={contact.townLabel}
            title={contact.address}
          >
            <div className="mt-4 flex flex-wrap gap-3">
              <ActionPill
                dataTestId="practical-call-button"
                href={contact.phoneHref}
                label={contact.phoneLabel}
                variant="primary"
              />
              <ActionPill
                dataTestId="practical-route-button"
                href={contact.routeHref}
                label={practicalInfo.routeLabel}
                variant="secondary"
              />
            </div>
          </InfoCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {practicalInfo.visitHighlights.map((highlight) => (
              <InfoCard
                accent={highlight.accent}
                body={highlight.body}
                key={highlight.title}
                title={highlight.title}
              />
            ))}
          </div>

          <p className="border border-dashed border-[var(--border-strong)] px-4 py-4 text-sm leading-6 text-[var(--ink-muted)]">
            {contact.note}
          </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
