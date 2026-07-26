import type { AuthSession, User } from "@/types";

const SESSION_KEY = "smg_auth_session";

function getStorage(rememberMe?: boolean): Storage | null {
  if (typeof window === "undefined") return null;

  return rememberMe ? window.localStorage : window.sessionStorage;
}

export function saveSession(session: AuthSession, rememberMe?: boolean): void {
  if (typeof window === "undefined") return;

  const storage = getStorage(rememberMe);

  if (!storage) return;

  try {
    storage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    return;
  }
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const storages = [window.localStorage, window.sessionStorage];

  for (const storage of storages) {
    try {
      const session = storage.getItem(SESSION_KEY);

      if (!session) continue;

      const parsed = JSON.parse(session);

      if (!parsed || typeof parsed !== "object") {
        storage.removeItem(SESSION_KEY);
        continue;
      }

      return parsed as AuthSession;
    } catch {
      storage.removeItem(SESSION_KEY);
    }
  }

  return null;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    return;
  }
}

export function getCurrentUser(): User | null {
  return getSession()?.user ?? null;
}

export function isAuthenticated(): boolean {
  return Boolean(getSession()?.user);
}