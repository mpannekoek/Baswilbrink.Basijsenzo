import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark" | "accent" | "split";
  children: ReactNode;
};

const toneClasses: Record<NonNullable<SectionShellProps["tone"]>, string> = {
  light:
    "bg-[linear-gradient(180deg,rgba(255,248,241,0.98),rgba(250,241,232,0.96))] text-[var(--brand-black)]",
  dark:
    "bg-[radial-gradient(circle_at_top_left,rgba(200,101,34,0.08),transparent_24%),linear-gradient(180deg,#141311_0%,#101010_100%)] text-[var(--surface)]",
  accent:
    "bg-[radial-gradient(circle_at_top_right,rgba(200,101,34,0.12),transparent_22%),linear-gradient(180deg,#f8efe5_0%,#fff7f0_100%)] text-[var(--brand-black)]",
  split:
    "bg-[linear-gradient(135deg,#fff9f3_0%,#fff9f3_58%,#f1e2d1_58%,#f1e2d1_100%)] text-[var(--brand-black)]",
};

const eyebrowToneClasses: Record<NonNullable<SectionShellProps["tone"]>, string> = {
  light: "text-[var(--brand-orange)]",
  dark: "text-[var(--brand-orange)]",
  accent: "text-[rgba(17,17,17,0.7)]",
  split: "text-[var(--brand-orange)]",
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
  children,
}: SectionShellProps) {
  return (
    <section
      className={`relative w-full overflow-hidden border-b border-[var(--border-soft)] px-4 py-20 md:px-6 md:py-24 ${toneClasses[tone]}`}
      id={id}
    >
      <div className="mx-auto w-full max-w-[76rem]">
        <Reveal className="mb-12 max-w-[41rem]">
          {eyebrow ? (
            <p
              className={`mb-4 text-xs font-semibold uppercase tracking-[0.24em] ${eyebrowToneClasses[tone]}`}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2 className="display-font balanced-text text-4xl leading-[0.96] md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 max-w-[35rem] text-base leading-7 text-current/72 md:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
