"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof window.IntersectionObserver === "undefined"
    ) {
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -4% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const style = {
    transitionDelay: `${delayMs}ms`,
  } satisfies CSSProperties;

  return (
    <div
      className={`reveal-item ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}
