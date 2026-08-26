import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Cybersecurity",
  description:
    "Practical cybersecurity from NomadLabz — assessments, secure design, hardening, and operational resilience.",
  path: "/cybersecurity",
});

const offerings = [
  {
    title: "Security assessments",
    body: "Scoped reviews of applications, infrastructure posture, and exposure — with prioritized findings and remediation sequencing.",
  },
  {
    title: "Secure software design",
    body: "Threat-aware architecture, authentication patterns, data handling guidance, and controls that fit how teams ship.",
  },
  {
    title: "Hardening & readiness",
    body: "Configuration guidance, monitoring recommendations, and incident-ready practices for systems that must stay available.",
  },
  {
    title: "Confidential engagements",
    body: "Private assessments and remediation support under NDA. We do not invent scorecards or publish client identifiers.",
  },
];

const principles = [
  "Security is part of the operating layer — not a bolted-on product sticker.",
  "Findings must be actionable for engineers and understandable for leaders.",
  "We avoid fear marketing, fake compliance badges, and unverifiable claims.",
  "Confidential work stays confidential.",
];

export default function CybersecurityPage() {
  return (
    <>
      <section className="section-pad border-b border-border-subtle">
        <div className="container-page max-w-4xl">
          <FadeIn>
            <p className="mb-4 text-sm text-faint">
              <Link
                href="/services"
                className="cursor-pointer transition-colors hover:text-accent"
              >
                Services
              </Link>
              <span className="mx-2 text-border" aria-hidden>
                /
              </span>
              <span className="text-muted">Cybersecurity</span>
            </p>
            <SectionHeader
              as="h1"
              kicker="Cybersecurity"
              title="Security that protects software in motion"
              description="NomadLabz helps organizations reduce real exposure across products and infrastructure — with engineering-grade clarity instead of theater."
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-2">
            {offerings.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.04}>
                <article className="border-t border-border-subtle pt-6">
                  <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                  <p className="mt-3 text-muted">{item.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle bg-bg-elevated/50">
        <div className="container-page">
          <FadeIn>
            <SectionHeader kicker="Principles" title="How we approach risk" />
            <ul className="mt-10 max-w-3xl space-y-4">
              {principles.map((item) => (
                <li
                  key={item}
                  className="border-l border-accent-border pl-4 text-base text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <FinalCta
        title="Need an assessment or secure build partner?"
        description="Describe your environment and constraints. For confidential work, email projects@nomadlabz.com directly."
      />
    </>
  );
}
