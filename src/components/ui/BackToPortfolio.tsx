"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShinyArrowButton } from "@/components/ui/ShinyArrowButton";

export function BackToPortfolio() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/portfolio"
        className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-accent hover:text-focus"
      >
        ← All work
      </Link>
      <ShinyArrowButton
        direction="left"
        variant="green"
        ariaLabel="Back to portfolio"
        onClick={() => router.push("/portfolio")}
      />
    </div>
  );
}
