"use client";

import React from "react";
import clsx from "clsx";

type Variant = "default" | "green" | "indigo" | "red";

interface FancyButtonProps {
  icon: React.ReactNode;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/** Dark-theme NomadLabz: transparent resting state, sea-green / amber / blue / red hover glows. */
const variantClasses: Record<Variant, string> = {
  default: `
    border-transparent bg-transparent text-muted shadow-none
    hover:border-white/20 hover:bg-white/5
    hover:shadow-lg hover:shadow-white/10`,
  green: `
    border-transparent bg-transparent text-accent shadow-none
    hover:border-accent-border hover:bg-accent/10
    hover:shadow-lg hover:shadow-accent/25`,
  indigo: `
    border-transparent bg-transparent text-blue-400 shadow-none
    hover:border-blue-400/30 hover:bg-blue-400/10
    hover:shadow-lg hover:shadow-blue-400/25`,
  red: `
    border-transparent bg-transparent text-red-400 shadow-none
    hover:border-red-400/30 hover:bg-red-400/10
    hover:shadow-lg hover:shadow-red-400/25`,
};

const glowGradientClasses: Record<Variant, string> = {
  default: "via-white/20",
  green: "via-emerald-400/30",
  indigo: "via-blue-400/25",
  red: "via-red-400/25",
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
        "group relative min-h-11 min-w-11 cursor-pointer overflow-hidden rounded-full p-3 backdrop-blur-lg transition-all duration-300 ease-out",
        "hover:scale-110 hover:rotate-2 hover:shadow-2xl active:scale-95 active:rotate-0",
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
