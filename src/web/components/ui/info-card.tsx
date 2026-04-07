import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  body: string;
  accent?: string;
  children?: ReactNode;
};

export function InfoCard({ title, body, accent, children }: InfoCardProps) {
  return (
    <article className="rounded-[24px] border border-[var(--border-soft)] bg-white/[0.84] p-6 shadow-[0_14px_34px_rgba(17,17,17,0.05)] backdrop-blur">
      {accent ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-orange)]">
          {accent}
        </p>
      ) : null}
      <h3 className="text-[1.15rem] font-semibold text-[var(--brand-black)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">{body}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  );
}
