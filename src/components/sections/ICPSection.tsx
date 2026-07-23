import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const ICP_PROPERTIES = [
  {
    title: "Internet Identity",
    description: "Passwordless authentication — no seed phrase, no wallet install. Biometrics only.",
    status: "📅 Milestone 5",
  },
  {
    title: "Reverse-Gas Model",
    description: "The platform pays for computation. Learners pay nothing for canister interactions.",
    status: "📅 Milestone 5",
  },
  {
    title: "On-Chain Certificates",
    description: "Certificate hashes registered on the certificate_canister. Trustlessly verifiable.",
    status: "📅 Milestone 5",
  },
  {
    title: "ckUSDT Payments",
    description: "Mentor income in ICP's native stablecoin — no international wire fees.",
    status: "📅 Milestone 4/5",
  },
  {
    title: "Canister Hosting",
    description: "Distributed subnet hosting. No geographic infrastructure dependency.",
    status: "📅 Milestone 5",
  },
  {
    title: "15 Integration Points",
    description: "Codebase has 15 annotated ICP integration points ready for Milestone 5.",
    status: "✅ Built",
  },
] as const;

const ICP_COMPONENTS = [
  { label: "Canisters", desc: "Smart contracts that host code + data" },
  { label: "Cycles", desc: "Stable computation units (XDR-pegged)" },
  { label: "NNS", desc: "Network Nervous System governance" },
  { label: "Internet Identity", desc: "Passwordless Web3 auth" },
  { label: "ckBTC", desc: "Chain-key Bitcoin on ICP" },
  { label: "ckETH", desc: "Chain-key Ethereum on ICP" },
  { label: "ckUSDT", desc: "ICP-native stablecoin" },
  { label: "Motoko", desc: "ICP's native programming language" },
] as const;

export function ICPSection() {
  return (
    <section className="section relative" aria-labelledby="icp-heading">
      {/* Background accent */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-brand-blue/3 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="badge-blue mb-4 mx-auto w-fit">⛓ Internet Computer Protocol</div>
          <h2
            id="icp-heading"
            className="font-display text-display-md font-bold text-brand-white text-balance"
          >
            Why ICP powers this{" "}
            <span className="gradient-text">mission</span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-balance">
            ICP isn&apos;t a preference — it&apos;s the only infrastructure that simultaneously
            removes the seed-phrase barrier, the cost barrier, and the credential credibility
            gap for African learners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* ICP Properties */}
          <div className="space-y-4">
            {ICP_PROPERTIES.map(({ title, description, status }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-brand-border bg-brand-card/60 p-5 hover:border-brand-blue/30 transition-all duration-300"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 border border-brand-blue/20">
                  <Check className="h-3.5 w-3.5 text-brand-blue" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-brand-white">{title}</h3>
                    <span className="text-xs text-brand-muted">{status}</span>
                  </div>
                  <p className="mt-1 text-xs text-brand-muted leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ICP Technology Grid */}
          <div className="flex flex-col justify-between gap-6">
            <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-6">
              <h3 className="font-display text-sm font-semibold text-brand-white mb-4">
                ICP Technology Covered in Courses
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {ICP_COMPONENTS.map(({ label, desc }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-brand-border bg-brand-black/40 p-3 hover:border-brand-blue/30 transition-all duration-200"
                  >
                    <div className="text-xs font-semibold text-brand-blue mb-1">{label}</div>
                    <div className="text-xs text-brand-muted leading-relaxed">{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grant CTA */}
            <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6">
              <h3 className="font-display text-base font-bold text-brand-white mb-2">
                ICP Grant Program
              </h3>
              <p className="text-sm text-brand-muted mb-4 leading-relaxed">
                We&apos;re applying for ICP ecosystem grant funding to complete Milestones 2–5.
                Every grant supports building Africa&apos;s first ICP education platform.
              </p>
              <Link href="/icp-ecosystem#grant" className="btn-secondary text-sm px-4 py-2">
                Learn about the Grant
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Explore CTA */}
        <div className="text-center">
          <Link href="/icp-ecosystem" className="btn-primary px-8 py-4">
            Explore the ICP Ecosystem
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
