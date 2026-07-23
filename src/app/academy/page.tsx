"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CourseCard } from "@/components/ui/CourseCard";
import { COURSES } from "@/data";
import type { CourseLevel, CourseCategory } from "@/types";
import { cn } from "@/lib/utils";

const LEVELS: { value: CourseLevel | "all"; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const CATEGORIES: { value: CourseCategory | "all"; label: string }[] = [
  { value: "all", label: "All Topics" },
  { value: "crypto-basics", label: "Crypto Basics" },
  { value: "blockchain", label: "Blockchain" },
  { value: "icp-development", label: "ICP Development" },
  { value: "defi", label: "DeFi" },
  { value: "nft", label: "NFTs" },
  { value: "security", label: "Security" },
  { value: "web3", label: "Web3" },
];

export default function AcademyPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [category, setCategory] = useState<CourseCategory | "all">("all");

  const filtered = useMemo(() => {
    return COURSES.filter((course) => {
      const matchSearch =
        search === "" ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchLevel = level === "all" || course.level === level;
      const matchCategory = category === "all" || course.category === category;
      return matchSearch && matchLevel && matchCategory;
    });
  }, [search, level, category]);

  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="badge-blue mb-4 mx-auto w-fit">Academy</div>
            <h1 className="font-display text-display-lg font-extrabold text-brand-white text-balance">
              Web3 <span className="gradient-text">Learning Paths</span>
            </h1>
            <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-balance">
              Structured courses from absolute beginner to advanced ICP developer.
              Free to start. Earn verifiable certificates. Build real skills.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search courses, topics, or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-11"
                aria-label="Search courses"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Level filter */}
              <fieldset>
                <legend className="sr-only">Filter by difficulty level</legend>
                <div className="flex items-center gap-2 flex-wrap justify-center" role="group">
                  <Filter className="h-4 w-4 text-brand-muted shrink-0" aria-hidden="true" />
                  {LEVELS.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setLevel(value)}
                      className={cn(
                        "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                        level === value
                          ? "bg-brand-blue text-white"
                          : "border border-brand-border text-brand-muted hover:text-brand-white hover:border-brand-blue/50"
                      )}
                      aria-pressed={level === value}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by topic">
              {CATEGORIES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                    category === value
                      ? "bg-brand-card border border-brand-blue/50 text-brand-blue"
                      : "border border-brand-border text-brand-muted hover:text-brand-white"
                  )}
                  aria-pressed={category === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-brand-muted mb-6" aria-live="polite">
            {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
          </p>

          {/* Course Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 rounded-2xl border border-brand-border bg-brand-card/30">
              <Search className="h-10 w-10 text-brand-muted mx-auto mb-4" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-brand-white mb-2">
                No courses found
              </h3>
              <p className="text-sm text-brand-muted">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={() => { setSearch(""); setLevel("all"); setCategory("all"); }}
                className="mt-4 btn-ghost text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Coming Soon notice */}
          <div className="mt-16 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-8 text-center">
            <span className="badge-gold mb-4 mx-auto w-fit block">📅 Milestone 2</span>
            <h3 className="font-display text-lg font-semibold text-brand-white mb-2">
              Course content activates at Milestone 2
            </h3>
            <p className="text-sm text-brand-muted max-w-lg mx-auto">
              The course structure, categories, and enrollment system are built.
              Full lesson content and progress tracking arrive at Milestone 2 (v0.2.0).
              Follow{" "}
              <a
                href="https://t.me/SMGCryptohHubChannel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:text-brand-blue-glow"
              >
                @smgcryptohub
              </a>{" "}
              on Telegram for updates.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
