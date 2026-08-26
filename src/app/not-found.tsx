import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-page max-w-2xl">
        <p className="mono-label mb-4">404</p>
        <h1 className="display-heading text-4xl md:text-5xl">Page not found</h1>
        <p className="mt-4 text-muted">
          That route does not exist — or it moved during the site rebuild.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-faint">
          Looking for an old HTML path? Try{" "}
          <Link href="/services" className="text-accent hover:text-focus">
            /services
          </Link>{" "}
          instead of services.html.
        </p>
      </div>
    </section>
  );
}
