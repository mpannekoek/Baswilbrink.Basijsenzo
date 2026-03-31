import type { SiteFooterContent } from "@/types/site";

type SiteFooterProps = {
  footer: SiteFooterContent;
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="border-t border-[rgba(17,17,17,0.1)] bg-[var(--brand-black)] px-4 py-6 text-white md:px-6">
      <div className="mx-auto w-full max-w-[76rem]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/68">{footer.copyrightText}</p>
          <p className="text-sm text-white/84">
            {footer.creatorIntro}{" "}
            <a
              className="font-semibold text-[var(--brand-orange)] underline underline-offset-4 transition hover:text-white"
              data-testid="site-footer-credit-link"
              href={footer.creatorHref}
              rel="noreferrer"
              target="_blank"
            >
              {footer.creatorName}
            </a>
            . <span className="text-white/68">{footer.creatorCta}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
