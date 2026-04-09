"use client";

import { useState } from "react";
import Image from "next/image";

import { SocialRail } from "@/components/landing/social-rail";
import { ActionPill } from "@/components/ui/action-pill";
import type { ActionLink, BrandConfig, HeaderContent, NavItem, SocialLink } from "@/types/site";

type HeaderBarProps = {
  brand: BrandConfig;
  header: HeaderContent;
  navItems: NavItem[];
  primaryActions: ActionLink[];
  socialLinks: SocialLink[];
};

function MenuIcon() {
  return (
    <span className="flex w-5 flex-col gap-1.5">
      <span className="h-0.5 w-full rounded-full bg-current" />
      <span className="h-0.5 w-full rounded-full bg-current" />
      <span className="h-0.5 w-full rounded-full bg-current" />
    </span>
  );
}

function CloseIcon() {
  return (
    <span aria-hidden="true" className="relative block h-5 w-5">
      <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
      <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
    </span>
  );
}

export function HeaderBar({
  brand,
  header,
  navItems,
  primaryActions,
  socialLinks,
}: HeaderBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobilePrimaryActions = [...primaryActions].sort((left, right) => {
    if (left.dataTestId === "header-visit-button") {
      return -1;
    }

    if (right.dataTestId === "header-visit-button") {
      return 1;
    }

    return 0;
  });

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuLabel = isMobileMenuOpen
    ? header.menuCloseLabel
    : header.menuOpenLabel;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-[rgba(12,12,12,0.78)] px-4 py-3 text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-6">
        <div className="mx-auto w-full max-w-[76rem]">
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <a
              className="flex min-w-0 flex-1 items-center overflow-hidden pr-2 transition hover:opacity-90"
              href="#top"
              onClick={closeMobileMenu}
            >
              <div className="relative h-12 w-[9.25rem] shrink-0 overflow-hidden sm:w-[10.5rem]">
                <Image
                  alt={`${brand.fallbackLabel} logo`}
                  className="object-contain"
                  fill
                  priority
                  sizes="176px"
                  src={brand.logoSrc}
                />
              </div>
            </a>

            <button
              aria-controls="mobile-navigation-panel"
              aria-expanded={isMobileMenuOpen}
              aria-label={menuLabel}
              className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white transition hover:bg-white/10"
              data-testid="mobile-menu-button"
              onClick={() => {
                setIsMobileMenuOpen((current) => !current);
              }}
              type="button"
            >
              <span className="sr-only">{menuLabel}</span>
              <MenuIcon />
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-10">
            <a className="flex items-center gap-4 transition hover:opacity-90" href="#top">
              <div className="relative h-14 w-[11.75rem] overflow-hidden">
                <Image
                  alt={`${brand.fallbackLabel} logo`}
                  className="object-contain"
                  fill
                  priority
                  sizes="188px"
                  src={brand.logoSrc}
                />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/46">
                  {brand.tagline}
                </p>
              </div>
            </a>

            <nav
              aria-label={header.navAriaLabel}
              className="flex flex-wrap items-center gap-1 text-sm text-white/68"
            >
              {navItems.map((item) => (
                <a
                  className="rounded-full px-3 py-2 transition hover:bg-white/[0.07] hover:text-white"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              {primaryActions.slice(0, 1).map((action) => (
                <ActionPill key={action.label} {...action} />
              ))}
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div
          className="fixed inset-0 z-[70] bg-[rgba(8,8,8,0.96)] backdrop-blur-xl lg:hidden"
          data-testid="mobile-nav-panel"
          id="mobile-navigation-panel"
        >
          <div className="mx-auto flex h-full w-full max-w-[76rem] flex-col px-4 py-3 md:px-6">
            <div className="flex items-center justify-between gap-4">
              <a
                className="flex min-w-0 flex-1 items-center overflow-hidden pr-2 transition hover:opacity-90"
                href="#top"
                onClick={closeMobileMenu}
              >
                <div className="relative h-12 w-[9.25rem] shrink-0 overflow-hidden sm:w-[10.5rem]">
                  <Image
                    alt={`${brand.fallbackLabel} logo`}
                    className="object-contain"
                    fill
                    priority
                    sizes="176px"
                    src={brand.logoSrc}
                  />
                </div>
              </a>

              <button
                aria-controls="mobile-navigation-panel"
                aria-expanded={isMobileMenuOpen}
                aria-label={header.menuCloseLabel}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white transition hover:bg-white/10"
                data-testid="mobile-menu-close-button"
                onClick={closeMobileMenu}
                type="button"
              >
                <span className="sr-only">{header.menuCloseLabel}</span>
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 flex flex-1 flex-col overflow-y-auto rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-5 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.34)] sm:px-6 sm:py-7">
              <nav
                aria-label={header.mobileNavAriaLabel}
                className="flex flex-1 flex-col justify-center gap-4 text-white/88"
              >
                {navItems.map((item) => (
                  <a
                    className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] px-5 py-5 text-[1.55rem] font-semibold leading-tight tracking-[-0.02em] text-white transition hover:bg-white/10 hover:text-white sm:px-6 sm:py-6 sm:text-[1.8rem]"
                    href={item.href}
                    key={item.href}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                {mobilePrimaryActions.map((action) => (
                  <ActionPill
                    key={action.label}
                    {...action}
                    onClick={closeMobileMenu}
                    variant={action.dataTestId === "header-visit-button" ? "primary" : "secondary"}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-center border-t border-white/10 pt-6">
                <SocialRail bare bareColor="orange" iconOnly socialLinks={socialLinks} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
