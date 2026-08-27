"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import { siteConfig } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error" | "fallback";

const fieldClass =
  "w-full rounded-sm border border-border bg-bg px-3 py-3 text-sm text-text transition-all duration-200 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus focus-visible:shadow-[0_0_0_3px_rgba(45,184,138,0.12)]";

function FieldWrap({
  children,
  delay,
  reduce,
}: {
  children: ReactNode;
  delay: number;
  reduce: boolean | null;
}) {
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const payload = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fallback?: boolean;
      };

      if (!res.ok) {
        setStatus("error");
        setError(payload.error ?? "Something went wrong. Please try email instead.");
        return;
      }

      if (payload.fallback) {
        setStatus("fallback");
        form.reset();
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please email us directly.");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <FieldWrap delay={0} reduce={reduce}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-text">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={fieldClass}
            />
          </div>
        </FieldWrap>

        <FieldWrap delay={0.06} reduce={reduce}>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-text">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={fieldClass}
            />
          </div>
        </FieldWrap>

        <FieldWrap delay={0.12} reduce={reduce}>
          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-text">
              Company <span className="text-faint">(optional)</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className={fieldClass}
            />
          </div>
        </FieldWrap>

        <FieldWrap delay={0.18} reduce={reduce}>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className={`${fieldClass} resize-y`}
            />
          </div>
        </FieldWrap>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="cta-pulse inline-flex cursor-pointer items-center justify-center rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-[#06110c] transition-colors duration-200 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
      </form>

      <div className="mt-5 space-y-2 text-sm" aria-live="polite">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.p
              key="success"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-accent"
            >
              Message received. We will respond shortly. For urgent matters, email{" "}
              <a className="underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              .
            </motion.p>
          ) : null}
          {status === "fallback" ? (
            <motion.p
              key="fallback"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-muted"
            >
              Email delivery is not configured on this environment yet. Please contact us
              directly at{" "}
              <a className="text-accent underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              .
            </motion.p>
          ) : null}
          {status === "error" && error ? (
            <motion.p
              key="error"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-danger"
            >
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
