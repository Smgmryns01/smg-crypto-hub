"use client";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { STAKING_ASSETS } from "@/data";
import { cn } from "@/lib/utils";

export default function StakingPage() {
  const [selected, setSelected] = useState(STAKING_ASSETS[0]);
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState(selected.minLockDays);
  const estimated = amount ? (parseFloat(amount) * (selected.apr/100) * (days/365)).toFixed(6) : "—";
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-wide">
        <div className="mb-10">
          <div className="badge-blue mb-4 w-fit">Staking</div>
          <h1 className="font-display text-display-md font-extrabold text-brand-white">Earn <span className="gradient-text">Staking Rewards</span></h1>
          <p className="mt-3 text-brand-muted max-w-xl">Stake supported assets and earn rewards. UI ready — live staking activates at Milestone 4/5.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            {STAKING_ASSETS.map(asset => (
              <button key={asset.symbol} onClick={()=>{setSelected(asset);setDays(asset.minLockDays);}} className={cn("w-full card text-left transition-all duration-200", selected.symbol===asset.symbol ? "border-brand-blue/50 bg-brand-blue/5" : "")}>
                <div className="flex items-center justify-between">
                  <div><div className="font-display font-semibold text-brand-white">{asset.symbol}</div><div className="text-xs text-brand-muted">{asset.name}</div></div>
                  <div className="text-right"><div className="font-display text-lg font-bold text-emerald-400">{asset.apr}%</div><div className="text-xs text-brand-muted">APR</div></div>
                </div>
                {asset.status === "coming-soon" && <span className="badge-gold mt-2 block w-fit text-[10px]">Coming Soon</span>}
              </button>
            ))}
          </div>
          <div className="lg:col-span-2 space-y-5">
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-brand-white mb-5">{selected.name} Staking</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[["APR", selected.apr+"%"], ["Min Lock", selected.minLockDays+" days"], ["Max Lock", selected.maxLockDays+" days"], ["Rewards", selected.rewards.split(" ")[0]]].map(([k,v])=>(
                  <div key={k} className="rounded-xl bg-brand-black/40 border border-brand-border p-3"><div className="text-xs text-brand-muted">{k}</div><div className="font-display font-bold text-brand-white mt-1">{v}</div></div>
                ))}
              </div>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-brand-white mb-1.5" htmlFor="stake-amount">Amount ({selected.symbol})</label><input id="stake-amount" type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder={"Min " + selected.minAmount} min={selected.minAmount} className="input" /></div>
                <div><label className="block text-sm font-medium text-brand-white mb-1.5" htmlFor="stake-days">Lock Period: {days} days</label><input id="stake-days" type="range" min={selected.minLockDays} max={selected.maxLockDays} value={days} onChange={e=>setDays(Number(e.target.value))} className="w-full accent-brand-blue" /></div>
                <div className="rounded-xl bg-brand-black/40 border border-brand-border p-4 flex justify-between items-center">
                  <span className="text-sm text-brand-muted">Estimated reward</span>
                  <span className="font-display font-bold text-emerald-400">{estimated} {selected.symbol}</span>
                </div>
                <button className="btn-primary w-full justify-center py-4" disabled aria-disabled="true">
                  {selected.status === "coming-soon" ? "Coming at Milestone 4/5" : "Stake Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    </PageLayout>
  );
}