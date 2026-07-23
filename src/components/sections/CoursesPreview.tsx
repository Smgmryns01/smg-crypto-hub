import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "@/components/ui/CourseCard";
import { COURSES } from "@/data";

const FEATURED = COURSES.filter((c) => c.featured).slice(0, 3);

export function CoursesPreview() {
  return (
    <section className="section bg-brand-black/50" aria-labelledby="courses-heading">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="badge-blue mb-4 w-fit">Featured Courses</div>
            <h2
              id="courses-heading"
              className="font-display text-display-md font-bold text-brand-white text-balance"
            >
              Start your{" "}
              <span className="gradient-text">Web3 journey</span>
            </h2>
            <p className="mt-3 text-brand-muted max-w-xl">
              Structured learning paths from absolute beginner to ICP developer.
              Free to start, no account required for previews.
            </p>
          </div>
          <Link
            href="/academy"
            className="btn-secondary shrink-0 whitespace-nowrap"
          >
            View All Courses
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* All tracks CTA */}
        <div className="mt-12 rounded-2xl border border-brand-border bg-brand-card/40 p-8 text-center">
          <h3 className="font-display text-lg font-semibold text-brand-white mb-2">
            9 courses across 6 tracks
          </h3>
          <p className="text-sm text-brand-muted mb-6">
            Beginner, Intermediate, and Advanced content. New courses added every milestone.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Crypto Basics", "Blockchain", "ICP Development", "DeFi", "NFTs", "Security"].map((track) => (
              <span key={track} className="badge-blue">
                {track}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
