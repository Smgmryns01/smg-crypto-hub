export type CourseLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type CourseStatus =
  | "Draft"
  | "Published";

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;

  instructor: string;

  level: CourseLevel;
  status: CourseStatus;

  duration: string;

  lessons: number;

  featured: boolean;

  category: string;

  createdAt: string;
}