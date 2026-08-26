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
      "Lean product foundations that can launch quickly and scale without rewriting the operating core.",
    challenges: [
      "Pressure to ship before product–market fit is proven",
      "Limited engineering bandwidth",
      "Architecture that must survive growth",
    ],
    approach: [
      "Focused MVP scopes with durable foundations",
      "Cloud-native delivery and sensible automation",
      "Security basics from day one — not after funding",
    ],
  },
  {
    slug: "enterprises",
    title: "Enterprises",
    summary:
      "Systems that integrate with existing estates, respect governance, and modernize without operational shock.",
    challenges: [
      "Legacy constraints and complex stakeholders",
      "Integration across departments and vendors",
      "Security and compliance requirements",
    ],
    approach: [
      "Phased modernization with clear boundaries",
      "API-led integration and operational visibility",
      "Security and delivery controls aligned to risk",
    ],
  },
  {
    slug: "operations-logistics",
    title: "Operations & Logistics",
    summary:
      "Software for tracking, coordination, and field visibility — where reliability is a business requirement.",
    challenges: [
      "Fragmented tracking and status visibility",
      "Manual coordination across teams",
      "Mobile and real-time operational demands",
    ],
    approach: [
      "Operational platforms and tracking experiences",
      "Integrations across inventory, fleet, and CRM",
      "Hardened access and audit-minded design",
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    summary:
      "Client-facing sites and booking systems that build trust and convert interest into scheduled work.",
    challenges: [
      "Outdated presence that undercuts credibility",
      "Friction in inquiries and appointments",
      "Need for bilingual or multi-service clarity",
    ],
    approach: [
      "Clear service architecture and conversion paths",
      "Appointment and inquiry workflows",
      "Accessible, performant marketing surfaces",
    ],
  },
  {
    slug: "regulated-sensitive",
    title: "Regulated & Sensitive Environments",
    summary:
      "Software and assessments where confidentiality, access control, and careful delivery matter as much as features.",
    challenges: [
      "Sensitive data and limited disclosure",
      "Need for controlled environments",
      "Security assurance without theater",
    ],
    approach: [
      "Secure design and least-privilege patterns",
      "Assessment and remediation under NDA",
      "Honest scoping — no invented compliance claims",
    ],
  },
];
