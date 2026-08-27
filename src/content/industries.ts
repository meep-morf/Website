export type Industry = {
  slug: string;
  title: string;
  summary: string;
  challenges: string[];
  approach: string[];
};

export const industries: Industry[] = [
  {
    slug: "startups",
    title: "Startups",
    summary:
      "Lean product foundations that launch quickly and scale without rewriting the operating core every funding round.",
    challenges: [
      "Pressure to ship before product–market fit is proven",
      "Limited engineering bandwidth for everything at once",
      "Architecture that must survive growth, not just demos",
    ],
    approach: [
      "Focused MVP scopes with durable foundations",
      "Cloud-native delivery and sensible automation",
      "Security basics from day one — not after the next raise",
    ],
  },
  {
    slug: "enterprises",
    title: "Enterprises",
    summary:
      "Systems that integrate with existing estates, respect governance, and modernize without operational shock.",
    challenges: [
      "Legacy constraints and complex stakeholder alignment",
      "Integration across departments, vendors, and data stores",
      "Security and compliance requirements with real teeth",
    ],
    approach: [
      "Phased modernization with clear system boundaries",
      "API-led integration and operational visibility",
      "Security and delivery controls aligned to actual risk",
    ],
  },
  {
    slug: "operations-logistics",
    title: "Operations & Logistics",
    summary:
      "Software for tracking, coordination, and field visibility — where reliability is a business requirement, not a nice-to-have.",
    challenges: [
      "Fragmented tracking and status visibility across teams",
      "Manual coordination that does not scale with volume",
      "Mobile and real-time operational demands in the field",
    ],
    approach: [
      "Operational platforms and tracking experiences built for daily use",
      "Integrations across inventory, fleet, and customer systems",
      "Hardened access, audit-minded design, and dependable uptime",
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    summary:
      "Client-facing sites and booking systems that build trust and convert interest into scheduled work.",
    challenges: [
      "Outdated presence that undercuts credibility",
      "Friction in inquiries, appointments, and follow-up",
      "Need for bilingual or multi-service clarity",
    ],
    approach: [
      "Clear service architecture and conversion paths",
      "Appointment and inquiry workflows that reduce back-and-forth",
      "Accessible, performant marketing surfaces",
    ],
  },
  {
    slug: "regulated-sensitive",
    title: "Regulated & Sensitive Environments",
    summary:
      "Software and assessments where confidentiality, access control, and careful delivery matter as much as features.",
    challenges: [
      "Sensitive data and limited public disclosure",
      "Need for controlled environments and least privilege",
      "Security assurance without marketing theater",
    ],
    approach: [
      "Secure design and least-privilege patterns from the start",
      "Assessment and remediation under NDA when required",
      "Honest scoping — no invented compliance claims",
    ],
  },
];
