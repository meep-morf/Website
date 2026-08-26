import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";

const pillars = [
  {
    title: "Secure by design",
    text: "Controls belong in architecture and delivery — not as a last-mile checklist.",
  },
  {
    title: "Assess & remediate",
    text: "Scoped assessments with prioritized findings engineers can actually action.",
  },
  {
    title: "Operational resilience",
    text: "Hardening, monitoring guidance, and response readiness for systems that must stay up.",
  },
];

export function CyberTeaser() {
  return (
    <section className="section-pad border-b border-border-subtle bg-bg-elevated/60">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <FadeIn>
            <SectionHeader
              kicker="Cybersecurity"
              title="Security that protects the layer business depends on"
              description="NomadLabz treats cybersecurity as part of how software is designed, shipped, and operated — assessments, hardening, and secure engineering without theatrics."
            />
            <div className="mt-8">
              <ButtonLink href="/cybersecurity">Explore Cybersecurity</ButtonLink>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ul className="space-y-6 border-l border-accent-border pl-6">
              {pillars.map((item) => (
                <li key={item.title}>
                  <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
