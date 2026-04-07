import type { SocialLink } from "@/types/site";

type SocialRailProps = {
  socialLinks: SocialLink[];
  iconOnly?: boolean;
  bare?: boolean;
  bareColor?: "white" | "orange";
};

type SocialIconProps = {
  className?: string;
};

function InstagramIcon({ className = "h-5 w-5" }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="14" rx="4" stroke="currentColor" strokeWidth="1.8" width="14" x="5" y="5" />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="7.5" fill="currentColor" r="1.1" />
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5" }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.4 20v-6.3h2.2l.4-2.7h-2.6V9.3c0-.8.3-1.5 1.6-1.5H16V5.5c-.3 0-.9-.1-1.8-.1-2.9 0-4.1 1.5-4.1 4v1.6H8v2.7h2.1V20h3.3Z" />
    </svg>
  );
}

const iconMap = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
} satisfies Record<SocialLink["label"], (props: SocialIconProps) => ReturnType<typeof InstagramIcon>>;

export function SocialRail({
  socialLinks,
  iconOnly = false,
  bare = false,
  bareColor = "white",
}: SocialRailProps) {
  const bareItemClassName =
    bareColor === "orange"
      ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(200,101,34,0.3)] bg-[rgba(200,101,34,0.12)] transition hover:bg-[rgba(255,255,255,0.12)] hover:text-white"
      : "inline-flex items-center justify-center text-white/72 transition hover:text-[var(--brand-orange)]";

  return (
    <div className={bare ? "flex flex-wrap items-center gap-4" : "flex flex-wrap items-center gap-3"}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.label];
        const iconClassName = bare ? "h-7 w-7 sm:h-8 sm:w-8" : "h-5 w-5";

        return (
          <a
            aria-label={link.label}
            className={
              bare
                ? bareItemClassName
                : iconOnly
                ? "inline-flex h-11 w-11 items-center justify-center border border-[rgba(17,17,17,0.14)] bg-white/72 text-[var(--brand-black)] transition hover:border-[var(--brand-orange)] hover:bg-white"
                : "inline-flex min-h-11 items-center gap-2 border border-[rgba(17,17,17,0.14)] bg-white/72 px-3 py-2 text-sm font-medium text-[var(--brand-black)] transition hover:border-[var(--brand-orange)] hover:bg-white"
            }
            data-testid={link.dataTestId}
            href={link.href}
            key={link.label}
            rel="noreferrer"
            style={bare && bareColor === "orange" ? { color: "var(--brand-orange)" } : undefined}
            target="_blank"
            title={link.label}
          >
            <Icon className={iconClassName} />
            {iconOnly ? null : <span>{link.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
