"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState, type ComponentProps } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { HeroVisualFallback } from "@/components/ui/HeroVisualFallback";
import { cn } from "@/lib/utils";

const SPLINE_LOAD_TIMEOUT_MS = 18_000;

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

type SplineRuntime = ComponentProps<typeof Spline>;

export type SplineSceneProps = {
  scene: string;
  className?: string;
  fallbackVariant?: "operational" | "synapse" | "gradient";
  onSceneLoad?: () => void;
  onSceneError?: () => void;
} & Omit<SplineRuntime, "scene">;

function SplineLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[400px] w-full items-center justify-center bg-bg-subtle/30",
        className,
      )}
      aria-hidden="true"
    >
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full bg-accent/10 animate-pulse" />
        <div
          className="absolute inset-2 rounded-full border-2 border-accent/30 border-t-accent animate-spin"
          style={{ animationDuration: "1.2s" }}
        />
      </div>
    </div>
  );
}

function SplineCanvas({
  scene,
  className,
  fallbackVariant = "operational",
  onSceneLoad,
  onSceneError,
  ...props
}: SplineSceneProps) {
  const [phase, setPhase] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPhase((current) => (current === "loading" ? "failed" : current));
    }, SPLINE_LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [scene]);

  const handleLoad = useCallback(() => {
    setPhase("ready");
    onSceneLoad?.();
  }, [onSceneLoad]);

  useEffect(() => {
    if (phase === "failed") onSceneError?.();
  }, [phase, onSceneError]);

  if (phase === "failed") {
    return (
      <HeroVisualFallback
        className={cn("h-full min-h-[400px] w-full", className)}
        variant={fallbackVariant}
      />
    );
  }

  return (
    <div
      className={cn("relative h-full w-full min-h-[400px]", className)}
      style={{ minHeight: "min(52vh, 560px)" }}
    >
      {phase === "loading" ? <SplineLoader className="absolute inset-0 z-0" /> : null}
      <Spline
        scene={scene}
        onLoad={handleLoad}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-500",
          "[&_canvas]:!block [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:!opacity-100",
          phase === "ready" ? "opacity-100" : "opacity-0",
        )}
        {...props}
      />
    </div>
  );
}

/**
 * Home hero visual fallback chain:
 * 1. Spline 3D scene (primary)
 * 2. OperationalSystemField (load timeout, render error, or reduced motion)
 * 3. Synapse network (secondary ErrorBoundary tier via fallbackVariant="synapse")
 * 4. Gradient scan panel (tertiary via fallbackVariant="gradient")
 */
export function SplineScene({
  fallbackVariant = "operational",
  onSceneError,
  ...props
}: SplineSceneProps) {
  return (
    <ErrorBoundary
      fallback={
        <HeroVisualFallback
          className={cn("h-full min-h-[400px] w-full", props.className)}
          variant={fallbackVariant}
        />
      }
      onError={() => onSceneError?.()}
    >
      <SplineCanvas fallbackVariant={fallbackVariant} onSceneError={onSceneError} {...props} />
    </ErrorBoundary>
  );
}
