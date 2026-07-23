import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";

const MILESTONES = [
  {
    version: "v0.1.0",
    label: "Milestone 1",
    title: "Foundation",
    description: "Platform scaffold, authentication, student dashboard, mentor directory, governance docs.",
    status: "complete" as const,
    items: ["69 source files", "17 page routes", "15 ICP integration points", "MIT licensed"],
  },
  {
    version: "v0.2.0",
    label: "Milestone 2",
    title: "Academy",
    description: "Course catalogue, lesson viewer, progress tracking.",
    status: "planned" as const,
    items: ["Course listing", "Lesson viewer", "Progress tracking", "XP system"],
  },
  {
    version: "v0.3.0",
    label: "Milestone 3",
    title: "Certificates",
    description: "Certificate verification page, PDF, QR code, Mentor and Admin Dashboards.",
    status: "planned" as const,
    items: ["On-chain cert prep", "PDF certificates", "Mentor Dashboard", "Admin Dashboard"],
  },
  {
    version: "v0.4.0",
    label: "Milestone 4",
    title: "Payments",
    description: "Live payments via ICP, ckUSDT, and card. Scholarships and coupons.",
    status: "planned" as const,
    items: ["ICP payments", "ckUSDT payments", "Scholarship coupons", "Referral payouts"],
  },
  {
    version: "v0.5.0",
    label: "Milestone 5",
    title: "ICP Integration",
    description: "All 15 stubs replaced by live canisters. Internet Identity. On-chain certificates.",
    status: "planned" as const,
    items: ["Internet Identity", "On-chain certs", "Motoko canisters", "ICP mainnet"],
  },
  {
    version: "v1.0.0",
    label: "Milestone 6",
    title: "Production",
    description: "Full deployment: Vercel frontend, ICP mainnet canisters, security audit.",
    status: "planned" as const,
    items: ["Production deploy", "Security audit", "i18n routing", "Full launch"],
  },
] as const;

type Status = "complete" | "planned" | "current";

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === "complete")
    return <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-label="Complete" />;
  if (status === "current")
    return <Clock className="h-5 w-5 text-brand-gold" aria-label="In progress" />;
  return <Circle className="h-5 w-5 text-brand-border" aria-label="Planned" />;
};

export function RoadmapPreview() {
  return (
    <section className="section bg-brand-black/50" aria-labelledby="roadmap-heading">
      <div className="container-wide">
        <div className="mb-12 text-center">
          <div className="badge-blue mb-4 mx-auto w-fit">Development Roadmap</div>
          <h2
            id="roadmap-heading"
            className="font-display text-display-md font-bold text-brand-white text-balance"
          >
            From foundation to{" "}
            <span className="gradient-text">full ICP deployment</span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
            Six milestones, each building on the last. Milestone 1 is complete.
            No invented timelines — delivery depends on grant funding and development capacity.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400 via-brand-blue/30 to-transparent sm:left-1/2 sm:-translate-x-px hidden sm:block"
            aria-hidden="true"
          />

          <ol className="space-y-6">
            {MILESTONES.map((milestone, index) => (
              <li key={milestone.version} className="relative">
                <div
                  className={`flex flex-col sm:flex-row gap-6 sm:items-center ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className="flex-1">
                    <div
                      className={`rounded-2xl border p-6 transition-all duration-300 ${
                        milestone.status === "complete"
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : "border-brand-border bg-brand-card/60 hover:border-brand-blue/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <StatusIcon status={milestone.status} />
                        <div>
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <span className="text-xs font-mono font-medium text-brand-blue">
                              {milestone.version}
                            </span>
                            <span className="text-xs text-brand-muted">{milestone.label}</span>
                            {milestone.status === "complete" && (
                              <span className="badge-green text-[10px]">Complete</span>
                            )}
                          </div>
                          <h3 className="font-display text-base font-semibold text-brand-white mb-1">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-brand-muted mb-3 leading-relaxed">
                            {milestone.description}
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {milestone.items.map((item) => (
                              <li
                                key={item}
                                className="text-xs rounded-md bg-white/5 border border-brand-border px-2 py-1 text-brand-muted"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot — hidden on mobile */}
                  <div className="hidden sm:flex shrink-0 w-3 h-3 rounded-full bg-brand-blue border-2 border-brand-black mx-auto" aria-hidden="true" />

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden sm:block" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 text-center">
          <Link href="/roadmap" className="btn-secondary">
            View Full Roadmap
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
