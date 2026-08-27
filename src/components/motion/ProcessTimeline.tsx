"use client";

import { motion, useReducedMotion } from "motion/react";

type Step = {
  step: string;
  title: string;
  description: string;
};

type ProcessTimelineProps = {
  steps: readonly Step[];
  className?: string;
};

export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  const reduce = useReducedMotion();

  return (
    <ol className={className ?? "mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"}>
      {steps.map((item, index) => (
        <li key={item.step} className="relative">
          {index < steps.length - 1 && (
            <div
              className="pointer-events-none absolute top-5 hidden h-px lg:block"
              style={{ left: "calc(50% + 1.5rem)", width: "calc(100% - 1.5rem)" }}
              aria-hidden
            >
              {reduce ? (
                <div className="h-full w-full bg-border-subtle" />
              ) : (
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-accent/60 via-accent/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              )}
            </div>
          )}
          <ProcessStepContent item={item} index={index} reduce={!!reduce} />
        </li>
      ))}
    </ol>
  );
}

function ProcessStepContent({
  item,
  index,
  reduce,
}: {
  item: Step;
  index: number;
  reduce: boolean;
}) {
  const content = (
    <>
      <p className="font-mono text-sm text-accent">{item.step}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
      <p className="mt-3 text-sm text-muted">{item.description}</p>
    </>
  );

  if (reduce) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  );
}

type ContactStepsTimelineProps = {
  steps: readonly { title: string; text: string }[];
};

export function ContactStepsTimeline({ steps }: ContactStepsTimelineProps) {
  const reduce = useReducedMotion();

  return (
    <ol className="relative space-y-5">
      <div
        className="absolute bottom-2 left-[0.95rem] top-2 w-px bg-border-subtle"
        aria-hidden
      />
      {steps.map((step, index) => (
        <li key={step.title} className="relative grid grid-cols-[2rem_1fr] gap-3">
          {reduce ? (
            <>
              <span className="relative z-10 font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-text">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </div>
            </>
          ) : (
            <motion.div
              className="contents"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <span className="relative z-10 font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-text">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </div>
            </motion.div>
          )}
        </li>
      ))}
    </ol>
  );
}

type RiskTimelineProps = {
  items: readonly { title: string; body: string }[];
};

export function RiskTimeline({ items }: RiskTimelineProps) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-3 top-0 w-px bg-border-subtle" aria-hidden />
      <div className="space-y-10">
        {items.map((item, index) => (
          <article key={item.title} className="relative pl-10">
            <span
              className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent-border bg-bg-elevated font-mono text-[0.65rem] text-accent"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {reduce ? (
              <>
                <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-3 text-muted">{item.body}</p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-3 text-muted">{item.body}</p>
              </motion.div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
