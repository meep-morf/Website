"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      // Avoid permanently invisible content if IntersectionObserver is flaky
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
