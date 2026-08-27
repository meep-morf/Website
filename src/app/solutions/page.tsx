import { FadeIn } from "@/components/motion/FadeIn";
import { IndustryPanel } from "@/components/motion/IndustryPanel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlobeStudyLazy } from "@/components/ui/globe-study-lazy";
import { FinalCta } from "@/components/sections/FinalCta";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Industry solutions from NomadLabz — startups, enterprises, operations, professional services, and sensitive environments. Same discipline, different constraints.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <section className="section-pad border-b border-border-subtle section-tint-info">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <SectionHeader
              as="h1"
              kicker="Solutions"
              kickerClassName="!text-info"
              title="Industry context. Same operating discipline."
              description="We adapt software and security work to sector constraints — startups, enterprises, logistics, professional services, and sensitive environments — without inventing credentials we do not have."
            />
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="relative aspect-square max-h-[min(68vw,360px)] w-full overflow-hidden rounded-sm border border-info-border/30 bg-bg-elevated lg:max-h-[400px] lg:justify-self-end">
              <GlobeStudyLazy mode="dark" opacity={0.9} scale={0.95} />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad section-tint-accent">
        <div className="container-page space-y-4">
          {industries.map((industry, index) => (
            <IndustryPanel key={industry.slug} industry={industry} index={index} />
          ))}
        </div>
      </section>

      <FinalCta
        title="Building for a specific industry context?"
        description="Tell us about your sector constraints. We will outline how the operating layer should adapt — honestly and specifically."
      />
    </>
  );
}
