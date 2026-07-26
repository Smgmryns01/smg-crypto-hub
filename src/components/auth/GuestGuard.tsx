"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, loading, router, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return null;
  }

  return <>{children}</>;
}
