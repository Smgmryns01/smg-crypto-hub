"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/declarations/backend/backend.did";
import { getCourses } from "@/lib/services/course.service";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    courses,
    loading,
    error,
  };
}