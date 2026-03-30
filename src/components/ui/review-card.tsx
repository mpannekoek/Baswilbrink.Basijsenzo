import type { ReviewQuote } from "@/types/site";

type ReviewCardProps = {
  review: ReviewQuote;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="flex h-full flex-col border border-white/12 bg-[rgba(255,255,255,0.07)] p-5">
      <p className="text-sm tracking-[0.24em] text-[var(--brand-orange)]">
        {"★".repeat(review.rating)}
      </p>
      <p className="mt-4 text-base leading-7 text-white/86">&ldquo;{review.quote}&rdquo;</p>
      <p className="mt-6 text-sm font-semibold text-white">{review.name}</p>
    </article>
  );
}
