import { FadeIn } from "@/components/motion/FadeIn";
import { ProcessTimeline } from "@/components/motion/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/content/site";

export function ProcessSection() {
  return (
    <section className="section-pad border-b border-border-subtle bg-bg-elevated/40">
      <div className="container-page">
        <FadeIn>
          <SectionHeader
            kicker="Engagement"
            title="From discovery to hardened delivery"
            description="A transparent path — collaborative, sequenced, and operationally honest. No mystery phases."
          />
        </FadeIn>
        <ProcessTimeline steps={processSteps} />
      </div>
    </section>
  );
}
