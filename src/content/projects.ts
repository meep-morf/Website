export type ProjectStatus = "live" | "confidential";

export type Project = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  status: ProjectStatus;
  url?: string;
  featured?: boolean;
  technologies?: string[];
};

/**
 * Portfolio integrity rules:
 * - External URLs only when verified reachable.
 * - No invented metrics, testimonials, or awards.
 * - Confidential work described without client identifiers.
 */
export const projects: Project[] = [
  {
    slug: "vyn-services",
    title: "VYN Insurance & Registration",
    industry: "Professional Services",
    summary:
      "A bilingual marketing and appointment site for a Los Angeles insurance and vehicle registration agency.",
    challenge:
      "The agency needed a professional digital presence that clearly presented services, built trust, and supported online appointment booking across devices — including Spanish-speaking clients.",
    approach:
      "We designed and built a responsive multi-page site with service architecture, appointment flows, reviews presentation, and bilingual EN/ES support oriented around conversion and clarity.",
    outcome:
      "A live public site that presents services cleanly and supports online engagement for insurance and registration clients.",
    status: "live",
    url: "https://www.vynservices.com/",
    featured: true,
    technologies: ["Web", "Responsive", "Bilingual UX"],
  },
  {
    slug: "semc-innovations",
    title: "SEMC Innovations",
    industry: "Technology",
    summary:
      "A product-facing company website for SEMC Innovations, presenting capabilities and positioning with a clean modern surface.",
    challenge:
      "The business needed a credible web presence that communicated what they offer without heavy CMS overhead.",
    approach:
      "We delivered a focused marketing site with clear information hierarchy, brand-forward layout, and production deployment.",
    outcome:
      "A live site at semc-innovations.com representing the company online.",
    status: "live",
    url: "https://www.semc-innovations.com/",
    featured: true,
    technologies: ["Web", "Brand site", "Deployment"],
  },
  {
    slug: "astra-urban",
    title: "Astra Urban",
    industry: "Product / Concept",
    summary:
      "An urban-concept web experience exploring spatial product storytelling in a polished, production-ready front end.",
    challenge:
      "Translate a design-forward concept into a performant web surface that feels intentional on both desktop and mobile.",
    approach:
      "We built a focused Next.js experience with strong visual hierarchy and careful motion — shipped as a live deployment.",
    outcome:
      "Public demo available at astra-urban.vercel.app.",
    status: "live",
    url: "https://astra-urban.vercel.app/",
    featured: true,
    technologies: ["Next.js", "Frontend", "Motion"],
  },
  {
    slug: "moon-landing",
    title: "Moon Landing Experience",
    industry: "Product / Concept",
    summary:
      "A narrative landing experience built as a polished web surface for exploratory product storytelling.",
    challenge:
      "Create an immersive but lightweight page that stays fast and readable — not a heavyweight 3D spectacle.",
    approach:
      "We engineered a restrained interactive landing with careful typography, layout, and performance-minded visuals.",
    outcome:
      "Public demo available at moon-landing-iota.vercel.app.",
    status: "live",
    url: "https://moon-landing-iota.vercel.app/",
    featured: false,
    technologies: ["Frontend", "Landing", "Motion"],
  },
  {
    slug: "fleetstock-operations",
    title: "Fleet & Stock Operations Platform",
    industry: "Operations & Logistics",
    summary:
      "Operational software for fleet and stock visibility — coordinating assets, status, and day-to-day logistics workflows.",
    challenge:
      "Operations teams needed clearer visibility across fleet and inventory movements without stitching together disconnected spreadsheets and tools.",
    approach:
      "We built operational interfaces and supporting system logic oriented around tracking, status, and practical daily use — with security and reliability treated as product requirements.",
    outcome:
      "An internal operations capability used to coordinate fleet and stock workflows. Live public URL not published.",
    status: "confidential",
    featured: true,
    technologies: ["Operations software", "Tracking", "Integrations"],
  },
  {
    slug: "gps-tracking-systems",
    title: "GPS Tracking Systems",
    industry: "Operations & Logistics",
    summary:
      "Tracking-oriented software experiences for location-aware operational visibility.",
    challenge:
      "Field and operations stakeholders needed reliable location context tied to real workflows — not a generic map demo.",
    approach:
      "We engineered tracking-aware interfaces and supporting application logic with attention to data flow, access control, and usable operational views.",
    outcome:
      "Deployed as a client operational capability. Public URL withheld by design.",
    status: "confidential",
    technologies: ["Tracking", "Mobile/web", "Data pipelines"],
  },
  {
    slug: "enterprise-portals",
    title: "Enterprise Portals",
    industry: "Enterprise",
    summary:
      "Secure portal experiences for internal and partner workflows where role clarity and access control matter.",
    challenge:
      "Organizations needed structured digital portals that connect people to the right information and actions without exposing everything by default.",
    approach:
      "We delivered portal interfaces with role-aware navigation, integration touchpoints, and security-minded application structure.",
    outcome:
      "Confidential enterprise deployments. Client identities and metrics are not disclosed.",
    status: "confidential",
    technologies: ["Portals", "Auth", "Integrations"],
  },
  {
    slug: "confidential-cyber-assessment",
    title: "Confidential Cyber Assessment",
    industry: "Cybersecurity",
    summary:
      "A private security assessment engagement covering exposure analysis and practical remediation guidance.",
    challenge:
      "The organization needed a clear view of technical risk without publicity, panic theater, or unverifiable scorecards.",
    approach:
      "We conducted a scoped assessment with prioritized findings, remediation sequencing, and engineering-relevant recommendations.",
    outcome:
      "Delivered under confidentiality. Details remain private by agreement.",
    status: "confidential",
    technologies: ["Assessment", "Hardening guidance", "Risk prioritization"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
