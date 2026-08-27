"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Value = { title: string; text: string };

export function ValuesGrid({ values }: { values: readonly Value[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      {values.map((value, index) => (
        <FadeIn key={value.title} delay={index * 0.04}>
          <motion.article
            className="border-t border-border-subtle pt-5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <h3 className="text-xl font-semibold">{value.title}</h3>
            <p className="mt-3 text-sm text-muted">{value.text}</p>
          </motion.article>
        </FadeIn>
      ))}
    </div>
  );
}

export function AboutHeroContent({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <SectionHeader as="h1" kicker={kicker} title={title} description={description} />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeader as="h1" kicker={kicker} title={title} description={description} />
    </motion.div>
  );
}
