import { backend } from "./backend";

export async function getCourses() {
  return await backend.getCourses();
}

export async function getCourse(id: string) {
  return await backend.getCourse(id);
}

export async function getFeaturedCourses() {
  return await backend.getFeaturedCourses();
}