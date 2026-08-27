"use client";

import { motion, useReducedMotion } from "motion/react";

type DeliverableListProps = {
  items: string[];
  index: number;
  accentBorder?: string;
};

/** Staggered list reveal for service deliverables and similar bullet groups. */
export function DeliverableList({
  items,
  index,
  accentBorder = "border-accent-border",
}: DeliverableListProps) {
  const reduce = useReducedMotion();

  return (
    <ul className="space-y-2 text-sm text-muted">
      {items.map((item, itemIndex) =>
        reduce ? (
          <li key={item} className={`border-l ${accentBorder} pl-3`}>
            {item}
          </li>
        ) : (
          <motion.li
            key={item}
            className={`border-l ${accentBorder} pl-3`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.35,
              delay: index * 0.02 + itemIndex * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {item}
          </motion.li>
        ),
      )}
    </ul>
  );
}
