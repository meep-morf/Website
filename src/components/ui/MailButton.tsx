"use client";

import { Mail } from "lucide-react";
import FancyButton from "@/components/ui/shiny-button";

type MailButtonProps = {
  email: string;
  ariaLabel?: string;
  className?: string;
};

export function MailButton({ email, ariaLabel, className }: MailButtonProps) {
  return (
    <FancyButton
      variant="green"
      icon={<Mail size={20} className="text-accent" />}
      ariaLabel={ariaLabel ?? `Email ${email}`}
      className={className}
      onClick={() => {
        window.location.href = `mailto:${email}`;
      }}
    />
  );
}
