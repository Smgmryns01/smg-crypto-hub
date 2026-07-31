"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";

import { PageLayout } from "@/components/layout/PageLayout";
import { CourseCard } from "@/components/ui/CourseCard";
import { getCourses } from "@/lib/services/course.service";
import { cn } from "@/lib/utils";
import type { CourseCategory, CourseLevel } from "@/types";

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

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch =
        search === "" ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());

      const matchLevel =
        level === "all" || course.level === level;

      const matchCategory =
        category === "all" || course.category === category;

      return matchSearch && matchLevel && matchCategory;
    });
  }, [courses, search, level, category]);

  if (loading) {
    return (
      <PageLayout>
        <div className="pt-24 text-center">
          <h2 className="text-xl text-brand-white">
            Loading courses...
          </h2>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="pt-24 text-center">
          <h2 className="text-xl text-red-500">{error}</h2>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">

          <div className="mb-12 text-center">
            <div className="badge-blue mb-4 mx-auto w-fit">
              Academy
            </div>

            <h1 className="font-display text-display-lg font-extrabold text-brand-white">
              Web3 <span className="gradient-text">Learning Paths</span>
            </h1>

            <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
              Structured courses from beginner to advanced ICP developer.
            </p>
          </div>

          <div className="mb-8 space-y-4">

            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted"
              />

              <input
                className="input pl-11"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Filter className="h-4 w-4 text-brand-muted mt-2" />

              {LEVELS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setLevel(value)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm",
                    level === value
                      ? "bg-brand-blue text-white"
                      : "border border-brand-border text-brand-muted"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs",
                    category === value
                      ? "bg-brand-card border border-brand-blue text-brand-blue"
                      : "border border-brand-border text-brand-muted"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

          </div>

          <p className="mb-6 text-sm text-brand-muted">
            {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-border bg-brand-card/30 py-24 text-center">
              <Search className="mx-auto mb-4 h-10 w-10 text-brand-muted" />

              <h3 className="font-display text-lg text-brand-white">
                No courses found
              </h3>

              <button
                className="btn-ghost mt-4"
                onClick={() => {
                  setSearch("");
                  setLevel("all");
                  setCategory("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

        </div>
      </div>
    </PageLayout>
  );
}