import { FadeIn } from "@/components/motion/FadeIn";
import { ContactStepsTimeline } from "@/components/motion/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { MailButton } from "@/components/ui/MailButton";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with NomadLabz. Reach us at projects@nomadlabz.com or send a message through the contact form.",
  path: "/contact",
});

const steps = [
  {
    title: "Response",
    text: "We acknowledge inbound messages and ask clarifying questions when needed.",
  },
  {
    title: "Discovery",
    text: "A short call to understand goals, constraints, systems, and risk.",
  },
  {
    title: "Proposal",
    text: "If there is a fit, we outline approach, sequence, and investment clearly.",
  },
  {
    title: "Kickoff",
    text: "We align channels, milestones, and ownership — then build.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="section-pad border-b border-border-subtle">
        <div className="container-page">
          <FadeIn>
            <SectionHeader
              as="h1"
              kicker="Contact"
              title="Start a project"
              description="Tell us what you are building or securing. Prefer email? Write directly — no form required."
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <div className="relative">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">Send a message</h2>
              <ContactForm />
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <aside className="space-y-8">
              <div className="border border-border-subtle bg-surface/40 p-6">
                <h2 className="mono-label mb-3">Direct email</h2>
                <p className="text-sm text-muted">
                  For project inquiries, collaborations, or confidential assessments:
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-block cursor-pointer text-lg font-medium text-accent hover:text-focus"
                  >
                    {siteConfig.email}
                  </a>
                  <MailButton email={siteConfig.email} />
                </div>
              </div>
              <div>
                <h2 className="mono-label mb-4">What happens next</h2>
                <ContactStepsTimeline steps={steps} />
              </div>
              <p className="text-sm text-faint">
                If the form cannot send (missing email provider configuration), use the
                mailto fallback above. We would rather you reach us than lose the message.
              </p>
            </aside>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
