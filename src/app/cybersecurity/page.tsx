import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { RiskTimeline } from "@/components/motion/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HeroFuturisticLazy } from "@/components/ui/hero-futuristic-lazy";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Cybersecurity",
  description:
    "Practical cybersecurity from NomadLabz — scoped assessments, secure design, hardening, and operational resilience without fear marketing.",
  path: "/cybersecurity",
});

const offerings = [
  {
    title: "Security assessments",
    body: "Scoped reviews of applications, infrastructure posture, and exposure — with prioritized findings and remediation sequencing your engineers can execute.",
  },
  {
    title: "Secure software design",
    body: "Threat-aware architecture, authentication patterns, data handling guidance, and controls that fit how your team actually ships.",
  },
  {
    title: "Hardening & readiness",
    body: "Configuration guidance, monitoring recommendations, and incident-ready practices for systems that must stay available under pressure.",
  },
  {
    title: "Confidential engagements",
    body: "Private assessments and remediation support under NDA. We do not invent scorecards, publish client identifiers, or dramatize risk.",
  },
];

const processPhases = [
  {
    title: "Scope & context",
    body: "We define boundaries, systems in scope, and what success looks like — before any scanning or review begins.",
  },
  {
    title: "Assess & prioritize",
    body: "Findings are ranked by exploitability and business impact, not vanity severity counts.",
  },
  {
    title: "Remediate & verify",
    body: "We support fixes with engineering-relevant guidance and confirm closure where agreed.",
  },
  {
    title: "Operate & improve",
    body: "Controls and monitoring recommendations carry forward so security stays active after the engagement.",
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
      <section className="relative min-h-[min(62vh,560px)] overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 z-0" aria-hidden>
          <HeroFuturisticLazy
            showOverlay={false}
            heightClassName="h-full min-h-[min(62vh,560px)]"
            intensity={0.88}
          />
        </div>
        <div className="container-page relative z-10 flex min-h-[min(62vh,560px)] items-center section-pad">
          <FadeIn>
            <div className="max-w-4xl rounded-sm border border-border-subtle bg-bg/88 p-8 backdrop-blur-md md:p-10">
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
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page">
          <FadeIn>
            <SectionHeader
              kicker="Offerings"
              title="What we deliver"
              description="Four practice areas — each scoped to your environment and risk profile."
            />
          </FadeIn>
          <div className="mt-12">
            <RiskTimeline items={offerings} />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle bg-bg-elevated/50">
        <div className="container-page">
          <FadeIn>
            <SectionHeader
              kicker="Process"
              title="How an engagement runs"
              description="A clear sequence from scope to sustained improvement — no black-box assessments."
            />
          </FadeIn>
          <div className="mt-12">
            <RiskTimeline items={processPhases} />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page">
          <FadeIn>
            <SectionHeader kicker="Principles" title="How we approach risk" />
            <ul className="mt-10 max-w-3xl space-y-4">
              {principles.map((item, index) => (
                <FadeIn key={item} delay={index * 0.04}>
                  <li className="border-l border-accent-border pl-4 text-base text-muted">
                    {item}
                  </li>
                </FadeIn>
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
