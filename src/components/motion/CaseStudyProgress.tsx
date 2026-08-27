"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function CaseStudyProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-0.5 bg-border-subtle/80 md:top-[4.5rem]"
      aria-hidden
    >
      <motion.div className="h-full origin-left bg-accent/80" style={{ width }} />
    </div>
  );
}
