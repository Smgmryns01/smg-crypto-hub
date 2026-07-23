"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  className?: string;
  iconColor?: string;
  iconBg?: string;
}

export function StatsCard({
  value,
  label,
  icon: Icon,
  description,
  className,
  iconColor = "text-brand-blue",
  iconBg = "bg-brand-blue/10 border-brand-blue/20",
}: StatsCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-brand-border bg-brand-card/60 backdrop-blur-sm p-6",
        "transition-all duration-500 hover:border-brand-blue/30",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border",
            iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} aria-hidden="true" />
        </div>
      </div>
      <div className="font-display text-3xl font-extrabold text-brand-white">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-brand-white">{label}</div>
      {description && (
        <div className="mt-1 text-xs text-brand-muted">{description}</div>
      )}
    </div>
  );
}
