import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone?:
    | "light"
    | "dark"
    | "accent"
    | "split"
    | "split-reverse"
    | "dark-split"
    | "dark-split-reverse";
  children: ReactNode;
};

const toneClasses: Record<NonNullable<SectionShellProps["tone"]>, string> = {
  light:
    "section-shell-light text-[var(--brand-black)]",
  dark:
    "section-shell-dark text-[var(--surface)]",
  accent:
    "section-shell-accent text-[var(--brand-black)]",
  split:
    "section-shell-soft-warm text-[var(--brand-black)]",
  "split-reverse":
    "section-shell-soft-warm-alt text-[var(--brand-black)]",
  "dark-split":
    "section-shell-soft-dark text-[var(--surface)]",
  "dark-split-reverse":
    "section-shell-soft-dark-alt text-[var(--surface)]",
};

const eyebrowToneClasses: Record<NonNullable<SectionShellProps["tone"]>, string> = {
  light: "text-[var(--brand-orange)]",
  dark: "text-[var(--brand-orange)]",
  accent: "text-[rgba(17,17,17,0.7)]",
  split: "text-[var(--brand-orange)]",
  "split-reverse": "text-[var(--brand-orange)]",
  "dark-split": "text-[var(--brand-orange)]",
  "dark-split-reverse": "text-[var(--brand-orange)]",
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
