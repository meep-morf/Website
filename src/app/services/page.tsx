import { FadeIn } from "@/components/motion/FadeIn";
import { ScanAccent } from "@/components/motion/ScanAccent";
import { ServicePanel } from "@/components/motion/CapabilityRow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Software engineering, automation, mobile, cloud delivery, cybersecurity, and consulting — six capabilities that form the NomadLabz operating layer.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="relative section-pad border-b border-border-subtle">
        <ScanAccent />
        <div className="container-page">
          <FadeIn>
            <SectionHeader
              as="h1"
              kicker="Services"
              title="Capabilities that form the operating layer"
              description="End-to-end software and security work — connected by design so products, data, and controls move together instead of drifting apart."
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page space-y-20">
          {services.map((service, index) => (
            <ServicePanel
              key={service.slug}
              index={index}
              slug={service.slug}
              title={service.title}
              summary={service.summary}
              audience={service.audience}
              problems={service.problems}
              deliverables={service.deliverables}
              cyberLink={service.slug === "cybersecurity"}
            />
          ))}
        </div>
      </section>

      <FinalCta
        title="Need a capability mapped to your stack?"
        description="Share your constraints and goals. We will recommend a practical path — build, harden, integrate, or advise."
      />
    </>
  );
}
