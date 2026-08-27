import { FadeIn } from "@/components/motion/FadeIn";
import { ScanAccent } from "@/components/motion/ScanAccent";
import { ServicePanel } from "@/components/motion/CapabilityRow";
import { ServiceConnector } from "@/components/motion/ServiceConnector";
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
      <section className="relative overflow-hidden section-pad border-b border-border-subtle">
        <ScanAccent />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden
        />
        <div className="container-page relative">
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
