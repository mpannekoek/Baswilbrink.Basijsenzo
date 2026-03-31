import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  body: string;
  accent?: string;
  children?: ReactNode;
};

export function InfoCard({ title, body, accent, children }: InfoCardProps) {
  return (
    <article className="border border-[var(--border-soft)] bg-white/88 p-5 backdrop-blur">
      {accent ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-orange)]">
          {accent}
        </p>
      ) : null}
      <h3 className="text-lg font-semibold text-[var(--brand-black)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{body}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  );
}
