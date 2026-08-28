"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import KineticGrid from "@/components/ui/kinetic-grid";
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
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div className="container-page relative z-10 flex min-h-[min(72vh,560px)] items-center section-pad">
        <FadeIn className="w-full">
          <KineticGrid
            accent="nomad"
            className="min-h-[380px] w-full rounded-sm border border-border-subtle"
          >
            <div className="w-full bg-black/35 p-8 backdrop-blur-sm md:p-10">
              <div className="grid w-full gap-8 lg:grid-cols-2 lg:items-end lg:gap-12">
                <div className="w-full">
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
                </div>

                <ul
                  className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
                  aria-label="Capability areas"
                >
                  {capabilityTags.map((capability, index) => (
                    <motion.li
                      key={capability}
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.2 + index * 0.04,
                      }}
                    >
                      <span
                        className={cn(
                          "inline-flex w-full items-center justify-center rounded-sm border px-2.5 py-1.5 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em]",
                          CAPABILITY_ACCENTS[capability],
                        )}
                      >
                        {capability}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </KineticGrid>
        </FadeIn>
      </div>
    </section>
  );
}
