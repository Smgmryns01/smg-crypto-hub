"use client";

import { useEffect, useCallback } from "react";
import { X, Lock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { WALLET_OPTIONS } from "@/data";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-brand-border bg-brand-card shadow-card-hover animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-5">
          <h2
            id="wallet-modal-title"
            className="font-display text-lg font-semibold text-brand-white"
          >
            Connect Wallet
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-muted hover:text-brand-white hover:bg-white/5 transition-all"
            aria-label="Close wallet selector"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Wallet list */}
        <div className="p-3">
          {WALLET_OPTIONS.map((wallet) => (
            <button
              key={wallet.id}
              disabled
              aria-disabled="true"
              className={cn(
                "flex w-full items-center gap-4 rounded-xl px-4 py-4",
                "transition-all duration-200 text-left",
                "opacity-60 cursor-not-allowed"
              )}
            >
              <span
                className="text-2xl w-10 text-center shrink-0"
                aria-hidden="true"
              >
                {wallet.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-brand-white">
                    {wallet.name}
                  </span>
                  <span className="badge bg-brand-gold/10 text-brand-gold border border-brand-gold/20 text-[10px] px-2 py-0.5 rounded-full">
                    Milestone 5
                  </span>
                </div>
                <p className="text-xs text-brand-muted truncate mt-0.5">
                  {wallet.description}
                </p>
              </div>
              <Lock className="h-4 w-4 text-brand-muted shrink-0" aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-brand-border px-6 py-4">
          <p className="text-xs text-brand-muted text-center">
            Wallet connection activates at Milestone 5 (Internet Identity) and
            Milestone 6 (production).{" "}
            <a
              href="https://identity.ic0.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:text-brand-blue-glow inline-flex items-center gap-0.5"
            >
              Learn about Internet Identity
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
