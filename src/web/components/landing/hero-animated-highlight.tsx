"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type HeroAnimatedHighlightProps = {
  text: string;
  className?: string;
};

export function HeroAnimatedHighlight({ text, className }: HeroAnimatedHighlightProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || words.length === 0) {
      return;
    }

    let tick = 0;
    const cycleLength = words.length + 2;
    const intervalId = window.setInterval(() => {
      tick = (tick + 1) % cycleLength;
      setActiveWord(tick >= words.length ? -1 : tick);
    }, 850);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion, words.length]);

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`${className ?? ""} inline whitespace-normal text-left`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <motion.span
            className="inline-block"
            animate={
              activeWord >= index && activeWord !== -1
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 10, filter: "blur(2px)" }
            }
            initial={false}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
