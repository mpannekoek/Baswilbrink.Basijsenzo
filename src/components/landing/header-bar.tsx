"use client";

import { useState } from "react";
import Image from "next/image";

import { ActionPill } from "@/components/ui/action-pill";
import type { ActionLink, BrandConfig, NavItem } from "@/types/site";

type HeaderBarProps = {
  brand: BrandConfig;
  navItems: NavItem[];
  primaryActions: ActionLink[];
};

export function HeaderBar({ brand, navItems, primaryActions }: HeaderBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/12 bg-[rgba(15,15,15,0.92)] px-4 py-4 text-white backdrop-blur md:px-6">
      <div className="mx-auto w-full max-w-[76rem]">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <a
            className="flex min-w-0 flex-1 items-center overflow-hidden pr-2 transition hover:opacity-90"
            href="#top"
            onClick={closeMobileMenu}
          >
            <div className="relative h-12 w-[9.5rem] shrink-0 overflow-hidden bg-[rgba(15,15,15,0.92)] px-2 py-1 sm:w-[11rem]">
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
            aria-label={isMobileMenuOpen ? "Menu sluiten" : "Menu openen"}
            className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center border border-white/12 bg-white/6 text-white transition hover:bg-white/10"
            data-testid="mobile-menu-button"
            onClick={() => {
              setIsMobileMenuOpen((current) => !current);
            }}
            type="button"
          >
            <span className="sr-only">{isMobileMenuOpen ? "Menu sluiten" : "Menu openen"}</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className="h-0.5 w-full rounded-full bg-current" />
              <span className="h-0.5 w-full rounded-full bg-current" />
              <span className="h-0.5 w-full rounded-full bg-current" />
            </span>
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div
            className="mt-4 flex flex-col gap-4 border-t border-white/10 bg-black/18 pt-4 lg:hidden"
            data-testid="mobile-nav-panel"
            id="mobile-navigation-panel"
          >
            <nav aria-label="Mobiele hoofdnavigatie" className="flex flex-col gap-2 text-sm text-white/82">
              {navItems.map((item) => (
                <a
                  className="border-b border-white/8 px-4 py-3 transition hover:bg-white/8 hover:text-white"
                  href={item.href}
                  key={item.href}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              {primaryActions.map((action) => (
                <ActionPill key={action.label} {...action} onClick={closeMobileMenu} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-5">
          <a className="flex items-center transition hover:opacity-90" href="#top">
            <div className="relative h-12 w-[11rem] overflow-hidden bg-[rgba(15,15,15,0.92)] px-2 py-1">
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

          <nav aria-label="Hoofdnavigatie" className="flex flex-wrap gap-2 text-sm text-white/74">
            {navItems.map((item) => (
              <a
                className="border-b border-transparent px-3 py-2 transition hover:border-white/30 hover:bg-white/8 hover:text-white"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap gap-3">
            {primaryActions.map((action) => (
              <ActionPill key={action.label} {...action} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
