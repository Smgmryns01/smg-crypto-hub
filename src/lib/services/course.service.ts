import { getBackendActor } from "./backend";

export async function getCourses() {
  const backend = await getBackendActor();
  return await backend.getCourses();
}

export async function getFeaturedCourses() {
  const backend = await getBackendActor();
  return await backend.getFeaturedCourses();
}

export async function getCourse(id: string) {
  const backend = await getBackendActor();
  return await backend.getCourse(id);
}