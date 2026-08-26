"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-pad">
      <div className="container-page max-w-2xl">
        <p className="mono-label mb-4">Error</p>
        <h1 className="display-heading text-4xl">Something went wrong</h1>
        <p className="mt-4 text-muted">
          An unexpected error occurred. You can try again or return home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-[#06110c] transition-colors hover:bg-accent-soft"
          >
            Try again
          </button>
          <ButtonLink href="/" variant="secondary">
            Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
