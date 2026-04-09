"use client";

import Image from "next/image";
import { useState } from "react";

import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import type { GalleryShowcaseContent } from "@/types/site";

type GalleryShowcaseSectionProps = {
  galleryShowcase: GalleryShowcaseContent;
};

export function GalleryShowcaseSection({
  galleryShowcase,
}: GalleryShowcaseSectionProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const activeThumbsSwiper =
    thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

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
          className="gallery-showcase-shell rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/[0.38] p-4 shadow-[0_18px_36px_rgba(17,17,17,0.07)] md:p-6"
          data-testid="gallery-showcase-slider"
        >
          <Swiper
            className="gallery-main-swiper"
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
            }}
            loop
            modules={[Autoplay, A11y, Thumbs]}
            slidesPerView={1}
            spaceBetween={16}
            thumbs={{ swiper: activeThumbsSwiper }}
          >
            {galleryShowcase.images.map((image, index) => (
              <SwiperSlide key={`${image.src}-${index}`}>
                <div className="gallery-main-card">
                  <div className="gallery-main-media relative aspect-[16/10]">
                    <Image
                      alt={image.alt}
                      className="object-cover"
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1280px) 70rem, (min-width: 768px) 88vw, 92vw"
                      src={image.src}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 3.2,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="gallery-thumbs-swiper"
            freeMode
            loop
            modules={[FreeMode, Thumbs, A11y]}
            onSwiper={setThumbsSwiper}
            slidesPerView={2.2}
            spaceBetween={12}
            watchSlidesProgress
          >
            {galleryShowcase.images.map((image, index) => (
              <SwiperSlide key={`thumb-${image.src}-${index}`}>
                <div className="gallery-thumb-card">
                  <div className="relative aspect-[4/3]">
                    <Image
                      alt={image.alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 18rem, (min-width: 768px) 22vw, 42vw"
                      src={image.src}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>
    </SectionShell>
  );
}
