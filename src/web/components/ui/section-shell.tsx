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
  light: "bg-[var(--surface)] text-[var(--brand-black)]",
  dark: "bg-[var(--brand-black)] text-[var(--surface)]",
  accent:
    "bg-[linear-gradient(135deg,var(--brand-orange)_0%,#ffb55e_100%)] text-[var(--brand-black)]",
  split:
    "bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface)_52%,#ffd29e_52%,#ffd29e_100%)] text-[var(--brand-black)]",
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
      className={`w-full border-y border-[var(--border-soft)] px-4 py-10 md:px-6 md:py-12 ${toneClasses[tone]}`}
      id={id}
    >
      <div className="mx-auto w-full max-w-[76rem]">
        <Reveal className="mb-8">
          {eyebrow ? (
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${eyebrowToneClasses[tone]}`}>
              {eyebrow}
            </p>
          ) : null}
          <h2 className="display-font text-3xl leading-none md:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-current/78">{description}</p>
          ) : null}
        </Reveal>
        <Reveal delayMs={120}>{children}</Reveal>
      </div>
    </section>
  );
}
