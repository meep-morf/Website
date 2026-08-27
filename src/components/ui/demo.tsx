"use client";

import { Globe, Mail, ExternalLink, Shield } from "lucide-react";
import FancyButton from "@/components/ui/shiny-button";

/** Shiny button showcase — NomadLabz dark-theme variants. */
export default function DemoOne() {
  return (
    <div className="mx-auto grid max-w-md grid-cols-2 gap-6">
      <FancyButton
        icon={<Globe size={22} className="text-muted" />}
        variant="default"
        ariaLabel="Default action"
      />
      <FancyButton
        icon={<Shield size={22} className="text-accent" />}
        variant="green"
        ariaLabel="Security action"
      />
      <FancyButton
        icon={<ExternalLink size={22} className="text-blue-400" />}
        variant="indigo"
        ariaLabel="External link"
      />
      <FancyButton
        icon={<Mail size={22} className="text-red-400" />}
        variant="red"
        ariaLabel="Contact action"
      />
    </div>
  );
}
