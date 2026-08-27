"use client";

import React from "react";
import clsx from "clsx";

type Variant = "default" | "green" | "indigo" | "amber" | "red";

interface FancyButtonProps {
  icon: React.ReactNode;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/** Dark-theme NomadLabz: visible ring at rest, sea-green / amber / blue / red hover glows. */
const variantClasses: Record<Variant, string> = {
  default: `
    border-white/15 bg-white/[0.06] text-muted shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
    hover:border-white/25 hover:bg-white/10
    hover:shadow-lg hover:shadow-white/15`,
  green: `
    border-accent-border/50 bg-accent/[0.08] text-accent shadow-[0_0_12px_rgba(45,184,138,0.12)]
    hover:border-accent-border hover:bg-accent/15
    hover:shadow-lg hover:shadow-accent/30`,
  indigo: `
    border-info-border/50 bg-info-muted text-info shadow-[0_0_12px_rgba(91,141,239,0.1)]
    hover:border-info-border hover:bg-info-muted
    hover:shadow-lg hover:shadow-info/25`,
  amber: `
    border-amber-border/50 bg-amber-muted text-amber shadow-[0_0_12px_rgba(212,165,116,0.1)]
    hover:border-amber-border hover:bg-amber-muted
    hover:shadow-lg hover:shadow-amber/25`,
  red: `
    border-danger-border/50 bg-danger-muted text-danger shadow-[0_0_12px_rgba(232,93,108,0.1)]
    hover:border-danger-border hover:bg-danger-muted
    hover:shadow-lg hover:shadow-danger/25`,
};

const glowGradientClasses: Record<Variant, string> = {
  default: "via-white/25",
  green: "via-emerald-400/35",
  indigo: "via-blue-400/30",
  amber: "via-amber-400/30",
  red: "via-red-400/30",
};

const FancyButton: React.FC<FancyButtonProps> = ({
  icon,
  variant = "default",
  onClick,
  className = "",
  ariaLabel = "Fancy Button",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        "group relative min-h-11 min-w-11 cursor-pointer overflow-hidden rounded-full border p-3 backdrop-blur-md transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95",
        variantClasses[variant],
        className,
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full",
          glowGradientClasses[variant],
        )}
      />
      <div className="relative z-10 flex items-center justify-center">{icon}</div>
    </button>
  );
};

export default FancyButton;
