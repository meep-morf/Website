import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: SectionHeaderProps) {
  const Heading = as;

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? <p className="mono-label mb-4">{kicker}</p> : null}
      <Heading
        className={cn(
          "display-heading",
          as === "h1"
            ? "text-4xl md:text-5xl lg:text-[3.25rem]"
            : "text-3xl md:text-4xl lg:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base text-muted md:text-lg",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
