"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HeroFuturisticLazy } from "@/components/ui/hero-futuristic-lazy";
import { projects, type CapabilityArea } from "@/content/projects";
import { cn } from "@/lib/utils";

const CAPABILITY_ACCENTS: Record<CapabilityArea, string> = {
  "Enterprise Business Applications":
    "border-info-border/50 bg-info-muted text-info",
  "Web Platforms": "border-accent-border/50 bg-accent-muted text-accent",
  "Mobile Applications": "border-amber-border/50 bg-amber-muted text-amber",
  "AI and Intelligent Automation":
    "border-info-border/50 bg-info-muted text-info",
  "APIs and System Integrations":
    "border-accent-border/40 bg-surface text-text",
  "Cloud and DevOps": "border-info-border/40 bg-bg-elevated text-info",
  Cybersecurity: "border-danger-border/50 bg-danger-muted text-danger",
};

const capabilityTags = [
  ...new Set(projects.flatMap((project) => project.capabilities)),
] as CapabilityArea[];

export function PortfolioHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[min(72vh,560px)] overflow-hidden border-b border-border-subtle section-tint-info">
      <div className="absolute inset-0 z-0" aria-hidden>
        {reduceMotion ? (
          <div className="hero-scan-fallback h-full w-full" />
        ) : (
          <HeroFuturisticLazy
            showOverlay={false}
            heightClassName="h-full min-h-[min(72vh,560px)]"
            intensity={0.42}
            className="opacity-100"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/25 via-bg/45 to-bg/80" />
      </div>

      <div className="container-page relative z-10 flex min-h-[min(72vh,560px)] items-center section-pad">
        <FadeIn>
          <div className="max-w-3xl rounded-sm border border-border-subtle bg-bg/90 p-8 backdrop-blur-md md:p-10">
            <SectionHeader
              as="h1"
              kicker="Work"
              title="Selected projects"
              description="Verified live URLs where we can share them. Confidential engagements are described without client names, fabricated metrics, or unverifiable claims."
            />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <motion.p
                className="mono-label !text-accent"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {projects.length} projects — public and confidential
              </motion.p>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Capability areas">
              {capabilityTags.map((capability, index) => (
                <motion.li
                  key={capability}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 + index * 0.04 }}
                >
                  <span
                    className={cn(
                      "inline-block rounded-sm border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em]",
                      CAPABILITY_ACCENTS[capability],
                    )}
                  >
                    {capability}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
