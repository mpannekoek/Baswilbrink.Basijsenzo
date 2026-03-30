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
      description="Sociaal bewijs werkt het best als het vriendelijk en geloofwaardig blijft. Daarom staat deze sectie stevig, maar niet schreeuwerig op de pagina."
      eyebrow="Vertrouwen uit de buurt"
      id="reviews"
      title="Sterke reacties, rustig gebracht."
      tone="dark"
    >
      <Reveal className="mb-6">
        <div className="grid gap-5 border border-white/10 bg-white/6 p-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <p className="display-font text-5xl text-[var(--brand-orange)]">{summary.averageRating}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/62">
            {summary.sourceLabel}
          </p>
        </div>
        <p className="text-sm leading-7 text-white/78">{summary.note}</p>
        </div>
      </Reveal>

      <Reveal delayMs={140}>
        <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
