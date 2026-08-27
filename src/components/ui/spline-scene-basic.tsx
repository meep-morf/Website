"use client";

import { useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ShinyArrowButton } from "@/components/ui/ShinyArrowButton";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { ctaPrimary, ctaSecondary, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function SplineSceneBasic() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative border-b border-border-subtle section-pad"
      aria-label="NomadLabz hero"
    >
      <div className="container-page">
        <Card
          className={cn(
            "group relative overflow-hidden border-border-subtle bg-bg shadow-none",
            "min-h-[min(78vh,760px)]",
          )}
        >
          <Spotlight fill="rgba(45, 184, 138, 0.22)" />

          <div className="relative z-10 grid min-h-[min(78vh,760px)] grid-cols-1 items-center gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10 lg:p-12">
            <div
              className="rounded-sm border border-border-subtle bg-bg/90 p-6 backdrop-blur-md md:p-8 lg:p-10"
            >
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
                    NomadLabz builds the invisible operating layer — products, integrations,
                    cloud delivery, and cybersecurity — so teams move faster without leaving
                    risk unmanaged.
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

            <div className="relative min-h-[280px] md:min-h-[420px] lg:min-h-[480px]">
              {reduceMotion ? (
                <div
                  className="hero-scan-fallback h-full min-h-[280px] rounded-sm border border-border-subtle md:min-h-[420px]"
                  aria-hidden="true"
                />
              ) : (
                <SplineScene
                  scene={SPLINE_SCENE_URL}
                  className="h-full min-h-[280px] md:min-h-[420px]"
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
