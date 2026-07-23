import { PageLayout } from "@/components/layout/PageLayout";
import { CheckCircle2, Circle } from "lucide-react";

const MILESTONES = [
  { version: "v0.1.0", label: "Milestone 1", title: "Foundation", status: "complete", date: "2025-07-08", desc: "Platform scaffold, authentication system, student dashboard, mentor directory (8 mentors), governance documentation suite (5 docs), 15 ICP integration points, MIT licence.", items: ["69 source files", "17 page routes", "15 ICP integration stubs", "AuthResult<T> Motoko-ready", "onChainVerified field typed", "5 governance docs"] },
  { version: "v0.2.0", label: "Milestone 2", title: "Academy", status: "planned", desc: "Course catalogue with lesson viewer, progress tracking, XP system, and first full course content across all six curriculum tracks.", items: ["Course catalogue", "Lesson viewer", "Progress tracking", "XP system", "Course content"] },
  { version: "v0.3.0", label: "Milestone 3", title: "Certificates & Dashboards", status: "planned", desc: "Certificate issuance on completion, public verification page, PDF download, Mentor Dashboard, Admin Dashboard.", items: ["Certificate issuance", "Public /verify page", "PDF + QR code", "Mentor Dashboard", "Admin Dashboard"] },
  { version: "v0.4.0", label: "Milestone 4", title: "Payments & Scholarships", status: "planned", desc: "Live payment processing for ICP, ckUSDT, and card. Scholarship and coupon system. Referral reward payouts.", items: ["ICP payments", "ckUSDT payments", "Card checkout", "Scholarship coupons", "Referral payouts"] },
  { version: "v0.5.0", label: "Milestone 5", title: "ICP Blockchain Integration", status: "planned", desc: "All 15 annotated mock stubs replaced by live Motoko canisters. Internet Identity activated. On-chain certificate registration.", items: ["Internet Identity live", "On-chain certificates", "Motoko canisters", "ICP mainnet deploy", "ckUSDT payments"] },
  { version: "v1.0.0", label: "Milestone 6", title: "Production Release", status: "planned", desc: "Full production deployment on Vercel (frontend) and ICP mainnet (canisters). Security audit, end-to-end tests, i18n routing.", items: ["Vercel deployment", "ICP mainnet", "Security audit", "i18n routing", "Full public launch"] },
];

export default function RoadmapPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <div className="badge-blue mb-4 mx-auto w-fit">Roadmap</div>
            <h1 className="font-display text-display-lg font-extrabold text-brand-white text-balance">
              Development <span className="gradient-text">Milestones</span>
            </h1>
            <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
              Six milestones from foundation to full ICP production deployment. Milestone 1 is complete. No invented delivery dates — timelines depend on grant funding and contributor availability.
            </p>
          </div>
          <div className="space-y-6">
            {MILESTONES.map((m) => (
              <div key={m.version} className={"rounded-2xl border p-6 " + (m.status === "complete" ? "border-emerald-500/30 bg-emerald-500/5" : "border-brand-border bg-brand-card/60")}>
                <div className="flex items-start gap-4">
                  {m.status === "complete" ? <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" aria-label="Complete" /> : <Circle className="h-6 w-6 text-brand-border shrink-0 mt-0.5" aria-label="Planned" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="font-mono text-xs text-brand-blue font-medium">{m.version}</span>
                      <span className="text-xs text-brand-muted">{m.label}</span>
                      {m.status === "complete" ? <span className="badge-green text-[10px]">✅ Complete — {m.date}</span> : <span className="badge text-[10px] bg-brand-border/30 text-brand-muted border border-brand-border">📅 Planned</span>}
                    </div>
                    <h2 className="font-display text-lg font-semibold text-brand-white mb-2">{m.title}</h2>
                    <p className="text-sm text-brand-muted mb-4 leading-relaxed">{m.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {m.items.map((item) => (
                        <span key={item} className="text-xs rounded-md bg-white/5 border border-brand-border px-2 py-1 text-brand-muted">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-2xl border border-brand-border bg-brand-card/30 text-center">
            <p className="text-sm text-brand-muted">
              <span className="font-semibold text-brand-white">Token:</span>{" "}
              No native token has been launched in Version 1.0. Any future SCH token will be announced through the official roadmap and project documentation.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}