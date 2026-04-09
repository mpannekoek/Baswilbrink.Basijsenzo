"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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
  const parallaxNodes = useRef<Array<HTMLElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

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

    mainEmblaApi.on("select", handleSelect);
    mainEmblaApi.on("reInit", handleSelect);

    return () => {
      mainEmblaApi.off("select", handleSelect);
      mainEmblaApi.off("reInit", handleSelect);
    };
  }, [mainEmblaApi, handleSelect]);

  const handlePrev = useCallback(() => {
    mainEmblaApi?.scrollPrev();
  }, [mainEmblaApi]);
  const handleNext = useCallback(() => {
    mainEmblaApi?.scrollNext();
  }, [mainEmblaApi]);

  const setParallaxNodes = useCallback(() => {
    if (!mainEmblaApi) {
      return;
    }

    parallaxNodes.current = mainEmblaApi
      .slideNodes()
      .map((slideNode) => slideNode.querySelector<HTMLElement>(".gallery-main-parallax"));
  }, [mainEmblaApi]);

  const applyParallax = useCallback(() => {
    if (!mainEmblaApi) {
      return;
    }

    const progress = mainEmblaApi.scrollProgress();
    const engine = mainEmblaApi.internalEngine();
    const snaps = mainEmblaApi.scrollSnapList();
    const parallaxAmount = 20;

    snaps.forEach((snapPoint, snapIndex) => {
      let distanceToSnap = snapPoint - progress;
      const slideIndexes = engine.slideRegistry[snapIndex];

      slideIndexes.forEach((slideIndex) => {
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopPoint) => {
            const loopTarget = loopPoint.target();

            if (slideIndex === loopPoint.index && loopTarget !== 0) {
              const direction = Math.sign(loopTarget);

              if (direction === -1) {
                distanceToSnap = snapPoint - (1 + progress);
              } else if (direction === 1) {
                distanceToSnap = snapPoint + (1 - progress);
              }
            }
          });
        }

        const targetNode = parallaxNodes.current[slideIndex];

        if (!targetNode) {
          return;
        }

        targetNode.style.transform = `translateX(${distanceToSnap * -parallaxAmount}%)`;
      });
    });
  }, [mainEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) {
      return;
    }

    setParallaxNodes();
    applyParallax();

    mainEmblaApi.on("reInit", setParallaxNodes);
    mainEmblaApi.on("reInit", applyParallax);
    mainEmblaApi.on("scroll", applyParallax);
    mainEmblaApi.on("slideFocus", applyParallax);

    return () => {
      mainEmblaApi.off("reInit", setParallaxNodes);
      mainEmblaApi.off("reInit", applyParallax);
      mainEmblaApi.off("scroll", applyParallax);
      mainEmblaApi.off("slideFocus", applyParallax);
    };
  }, [mainEmblaApi, setParallaxNodes, applyParallax]);

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
                    className={`gallery-main-embla__slide${index === selectedIndex ? " is-current" : ""}`}
                    key={`${image.src}-${index}`}
                  >
                    <motion.div
                      className="gallery-main-card"
                      transition={{
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={
                        !prefersReducedMotion && index === selectedIndex
                          ? {
                              scale: 1.02,
                              y: -6,
                            }
                          : undefined
                      }
                    >
                      <div className="gallery-main-media relative aspect-[16/10]">
                        <div className="gallery-main-parallax">
                          <Image
                            alt={image.alt}
                            className="gallery-main-parallax-layer object-cover"
                            fill
                            priority={index === 0}
                            sizes="(min-width: 1024px) 74vw, (min-width: 768px) 80vw, 90vw"
                            src={image.src}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gallery-controls">
              <div className="gallery-nav" role="group">
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
                <span className="gallery-nav-counter" data-testid="gallery-showcase-counter">
                  {selectedIndex + 1} / {galleryShowcase.images.length}
                </span>
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
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
