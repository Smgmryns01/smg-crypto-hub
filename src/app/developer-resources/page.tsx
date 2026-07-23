import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Code2, BookOpen, Github, Terminal, Cpu, Globe } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Developer Resources | SMG Crypto Hub",
  description:
    "Tools, references, and guides for building on ICP and Web3. Start with Motoko, canisters, and the Internet Computer SDK.",
};

const RESOURCE_SECTIONS = [
  {
    icon: Cpu,
    title: "Internet Computer (ICP)",
    description: "Core ICP resources — SDK, Motoko, canister development, and deployment.",
    links: [
      { label: "ICP Developer Documentation", href: "https://internetcomputer.org/docs", type: "official" },
      { label: "Motoko Language Guide", href: "https://internetcomputer.org/docs/current/motoko/main/motoko", type: "official" },
      { label: "DFINITY GitHub", href: "https://github.com/dfinity", type: "github" },
      { label: "ICP Developer Forum", href: "https://forum.dfinity.org", type: "community" },
      { label: "ICP Dashboard", href: "https://dashboard.internetcomputer.org", type: "tool" },
    ],
  },
  {
    icon: Terminal,
    title: "Development Tools",
    description: "CLI tools, SDKs, and local development environments for ICP.",
    links: [
      { label: "dfx — ICP SDK CLI", href: "https://internetcomputer.org/docs/current/developer-docs/getting-started/install", type: "tool" },
      { label: "Vessel — Motoko Package Manager", href: "https://github.com/dfinity/vessel", type: "github" },
      { label: "IC Agent (Rust)", href: "https://github.com/dfinity/agent-rs", type: "github" },
      { label: "IC CDK (Rust Canisters)", href: "https://github.com/dfinity/cdk-rs", type: "github" },
    ],
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Tutorials, courses, and community guides for ICP and Web3 development.",
    links: [
      { label: "ICP Hello World Tutorial", href: "https://internetcomputer.org/docs/current/tutorials/developer-liftoff/", type: "tutorial" },
      { label: "Motoko Playground", href: "https://play.motoko.org", type: "tool" },
      { label: "ICP Examples Repository", href: "https://github.com/dfinity/examples", type: "github" },
    ],
  },
  {
    icon: Globe,
    title: "Web3 Standards",
    description: "Protocols, standards, and specifications used across the Web3 ecosystem.",
    links: [
      { label: "ICRC-1 Token Standard", href: "https://github.com/dfinity/ICRC-1", type: "standard" },
      { label: "ICRC-7 NFT Standard", href: "https://github.com/dfinity/ICRC-NFT-WG", type: "standard" },
      { label: "Ethereum EIPs", href: "https://eips.ethereum.org", type: "standard" },
      { label: "WalletConnect Docs", href: "https://docs.walletconnect.com", type: "official" },
    ],
  },
  {
    icon: Github,
    title: "SMG Crypto Hub Codebase",
    description: "The SMG Crypto Hub open-source repository — architecture, integration points, and contribution guides.",
    links: [
      { label: "GitHub Repository", href: SITE.github, type: "github" },
      { label: "CONTRIBUTING.md", href: `${SITE.github}/blob/main/CONTRIBUTING.md`, type: "docs" },
      { label: "ARCHITECTURE.md", href: `${SITE.github}/blob/main/ARCHITECTURE.md`, type: "docs" },
      { label: "Open Issues", href: `${SITE.github}/issues`, type: "github" },
    ],
  },
  {
    icon: Code2,
    title: "SMG ICP Integration Points",
    description: "The 15 annotated ICP integration stubs in the v0.1.0 codebase — each will become a live canister call at Milestone 5.",
    links: [
      { label: "auth/service.ts — authentication canister", href: `${SITE.github}/blob/main/src/lib/auth/service.ts`, type: "code" },
      { label: "dashboard/data.ts — user canister", href: `${SITE.github}/blob/main/src/lib/dashboard/data.ts`, type: "code" },
      { label: "src/types/auth.ts — AuthResult<T>", href: `${SITE.github}/blob/main/src/types/auth.ts`, type: "code" },
    ],
  },
] as const;

const TYPE_BADGE: Record<string, { label: string; className: string }> = {
  official: { label: "Official", className: "badge-blue" },
  github: { label: "GitHub", className: "badge text-brand-muted border-brand-border bg-white/5" },
  community: { label: "Community", className: "badge-purple" },
  tool: { label: "Tool", className: "badge-green" },
  tutorial: { label: "Tutorial", className: "badge-gold" },
  standard: { label: "Standard", className: "badge-blue" },
  docs: { label: "Docs", className: "badge-blue" },
  code: { label: "Code", className: "badge text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
};

export default function DeveloperResourcesPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-12">
            <div className="badge-blue mb-4 w-fit">Developer Resources</div>
            <h1 className="font-display text-display-lg font-extrabold text-brand-white text-balance">
              Build on{" "}
              <span className="gradient-text">ICP &amp; Web3</span>
            </h1>
            <p className="mt-4 text-brand-muted max-w-2xl leading-relaxed">
              Everything you need to start building on the Internet Computer Protocol —
              from your first canister to production-grade dApps.
            </p>
          </div>

          {/* Resource Sections */}
          <div className="space-y-8">
            {RESOURCE_SECTIONS.map(({ icon: Icon, title, description, links }) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-border bg-brand-card/60 p-6"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 border border-brand-blue/20">
                    <Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-semibold text-brand-white">
                      {title}
                    </h2>
                    <p className="text-sm text-brand-muted mt-1">{description}</p>
                  </div>
                </div>

                <ul className="space-y-2 ml-15">
                  {links.map((link) => {
                    const badge = TYPE_BADGE[link.type] ?? TYPE_BADGE.official;
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/5 transition-all duration-200 group"
                        >
                          <span className="flex-1 text-sm text-brand-muted group-hover:text-brand-white transition-colors">
                            {link.label}
                          </span>
                          <span className={`badge text-[10px] ${badge.className}`}>
                            {badge.label}
                          </span>
                          <ExternalLink
                            className="h-3.5 w-3.5 text-brand-muted/50 group-hover:text-brand-muted transition-colors shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* ICP Grant CTA */}
          <div className="mt-12 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-8">
            <h3 className="font-display text-lg font-bold text-brand-white mb-2">
              ICP Developer Grants
            </h3>
            <p className="text-sm text-brand-muted mb-5 leading-relaxed max-w-2xl">
              The DFINITY Foundation funds open-source projects building on ICP.
              SMG Crypto Hub is applying for grant funding to complete Milestones 2–5.
              If you&apos;re building on ICP, explore the official grant programme.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://dfinity.org/grants"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Explore ICP Grants
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <Link href="/icp-ecosystem" className="btn-secondary text-sm">
                ICP Ecosystem Overview
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
