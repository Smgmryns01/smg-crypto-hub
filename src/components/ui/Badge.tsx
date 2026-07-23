import { cn } from "@/lib/utils";

type BadgeVariant = "blue" | "gold" | "green" | "red" | "purple" | "muted" | "outline";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  blue: "bg-brand-blue/10 text-brand-blue-glow border border-brand-blue/25",
  gold: "bg-brand-gold/10 text-brand-gold border border-brand-gold/25",
  green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  red: "bg-red-500/10 text-red-400 border border-red-500/25",
  purple: "bg-purple-500/10 text-purple-400 border border-purple-500/25",
  muted: "bg-white/5 text-brand-muted border border-brand-border",
  outline: "bg-transparent text-brand-white border border-brand-border",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
};

export function Badge({
  variant = "blue",
  size = "md",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
    >
      {children}
    </span>
  );
}
