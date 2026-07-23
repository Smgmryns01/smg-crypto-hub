import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";
import { SITE } from "@/constants/site";
import { Send, Github, Twitter, BookOpen, Users, Code, Radio } from "lucide-react";

const CHANNELS = [
  {
    icon: Radio,
    title: "🟡 Official Channel",
    badge: "Official Channel",
    badgeClass: "badge-gold",
    desc: "Follow the official SMG Crypto Hub broadcast channel for announcements, platform updates, and release news.",
    href: "https://t.me/SMGCryptohHubChannel",
    cta: "Join Official Channel",
    external: true,
  },
  {
    icon: Send,
    title: "🔵 Community Group",
    badge: "Community Group",
    badgeClass: "badge-blue",
    desc: "Join the community discussion group for learner support, Web3 conversations, and peer connections.",
    href: SITE.telegram,
    cta: "Join Community Chat",
    external: true,
  },
  {
    icon: Twitter,
    title: "Twitter / X",
    badge: null,
    badgeClass: "",
    desc: "Follow @smgcryptohub for platform updates, Web3 news, and community highlights.",
    href: SITE.twitter,
    cta: "Follow Us",
    external: true,
  },
  {
    icon: Github,
    title: "GitHub",
    badge: null,
    badgeClass: "",
    desc: "Contribute code, report issues, or read the source. MIT licensed and open to all.",
    href: SITE.github,
    cta: "View Repository",
    external: true,
  },
  {
    icon: BookOpen,
    title: "Academy",
    badge: null,
    badgeClass: "",
    desc: "Learn together. Access all courses, earn certificates, and grow your Web3 skills.",
    href: "/academy",
    cta: "Start Learning",
    external: false,
  },
] as const;

export default function CommunityPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <div className="badge-blue mb-4 mx-auto w-fit">Community</div>
            <h1 className="font-display text-display-md font-extrabold text-brand-white text-balance">
              Build the future of{" "}
              <span className="gradient-text">Web3 in Africa</span>
            </h1>
            <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
              Our mentors are practitioners, not just teachers. Our learners become
              contributors. Growth here is collective, not competitive.
            </p>
          </div>

          {/* Telegram highlight banner */}
          <div className="mb-10 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6">
            <h2 className="font-display text-base font-semibold text-brand-white mb-4 flex items-center gap-2">
              <Radio className="h-4 w-4 text-brand-gold" aria-hidden="true" />
              Telegram — Two Ways to Connect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-brand-gold/20 bg-brand-black/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge-gold text-[10px]">Official Channel</span>
                </div>
                <p className="text-xs text-brand-muted mb-3 leading-relaxed">
                  Announcements, platform updates, and release news. Follow for official information only.
                </p>
                <a
                  href="https://t.me/SMGCryptohHubChannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-brand-gold hover:text-brand-gold-light transition-colors"
                  aria-label="Join SMG Crypto Hub Official Telegram Channel (opens in new tab)"
                >
                  t.me/SMGCryptohHubChannel →
                </a>
              </div>
              <div className="rounded-xl border border-brand-blue/20 bg-brand-black/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge-blue text-[10px]">Community Chat</span>
                </div>
                <p className="text-xs text-brand-muted mb-3 leading-relaxed">
                  Learner discussions, peer support, and Web3 conversations with the community.
                </p>
                <a
                  href={SITE.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-brand-blue hover:text-brand-blue-glow transition-colors"
                  aria-label="Join SMG Crypto Hub Telegram Community Group — learner discussions (opens in new tab)"
                >
                  t.me/SMGCryptoHubCommunity →
                </a>
              </div>
            </div>
          </div>

          {/* All channels */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map(({ icon: Icon, title, badge, badgeClass, desc, href, cta, external }) => (
              <div key={title} className="card-glow group flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 border border-brand-blue/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-brand-blue" aria-hidden="true" />
                  </div>
                  {badge && (
                    <span className={`badge ${badgeClass}`}>{badge}</span>
                  )}
                </div>
                <h2 className="font-display text-base font-semibold text-brand-white mb-2">
                  {title}
                </h2>
                <p className="text-sm text-brand-muted mb-5 leading-relaxed flex-1">{desc}</p>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm w-fit"
                    aria-label={`${cta} (opens in new tab)`}
                  >
                    {cta}
                  </a>
                ) : (
                  <Link href={href} className="btn-primary text-sm w-fit">
                    {cta}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Role cards */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              [Users, "Learners", "Free beginner courses for everyone."],
              [Code, "Contributors", "MIT licence — fork, improve, contribute."],
              [BookOpen, "Mentors", "Verified practitioners earn from teaching."],
            ].map(([Icon, title, desc]) => (
              <div key={title as string} className="card text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 border border-brand-blue/20 mx-auto mb-4">
                  <Icon className="h-6 w-6 text-brand-blue" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-semibold text-brand-white mb-2">
                  {title as string}
                </h3>
                <p className="text-sm text-brand-muted">{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
