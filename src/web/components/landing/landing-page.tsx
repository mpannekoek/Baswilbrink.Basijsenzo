import { GalleryShowcaseSection } from "@/components/landing/gallery-showcase-section";
import { HeaderBar } from "@/components/landing/header-bar";
import { HeroSection } from "@/components/landing/hero-section";
import { PracticalInfoSection } from "@/components/landing/practical-info-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { TasteOfWeekSection } from "@/components/landing/taste-of-week-section";
import { VisitContactSection } from "@/components/landing/visit-contact-section";
import type { LandingPageContent } from "@/types/site";

type LandingPageProps = {
  content: LandingPageContent;
};

export function LandingPage({ content }: LandingPageProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-transparent" id="top">
      <HeaderBar
        brand={content.brand}
        header={content.header}
        navItems={content.navItems}
        primaryActions={content.primaryActions}
        socialLinks={content.socialLinks}
      />

      <main className="flex flex-col">
        <HeroSection
          actions={content.primaryActions}
          hero={content.hero}
          socialLinks={content.socialLinks}
        />
        <PracticalInfoSection
          contact={content.contact}
          hours={content.openingHours}
          practicalInfo={content.practicalInfo}
        />
        <TasteOfWeekSection featuredTaste={content.featuredTaste} />
        <GalleryShowcaseSection galleryShowcase={content.galleryShowcase} />
        <VisitContactSection
          actions={content.primaryActions}
          contact={content.contact}
          socialLinks={content.socialLinks}
          visitContact={content.visitContact}
        />
      </main>
      <SiteFooter footer={content.siteFooter} />
    </div>
  );
}
