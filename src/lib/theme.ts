/** NomadLabz multi-accent tokens — section-level color coding. */
export const industryAccents = {
  startups: {
    kicker: "text-accent",
    border: "border-accent-border",
    tag: "border-accent-border bg-accent-muted text-accent",
    node: "border-accent-border bg-accent-muted",
  },
  enterprises: {
    kicker: "text-info",
    border: "border-info-border",
    tag: "border-info-border bg-info-muted text-info",
    node: "border-info-border bg-info-muted",
  },
  "operations-logistics": {
    kicker: "text-amber",
    border: "border-amber-border",
    tag: "border-amber-border bg-amber-muted text-amber",
    node: "border-amber-border bg-amber-muted",
  },
  "professional-services": {
    kicker: "text-accent",
    border: "border-accent-border",
    tag: "border-accent-border bg-accent-muted text-accent",
    node: "border-accent-border bg-accent-muted",
  },
  "regulated-sensitive": {
    kicker: "text-teal",
    border: "border-teal-border",
    tag: "border-teal-border bg-teal-muted text-teal",
    node: "border-teal-border bg-teal-muted",
  },
} as const;

export type IndustrySlug = keyof typeof industryAccents;

export function getIndustryAccent(slug: string) {
  return industryAccents[slug as IndustrySlug] ?? industryAccents.startups;
}
