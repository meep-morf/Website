import { FadeIn } from "@/components/motion/FadeIn";
import { ServicePanel } from "@/components/motion/CapabilityRow";
import { ServiceConnector } from "@/components/motion/ServiceConnector";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InteractiveSynapseNetworkLazy } from "@/components/ui/interactive-synapse-network-lazy";
import { NOMAD_SYNAPSE_THEME } from "@/components/ui/interactive-synapse-network";
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
      <section className="relative min-h-[min(72vh,560px)] overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0">
          <InteractiveSynapseNetworkLazy
            {...NOMAD_SYNAPSE_THEME}
            nodeCount={55}
            connectionRadius={160}
            trailOpacity={0.18}
            className="h-full w-full"
            ariaLabel="Animated capability network background"
          />
        </div>
        <div className="container-page relative z-10 flex min-h-[min(72vh,560px)] items-center section-pad">
          <FadeIn>
            <div className="max-w-3xl rounded-sm border border-border-subtle bg-bg/85 p-8 backdrop-blur-md md:p-10">
              <SectionHeader
                as="h1"
                kicker="Services"
                title="Capabilities that form the operating layer"
                description="End-to-end software and security work — connected by design so products, data, and controls move together instead of drifting apart."
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          {services.map((service, index) => (
            <div key={service.slug}>
              <ServicePanel
                index={index}
                slug={service.slug}
                title={service.title}
                summary={service.summary}
                audience={service.audience}
                problems={service.problems}
                deliverables={service.deliverables}
                outcomes={service.outcomes}
                cyberLink={service.slug === "cybersecurity"}
              />
              {index < services.length - 1 ? <ServiceConnector index={index} /> : null}
            </div>
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
