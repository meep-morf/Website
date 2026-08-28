"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ShinyArrowButton } from "@/components/ui/ShinyArrowButton";
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
  "relative min-h-[min(52vh,560px)] md:min-h-[480px] lg:min-h-[560px]";

function HeroCopy() {
  return (
    <StaggerReveal>
      <StaggerItem>
        <p className="mono-label mb-6">{siteConfig.name}</p>
      </StaggerItem>
      <StaggerItem>
        <h1 className="display-heading max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          {siteConfig.headline}
        </h1>
      </StaggerItem>
      <StaggerItem>
        <p className="mt-6 max-w-xl text-base text-muted md:text-lg">
          NomadLabz engineers the invisible operating layer — product surfaces,
          integrations, cloud delivery, and security controls — so teams ship with
          confidence and operate without unmanaged risk.
        </p>
      </StaggerItem>
      <StaggerItem>
        <div className="mt-10 flex flex-wrap items-center gap-3">
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
      className="group relative min-h-[min(92vh,920px)] overflow-hidden border-b border-border-subtle"
      aria-label="NomadLabz hero"
    >
      <div className="absolute inset-0 opacity-[0.15]" aria-hidden>
        <InteractiveSynapseNetworkLazy
          {...NOMAD_SYNAPSE_THEME}
          nodeCount={32}
          connectionRadius={130}
          trailOpacity={0.12}
          className="h-full w-full"
          ariaLabel=""
        />
      </div>

      <Spotlight fill="rgba(45, 184, 138, 0.16)" className="z-[1]" />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/75"
        aria-hidden
      />

      <div className="container-page relative z-10 grid min-h-[min(92vh,920px)] grid-cols-1 items-center gap-8 pb-28 pt-16 md:gap-10 md:pb-36 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
        <div className="relative z-10 flex flex-col justify-center">
          <HeroCopy />
        </div>

        <div className={cn(ROBOT_COLUMN_CLASS, "relative z-10")}>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(45,184,138,0.14),transparent_72%)]"
            aria-hidden
          />
          <div className="relative h-full min-h-[inherit] w-full">{visual}</div>
        </div>
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
