"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import type { GalleryShowcaseContent } from "@/types/site";

type GalleryShowcaseSectionProps = {
  galleryShowcase: GalleryShowcaseContent;
};

export function GalleryShowcaseSection({
  galleryShowcase,
}: GalleryShowcaseSectionProps) {
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 4200,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel(
    { align: "center", loop: true },
    [autoplayPlugin.current],
  );

  const handleSelect = useCallback(() => {
    if (!mainEmblaApi) {
      return;
    }

    const nextIndex = mainEmblaApi.selectedScrollSnap();
    setSelectedIndex(nextIndex);
  }, [mainEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) {
      return;
    }

    handleSelect();
    mainEmblaApi.on("select", handleSelect);
    mainEmblaApi.on("reInit", handleSelect);

    return () => {
      mainEmblaApi.off("select", handleSelect);
      mainEmblaApi.off("reInit", handleSelect);
    };
  }, [mainEmblaApi, handleSelect]);

  const handleDotClick = useCallback(
    (index: number) => {
      mainEmblaApi?.scrollTo(index);
    },
    [mainEmblaApi],
  );
  const handlePrev = useCallback(() => {
    mainEmblaApi?.scrollPrev();
  }, [mainEmblaApi]);
  const handleNext = useCallback(() => {
    mainEmblaApi?.scrollNext();
  }, [mainEmblaApi]);

  return (
    <SectionShell
      description={galleryShowcase.description}
      eyebrow={galleryShowcase.eyebrow}
      id="impressie"
      title={galleryShowcase.title}
      tone="accent"
    >
      <Reveal delayMs={140}>
        <div
          className="gallery-showcase-breakout"
          data-testid="gallery-showcase-slider"
        >
          <div className="gallery-showcase-shell">
            <div
              aria-label={`${galleryShowcase.title} slider`}
              className="gallery-main-embla"
              ref={mainEmblaRef}
              role="region"
            >
              <div className="gallery-main-embla__container">
                {galleryShowcase.images.map((image, index) => (
                  <div
                    className={`gallery-main-embla__slide${index === selectedIndex ? " is-active" : ""}`}
                    key={`${image.src}-${index}`}
                  >
                    <div className="gallery-main-card">
                      <div className="gallery-main-media relative aspect-[16/10]">
                        <Image
                          alt={image.alt}
                          className="object-cover"
                          fill
                          priority={index === 0}
                          sizes="(min-width: 1024px) 74vw, (min-width: 768px) 80vw, 90vw"
                          src={image.src}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gallery-controls">
              <div className="gallery-nav">
                <button
                  aria-label="Vorige slide"
                  className="gallery-nav-button"
                  data-testid="gallery-showcase-prev-button"
                  onClick={handlePrev}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.9"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Volgende slide"
                  className="gallery-nav-button"
                  data-testid="gallery-showcase-next-button"
                  onClick={handleNext}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.9"
                    />
                  </svg>
                </button>
              </div>
              <div className="gallery-progress" role="tablist">
                {galleryShowcase.images.map((image, index) => (
                  <button
                    aria-label={`Ga naar slide ${index + 1}`}
                    aria-selected={index === selectedIndex}
                    className={`gallery-progress-dot${index === selectedIndex ? " is-active" : ""}`}
                    data-testid="gallery-showcase-progress-dot"
                    key={`progress-${image.src}-${index}`}
                    onClick={() => handleDotClick(index)}
                    role="tab"
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
