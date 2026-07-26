"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const sessionUser = currentUser();
      setUser(sessionUser);
      setLoading(false);
    };

    initializeAuth();
  }, []);

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
