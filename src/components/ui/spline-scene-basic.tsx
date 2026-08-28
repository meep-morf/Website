"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ShinyArrowButton } from "@/components/ui/ShinyArrowButton";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { NOMAD_SYNAPSE_THEME } from "@/components/ui/interactive-synapse-network";
import { InteractiveSynapseNetworkLazy } from "@/components/ui/interactive-synapse-network-lazy";
import { SplineScene } from "@/components/ui/spline-scene";
import { HeroVisualFallback } from "@/components/ui/HeroVisualFallback";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { ctaPrimary, ctaSecondary, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const ROBOT_COLUMN_CLASS =
  "relative min-h-[min(52vh,560px)] md:min-h-[520px] lg:min-h-[580px]";

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
        className="h-full w-full min-h-[inherit]"
        variant="operational"
      />
    );
  }

  return (
    <SplineScene
      scene={SPLINE_SCENE_URL}
      className="h-full w-full min-h-[inherit]"
      fallbackVariant="operational"
    />
  );
}

function HomeHeroLayout({ visual }: { visual: ReactNode }) {
  return (
    <section
      className="relative border-b border-border-subtle section-pad section-tint-accent"
      aria-label="NomadLabz hero"
    >
      <div className="container-page">
        <Card
          className={cn(
            "group relative overflow-hidden border-border-subtle bg-bg shadow-none",
            "min-h-[min(82vh,800px)]",
          )}
        >
          <Spotlight fill="rgba(45, 184, 138, 0.22)" className="z-[1]" />

          <div className="relative z-10 grid min-h-[min(82vh,800px)] grid-cols-1 items-stretch lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
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

            <div className={ROBOT_COLUMN_CLASS}>
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_65%_at_55%_50%,rgba(45,184,138,0.12),transparent_70%)]"
                aria-hidden
              />
              <div className="relative z-10 h-full min-h-[inherit] p-3 md:p-5 lg:p-6">
                {visual}
              </div>
              <div
                className="pointer-events-none absolute inset-3 z-20 rounded-sm ring-1 ring-inset ring-accent-border/25 md:inset-5 lg:inset-6"
                aria-hidden
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function SplineSceneBasicInner() {
  return <HomeHeroLayout visual={<HeroVisual />} />;
}

export function SplineSceneBasic() {
  return (
    <ErrorBoundary
      fallback={
        <HomeHeroLayout
          visual={
            <HeroVisualFallback
              className="h-full w-full min-h-[inherit]"
              variant="operational"
            />
          }
        />
      }
    >
      <SplineSceneBasicInner />
    </ErrorBoundary>
  );
}
