"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  getIdentity,
  getPrincipal,
  loginWithInternetIdentity,
  logout as logoutIcp,
} from "@/lib/icp/auth";

type IcpStatus = "idle" | "connecting" | "connected" | "error";

interface IcpContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  principal: string | null;
  status: IcpStatus;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

const IcpContext = createContext<IcpContextValue | undefined>(undefined);

export function IcpProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [status, setStatus] = useState<IcpStatus>("idle");

  const restoreSession = useCallback(async () => {
    setIsLoading(true);

    try {
      const identity = await getIdentity();

      if (!identity) {
        setIsAuthenticated(false);
        setPrincipal(null);
        setStatus("idle");
        return;
      }

      const resolvedPrincipal = await getPrincipal();
      const connected = Boolean(resolvedPrincipal);

      setIsAuthenticated(connected);
      setPrincipal(resolvedPrincipal);
      setStatus(connected ? "connected" : "idle");
    } catch (error) {
      setIsAuthenticated(false);
      setPrincipal(null);
      setStatus("error");
      console.error("Failed to restore Internet Identity session:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const connect = useCallback(async () => {
    setStatus("connecting");
    setIsLoading(true);

    try {
      await loginWithInternetIdentity();
      const resolvedPrincipal = await getPrincipal();

      if (!resolvedPrincipal) {
        throw new Error("No principal was returned after Internet Identity authentication.");
      }

      setIsAuthenticated(true);
      setPrincipal(resolvedPrincipal);
      setStatus("connected");
      toast.success("Connected with Internet Identity");
    } catch (error) {
      setIsAuthenticated(false);
      setPrincipal(null);
      setStatus("error");
      toast.error(error instanceof Error ? error.message : "Unable to connect with Internet Identity.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await logoutIcp();
      setIsAuthenticated(false);
      setPrincipal(null);
      setStatus("idle");
      toast.success("Internet Identity session cleared.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to clear Internet Identity session.");
    }
  }, []);

  const value = useMemo<IcpContextValue>(
    () => ({
      isAuthenticated,
      isLoading,
      principal,
      status,
      connect,
      disconnect,
      restoreSession,
    }),
    [connect, disconnect, isAuthenticated, isLoading, principal, restoreSession, status]
  );

  return <IcpContext.Provider value={value}>{children}</IcpContext.Provider>;
}

export function useIcp() {
  const context = useContext(IcpContext);

  if (!context) {
    throw new Error("useIcp must be used within an IcpProvider");
  }

  return context;
}
