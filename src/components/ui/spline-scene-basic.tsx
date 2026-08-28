"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ShinyArrowButton } from "@/components/ui/ShinyArrowButton";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/spline-scene";
import { HeroVisualFallback } from "@/components/ui/HeroVisualFallback";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { ctaPrimary, ctaSecondary, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const HOME_FALLBACK_VARIANT = "gradient" as const;

const SPLINE_COLUMN_CLASS =
  "relative min-h-[min(44vh,420px)] md:min-h-[480px] lg:min-h-[500px]";

function HeroCopy() {
  return (
    <StaggerReveal>
      <StaggerItem>
        <p className="mono-label mb-6">{siteConfig.name}</p>
      </StaggerItem>
      <StaggerItem>
        <h1 className="display-heading max-w-2xl text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
          {siteConfig.headline}
        </h1>
      </StaggerItem>
      <StaggerItem>
        <p className="mt-5 max-w-lg text-base text-muted md:text-lg">
          {siteConfig.description}
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
  );
}

function HeroVisual() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <HeroVisualFallback
        className="h-full w-full min-h-[inherit]"
        variant={HOME_FALLBACK_VARIANT}
      />
    );
  }

  return (
    <SplineScene
      scene={SPLINE_SCENE_URL}
      className="h-full w-full min-h-[inherit]"
      fallbackVariant={HOME_FALLBACK_VARIANT}
    />
  );
}

function HomeHeroLayout({ visual }: { visual: ReactNode }) {
  return (
    <section
      className="border-b border-border-subtle py-14 md:py-16 lg:py-20"
      aria-label="NomadLabz hero"
    >
      <div className="container-page">
        <Card
          className={cn(
            "group relative w-full overflow-hidden border-border-subtle",
            "bg-black/[0.96] shadow-[0_0_0_1px_rgba(45,184,138,0.06)]",
            "min-h-[min(88vh,860px)] md:min-h-[500px] lg:min-h-[520px]",
          )}
        >
          <Spotlight fill="rgba(45, 184, 138, 0.16)" className="z-[1]" />

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-glow/8 via-transparent to-bg/70"
            aria-hidden
          />

          <div className="relative z-10 flex min-h-[inherit] flex-col lg:flex-row">
            <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-8 md:px-10 md:py-12 lg:px-12">
              <HeroCopy />
            </div>

            <div className={cn(SPLINE_COLUMN_CLASS, "flex-1 lg:min-w-0")}>
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(45,184,138,0.12),transparent_72%)]"
                aria-hidden
              />
              <div className="relative h-full min-h-[inherit] w-full">{visual}</div>
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
              variant={HOME_FALLBACK_VARIANT}
            />
          }
        />
      }
    >
      <SplineSceneBasicInner />
    </ErrorBoundary>
  );
}
