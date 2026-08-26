import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/content/site";

export function ProcessSection() {
  return (
    <section className="section-pad border-b border-border-subtle bg-bg-elevated/40">
      <div className="container-page">
        <FadeIn>
          <SectionHeader
            kicker="Engagement"
            title="How we work"
            description="A transparent path from discovery to hardened delivery — collaborative, sequenced, and operationally honest."
          />
        </FadeIn>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <FadeIn key={step.step} delay={index * 0.05}>
              <li>
                <p className="font-mono text-sm text-accent">{step.step}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm text-muted">{step.description}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
