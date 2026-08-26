"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ctaPrimary, navItems, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-[rgba(7,8,9,0.88)] backdrop-blur-md">
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-4 md:h-[4.75rem]">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label={`${siteConfig.name} home`}
          onClick={closeMenu}
        >
          <Image
            src="/brand/nomadlabz-logo.png"
            alt=""
            width={180}
            height={50}
            className="h-10 w-auto md:h-12"
            priority
            aria-hidden
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "cursor-pointer text-sm font-medium text-muted transition-colors duration-200 hover:text-accent",
                  active && "text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={ctaPrimary.href}
            className="cursor-pointer rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-[#06110c] transition-colors duration-200 hover:bg-accent-soft"
          >
            {ctaPrimary.label}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex cursor-pointer flex-col justify-center gap-1.5 rounded-sm border border-border p-2.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "block h-0.5 w-5 bg-text transition-transform duration-200",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-text transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-text transition-transform duration-200",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border-subtle bg-bg-elevated lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="cursor-pointer rounded-sm px-2 py-3 text-base text-muted transition-colors hover:bg-surface hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={ctaPrimary.href}
            onClick={closeMenu}
            className="mt-2 cursor-pointer rounded-sm bg-accent px-3 py-3 text-center text-sm font-semibold text-[#06110c]"
          >
            {ctaPrimary.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
