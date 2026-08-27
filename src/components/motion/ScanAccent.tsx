"use client";

import { motion, useReducedMotion } from "motion/react";

type ScanAccentProps = {
  className?: string;
};

/** Subtle horizontal scan line — lightweight services-page accent. */
export function ScanAccent({ className }: ScanAccentProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/25 ${className ?? ""}`}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden bg-border-subtle ${className ?? ""}`}
      aria-hidden
    >
      <motion.div
        className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
    </div>
  );
}
