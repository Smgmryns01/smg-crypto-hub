import { PageLayout } from "@/components/layout/PageLayout";
import { WALLET_OPTIONS } from "@/data";
import { Lock } from "lucide-react";

export default function WalletPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-narrow">
        <div className="mb-12 text-center">
          <div className="badge-blue mb-4 mx-auto w-fit">Wallet Connect</div>
          <h1 className="font-display text-display-md font-extrabold text-brand-white text-balance">Connect Your <span className="gradient-text">Wallet</span></h1>
          <p className="mt-4 text-brand-muted max-w-lg mx-auto">Multi-wallet support — ICP, EVM, and Solana wallets. Wallet connection activates at Milestone 5 (Internet Identity) and Milestone 6 (production).</p>
        </div>
        <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-2 mb-8">
          <div className="grid grid-cols-1 gap-2">
            {WALLET_OPTIONS.map(w => (
              <button key={w.id} className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-white/5 transition-all duration-200 group text-left disabled:opacity-60 cursor-not-allowed w-full" disabled aria-disabled="true">
                <div className="text-2xl w-10 text-center shrink-0" aria-hidden="true">{w.icon}</div>
                <div className="flex-1">
                  <div className="font-display text-sm font-semibold text-brand-white group-hover:text-brand-blue transition-colors">{w.name}</div>
                  <div className="text-xs text-brand-muted">{w.description}</div>
                  <div className="flex gap-1 mt-1">{w.chains.map(c=><span key={c} className="badge-blue text-[10px]">{c}</span>)}</div>
                </div>
                <div><span className="badge-gold text-[10px]">Milestone 5</span></div>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 flex items-start gap-4">
          <Lock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
          <div><h3 className="font-display text-sm font-semibold text-brand-white mb-1">Wallet connection coming at Milestone 5</h3><p className="text-xs text-brand-muted">Internet Identity (ICP&apos;s passwordless auth) activates at Milestone 5. EVM and Solana wallets available at production launch (Milestone 6).</p></div>
        </div>
      </div></div>
    </PageLayout>
  );
}