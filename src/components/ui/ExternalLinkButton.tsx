"use client";

import { ExternalLink } from "lucide-react";
import FancyButton from "@/components/ui/shiny-button";

type ExternalLinkButtonProps = {
  href: string;
  ariaLabel: string;
  className?: string;
};

export function ExternalLinkButton({ href, ariaLabel, className }: ExternalLinkButtonProps) {
  return (
    <FancyButton
      variant="indigo"
      icon={<ExternalLink size={20} className="text-info" />}
      ariaLabel={ariaLabel}
      className={className}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
    />
  );
}
