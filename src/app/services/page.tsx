import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Software engineering, automation, mobile, cloud delivery, cybersecurity, and consulting from NomadLabz.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="section-pad border-b border-border-subtle">
        <div className="container-page">
          <FadeIn>
            <SectionHeader
              as="h1"
              kicker="Services"
              title="Services that form the operating layer"
              description="End-to-end software and security work — connected by design so products, data, and controls move together."
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page space-y-20">
          {services.map((service, index) => (
            <FadeIn key={service.slug} delay={0.03}>
              <article
                id={service.slug}
                className="scroll-mt-28 grid gap-8 border-t border-border-subtle pt-12 lg:grid-cols-[1fr_1.2fr]"
              >
                <div>
                  <p className="font-mono text-xs text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 display-heading text-3xl md:text-4xl">{service.title}</h2>
                  <p className="mt-4 text-muted">{service.summary}</p>
                  <p className="mt-6 text-sm text-faint">
                    <span className="mono-label !normal-case !tracking-normal">For: </span>
                    {service.audience}
                  </p>
                  {service.slug === "cybersecurity" && (
                    <p className="mt-5">
                      <Link
                        href="/cybersecurity"
                        className="cursor-pointer text-sm font-medium text-accent transition-colors hover:text-focus"
                      >
                        Explore the cybersecurity practice →
                      </Link>
                    </p>
                  )}
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mono-label mb-3">Problems we address</h3>
                    <ul className="space-y-2 text-sm text-muted">
                      {service.problems.map((item) => (
                        <li key={item} className="border-l border-border pl-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mono-label mb-3">What we deliver</h3>
                    <ul className="space-y-2 text-sm text-muted">
                      {service.deliverables.map((item) => (
                        <li key={item} className="border-l border-accent-border pl-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <FinalCta
        title="Need a service mapped to your stack?"
        description="Share your constraints and goals. We will recommend a practical path — build, harden, integrate, or advise."
      />
    </>
  );
}
