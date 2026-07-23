import { PageLayout } from "@/components/layout/PageLayout";
import { BookOpen, Shield, Coins, Layers, Users, Lock, Code, Globe } from "lucide-react";

const TOPICS = [
  { icon: Globe, title: "What is Web3?", desc: "The decentralised internet — ownership, trust, and programmable money without intermediaries.", level: "Beginner" },
  { icon: Coins, title: "Crypto Wallets", desc: "Self-custodial wallets, seed phrases, Internet Identity, and hardware security.", level: "Beginner" },
  { icon: Layers, title: "DeFi", desc: "Decentralised exchanges, liquidity pools, lending, and yield farming explained.", level: "Intermediate" },
  { icon: Globe, title: "NFTs", desc: "Non-fungible tokens, ICRC-7, creator economy, and digital ownership.", level: "Beginner" },
  { icon: Users, title: "DAOs", desc: "Decentralised Autonomous Organisations — how they govern, vote, and operate.", level: "Intermediate" },
  { icon: Code, title: "Smart Contracts", desc: "Programmable agreements on blockchains — from Solidity to Motoko.", level: "Intermediate" },
  { icon: Shield, title: "Web3 Security", desc: "Protecting yourself from phishing, rug pulls, and smart contract exploits.", level: "Beginner" },
  { icon: Layers, title: "Blockchain Architecture", desc: "Consensus mechanisms, validators, blocks, and distributed ledgers.", level: "Intermediate" },
  { icon: Lock, title: "Cryptography", desc: "Public/private keys, hashing, digital signatures — the math behind trust.", level: "Advanced" },
  { icon: Globe, title: "Layer 1 & Layer 2", desc: "Base chains, scaling solutions, rollups, and cross-chain bridges.", level: "Advanced" },
];

const LEVEL_STYLE: Record<string, string> = {
  Beginner: "badge-green", Intermediate: "badge-blue", Advanced: "badge-gold",
};

export default function LearnWeb3Page() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <div className="badge-blue mb-4 mx-auto w-fit">Learn Web3</div>
            <h1 className="font-display text-display-lg font-extrabold text-brand-white text-balance">
              Understanding <span className="gradient-text">Web3</span>
            </h1>
            <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
              From first principles to advanced concepts. Web3 education structured for real understanding, not hype.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map(({ icon: Icon, title, desc, level }) => (
              <div key={title} className="card group">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 border border-brand-blue/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-display text-sm font-semibold text-brand-white">{title}</h2>
                      <span className={"badge " + LEVEL_STYLE[level] + " text-[10px]"}>{level}</span>
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-8 text-center">
            <span className="badge-gold mb-4 mx-auto w-fit block">📅 Milestone 2</span>
            <h3 className="font-display text-lg font-semibold text-brand-white mb-2">Full lesson content at Milestone 2</h3>
            <p className="text-sm text-brand-muted">Each topic becomes a full interactive lesson with quizzes and certificates.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}