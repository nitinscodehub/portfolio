import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  gold = false,
  as = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  gold?: boolean;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      <p className={cn("eyebrow", gold && "eyebrow-gold")}>{eyebrow}</p>
      <Heading className={cn("display mt-4 max-w-3xl text-3xl sm:text-4xl lg:text-5xl", align === "center" && "mx-auto")}>
        {title}
      </Heading>
      {description && (
        <p className={cn("pretty mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
