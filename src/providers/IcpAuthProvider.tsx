"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  login,
  logout,
  getPrincipal,
  isAuthenticated,
} from "@/lib/icp/auth";

interface AuthContextType {
  loading: boolean;
  authenticated: boolean;
  principal: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function IcpAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);

    const ok = await isAuthenticated();

    setAuthenticated(ok);

    if (ok) {
      setPrincipal(await getPrincipal());
    } else {
      setPrincipal(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleLogin() {
    await login();
    await refresh();
  }

  async function handleLogout() {
    await logout();
    await refresh();
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        authenticated,
        principal,
        login: handleLogin,
        logout: handleLogout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}