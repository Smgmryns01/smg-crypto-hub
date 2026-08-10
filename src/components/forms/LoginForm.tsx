"use client";

import { useIcp } from "@/context/IcpContext";
import { Button } from "@/components/ui/Button";

export default function LoginForm() {
  const { connect, isLoading, status } = useIcp();

  async function handleLogin() {
    await connect();
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-brand-muted">
          Sign in securely with Internet Identity.
        </p>
      </div>

      <Button
        type="button"
        className="w-full"
        onClick={handleLogin}
        disabled={isLoading || status === "connecting"}
      >
        {isLoading || status === "connecting"
          ? "Connecting..."
          : "Continue with Internet Identity"}
      </Button>

      <p className="text-center text-xs text-brand-muted">
        Your Internet Identity protects your account without requiring a
        password.
      </p>
    </div>
  );
}