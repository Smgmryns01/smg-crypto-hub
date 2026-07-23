"use client";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AIRDROPS } from "@/data";
import { cn } from "@/lib/utils";

const STATUS_STYLE = { active: "badge-green", upcoming: "badge-blue", ended: "badge text-brand-muted border-brand-border bg-white/5" };
const DIFF_STYLE = { easy: "badge-green", medium: "badge-gold", hard: "badge-red" };

export default function AirdropsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const shown = AIRDROPS.filter(a => (filter === "all" || a.status === filter) && (search === "" || a.project.toLowerCase().includes(search.toLowerCase())));
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-wide">
        <div className="mb-10 text-center">
          <div className="badge-blue mb-4 mx-auto w-fit">Airdrops</div>
          <h1 className="font-display text-display-md font-extrabold text-brand-white text-balance">Web3 <span className="gradient-text">Opportunities</span></h1>
          <p className="mt-4 text-brand-muted max-w-xl mx-auto">Discover airdrop opportunities, ICP grants, and Web3 campaigns. Filters and search ready for live data at Milestone 6.</p>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted pointer-events-none" aria-hidden="true" /><input type="search" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} className="input pl-11" aria-label="Search airdrops" /></div>
          <div className="flex gap-2" role="group" aria-label="Filter by status">
            {["all","active","upcoming","ended"].map(s => <button key={s} onClick={()=>setFilter(s)} className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-all", filter===s ? "bg-brand-blue text-white" : "border border-brand-border text-brand-muted hover:text-brand-white")} aria-pressed={filter===s}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>)}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map(a => (
            <div key={a.id} className="card flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div><h2 className="font-display text-base font-semibold text-brand-white">{a.project}</h2><p className="text-xs text-brand-muted mt-1">{a.chain}</p></div>
                <span className={"badge " + STATUS_STYLE[a.status]}>{a.status}</span>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">{a.description}</p>
              <div className="flex items-center gap-3">
                <span className={"badge " + DIFF_STYLE[a.difficulty]}>{a.difficulty}</span>
                <span className="text-xs text-brand-muted">{a.estimatedReward}</span>
              </div>
              <div><p className="text-xs font-medium text-brand-muted mb-2">Requirements</p><ul className="space-y-1">{a.requirements.map(r=><li key={r} className="text-xs text-brand-muted flex gap-2"><span className="text-brand-blue mt-0.5" aria-hidden="true">•</span>{r}</li>)}</ul></div>
              {a.endDate && <p className="text-xs text-brand-muted">Deadline: {a.endDate}</p>}
            </div>
          ))}
        </div>
        {shown.length === 0 && <div className="text-center py-16 text-brand-muted">No airdrops match your search.</div>}
      </div></div>
    </PageLayout>
  );
}