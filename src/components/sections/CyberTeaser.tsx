"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";

const pillars = [
  {
    title: "Secure by design",
    text: "Controls belong in architecture and delivery — not as a last-mile checklist.",
  },
  {
    title: "Assess & remediate",
    text: "Scoped assessments with prioritized findings engineers can actually action.",
  },
  {
    title: "Operational resilience",
    text: "Hardening, monitoring guidance, and response readiness for systems that must stay up.",
  },
];

export function CyberTeaser() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad relative overflow-hidden border-b border-teal-border/30 bg-bg-elevated/60">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(61,139,122,0.06),transparent)]"
        aria-hidden
      />
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <FadeIn>
            <SectionHeader
              kicker="Cybersecurity"
              kickerClassName="!text-teal"
              title="Security that protects the layer business depends on"
              description="NomadLabz treats cybersecurity as part of how software is designed, shipped, and operated — assessments, hardening, and secure engineering without theatrics."
            />
            <div className="mt-8">
              <ButtonLink href="/cybersecurity">Review Cybersecurity Services</ButtonLink>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ul className="space-y-6 border-l border-teal-border pl-6">
              {pillars.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{item.text}</p>
                </motion.li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
