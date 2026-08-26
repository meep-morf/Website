"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error" | "fallback";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

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
        {/* Honeypot */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

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
            className="w-full rounded-sm border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
          />
        </div>

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
            className="w-full rounded-sm border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-text">
            Company <span className="text-faint">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="w-full rounded-sm border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full resize-y rounded-sm border border-border bg-bg px-3 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex cursor-pointer items-center justify-center rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-[#06110c] transition-colors duration-200 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
      </form>

      <div className="mt-5 space-y-2 text-sm" aria-live="polite">
        {status === "success" ? (
          <p className="text-accent">
            Message received. We will respond shortly. For urgent matters, email{" "}
            <a className="underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>
        ) : null}
        {status === "fallback" ? (
          <p className="text-muted">
            Email delivery is not configured on this environment yet. Please contact us
            directly at{" "}
            <a className="text-accent underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>
        ) : null}
        {status === "error" && error ? (
          <p className="text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
