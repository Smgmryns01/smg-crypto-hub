"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { clearSession, getSession } from "@/lib/auth";
import { currentUser, login as loginUser, logout as logoutUser, register as registerUser } from "@/services/auth";
import type { LoginCredentials, RegisterData, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSessionExpired = useCallback(() => {
    clearSession();
    setUser(null);
    toast.error("Your session has expired. Please sign in again.");
    router.replace("/login");
  }, [router]);

  useEffect(() => {
    const initializeAuth = () => {
      const session = getSession();

      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }

      const expiresAt = session.expiresAt;
      const expiresAtTime = expiresAt ? Date.parse(expiresAt) : Number.NaN;

      if (!expiresAt || Number.isNaN(expiresAtTime) || expiresAtTime <= Date.now()) {
        clearSession();
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(session.user ?? null);
      setLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const session = getSession();

    if (!session?.expiresAt) {
      return undefined;
    }

    const expiresAtTime = Date.parse(session.expiresAt);

    if (Number.isNaN(expiresAtTime)) {
      return undefined;
    }

    const remainingTime = expiresAtTime - Date.now();

    if (remainingTime <= 0) {
      handleSessionExpired();
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      handleSessionExpired();
    }, remainingTime);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [handleSessionExpired, user]);

  const login = async (credentials: LoginCredentials) => {
    const result = await loginUser(credentials);

    if (result.success) {
      setUser(result.data?.user ?? null);
      return true;
    }

    return false;
  };

  const register = async (data: RegisterData) => {
    const result = await registerUser(data);

    if (result.success) {
      setUser(result.data?.user ?? null);
      return true;
    }

    return false;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
