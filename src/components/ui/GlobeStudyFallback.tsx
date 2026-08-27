"use client";

import { cn } from "@/lib/utils";

/** Static globe placeholder when the interactive globe study fails. */
export function GlobeStudyFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-sm bg-bg-subtle",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, var(--accent-glow) 0%, transparent 55%), radial-gradient(circle at 30% 60%, var(--info-muted) 0%, transparent 45%)",
        }}
      />
      <div
        className="relative h-[58%] w-[58%] rounded-full border border-info-border/35 bg-info-muted/25 shadow-[0_0_48px_var(--accent-glow)]"
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
