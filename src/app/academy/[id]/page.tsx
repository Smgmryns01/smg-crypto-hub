import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  Lock,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { COURSES } from "@/data";
import { cn } from "@/lib/utils";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return COURSES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id);
  if (!course) return { title: "Course Not Found | SMG Crypto Hub" };

  return {
    title: `${course.title} | SMG Crypto Hub Academy`,
    description: course.description,
    openGraph: {
      title: `${course.title} | SMG Crypto Hub`,
      description: course.description,
    },
  };
}

const LEVEL_BADGE: Record<string, { label: string; className: string }> = {
  beginner: { label: "Beginner", className: "badge-green" },
  intermediate: { label: "Intermediate", className: "badge-blue" },
  advanced: { label: "Advanced", className: "badge-gold" },
};

// Deterministic lesson titles per course (no random generation)
const SAMPLE_MODULES: Record<string, { module: string; lessons: string[] }[]> = {
  "crypto-101": [
    { module: "What is Money?", lessons: ["History of money", "Digital money basics", "Why Bitcoin was created"] },
    { module: "Bitcoin Fundamentals", lessons: ["How Bitcoin works", "Mining explained", "Wallets and keys"] },
    { module: "Beyond Bitcoin", lessons: ["Ethereum overview", "Altcoins landscape", "Stablecoins"] },
    { module: "Getting Started Safely", lessons: ["Choosing an exchange", "Wallet security", "Common scams to avoid"] },
  ],
  "blockchain-basics": [
    { module: "Distributed Systems", lessons: ["What is a ledger?", "Centralised vs decentralised", "The Byzantine problem"] },
    { module: "Consensus Mechanisms", lessons: ["Proof of Work", "Proof of Stake", "Other consensus models"] },
    { module: "Chain Architecture", lessons: ["Blocks and transactions", "Merkle trees", "Hash functions"] },
    { module: "Real Applications", lessons: ["Smart contract platforms", "Layer 2 networks", "Cross-chain bridges"] },
  ],
  "icp-intro": [
    { module: "Internet Computer Basics", lessons: ["What is ICP?", "Why ICP is different", "The DFINITY Foundation"] },
    { module: "Canisters", lessons: ["What are canisters?", "Code + state combined", "Canister lifecycle"] },
    { module: "Key Protocols", lessons: ["Internet Identity", "NNS governance", "Chain-key cryptography"] },
    { module: "Developer Quickstart", lessons: ["SDK setup", "Your first canister", "Deploying to mainnet"] },
  ],
};

const getModules = (courseId: string) =>
  SAMPLE_MODULES[courseId] ?? [
    { module: "Introduction", lessons: ["Overview", "Getting started", "Core concepts"] },
    { module: "Core Content", lessons: ["Deep dive", "Practical examples", "Best practices"] },
    { module: "Advanced Topics", lessons: ["Edge cases", "Real-world applications", "Next steps"] },
  ];

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id);

  if (!course) notFound();

  const levelBadge = LEVEL_BADGE[course.level];
  const modules = getModules(course.id);
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">
          {/* Back */}
          <Link
            href="/academy"
            className="btn-ghost text-sm mb-8 block w-fit"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Academy
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={cn("badge", levelBadge.className)}>
                    {levelBadge.label}
                  </span>
                  {course.featured && (
                    <span className="badge badge-gold">Featured</span>
                  )}
                </div>
                <h1 className="font-display text-display-sm font-extrabold text-brand-white text-balance">
                  {course.title}
                </h1>
                <p className="mt-4 text-brand-muted leading-relaxed">
                  {course.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/5 border border-brand-border px-2.5 py-1 text-xs text-brand-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Clock, label: "Duration", value: course.duration },
                  { icon: BookOpen, label: "Lessons", value: `${totalLessons} lessons` },
                  { icon: Award, label: "Certificate", value: "On completion" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-brand-border bg-brand-card/60 p-4 text-center"
                  >
                    <Icon className="h-5 w-5 text-brand-blue mx-auto mb-2" aria-hidden="true" />
                    <div className="text-xs text-brand-muted">{label}</div>
                    <div className="text-sm font-semibold text-brand-white mt-0.5">{value}</div>
                  </div>
                ))}
              </div>

              {/* Curriculum */}
              <div>
                <h2 className="font-display text-lg font-semibold text-brand-white mb-5">
                  Curriculum
                </h2>
                <div className="space-y-3">
                  {modules.map((mod, modIdx) => (
                    <div
                      key={mod.module}
                      className="rounded-2xl border border-brand-border bg-brand-card/60 overflow-hidden"
                    >
                      <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-border/50">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-bold text-brand-blue">
                          {modIdx + 1}
                        </span>
                        <span className="font-display text-sm font-semibold text-brand-white">
                          {mod.module}
                        </span>
                        <span className="ml-auto text-xs text-brand-muted">
                          {mod.lessons.length} lessons
                        </span>
                      </div>
                      <ul className="divide-y divide-brand-border/30">
                        {mod.lessons.map((lesson, lessonIdx) => (
                          <li
                            key={lesson}
                            className="flex items-center gap-3 px-5 py-3"
                          >
                            {lessonIdx === 0 && modIdx === 0 ? (
                              <CheckCircle
                                className="h-4 w-4 text-emerald-400 shrink-0"
                                aria-label="Preview available"
                              />
                            ) : (
                              <Lock
                                className="h-4 w-4 text-brand-muted/50 shrink-0"
                                aria-label="Locked — available at Milestone 2"
                              />
                            )}
                            <span className="text-sm text-brand-muted">{lesson}</span>
                            {lessonIdx === 0 && modIdx === 0 && (
                              <span className="ml-auto text-xs text-emerald-400">Preview</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — Enrol card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-brand-border bg-brand-card p-6 space-y-5">
                {/* Thumbnail placeholder */}
                <div className="rounded-xl bg-gradient-to-br from-brand-blue/20 to-icp-secondary/10 border border-brand-border h-40 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-brand-blue/40" aria-hidden="true" />
                </div>

                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-brand-white">Free</div>
                  <div className="text-xs text-brand-muted">for Beginner tier</div>
                </div>

                <button
                  disabled
                  aria-disabled="true"
                  className="btn-primary w-full justify-center py-4 opacity-60 cursor-not-allowed"
                >
                  Enrol — Available at Milestone 2
                </button>

                <div className="rounded-xl bg-brand-gold/5 border border-brand-gold/20 p-4">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    <span className="font-semibold text-brand-gold">📅 Milestone 2</span>
                    {" "}— Full lesson content, progress tracking, and enrolment activate at v0.2.0.
                  </p>
                </div>

                <ul className="space-y-3 pt-2">
                  {[
                    { icon: Clock, text: course.duration + " total" },
                    { icon: BookOpen, text: totalLessons + " lessons" },
                    { icon: Award, text: "Certificate on completion" },
                    { icon: Users, text: "Community support" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm text-brand-muted">
                      <Icon className="h-4 w-4 text-brand-blue shrink-0" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
