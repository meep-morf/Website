"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ProjectStatus } from "@/content/projects";

type ProjectListItemProps = {
  slug: string;
  industry: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  index: number;
};

export function ProjectListItem({
  slug,
  industry,
  title,
  summary,
  status,
  index,
}: ProjectListItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: -12, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/portfolio/${slug}`}
        className="group relative grid cursor-pointer gap-3 overflow-hidden border-l-2 border-transparent py-8 transition-all duration-300 hover:border-accent hover:bg-accent-muted/30 hover:pl-3 md:grid-cols-[10rem_1fr_8rem] md:items-center md:gap-8 md:px-2 md:hover:translate-x-1"
      >
        <div
          className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-accent-glow/55 to-transparent transition-transform duration-500 group-hover:translate-y-0"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_24px_rgba(45,184,138,0.12)] transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <p className="relative mono-label !text-faint transition-colors group-hover:text-accent">
          {industry}
        </p>
        <div className="relative">
          <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">{summary}</p>
        </div>
        <p className="relative font-mono text-xs uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-accent md:text-right">
          {status === "live" ? "Live" : "Confidential"}
        </p>
      </Link>
    </motion.li>
  );
}

type FeaturedProjectCardProps = {
  slug: string;
  industry: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  index: number;
};

export function FeaturedProjectCard({
  slug,
  industry,
  title,
  summary,
  status,
  index,
}: FeaturedProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/portfolio/${slug}`}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden bg-bg p-7 transition-colors duration-200 hover:bg-surface md:p-9"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
          aria-hidden
        />
        <div className="flex items-center justify-between gap-3">
          <p className="mono-label !text-faint">{industry}</p>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
            {status === "live" ? "Live" : "Confidential"}
          </span>
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm text-muted md:text-base">{summary}</p>
        <span className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Read case study
        </span>
      </Link>
    </motion.div>
  );
}
