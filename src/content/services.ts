export type Service = {
  slug: string;
  title: string;
  summary: string;
  problems: string[];
  deliverables: string[];
  audience: string;
};

export const services: Service[] = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    summary:
      "Custom web and product engineering — from customer-facing platforms to internal systems — built for clarity, scale, and long-term ownership.",
    problems: [
      "Legacy tools that slow teams down",
      "Products that cannot grow with demand",
      "Fragmented experiences across devices and roles",
    ],
    deliverables: [
      "Web applications and progressive experiences",
      "Admin and operations platforms",
      "Architecture, code quality, and maintainable delivery",
    ],
    audience: "Teams shipping products or modernizing core digital systems.",
  },
  {
    slug: "automation-integrations",
    title: "Automation & Integrations",
    summary:
      "Connected systems and intelligent workflows that reduce manual work and keep data consistent across tools.",
    problems: [
      "Siloed platforms and duplicate entry",
      "Fragile point-to-point integrations",
      "Operational lag caused by handoffs",
    ],
    deliverables: [
      "API design and third-party integrations",
      "Workflow automation and orchestration",
      "Data sync, monitoring, and error handling",
    ],
    audience: "Organizations running multiple tools that must act as one system.",
  },
  {
    slug: "mobile-experiences",
    title: "Mobile Experiences",
    summary:
      "Native and cross-platform mobile applications with practical UX, secure auth, and reliable backend integration.",
    problems: [
      "Desktop-only processes that fail in the field",
      "Inconsistent mobile experiences",
      "Apps that are hard to maintain across platforms",
    ],
    deliverables: [
      "iOS and Android applications",
      "Cross-platform product builds",
      "Mobile-first operational tools",
    ],
    audience: "Businesses that need field, customer, or workforce access on mobile.",
  },
  {
    slug: "cloud-delivery",
    title: "Cloud & Delivery",
    summary:
      "Reliable infrastructure, CI/CD, and deployment practices so releases stay safe, observable, and cost-aware.",
    problems: [
      "Fragile releases and unclear ownership",
      "Infrastructure that does not scale cleanly",
      "Limited visibility into performance and failures",
    ],
    deliverables: [
      "Cloud architecture and environments",
      "CI/CD pipelines and release discipline",
      "Monitoring, logging, and operational readiness",
    ],
    audience: "Teams shipping continuously who need stable production footing.",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    summary:
      "Practical security engineering — assessments, hardening, secure design, and controls that protect software and operations.",
    problems: [
      "Unknown exposure across apps and infrastructure",
      "Security bolted on after delivery",
      "Compliance pressure without a clear technical path",
    ],
    deliverables: [
      "Assessments and remediation roadmaps",
      "Secure architecture and application controls",
      "Hardening, monitoring guidance, and response readiness",
    ],
    audience: "Organizations that need software velocity without unmanaged risk.",
  },
  {
    slug: "strategy-consulting",
    title: "Strategy & Consulting",
    summary:
      "Technical and delivery guidance for architecture decisions, modernization sequencing, and build-vs-buy clarity.",
    problems: [
      "Unclear technical direction under time pressure",
      "Initiatives that stall between stakeholders",
      "Architecture choices that create future debt",
    ],
    deliverables: [
      "Discovery and roadmap sessions",
      "Architecture and stack recommendations",
      "Delivery planning with risk visibility",
    ],
    audience: "Leaders who need grounded decisions before large engineering spend.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
