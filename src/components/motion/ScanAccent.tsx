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
      className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-border-subtle ${className ?? ""}`}
      aria-hidden
    >
      <motion.div
        className="h-full w-2/5 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_12px_rgba(45,184,138,0.45)]"
        animate={{ x: ["-120%", "320%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
      />
    </div>
  );
}
