import { ActionPill } from "@/components/ui/action-pill";
import { InfoCard } from "@/components/ui/info-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import type { ContactInfo, OpeningHoursEntry } from "@/types/site";

type PracticalInfoSectionProps = {
  hours: OpeningHoursEntry[];
  contact: ContactInfo;
  visitNotes: string[];
};

export function PracticalInfoSection({
  hours,
  contact,
  visitNotes,
}: PracticalInfoSectionProps) {
  return (
    <SectionShell
      description="Voor veel bezoekers is dit de belangrijkste informatie. Daarom staat alles hier rustig, scanbaar en mobielvriendelijk bij elkaar."
      eyebrow="Praktisch & duidelijk"
      id="openingstijden"
      title="Wanneer je binnen kunt lopen, vind je meteen."
      tone="light"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div className="border border-[var(--border-soft)] bg-[var(--surface-muted)] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--brand-black)]">
                Openingstijden
              </p>
              <p className="text-sm text-[var(--ink-muted)]">Voorbeeldtijden voor deze eerste versie</p>
            </div>
            <span className="bg-[var(--brand-orange)] px-4 py-2 text-sm font-semibold text-[var(--brand-black)]">
              Vandaag extra zichtbaar
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
          <InfoCard accent="Contact" body={contact.townLabel} title={contact.address}>
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
                label="Route plannen"
                variant="secondary"
              />
            </div>
          </InfoCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {visitNotes.map((note, index) => (
              <InfoCard
                accent={`Bezoek ${index + 1}`}
                body={note}
                key={note}
                title={index === 0 ? "Loop gerust binnen" : index === 1 ? "Mobiel eerst" : "Makkelijk te beheren"}
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
