import { getBackendActor } from "./backend";

export async function registerUser(username: string, email: string) {
  const backend = await getBackendActor();
  return await backend.registerUser(username, email);
}

export async function getMyProfile() {
  const backend = await getBackendActor();
  return await backend.getMyProfile();
}

export async function updateProfile(username: string) {
  const backend = await getBackendActor();
  return await backend.updateProfile(username);
}

export async function verifyEmail() {
  const backend = await getBackendActor();
  return await backend.verifyEmail();
}

export async function listUsers() {
  const backend = await getBackendActor();
  return await backend.listUsers();
}