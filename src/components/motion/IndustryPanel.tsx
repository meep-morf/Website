"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Industry } from "@/content/industries";
import { getIndustryAccent } from "@/lib/theme";
import { DeliverableList } from "@/components/motion/DeliverableList";

type IndustryPanelProps = {
  industry: Industry;
  index: number;
};

export function IndustryPanel({ industry, index }: IndustryPanelProps) {
  const reduce = useReducedMotion();
  const accent = getIndustryAccent(industry.slug);

  const article = (
    <article
      id={industry.slug}
      className={`scroll-mt-28 grid gap-8 rounded-sm border-t pt-12 lg:grid-cols-[0.85fr_1.15fr] ${accent.border} ${accent.tint} px-4 py-2 transition-colors hover:bg-accent-muted/20 md:px-6`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs text-faint">
            {String(index + 1).padStart(2, "0")}
          </p>
          <span
            className={`inline-flex border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] ${accent.tag}`}
          >
            {industry.slug.replace(/-/g, " ")}
          </span>
        </div>
        <h2 className="mt-3 display-heading text-3xl md:text-4xl">{industry.title}</h2>
        <p className="mt-4 text-muted">{industry.summary}</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className={`mono-label mb-3 !text-faint`}>Common challenges</h3>
          <DeliverableList
            items={industry.challenges}
            index={index}
            accentBorder="border-border"
          />
        </div>
        <div>
          <h3 className={`mono-label mb-3 ${accent.kicker}`}>How NomadLabz helps</h3>
          <DeliverableList items={industry.approach} index={index} accentBorder={accent.border} />
        </div>
        <div>
          <h3 className="mono-label mb-3 !text-info">Outcomes</h3>
          <DeliverableList
            items={industry.outcomes}
            index={index}
            accentBorder="border-info-border"
          />
        </div>
      </div>
    </article>
  );

  if (reduce) return article;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      {article}
    </motion.div>
  );
}
