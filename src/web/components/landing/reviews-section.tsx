import { Reveal } from "@/components/ui/reveal";
import { ReviewCard } from "@/components/ui/review-card";
import { SectionShell } from "@/components/ui/section-shell";
import type { ReviewQuote, ReviewSummary } from "@/types/site";

type ReviewsSectionProps = {
  reviews: ReviewQuote[];
  summary: ReviewSummary;
};

export function ReviewsSection({ reviews, summary }: ReviewsSectionProps) {
  return (
    <SectionShell
      description={summary.description}
      eyebrow={summary.eyebrow}
      id="reviews"
      title={summary.title}
      tone="split"
    >
      <Reveal className="mb-6">
        <div className="grid gap-5 rounded-[30px] border border-[rgba(17,17,17,0.08)] bg-white/[0.54] p-6 shadow-[0_16px_34px_rgba(17,17,17,0.06)] md:grid-cols-[0.68fr_1.32fr] md:items-center">
          <div>
            <p className="display-font text-5xl text-[var(--brand-orange)]">{summary.averageRating}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[var(--brand-black)]/52">
              {summary.sourceLabel}
            </p>
          </div>
          <p className="text-sm leading-7 text-[var(--brand-black)]/72">{summary.note}</p>
        </div>
      </Reveal>

      <Reveal delayMs={140}>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} tone="light" />
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
