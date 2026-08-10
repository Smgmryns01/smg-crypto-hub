"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Fingerprint } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useIcp } from "@/context/IcpContext";

export default function InternetIdentityButton() {
  const { connect, isAuthenticated, isLoading, principal } = useIcp();
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
      router.replace("/dashboard");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleConnect}
        variant="outline"
        className="w-full"
        disabled={isLoading || isConnecting || isAuthenticated}
      >
        <Fingerprint className="mr-2 h-4 w-4" />
        {isConnecting ? "Connecting..." : isAuthenticated ? "Connected with Internet Identity" : "Continue with Internet Identity"}
      </Button>

      {principal ? (
        <p className="text-xs text-brand-muted break-all">Principal: {principal}</p>
      ) : null}
    </div>
  );
}
