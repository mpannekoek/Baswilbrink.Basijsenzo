import type { SiteFooterContent } from "@/types/site";

type SiteFooterProps = {
  footer: SiteFooterContent;
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="border-t border-[rgba(17,17,17,0.12)] bg-[linear-gradient(135deg,#eaa05e_0%,#dd7f3a_44%,var(--brand-orange)_100%)] px-4 py-8 text-[var(--brand-black)] md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-[76rem]">
        <div className="flex flex-col gap-3 text-center text-sm md:text-left md:text-base">
          <p className="text-[var(--brand-black)]/78">{footer.copyrightText}</p>
          <p className="text-[var(--brand-black)]/86">
            {footer.creatorIntro}{" "}
            <a
              className="font-semibold underline underline-offset-4 transition hover:text-white"
              data-testid="site-footer-credit-link"
              href={footer.creatorHref}
              rel="noreferrer"
              target="_blank"
            >
              {footer.creatorName}
            </a>
            . <span className="text-[var(--brand-black)]/78">{footer.creatorCta}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
