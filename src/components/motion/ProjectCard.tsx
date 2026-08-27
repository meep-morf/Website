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
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      <Link
        href={`/portfolio/${slug}`}
        className="group relative grid cursor-pointer gap-3 overflow-hidden py-8 transition-colors hover:bg-surface/30 md:grid-cols-[10rem_1fr_8rem] md:items-center md:gap-8 md:px-2"
      >
        <div
          className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-accent/8 to-transparent transition-transform duration-500 group-hover:translate-y-0"
          aria-hidden
        />
        <p className="relative mono-label !text-faint">{industry}</p>
        <div className="relative">
          <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">{summary}</p>
        </div>
        <p className="relative font-mono text-xs uppercase tracking-[0.14em] text-faint md:text-right">
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
