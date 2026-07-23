import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";
import { SITE } from "@/constants/site";

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-narrow">
          <div className="mb-12">
            <div className="badge-blue mb-4 w-fit">About</div>
            <h1 className="font-display text-display-md font-extrabold text-brand-white text-balance">
              About <span className="gradient-text">SMG Crypto Hub</span>
            </h1>
          </div>
          <div className="prose prose-invert max-w-none space-y-8">
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-brand-white mb-3">What is SMG Crypto Hub?</h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                <strong className="text-brand-white">SMG Crypto Hub (Smart Modern Growth Crypto Hub)</strong> is an open-source Web3 education platform built for Africa and the world, powered by the Internet Computer Protocol (ICP) Blockchain. Our mission is to make Web3 education and opportunities accessible to everyone through one trusted platform.
              </p>
            </div>
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-brand-white mb-3">Current Status</h2>
              <p className="text-sm text-brand-muted leading-relaxed mb-3">
                SMG Crypto Hub is in active pre-production development. Version 0.1.0 (Milestone 1) is complete — 69 source files, 17 page routes, 15 ICP integration points, and a full governance documentation suite.
              </p>
              <p className="text-sm text-brand-muted leading-relaxed">
                The platform website ({SITE.url}) will be deployed at Milestone 6. The codebase is publicly available and MIT-licensed on{" "}
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-brand-blue-glow">GitHub</a>.
              </p>
            </div>
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-brand-white mb-3">Vision</h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                To become Africa&apos;s leading Web3 education and crypto ecosystem powered by the Internet Computer (ICP) Blockchain.
              </p>
            </div>
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-brand-white mb-3">Open Source</h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                SMG Crypto Hub is fully open-source under the MIT Licence. Every line of code, every governance document, and every whitepaper chapter is public. Contributions are welcome — see{" "}
                <a href={SITE.github + "/blob/main/CONTRIBUTING.md"} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-brand-blue-glow">CONTRIBUTING.md</a>.
              </p>
            </div>
            <div className="card">
              <h2 className="font-display text-lg font-semibold text-brand-white mb-3">Token Statement</h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                No native token has been launched in Version 1.0. Any future SCH (SMG Crypto Hub) token will be announced through the official roadmap and project documentation.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub Repository</a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}