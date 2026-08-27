export type Service = {
  slug: string;
  title: string;
  summary: string;
  problems: string[];
  deliverables: string[];
  outcomes: string[];
  audience: string;
};

export const services: Service[] = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    summary:
      "Custom web and product engineering — from customer-facing platforms to internal systems — built for clarity, scale, and teams that own the code long-term.",
    problems: [
      "Legacy tools that slow teams down and hide operational truth",
      "Products that buckle under growth or changing requirements",
      "Fragmented experiences across devices, roles, and channels",
    ],
    deliverables: [
      "Web applications and progressive product experiences",
      "Admin and operations platforms your team can maintain",
      "Architecture, code quality, and delivery practices that reduce rework",
    ],
    outcomes: [
      "Shippable product surfaces your team can extend without vendor lock-in",
      "Readable codebase and delivery rhythm that survive the next hire",
      "Consistent UX across roles and devices without duplicate logic",
    ],
    audience: "Teams shipping products or modernizing core digital systems.",
  },
  {
    slug: "automation-integrations",
    title: "Automation & Integrations",
    summary:
      "Connected systems and reliable workflows that cut manual work and keep data consistent — so operations run on one version of the truth.",
    problems: [
      "Siloed platforms and duplicate data entry",
      "Fragile point-to-point integrations that break quietly",
      "Operational lag caused by manual handoffs between tools",
    ],
    deliverables: [
      "API design and third-party integrations",
      "Workflow automation and orchestration",
      "Data sync, monitoring, and failure handling you can trust",
    ],
    outcomes: [
      "Fewer manual steps between systems that should already talk",
      "Observable integrations with clear failure signals",
      "One operational source of truth across departments",
    ],
    audience: "Organizations running multiple tools that must act as one system.",
  },
  {
    slug: "mobile-experiences",
    title: "Mobile Experiences",
    summary:
      "Native and cross-platform mobile applications with practical UX, secure authentication, and backend integration that field teams actually adopt.",
    problems: [
      "Desktop-only processes that fail in the field",
      "Inconsistent mobile experiences across platforms",
      "Apps that are expensive to maintain after launch",
    ],
    deliverables: [
      "iOS and Android applications",
      "Cross-platform product builds where it makes sense",
      "Mobile-first operational tools tied to real workflows",
    ],
    outcomes: [
      "Field-ready apps tied to real workflows, not generic templates",
      "Shared backend logic so mobile and web stay aligned",
      "Maintainable release path your team can own",
    ],
    audience: "Businesses that need field, customer, or workforce access on mobile.",
  },
  {
    slug: "cloud-delivery",
    title: "Cloud & Delivery",
    summary:
      "Reliable infrastructure, CI/CD, and deployment practices so releases stay safe, observable, and cost-aware as velocity increases.",
    problems: [
      "Fragile releases and unclear ownership in production",
      "Infrastructure that does not scale cleanly or predictably",
      "Limited visibility into performance, cost, and failures",
    ],
    deliverables: [
      "Cloud architecture and environment design",
      "CI/CD pipelines and release discipline",
      "Monitoring, logging, and operational readiness",
    ],
    outcomes: [
      "Predictable releases with rollback paths your team trusts",
      "Infrastructure that scales without surprise cost spikes",
      "Production visibility before users report problems",
    ],
    audience: "Teams shipping continuously who need stable production footing.",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    summary:
      "Practical security engineering — assessments, hardening, secure design, and controls that protect software and operations without slowing delivery.",
    problems: [
      "Unknown exposure across applications and infrastructure",
      "Security bolted on after delivery, when fixes cost more",
      "Compliance pressure without a clear technical path forward",
    ],
    deliverables: [
      "Assessments and prioritized remediation roadmaps",
      "Secure architecture and application controls",
      "Hardening, monitoring guidance, and response readiness",
    ],
    outcomes: [
      "Prioritized risk view with engineering-ready next steps",
      "Security controls embedded in how systems are built and run",
      "Remediation sequence stakeholders can fund and track",
    ],
    audience: "Organizations that need software velocity without unmanaged risk.",
  },
  {
    slug: "strategy-consulting",
    title: "Strategy & Consulting",
    summary:
      "Technical and delivery guidance for architecture decisions, modernization sequencing, and build-vs-buy clarity before large engineering spend.",
    problems: [
      "Unclear technical direction under time pressure",
      "Initiatives that stall between stakeholders and engineering",
      "Architecture choices that create expensive future debt",
    ],
    deliverables: [
      "Discovery and roadmap sessions with actionable output",
      "Architecture and stack recommendations grounded in constraints",
      "Delivery planning with risk and dependency visibility",
    ],
    outcomes: [
      "Clear build sequence before major engineering spend",
      "Shared technical direction across stakeholders and engineering",
      "Documented trade-offs so future decisions are faster",
    ],
    audience: "Leaders who need grounded decisions before large engineering spend.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
