import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";
import { BookOpen, Award, Star, Bell, Wallet, Settings, User, Bookmark } from "lucide-react";

const DASHBOARD_SECTIONS = [
  { icon: User, title: "Profile", desc: "Your account details and public profile.", href: "/dashboard/profile", available: false },
  { icon: BookOpen, title: "My Courses", desc: "Continue learning from where you left off.", href: "/dashboard/courses", available: false },
  { icon: Award, title: "Certificates", desc: "Your earned and pending certificates.", href: "/dashboard/certificates", available: false },
  { icon: Star, title: "Achievements", desc: "XP, levels, and learning milestones.", href: "/dashboard/achievements", available: false },
  { icon: Bookmark, title: "Bookmarks", desc: "Saved courses and resources.", href: "/dashboard/bookmarks", available: false },
  { icon: Bell, title: "Notifications", desc: "Platform updates and learning reminders.", href: "/dashboard/notifications", available: false },
  { icon: Wallet, title: "Wallet", desc: "Connected wallets and payment history.", href: "/dashboard/wallet", available: false },
  { icon: Settings, title: "Settings", desc: "Account preferences and security.", href: "/dashboard/settings", available: false },
];

export default function DashboardPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-wide">
        <div className="mb-10">
          <div className="badge-blue mb-4 w-fit">Dashboard</div>
          <h1 className="font-display text-display-md font-extrabold text-brand-white">Learning <span className="gradient-text">Dashboard</span></h1>
          <p className="mt-3 text-brand-muted">Your personal learning hub — courses, certificates, achievements, and wallet.</p>
        </div>
        <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 mb-8">
          <h2 className="font-display text-base font-semibold text-brand-white mb-1">📅 Dashboard activates at Milestone 2</h2>
          <p className="text-sm text-brand-muted">Course progress, certificates, and profile features require the Academy (Milestone 2) and Certificate system (Milestone 3) to be complete. The UI is fully built and waiting for backend integration at Milestone 5 (ICP canisters).</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_SECTIONS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card opacity-70 cursor-not-allowed">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 border border-brand-blue/20 mb-4"><Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" /></div>
              <h3 className="font-display text-sm font-semibold text-brand-white mb-1">{title}</h3>
              <p className="text-xs text-brand-muted">{desc}</p>
              <span className="badge-gold mt-3 block w-fit text-[10px]">Coming Soon</span>
            </div>
          ))}
        </div>
      </div></div>
    </PageLayout>
  );
}