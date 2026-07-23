import Link from "next/link";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course, CourseLevel } from "@/types";

const LEVEL_CONFIG: Record<CourseLevel, { label: string; className: string }> = {
  beginner: { label: "Beginner", className: "badge-green" },
  intermediate: { label: "Intermediate", className: "badge-blue" },
  advanced: { label: "Advanced", className: "badge-gold" },
};

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}

export function CourseCard({
  course,
  showProgress = false,
  progress = 0,
  className,
}: CourseCardProps) {
  const levelConfig = LEVEL_CONFIG[course.level];
  const href = `/academy/${course.id}`;

  return (
    <article
      className={cn(
        "card-glow group flex flex-col h-full",
        className
      )}
      aria-label={`${course.title} course — ${levelConfig.label}`}
    >
      {/* Thumbnail placeholder */}
      <div className="relative rounded-xl bg-gradient-to-br from-brand-blue/20 to-icp-secondary/10 border border-brand-border h-40 mb-5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-10 w-10 text-brand-blue/40" aria-hidden="true" />
        </div>
        {/* Featured badge */}
        {course.featured && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-gold">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {/* Level badge */}
        <span className={cn("badge w-fit mb-3", levelConfig.className)}>
          {levelConfig.label}
        </span>

        <h3 className="font-display text-base font-semibold text-brand-white leading-snug mb-2 group-hover:text-brand-blue transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-brand-muted leading-relaxed flex-1">
          {course.description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-xs text-brand-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {course.lessons} lessons
          </span>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 border border-brand-border px-2 py-0.5 text-xs text-brand-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        {showProgress && progress > 0 && (
          <div className="mt-4" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Course progress: ${progress}%`}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-brand-muted">Progress</span>
              <span className="text-brand-white font-medium">{progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-brand-border overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-blue to-icp-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-5 pt-4 border-t border-brand-border">
          <Link
            href={href}
            className="flex items-center justify-between text-sm font-medium text-brand-blue hover:text-brand-blue-glow transition-colors group/link"
          >
            <span>{progress > 0 ? "Continue Learning" : "Start Course"}</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
