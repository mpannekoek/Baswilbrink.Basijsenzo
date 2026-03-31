import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import type { StoryContent } from "@/types/site";

type StorySectionProps = {
  story: StoryContent;
};

export function StorySection({ story }: StorySectionProps) {
  return (
    <SectionShell
      description={story.description}
      eyebrow={story.eyebrow}
      id="verhaal"
      title={story.title}
      tone="split"
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-8 text-[var(--brand-black)]/78">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="grid gap-4">
          {story.timeline.map((item) => (
            <article
              className="border border-[var(--border-soft)] bg-white/72 p-5 backdrop-blur"
              key={item.label}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-orange)]">
                {item.label}
              </p>
              <p className="mt-3 text-lg font-semibold text-[var(--brand-black)]">
                {item.value}
              </p>
            </article>
          ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
