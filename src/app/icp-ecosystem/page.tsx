import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";

const ICP_CONCEPTS = [
  { emoji: "⛓", title: "Internet Computer", desc: "A layer-1 blockchain designed to host entire applications on-chain at web speed." },
  { emoji: "📦", title: "Canisters", desc: "Smart contracts on ICP that bundle code and state — no separate database or server needed." },
  { emoji: "♻️", title: "Cycles", desc: "ICP's stable computation unit (XDR-pegged) — the platform pays, learners pay nothing." },
  { emoji: "🏛", title: "NNS", desc: "Network Nervous System — ICP's on-chain governance for protocol upgrades and canister management." },
  { emoji: "🔐", title: "Internet Identity", desc: "Passwordless Web3 auth — biometric/device-based, no seed phrase, no wallet install." },
  { emoji: "₿", title: "ckBTC", desc: "Chain-key Bitcoin on ICP — fully backed BTC usable in ICP canisters." },
  { emoji: "Ξ", title: "ckETH", desc: "Chain-key Ethereum on ICP — ETH available in the ICP ecosystem." },
  { emoji: "💵", title: "ckUSDT", desc: "ICP's native stablecoin — used for platform payments and mentor income." },
  { emoji: "🪙", title: "ICP Token", desc: "Native governance and fuel token — stake in the NNS to earn voting rewards." },
  { emoji: "🧑‍💻", title: "Motoko", desc: "ICP's native programming language — actor-based, designed for distributed computation." },
  { emoji: "🏆", title: "Grant Program", desc: "DFINITY Foundation grant funding for ICP ecosystem builders — SMG Crypto Hub is applying." },
  { emoji: "🛠", title: "Hackathons", desc: "Regular ICP hackathons — build canisters and compete for ecosystem prizes." },
];

export default function ICPEcosystemPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <div className="badge-blue mb-4 mx-auto w-fit">⛓ ICP Ecosystem</div>
            <h1 className="font-display text-display-lg font-extrabold text-brand-white text-balance">
              Internet Computer <span className="gradient-text">Protocol</span>
            </h1>
            <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
              The blockchain designed to host entire applications on-chain. SMG Crypto Hub is built on ICP because no other infrastructure simultaneously solves the access, cost, and credential problems Africa&apos;s learners face.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ICP_CONCEPTS.map(({ emoji, title, desc }) => (
              <div key={title} className="card group">
                <div className="text-3xl mb-3" aria-hidden="true">{emoji}</div>
                <h2 className="font-display text-sm font-semibold text-brand-white mb-2 group-hover:text-brand-blue transition-colors">{title}</h2>
                <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div id="grant" className="mt-16 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-8">
            <h2 className="font-display text-xl font-bold text-brand-white mb-4">ICP Grant Program</h2>
            <p className="text-sm text-brand-muted mb-6 max-w-2xl leading-relaxed">
              SMG Crypto Hub is applying for DFINITY Foundation ecosystem grant funding to complete Milestones 2–5 (Academy, Certificates, Payments, and full ICP canister integration). Every grant accelerates Africa&apos;s first dedicated ICP education platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://dfinity.org/grants" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                Learn about ICP Grants
              </a>
              <Link href="/contact" className="btn-secondary text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}