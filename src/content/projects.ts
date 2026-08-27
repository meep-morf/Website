export type ProjectStatus = "live" | "confidential";

export type CapabilityArea =
  | "Enterprise Business Applications"
  | "Web Platforms"
  | "Mobile Applications"
  | "AI and Intelligent Automation"
  | "APIs and System Integrations"
  | "Cloud and DevOps"
  | "Cybersecurity";

export type Project = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  context: string;
  challenge: string;
  role: string;
  solution: string;
  coreCapabilities: string[];
  outcome: string;
  capabilities: CapabilityArea[];
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
    context:
      "A local insurance and vehicle registration agency serving English- and Spanish-speaking clients needed a credible digital front door — not a template site, but a structured presence that matched how they actually sell and book work.",
    challenge:
      "The agency needed a professional digital presence that clearly presented services, built trust, and supported online appointment booking across devices — including Spanish-speaking clients.",
    role:
      "NomadLabz owned product structure, UX, bilingual content architecture, responsive implementation, and production deployment.",
    solution:
      "We designed and built a responsive multi-page site with clear service hierarchy, appointment flows, reviews presentation, and bilingual EN/ES support oriented around conversion and clarity.",
    coreCapabilities: [
      "Responsive web platform",
      "Bilingual UX and content structure",
      "Appointment-oriented conversion flows",
      "Production deployment and handoff",
    ],
    outcome:
      "A live public site that presents services clearly, supports bilingual engagement, and gives clients a credible path to book appointments online.",
    capabilities: ["Web Platforms"],
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
    context:
      "SEMC Innovations needed a public web surface that communicated product direction and company positioning without the overhead of a heavy CMS or agency-style rebuild cycle.",
    challenge:
      "The business needed a credible web presence that communicated what they offer without heavy CMS overhead.",
    role:
      "NomadLabz delivered information architecture, visual design direction, front-end engineering, and production hosting setup.",
    solution:
      "We delivered a focused marketing site with clear information hierarchy, brand-forward layout, and a maintainable production footprint.",
    coreCapabilities: [
      "Marketing web platform",
      "Brand-forward layout system",
      "Lightweight content structure",
      "Production deployment",
    ],
    outcome:
      "A live site at semc-innovations.com that presents the company with clear positioning and a maintainable production footprint.",
    capabilities: ["Web Platforms"],
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
    context:
      "Astra Urban is a design-forward concept exploring how spatial product narratives can live on the web — performance and polish mattered as much as visual ambition.",
    challenge:
      "Translate a design-forward concept into a performant web surface that feels intentional on both desktop and mobile.",
    role:
      "NomadLabz engineered the full front-end experience — layout, motion, responsive behavior, and deployment.",
    solution:
      "We built a focused Next.js experience with strong visual hierarchy, intentional motion, and responsive layout — shipped as a live deployment.",
    coreCapabilities: [
      "Next.js product surface",
      "Motion and visual hierarchy",
      "Responsive layout engineering",
      "Performance-minded delivery",
    ],
    outcome:
      "Public demo at astra-urban.vercel.app — a performant concept surface with intentional motion and responsive layout.",
    capabilities: ["Web Platforms"],
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
    context:
      "An exploratory landing concept needed to feel immersive while staying fast, readable, and shippable — not a heavyweight 3D spectacle.",
    challenge:
      "Create an immersive but lightweight page that stays fast and readable — not a heavyweight 3D spectacle.",
    role:
      "NomadLabz designed and built the landing experience end to end, including typography, layout, interaction, and deployment.",
    solution:
      "We engineered a restrained interactive landing with careful typography, layout, and performance-minded visuals.",
    coreCapabilities: [
      "Narrative landing design",
      "Restrained interaction layer",
      "Performance-minded visuals",
      "Production deployment",
    ],
    outcome:
      "Public demo available at moon-landing-iota.vercel.app.",
    capabilities: ["Web Platforms"],
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
    context:
      "An operations team ran fleet and inventory coordination across disconnected spreadsheets, phone calls, and ad hoc tools — visibility broke down as volume grew.",
    challenge:
      "Operations teams needed clearer visibility across fleet and inventory movements without stitching together disconnected spreadsheets and tools.",
    role:
      "NomadLabz designed the operational data model, built workflow interfaces, integrated upstream systems, and treated security and reliability as product requirements.",
    solution:
      "We built operational interfaces and supporting system logic oriented around tracking, status, and practical daily use — with integration touchpoints so data did not live in silos.",
    coreCapabilities: [
      "Enterprise operations application",
      "Fleet and inventory workflow design",
      "System integrations and data sync",
      "Role-aware operational views",
    ],
    outcome:
      "An internal operations capability used to coordinate fleet and stock workflows. Live public URL not published.",
    capabilities: [
      "Enterprise Business Applications",
      "APIs and System Integrations",
    ],
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
    context:
      "Field and dispatch stakeholders needed location context inside real operational workflows — not a standalone map demo disconnected from daily work.",
    challenge:
      "Field and operations stakeholders needed reliable location context tied to real workflows — not a generic map demo.",
    role:
      "NomadLabz built tracking-aware interfaces across mobile and web, engineered data flow from location services, and implemented access control for operational views.",
    solution:
      "We engineered tracking-aware interfaces and supporting application logic with attention to data flow, access control, and usable operational views on mobile and desktop.",
    coreCapabilities: [
      "Mobile and web tracking interfaces",
      "Location-aware data pipelines",
      "Field-ready operational UX",
      "Access-controlled operational views",
    ],
    outcome:
      "Deployed as a client operational capability. Public URL withheld by design.",
    capabilities: ["Mobile Applications"],
    status: "confidential",
    technologies: ["Tracking", "Mobile/web", "Data pipelines"],
  },
  {
    slug: "enterprise-portals",
    title: "Enterprise Portals",
    industry: "Enterprise",
    summary:
      "Secure portal experiences for internal and partner workflows where role clarity and access control matter.",
    context:
      "Organizations needed structured digital portals connecting employees and partners to the right information and actions — without exposing sensitive data by default.",
    challenge:
      "Organizations needed structured digital portals that connect people to the right information and actions without exposing everything by default.",
    role:
      "NomadLabz delivered portal UX, role-aware navigation, integration touchpoints, and security-minded application architecture.",
    solution:
      "We delivered portal interfaces with role-aware navigation, integration touchpoints, and security-minded application structure designed for long-term internal use.",
    coreCapabilities: [
      "Enterprise portal applications",
      "Role-based access and navigation",
      "Partner and internal workflow surfaces",
      "Integration-ready architecture",
    ],
    outcome:
      "Confidential enterprise deployments. Client identities and metrics are not disclosed.",
    capabilities: ["Enterprise Business Applications"],
    status: "confidential",
    technologies: ["Portals", "Auth", "Integrations"],
  },
  {
    slug: "confidential-intelligent-ops",
    title: "Confidential Intelligent Operations",
    industry: "Enterprise",
    summary:
      "Workflow automation and decision-support tooling that reduces manual operational handoffs — delivered under confidentiality.",
    context:
      "An operations-heavy organization needed to cut repetitive coordination work without replacing human judgment — automation had to fit existing teams and approval paths.",
    challenge:
      "Manual handoffs between systems and people created lag, inconsistent data, and operational blind spots that scaled poorly as volume increased.",
    role:
      "NomadLabz mapped workflow constraints, designed automation boundaries, built orchestration logic, and delivered operator-facing controls with clear audit paths.",
    solution:
      "We implemented targeted workflow automation, rules-based routing, and lightweight decision-support surfaces tied to live operational data — scoped to what teams would actually adopt.",
    coreCapabilities: [
      "Workflow automation and orchestration",
      "Rules-based routing and alerts",
      "Operator-facing control surfaces",
      "Integration with existing operational systems",
    ],
    outcome:
      "Delivered under confidentiality. Operational workflows run with fewer manual steps; client identity and performance figures are not disclosed.",
    capabilities: ["AI and Intelligent Automation"],
    status: "confidential",
    featured: true,
    technologies: ["Automation", "Workflow orchestration", "Integrations"],
  },
  {
    slug: "confidential-cloud-delivery",
    title: "Confidential Cloud & Delivery",
    industry: "Enterprise",
    summary:
      "Cloud environment design, CI/CD discipline, and production readiness for a software team shipping continuously.",
    context:
      "A product team needed predictable releases and observable production footing — infrastructure had grown organically and releases were stressful.",
    challenge:
      "Fragile releases, unclear production ownership, and limited visibility into performance and failures slowed delivery confidence.",
    role:
      "NomadLabz designed cloud environments, implemented CI/CD pipelines, and established monitoring and operational readiness practices.",
    solution:
      "We delivered cloud architecture, automated release pipelines with rollback paths, and baseline monitoring so the team could ship with clearer production signals.",
    coreCapabilities: [
      "Cloud environment design",
      "CI/CD pipeline implementation",
      "Release discipline and rollback paths",
      "Monitoring and operational readiness",
    ],
    outcome:
      "Delivered under confidentiality. Production footing improved with more predictable releases; client identity and infrastructure details are not disclosed.",
    capabilities: ["Cloud and DevOps"],
    status: "confidential",
    featured: true,
    technologies: ["Cloud", "CI/CD", "Monitoring"],
  },
  {
    slug: "confidential-cyber-assessment",
    title: "Confidential Cyber Assessment",
    industry: "Cybersecurity",
    summary:
      "A private security assessment engagement covering exposure analysis and practical remediation guidance.",
    context:
      "An organization needed a clear technical risk view before committing remediation budget — without publicity, scorecard theater, or unverifiable claims.",
    challenge:
      "The organization needed a clear view of technical risk without publicity, panic theater, or unverifiable scorecards.",
    role:
      "NomadLabz scoped the assessment, analyzed exposure across applications and infrastructure, and delivered prioritized remediation guidance in engineering-ready language.",
    solution:
      "We conducted a scoped assessment with prioritized findings, remediation sequencing, and engineering-relevant recommendations tied to how systems are actually built and operated.",
    coreCapabilities: [
      "Security exposure analysis",
      "Risk prioritization",
      "Remediation sequencing",
      "Engineering-ready hardening guidance",
    ],
    outcome:
      "Delivered under confidentiality. Details remain private by agreement.",
    capabilities: ["Cybersecurity"],
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

export function getProjectsByCapability(capability: CapabilityArea) {
  return projects.filter((p) => p.capabilities.includes(capability));
}
