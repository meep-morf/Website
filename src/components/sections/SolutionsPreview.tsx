"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { industries } from "@/content/industries";
import { MaskedReveal } from "@/components/motion/MaskedReveal";

export function SolutionsPreview() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-page">
        <FadeIn>
          <SectionHeader
            kicker="Solutions"
            title="Built around how industries actually operate"
            description="Same engineering discipline — different constraints. We adapt the operating layer to your context."
          />
        </FadeIn>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <MaskedReveal key={industry.slug} delay={index * 0.05}>
              <motion.article
                className="group cursor-default border-t border-accent-border pt-5"
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {industry.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{industry.summary}</p>
              </motion.article>
            </MaskedReveal>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/solutions" variant="secondary">
            Explore Industry Solutions
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
