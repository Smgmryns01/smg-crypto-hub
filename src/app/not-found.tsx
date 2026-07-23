"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="font-display text-[8rem] font-extrabold text-brand-blue/20 leading-none select-none" aria-hidden="true">
            404
          </div>
          <h1 className="font-display text-display-sm font-bold text-brand-white mt-4">
            Page not found
          </h1>
          <p className="mt-4 text-brand-muted max-w-md mx-auto">
            This page doesn&apos;t exist or was moved. Check the URL or navigate back.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-primary">
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
            <Link href="/academy" className="btn-secondary">
              <Search className="h-4 w-4" aria-hidden="true" />
              Browse Courses
            </Link>
          </div>
          <button type="button" onClick={() => window.history.back()} className="mt-6 btn-ghost text-sm">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Go back
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
