"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type VerificationState = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";

  const [status, setStatus] = useState<VerificationState>("loading");
  const [message, setMessage] = useState("Verifying your email address...");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function verifyEmail() {
      if (!token) {
        if (isMounted) {
          setStatus("error");
          setMessage("Invalid or expired verification link.");
        }
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!isMounted) {
          return;
        }

        if (response.ok && data.success) {
          setStatus("success");
          setMessage("Email verified successfully.");
          return;
        }

        setStatus("error");
        setMessage(data.message ?? "Invalid or expired verification link.");
      } catch {
        if (isMounted) {
          setStatus("error");
          setMessage("Invalid or expired verification link.");
        }
      }
    }

    void verifyEmail();

    return () => {
      isMounted = false;
    };
  }, [token]);

  async function handleResendVerification() {
    setIsResending(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        toast.success(data.message);
        return;
      }

      toast.error("Unable to send verification email.");
    } catch {
      toast.error("Unable to send verification email.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-card p-8 shadow-card">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Verify Email</h1>
          <p className="mt-2 text-brand-muted">
            Complete your account verification.
          </p>
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-border bg-brand-card/60 p-8 text-center">
            <LoadingSpinner size="lg" label="Verifying email" />
            <p className="text-brand-muted">
              We&apos;re verifying your email address. This will only take a moment.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 text-center">
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-2xl text-green-400">
                ✓
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {message}
              </h2>
              <p className="mt-2 text-sm text-brand-muted">
                Your account is now verified and ready to use.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="secondary"
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? "Sending..." : "Resend Verification Email"}
              </Button>

              <Button onClick={() => router.push("/login")} className="w-full">
                Continue to Login
              </Button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6 text-center">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
              <h2 className="text-xl font-semibold text-white">
                Verification failed
              </h2>
              <p className="mt-2 text-sm text-brand-muted">{message}</p>
            </div>

            <div className="space-y-3">
              <Button
                variant="secondary"
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? "Sending..." : "Resend Verification Email"}
              </Button>

              <Button
                variant="secondary"
                onClick={() => router.push("/login")}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
