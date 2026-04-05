import type { ReviewQuote } from "@/types/site";

type ReviewCardProps = {
  review: ReviewQuote;
  tone?: "dark" | "light";
};

export function ReviewCard({ review, tone = "dark" }: ReviewCardProps) {
  const isLight = tone === "light";

  return (
    <article
      className={`flex h-full flex-col rounded-[28px] p-6 backdrop-blur ${
        isLight
          ? "border border-[rgba(17,17,17,0.08)] bg-white/[0.72] shadow-[0_16px_34px_rgba(17,17,17,0.08)]"
          : "border border-white/10 bg-[rgba(255,255,255,0.04)] shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
      }`}
    >
      <p className="text-sm tracking-[0.24em] text-[var(--brand-orange)]">
        {"★".repeat(review.rating)}
      </p>
      <p
        className={`mt-5 text-base leading-7 ${
          isLight ? "text-[var(--brand-black)]/78" : "text-white/86"
        }`}
      >
        &ldquo;{review.quote}&rdquo;
      </p>
      <p
        className={`mt-6 border-t pt-4 text-sm font-semibold ${
          isLight
            ? "border-[rgba(17,17,17,0.08)] text-[var(--brand-black)]"
            : "border-white/10 text-white"
        }`}
      >
        {review.name}
      </p>
    </article>
  );
}
