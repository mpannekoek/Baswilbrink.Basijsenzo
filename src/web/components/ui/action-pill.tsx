import type { ActionLink } from "@/types/site";

type ActionPillProps = ActionLink & {
  onClick?: () => void;
};

const variantClasses: Record<ActionLink["variant"], string> = {
  primary:
    "rounded-full border border-[rgba(17,17,17,0.06)] bg-[var(--brand-orange)] text-[var(--brand-black)] shadow-[0_10px_24px_rgba(200,101,34,0.16)] hover:bg-[var(--brand-orange-soft)]",
  secondary:
    "rounded-full border border-black/10 bg-[rgba(255,248,241,0.92)] !text-[var(--brand-black)] shadow-[0_10px_24px_rgba(17,17,17,0.08)] hover:bg-white",
  ghost:
    "rounded-full bg-transparent text-[var(--brand-black)] ring-1 ring-[rgba(17,17,17,0.14)] hover:bg-black/[0.03]",
};

export function ActionPill({
  href,
  label,
  variant,
  dataTestId,
  openInNewTab,
  onClick,
}: ActionPillProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-semibold tracking-[0.01em] transition duration-200 ${variantClasses[variant]}`}
      data-testid={dataTestId}
      href={href}
      onClick={onClick}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      target={openInNewTab ? "_blank" : undefined}
    >
      {label}
    </a>
  );
}
