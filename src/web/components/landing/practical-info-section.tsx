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
  const todayName = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    timeZone: "Europe/Amsterdam",
  }).format(new Date());
  const normalizedTodayName =
    todayName.charAt(0).toUpperCase() + todayName.slice(1).toLowerCase();
  const todayEntry =
    hours.find((entry) => entry.day.toLowerCase() === normalizedTodayName.toLowerCase()) ??
    hours.find((entry) => entry.isToday) ??
    hours[0];

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
          <div className="grid gap-4">
            <div className="rounded-[32px] bg-[var(--brand-black)] p-6 text-white shadow-[0_24px_50px_rgba(17,17,17,0.2)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
                    {practicalInfo.todayBadge}
                  </p>
                  <p className="mt-3 text-sm text-white/60">{normalizedTodayName}</p>
                  <p className="mt-2 text-4xl font-semibold text-white">{todayEntry.hours}</p>
                </div>
                <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-semibold text-white">
                  {practicalInfo.hoursTitle}
                </span>
              </div>
              <p className="mt-4 max-w-[28rem] text-sm leading-7 text-white/70">
                {practicalInfo.hoursNote}
              </p>
            </div>

            <div className="rounded-[32px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--brand-black)]">
                    {practicalInfo.hoursTitle}
                  </p>
                  <p className="text-sm text-[var(--ink-muted)]">{practicalInfo.hoursNote}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3" data-testid="practical-hours-list">
                {hours.map((entry) => {
                  const isToday =
                    entry.day.toLowerCase() === normalizedTodayName.toLowerCase() || entry.isToday;

                  return (
                    <div
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                        isToday
                          ? "border-[var(--brand-orange)] bg-[rgba(222,107,31,0.12)] text-[var(--brand-black)]"
                          : "border-[var(--border-soft)] bg-white text-[var(--brand-black)]"
                      }`}
                      key={entry.day}
                    >
                      <span className="font-medium">{entry.day}</span>
                      <span className="text-sm">{entry.hours}</span>
                    </div>
                  );
                })}
              </div>
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
                  variant="ghost"
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

            <p className="rounded-[26px] border border-dashed border-[var(--border-strong)] px-5 py-4 text-sm leading-6 text-[var(--ink-muted)]">
              {contact.note}
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
