"use client";

import { motion, useReducedMotion } from "motion/react";

type ServiceConnectorProps = {
  index: number;
};

/** Vertical connector line between service panels — animates on scroll. */
export function ServiceConnector({ index }: ServiceConnectorProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        className="pointer-events-none mx-auto hidden h-12 w-px bg-border-subtle lg:block"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none relative hidden h-14 lg:block" aria-hidden>
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-subtle" />
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent/70 via-accent/30 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-border bg-accent/20"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.35, delay: index * 0.04 + 0.2 }}
      />
    </div>
  );
}
