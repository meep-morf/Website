"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { DeliverableList } from "@/components/motion/DeliverableList";

type CapabilityRowProps = {
  href: string;
  index: number;
  title: string;
  summary: string;
  trailing?: string;
};

export function CapabilityRow({
  href,
  index,
  title,
  summary,
  trailing = "View",
}: CapabilityRowProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link
        href={href}
        className="group relative grid cursor-pointer gap-3 overflow-hidden py-7 transition-colors duration-200 hover:bg-accent-muted/20 md:grid-cols-[8rem_1fr_auto] md:items-center md:gap-8 md:px-2"
      >
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-accent/10 transition-all duration-300 group-hover:w-full"
          aria-hidden
        />
        <span className="relative font-mono text-xs text-faint transition-colors group-hover:text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative">
          <h3 className="text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent md:text-2xl">
            {title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-muted md:text-base">{summary}</p>
        </div>
        <div className="relative flex items-center gap-2 md:justify-end">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-accent">
            {trailing}
          </span>
          <span
            className="hidden min-h-9 min-w-9 items-center justify-center rounded-full border border-transparent text-accent opacity-0 transition-all duration-300 group-hover:border-accent-border group-hover:bg-accent/10 group-hover:opacity-100 max-md:hidden"
            aria-hidden
          >
            <ArrowRight size={18} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

type ServicePanelProps = {
  index: number;
  slug: string;
  title: string;
  summary: string;
  audience: string;
  problems: string[];
  deliverables: string[];
  outcomes?: string[];
  cyberLink?: boolean;
};

export function ServicePanel({
  index,
  slug,
  title,
  summary,
  audience,
  problems,
  deliverables,
  outcomes,
  cyberLink,
}: ServicePanelProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      id={slug}
      className="group scroll-mt-28 grid gap-8 border-t border-border-subtle pt-12 lg:grid-cols-[1fr_1.2fr]"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
    >
      <div className="relative">
        {!reduce ? (
          <motion.span
            className="pointer-events-none absolute -left-3 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent/60 to-transparent lg:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            aria-hidden
          />
        ) : null}
        <p className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</p>
        <h2 className="mt-3 display-heading text-3xl md:text-4xl transition-colors group-hover:text-accent">
          {title}
        </h2>
        <p className="mt-4 text-muted">{summary}</p>
        <p className="mt-6 text-sm text-faint">
          <span className="mono-label !normal-case !tracking-normal">For: </span>
          {audience}
        </p>
        {cyberLink ? (
          <p className="mt-5">
            <Link
              href="/cybersecurity"
              className="cursor-pointer text-sm font-medium text-teal transition-colors hover:text-accent"
            >
              Review the cybersecurity practice →
            </Link>
          </p>
        ) : null}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-sm border border-transparent p-1 transition-colors hover:border-border-subtle">
          <h3 className="mono-label mb-3 !text-faint">Problems we address</h3>
          <DeliverableList items={problems} index={index} accentBorder="border-border" />
        </div>
        <div className="rounded-sm border border-transparent p-1 transition-colors hover:border-accent-border/30">
          <h3 className="mono-label mb-3">What we deliver</h3>
          <DeliverableList items={deliverables} index={index} />
        </div>
        {outcomes?.length ? (
          <div className="rounded-sm border border-transparent p-1 transition-colors hover:border-info-border/30 sm:col-span-2 lg:col-span-1">
            <h3 className="mono-label mb-3 !text-info">Outcomes</h3>
            <DeliverableList items={outcomes} index={index} accentBorder="border-info-border" />
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
