"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ctaPrimary, isNavItemActive, navItems, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the drawer when the route changes (e.g. browser back while open).
  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && headerRef.current && !headerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border-subtle bg-[rgba(7,8,9,0.88)] backdrop-blur-md"
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 py-2 md:h-[4.5rem] md:py-2.5">
        <Link
          href="/"
          className="group flex h-8 shrink-0 items-center md:h-9"
          aria-label={`${siteConfig.name} home`}
          onClick={closeMenu}
        >
          <Image
            src="/brand/nomadlabz-logo.png"
            alt=""
            width={148}
            height={90}
            className="h-8 w-auto max-h-8 object-contain object-left md:h-9 md:max-h-9"
            priority
            aria-hidden
          />
        </Link>

        <nav
          className="ml-auto hidden items-center lg:flex"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isNavItemActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "cursor-pointer rounded-sm px-3 py-2 text-[0.9375rem] font-medium tracking-wide text-muted transition-colors duration-200 hover:text-text",
                      active && "text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={ctaPrimary.href}
            className="ml-6 cursor-pointer rounded-sm border border-accent-border bg-accent/10 px-3.5 py-2 text-sm font-semibold text-accent transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-[#06110c]"
          >
            {ctaPrimary.label}
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-sm border border-border p-2.5 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
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
        id={menuId}
        className={cn(
          "border-t border-border-subtle bg-bg-elevated lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {navItems.map((item) => {
            const active = isNavItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "cursor-pointer rounded-sm px-3 py-3 text-base text-muted transition-colors hover:bg-surface hover:text-accent",
                  active && "bg-surface text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={ctaPrimary.href}
            onClick={closeMenu}
            className="mt-2 cursor-pointer rounded-sm bg-accent px-3 py-3 text-center text-sm font-semibold text-[#06110c] transition-colors hover:bg-accent-soft"
          >
            {ctaPrimary.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
