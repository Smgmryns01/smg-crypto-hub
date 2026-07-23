"use client";
import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4" role="alert">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl" aria-hidden="true">⚠️</span>
        </div>
        <h1 className="font-display text-display-sm font-bold text-brand-white">Something went wrong</h1>
        <p className="mt-3 text-sm text-brand-muted">
          An unexpected error occurred. You can try again or return home.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-brand-muted/60">Error ID: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
