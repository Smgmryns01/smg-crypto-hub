import { fetchApi } from "@/services/api";
import { saveSession, clearSession, getSession } from "@/lib/auth";

import type {
  AuthResult,
  AuthSession,
  LoginCredentials,
  RegisterData,
  User,
} from "@/types";

type LoginRequest = LoginCredentials & { rememberMe?: boolean };

// Login
export async function login(
  credentials: LoginRequest
): Promise<AuthResult<AuthSession>> {
  const response = await fetchApi<AuthSession>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!response.data) {
    return {
      success: false,
      error: response.error ?? "Login failed",
    };
  }

  saveSession(response.data, credentials.rememberMe);

  return {
    success: true,
    data: response.data,
  };
}

// Register
export async function register(
  data: RegisterData
): Promise<AuthResult<AuthSession>> {
  const response = await fetchApi<AuthSession>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.data) {
    return {
      success: false,
      error: response.error ?? "Registration failed",
    };
  }

  saveSession(response.data);

  return {
    success: true,
    data: response.data,
  };
}

// Refresh Session
export async function refreshSession(): Promise<AuthResult<AuthSession>> {
  const response = await fetchApi<{ success: boolean; data?: { token?: string; accessToken?: string; expiresAt?: string; refreshToken?: string | null; user?: User | null } }>('/api/auth/refresh', {
    method: 'POST',
  });

  if (!response.data?.data) {
    clearSession();

    return {
      success: false,
      error: response.error ?? 'Session refresh failed',
    };
  }

  const refreshedSession: AuthSession = {
    user: response.data.data.user ?? null,
    accessToken: response.data.data.accessToken ?? response.data.data.token ?? null,
    refreshToken: response.data.data.refreshToken ?? null,
    expiresAt: response.data.data.expiresAt ?? new Date().toISOString(),
  };

  saveSession(refreshedSession);

  return {
    success: true,
    data: refreshedSession,
  };
}

// Logout
export function logout(): void {
  clearSession();
}

// Current User
export function currentUser(): User | null {
  return getSession()?.user ?? null;
}