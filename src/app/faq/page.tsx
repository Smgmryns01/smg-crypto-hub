"use client";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/constants/site";

const FAQS = [
  { q: "Is SMG Crypto Hub free to join?", a: "Yes. Creating an account and accessing introductory courses is completely free. Some advanced courses may have a fee (ICP, ckUSDT, or card) — you always see the price before enrolling." },
  { q: "What does SMG stand for?", a: "SMG stands for Smart Modern Growth. Full name: SMG Crypto Hub (Smart Modern Growth Crypto Hub)." },
  { q: "Is the platform live?", a: "The platform is in active development. v0.1.0 (Milestone 1) is complete. Full deployment is planned for Milestone 6. Follow @smgcryptohub for updates." },
  { q: "Why is it built on ICP?", a: "Internet Computer Protocol's specific properties directly address Africa's Web3 access barriers: Internet Identity removes seed phrases, reverse-gas means learners pay nothing, on-chain certificates verify without trusting the platform, and canister hosting is geography-independent." },
  { q: "Does SMG Crypto Hub have a token?", a: "No native token has been launched in Version 1.0. Any future SCH (SMG Crypto Hub) token will be announced through the official roadmap and project documentation." },
  { q: "How do certificates work?", a: "At Milestone 1, certificates carry unique IDs and a public verification URL. At Milestone 5, certificate hashes are registered on ICP's certificate_canister — making them trustlessly verifiable by any employer or DAO." },
  { q: "Which languages does the platform support?", a: "The platform launches in English (EN), French (FR), Portuguese (PT), and Swahili (SW). Hausa, Yoruba, and Amharic are planned for Version 2." },
  { q: "Is the code open source?", a: "Yes. MIT licensed. Full source at github.com/Smgmryns01/smg-crypto-hub." },
  { q: "How can I contribute?", a: "Fork the repo, create a branch, make your changes, open a PR. See CONTRIBUTING.md for the full guide including the 29-item PR checklist." },
  { q: "How do I report a security issue?", a: "Report privately via smgcryptohub@gmail.com with subject [SECURITY]. Never publicly disclose vulnerabilities. See SECURITY.md for the full responsible disclosure policy." },
  { q: "Is SMG Crypto Hub an official DFINITY partner?", a: "No. We are an open-source project building on ICP. We are not an official DFINITY partner or DFINITY Ambassador. We do acknowledge the DFINITY Foundation for building ICP." },
  { q: "What is the refund policy?", a: "A 7-day refund policy applies if fewer than 20% of lessons have been completed. The Support Centre (available after Milestone 6 deployment) handles refund requests." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-narrow">
        <div className="mb-12 text-center">
          <div className="badge-blue mb-4 mx-auto w-fit">FAQ</div>
          <h1 className="font-display text-display-md font-extrabold text-brand-white text-balance">Frequently Asked <span className="gradient-text">Questions</span></h1>
        </div>
        <dl className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className={"rounded-2xl border transition-all duration-200 overflow-hidden " + (open===i ? "border-brand-blue/30 bg-brand-card" : "border-brand-border bg-brand-card/60")}>
              <dt>
                <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i} aria-controls={"faq-"+i}>
                  <span className="font-display text-sm font-semibold text-brand-white">{faq.q}</span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-brand-muted transition-transform duration-200", open===i && "rotate-180")} aria-hidden="true" />
                </button>
              </dt>
              {open===i && <dd id={"faq-"+i} className="px-6 pb-5"><p className="text-sm text-brand-muted leading-relaxed">{faq.a}</p></dd>}
            </div>
          ))}
        </dl>
        <div className="mt-10 rounded-2xl border border-brand-border bg-brand-card/40 p-8 text-center">
          <h3 className="font-display text-base font-semibold text-brand-white mb-2">Still have questions?</h3>
          <p className="text-sm text-brand-muted mb-4">Reach us at <a href={"mailto:"+SITE.email} className="text-brand-blue hover:text-brand-blue-glow">{SITE.email}</a> or join our <a href={SITE.telegramChannel} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-brand-blue-glow">🟡 Official Channel</a>{" "}or <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-brand-blue-glow">🔵 Community Group</a>.</p>
        </div>
      </div></div>
    </PageLayout>
  );
}