import type { SocialLink } from "@/types/site";

type SocialRailProps = {
  socialLinks: SocialLink[];
  iconOnly?: boolean;
};

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
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

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
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
} satisfies Record<SocialLink["label"], () => ReturnType<typeof InstagramIcon>>;

export function SocialRail({ socialLinks, iconOnly = false }: SocialRailProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.label];

        return (
          <a
            aria-label={link.label}
            className={
              iconOnly
                ? "inline-flex h-11 w-11 items-center justify-center border border-[rgba(17,17,17,0.14)] bg-white/72 text-[var(--brand-black)] transition hover:border-[var(--brand-orange)] hover:bg-white"
                : "inline-flex min-h-11 items-center gap-2 border border-[rgba(17,17,17,0.14)] bg-white/72 px-3 py-2 text-sm font-medium text-[var(--brand-black)] transition hover:border-[var(--brand-orange)] hover:bg-white"
            }
            data-testid={link.dataTestId}
            href={link.href}
            key={link.label}
            rel="noreferrer"
            target="_blank"
            title={link.label}
          >
            <Icon />
            {iconOnly ? null : <span>{link.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
