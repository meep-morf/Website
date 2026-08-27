"use client";

import { OperationalSystemField } from "@/components/hero/OperationalSystemField";
import { NOMAD_SYNAPSE_THEME } from "@/components/ui/interactive-synapse-network";
import { InteractiveSynapseNetworkLazy } from "@/components/ui/interactive-synapse-network-lazy";
import { cn } from "@/lib/utils";

type HeroVisualFallbackProps = {
  className?: string;
  variant?: "synapse" | "operational" | "gradient";
};

/** Decorative hero visual when Spline or other 3D assets fail to load. */
export function HeroVisualFallback({
  className,
  variant = "synapse",
}: HeroVisualFallbackProps) {
  if (variant === "gradient") {
    return (
      <div
        className={cn(
          "hero-scan-fallback h-full min-h-[280px] rounded-sm border border-border-subtle md:min-h-[420px]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border border-border-subtle bg-bg-subtle",
        className,
      )}
      aria-hidden
    >
      {variant === "operational" ? (
        <OperationalSystemField />
      ) : (
        <InteractiveSynapseNetworkLazy
          {...NOMAD_SYNAPSE_THEME}
          nodeCount={42}
          connectionRadius={130}
          trailOpacity={0.16}
          className="absolute inset-0 h-full w-full"
          ariaLabel=""
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-accent-glow/10"
        aria-hidden
      />
    </div>
  );
}
