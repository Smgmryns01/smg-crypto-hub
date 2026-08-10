import { getBackend } from "./backend";

export async function syncCurrentUser() {
  const backend = await getBackend();

  const exists = await backend.userExists();

  if (!exists) {
    const principal = await import("./auth").then((m) => m.getPrincipal());

    const username = principal
      ? principal.slice(0, 12)
      : "New User";

    return backend.registerUser(
      username,
      `${username}@ii.local`
    );
  }

  return backend.getMyProfile();
}