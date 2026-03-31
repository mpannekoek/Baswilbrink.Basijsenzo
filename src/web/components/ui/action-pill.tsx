import type { ActionLink } from "@/types/site";

type ActionPillProps = ActionLink & {
  onClick?: () => void;
};

const variantClasses: Record<ActionLink["variant"], string> = {
  primary:
    "bg-[var(--brand-orange)] text-[var(--brand-black)] shadow-[0_12px_30px_rgba(255,98,17,0.28)] hover:bg-[var(--brand-orange-soft)]",
  secondary:
    "bg-white !text-[var(--brand-black)] shadow-[0_12px_28px_rgba(17,17,17,0.12)] ring-1 ring-black/10 hover:bg-[#fff3e6]",
  ghost:
    "bg-transparent text-[var(--brand-black)] ring-1 ring-[var(--border-soft)] hover:bg-white/60",
};

export function ActionPill({
  href,
  label,
  variant,
  dataTestId,
  onClick,
}: ActionPillProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center px-5 py-3 text-sm font-semibold transition duration-200 ${variantClasses[variant]}`}
      data-testid={dataTestId}
      href={href}
      onClick={onClick}
    >
      {label}
    </a>
  );
}
