import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const styles = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-200",
    variant === "primary" &&
      "bg-accent text-[#06110c] hover:bg-accent-soft focus-visible:outline-focus",
    variant === "secondary" &&
      "border border-border bg-transparent text-text hover:border-accent-border hover:text-accent",
    variant === "ghost" && "text-muted hover:text-accent",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={styles}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
