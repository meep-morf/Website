"use client";

import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  /** Radial gradient center color — defaults to sea-green tint */
  fill?: string;
};

export function Spotlight({
  className,
  fill = "rgba(45, 184, 138, 0.18)",
}: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, ${fill}, transparent 80%)`;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
    </div>
  );
}
