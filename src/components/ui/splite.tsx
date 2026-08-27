"use client";

import { Suspense, lazy, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

type SplineSceneProps = {
  scene: string;
  className?: string;
} & Omit<ComponentProps<typeof Spline>, "scene">;

function SplineLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[280px] w-full items-center justify-center bg-bg",
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

export function SplineScene({ scene, className, ...props }: SplineSceneProps) {
  return (
    <Suspense fallback={<SplineLoader className={className} />}>
      <Spline scene={scene} className={cn("h-full w-full", className)} {...props} />
    </Suspense>
  );
}
