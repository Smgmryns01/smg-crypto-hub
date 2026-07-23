import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { COURSES } from "@/data";
import { CourseCard } from "@/components/ui/CourseCard";

export default function CryptoBasicsPage() {
  const related = COURSES.filter(c => c.level === "beginner").slice(0,3);
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-wide">
        <Link href="/academy" className="btn-ghost text-sm mb-8 block w-fit"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to Academy</Link>
        <div className="mb-10">
          <div className="badge-blue mb-4 w-fit">Crypto Basics</div>
          <h1 className="font-display text-display-md font-extrabold text-brand-white text-balance">
            Crypto Basics <span className="gradient-text">Course Track</span>
          </h1>
          <p className="mt-4 text-brand-muted max-w-2xl">Master cryptocurrency fundamentals — Bitcoin, Ethereum, wallets, exchanges, and safe storage.</p>
        </div>
        <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-8 mb-10 text-center">
          <BookOpen className="h-12 w-12 text-brand-gold mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display text-lg font-semibold text-brand-white mb-2">Course content coming at Milestone 2</h2>
          <p className="text-sm text-brand-muted mb-4">The full Crypto Basics curriculum is structured and ready. Interactive lessons, quizzes, and certificates activate at Milestone 2 (v0.2.0).</p>
          <a href="https://t.me/SMGCryptohHubChannel" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">Join Telegram for Updates</a>
        </div>
        <h2 className="font-display text-lg font-semibold text-brand-white mb-5">Related Courses</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </div></div>
    </PageLayout>
  );
}