"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type MaskedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Clip-path reveal for cards — solutions industry panels. */
export function MaskedReveal({ children, className, delay = 0 }: MaskedRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
