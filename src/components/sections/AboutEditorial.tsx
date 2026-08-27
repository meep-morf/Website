"use client";

import { motion, useReducedMotion } from "motion/react";

const approachSteps = [
  {
    label: "01",
    title: "Listen first",
    text: "We start with how the business runs — systems, constraints, and risk — not a slide deck of assumptions.",
  },
  {
    label: "02",
    title: "Design the layer",
    text: "Interfaces, data paths, integrations, and controls are mapped before engineering expands.",
  },
  {
    label: "03",
    title: "Ship in sequence",
    text: "Incremental delivery with clear checkpoints — software your team can operate after launch.",
  },
  {
    label: "04",
    title: "Stay accountable",
    text: "Security and reliability remain active responsibilities, not one-time deliverables.",
  },
];

/** Editorial split layout with animated timeline lines — About page signature (no globe). */
export function AboutEditorial() {
  const reduce = useReducedMotion();

  return (
    <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div className="relative">
        <div
          className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px bg-border-subtle lg:block"
          aria-hidden
        />
        {!reduce ? (
          <motion.div
            className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent/60 via-info/40 to-amber/30 lg:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        ) : null}
        <p className="mono-label mb-4">Our approach</p>
        <h2 className="display-heading text-3xl md:text-4xl">
          How we work with teams
        </h2>
        <p className="mt-5 text-muted">
          A practical delivery rhythm — scoped honestly, built for operations, and
          strengthened over time. No duplicate globe theatrics; just a clear sequence
          you can hold us to.
        </p>
      </div>

      <ol className="relative space-y-8">
        {!reduce ? (
          <motion.div
            className="pointer-events-none absolute bottom-4 left-[1.15rem] top-4 w-px origin-top bg-gradient-to-b from-accent/50 via-info/30 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        ) : (
          <div
            className="pointer-events-none absolute bottom-4 left-[1.15rem] top-4 w-px bg-border-subtle"
            aria-hidden
          />
        )}
        {approachSteps.map((step, index) =>
          reduce ? (
            <li key={step.label} className="relative grid grid-cols-[2.5rem_1fr] gap-4">
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-accent-border bg-bg-elevated font-mono text-xs text-accent">
                {step.label}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </div>
            </li>
          ) : (
            <motion.li
              key={step.label}
              className="relative grid grid-cols-[2.5rem_1fr] gap-4"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-accent-border bg-bg-elevated font-mono text-xs text-accent"
                whileInView={{ boxShadow: "0 0 0 4px rgba(45, 184, 138, 0.08)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 + 0.2 }}
              >
                {step.label}
              </motion.span>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </div>
            </motion.li>
          ),
        )}
      </ol>
    </div>
  );
}
