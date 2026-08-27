"use client";

import { useReducedMotion } from "motion/react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ShinyArrowButton } from "@/components/ui/ShinyArrowButton";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { NOMAD_SYNAPSE_THEME } from "@/components/ui/interactive-synapse-network";
import { InteractiveSynapseNetworkLazy } from "@/components/ui/interactive-synapse-network-lazy";
import { SplineScene } from "@/components/ui/splite";
import { HeroVisualFallback } from "@/components/ui/HeroVisualFallback";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { ctaPrimary, ctaSecondary, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

function HeroCopy() {
  return (
    <div className="rounded-sm border border-border-subtle bg-bg/90 p-6 backdrop-blur-md md:p-8 lg:p-10">
      <StaggerReveal>
        <StaggerItem>
          <p className="mono-label mb-5">{siteConfig.name}</p>
        </StaggerItem>
        <StaggerItem>
          <h1 className="display-heading text-4xl sm:text-5xl md:text-[2.75rem] lg:text-6xl">
            {siteConfig.headline}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-5 max-w-xl text-base text-muted md:text-lg">
            NomadLabz engineers the invisible operating layer — product surfaces,
            integrations, cloud delivery, and security controls — so teams ship with
            confidence and operate without unmanaged risk.
          </p>
        </StaggerItem>
        <StaggerItem>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={ctaPrimary.href} className="cta-pulse">
              {ctaPrimary.label}
            </ButtonLink>
            <ShinyArrowButton
              direction="right"
              variant="green"
              ariaLabel={ctaPrimary.label}
              onClick={() => {
                window.location.href = ctaPrimary.href;
              }}
            />
            <ButtonLink href={ctaSecondary.href} variant="secondary">
              {ctaSecondary.label}
            </ButtonLink>
          </div>
        </StaggerItem>
      </StaggerReveal>
    </div>
  );
}

function HeroVisual() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <HeroVisualFallback
        className="h-full min-h-[280px] md:min-h-[420px]"
        variant="operational"
      />
    );
  }

  return (
    <div className="relative h-full min-h-[280px] md:min-h-[420px]">
      <SplineScene
        scene={SPLINE_SCENE_URL}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function SplineSceneBasicInner() {
  return (
    <section
      className="relative border-b border-border-subtle section-pad section-tint-accent"
      aria-label="NomadLabz hero"
    >
      <div className="container-page">
        <Card
          className={cn(
            "group relative overflow-hidden border-border-subtle bg-bg shadow-none",
            "min-h-[min(78vh,760px)]",
          )}
        >
          <div className="absolute inset-0 z-0" aria-hidden>
            <InteractiveSynapseNetworkLazy
              {...NOMAD_SYNAPSE_THEME}
              nodeCount={52}
              connectionRadius={155}
              trailOpacity={0.2}
              className="h-full w-full"
              ariaLabel=""
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/88 to-bg/55"
              aria-hidden
            />
          </div>
          <Spotlight fill="rgba(45, 184, 138, 0.22)" />

          <div className="relative z-10 grid min-h-[min(78vh,760px)] grid-cols-1 items-center gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10 lg:p-12">
            <HeroCopy />
            <div className="relative min-h-[280px] md:min-h-[420px] lg:min-h-[480px]">
              <HeroVisual />
              <div
                className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-accent-border/20"
                aria-hidden
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function SplineSceneBasic() {
  return (
    <ErrorBoundary
      fallback={
        <section
          className="relative border-b border-border-subtle section-pad section-tint-accent"
          aria-label="NomadLabz hero"
        >
          <div className="container-page">
            <Card
              className={cn(
                "relative overflow-hidden border-border-subtle bg-bg shadow-none",
                "min-h-[min(78vh,760px)]",
              )}
            >
              <div className="absolute inset-0 z-0" aria-hidden>
                <InteractiveSynapseNetworkLazy
                  {...NOMAD_SYNAPSE_THEME}
                  nodeCount={52}
                  connectionRadius={155}
                  trailOpacity={0.2}
                  className="h-full w-full"
                  ariaLabel=""
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/88 to-bg/55"
                  aria-hidden
                />
              </div>
              <Spotlight fill="rgba(45, 184, 138, 0.22)" />
              <div className="relative z-10 grid min-h-[min(78vh,760px)] grid-cols-1 items-center gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10 lg:p-12">
                <HeroCopy />
                <HeroVisualFallback
                  className="h-full min-h-[280px] md:min-h-[420px]"
                  variant="operational"
                />
              </div>
            </Card>
          </div>
        </section>
      }
    >
      <SplineSceneBasicInner />
    </ErrorBoundary>
  );
}
