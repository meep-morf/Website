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
        className="h-full min-h-[min(45vh,400px)] md:min-h-[440px] lg:min-h-[520px]"
        variant="operational"
      />
    );
  }

  return (
    <div className="relative h-full min-h-[min(45vh,400px)] w-full md:min-h-[440px] lg:min-h-[520px]">
      <SplineScene
        scene={SPLINE_SCENE_URL}
        className="absolute inset-0 h-full w-full [&_canvas]:!h-full [&_canvas]:!w-full"
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
          <Spotlight fill="rgba(45, 184, 138, 0.22)" className="z-[1]" />

          <div className="relative z-10 grid min-h-[min(78vh,760px)] grid-cols-1 items-stretch md:grid-cols-2">
            <div className="relative flex items-center p-6 md:p-10 lg:p-12">
              <div className="absolute inset-0 z-0" aria-hidden>
                <InteractiveSynapseNetworkLazy
                  {...NOMAD_SYNAPSE_THEME}
                  nodeCount={36}
                  connectionRadius={140}
                  trailOpacity={0.14}
                  className="h-full w-full opacity-80"
                  ariaLabel=""
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/75"
                  aria-hidden
                />
              </div>
              <div className="relative z-10 w-full">
                <HeroCopy />
              </div>
            </div>

            <div className="relative min-h-[min(45vh,400px)] md:min-h-[440px] lg:min-h-[520px]">
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(45,184,138,0.08),transparent_65%)]"
                aria-hidden
              />
              <div className="relative z-10 h-full min-h-[inherit] p-4 pt-0 md:p-6 md:pt-6 lg:p-8">
                <HeroVisual />
              </div>
              <div
                className="pointer-events-none absolute inset-4 z-20 rounded-sm ring-1 ring-inset ring-accent-border/30 md:inset-6 lg:inset-8"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-bg/70 to-transparent md:w-20"
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
              <Spotlight fill="rgba(45, 184, 138, 0.22)" className="z-[1]" />
              <div className="relative z-10 grid min-h-[min(78vh,760px)] grid-cols-1 items-stretch md:grid-cols-2">
                <div className="relative flex items-center p-6 md:p-10 lg:p-12">
                  <div className="absolute inset-0 z-0" aria-hidden>
                    <InteractiveSynapseNetworkLazy
                      {...NOMAD_SYNAPSE_THEME}
                      nodeCount={36}
                      connectionRadius={140}
                      trailOpacity={0.14}
                      className="h-full w-full opacity-80"
                      ariaLabel=""
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/75"
                      aria-hidden
                    />
                  </div>
                  <div className="relative z-10 w-full">
                    <HeroCopy />
                  </div>
                </div>
                <div className="relative min-h-[min(45vh,400px)] p-4 pt-0 md:min-h-[440px] md:p-6 md:pt-6 lg:min-h-[520px] lg:p-8">
                  <HeroVisualFallback
                    className="h-full min-h-[inherit]"
                    variant="operational"
                  />
                </div>
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
