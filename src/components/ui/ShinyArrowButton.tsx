"use client";

import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import FancyButton from "@/components/ui/shiny-button";

type Direction = "up" | "right" | "left";

type ShinyArrowButtonProps = {
  direction?: Direction;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
  variant?: "default" | "green" | "indigo" | "amber" | "red";
};

const icons: Record<Direction, React.ReactNode> = {
  up: <ArrowUp size={20} />,
  right: <ArrowRight size={20} />,
  left: <ArrowLeft size={20} />,
};

export function ShinyArrowButton({
  direction = "right",
  onClick,
  ariaLabel,
  className,
  variant = "green",
}: ShinyArrowButtonProps) {
  return (
    <FancyButton
      variant={variant}
      icon={icons[direction]}
      ariaLabel={ariaLabel}
      className={className}
      onClick={onClick}
    />
  );
}
