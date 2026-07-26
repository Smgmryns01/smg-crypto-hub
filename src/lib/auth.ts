import type { AuthSession, User } from "@/types";

const SESSION_KEY = "smg_auth_session";

export function saveSession(session: AuthSession): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const session = localStorage.getItem(SESSION_KEY);

  if (!session) return null;

  try {
    return JSON.parse(session) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  return getSession()?.user ?? null;
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}