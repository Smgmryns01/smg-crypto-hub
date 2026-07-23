import Link from "next/link";
import { Twitter, Send, Github, MessageSquare, Radio } from "lucide-react";
import { SITE } from "@/constants/site";

const COMMUNITY_LINKS = [
  {
    icon: Radio,
    label: "🟡 Official Channel",
    description: "Announcements & updates",
    href: SITE.telegramChannel,
    external: true,
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    border: "border-brand-gold/20",
  },
  {
    icon: Send,
    label: "🔵 Community Group",
    description: "Learner discussions & support",
    href: SITE.telegram,
    external: true,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    description: "Follow @smgcryptohub",
    href: SITE.twitter,
    external: true,
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: Github,
    label: "GitHub",
    description: "Contribute to the code",
    href: SITE.github,
    external: true,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: MessageSquare,
    label: "Community Hub",
    description: "Discussions & resources",
    href: "/community",
    external: false,
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    border: "border-brand-gold/20",
  },
] as const;

export function CommunityCTA() {
  return (
    <section className="section" aria-labelledby="community-heading">
      <div className="container-wide">
        {/* Main CTA */}
        <div className="relative rounded-3xl overflow-hidden border border-brand-blue/20 bg-gradient-to-br from-brand-blue/10 via-icp-secondary/5 to-transparent p-12 text-center mb-16">
          <div
            className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="badge-blue mb-6 mx-auto w-fit">
              Built for Africa. Open to the World.
            </div>
            <h2
              id="community-heading"
              className="font-display text-display-md font-bold text-brand-white text-balance"
            >
              Join the{" "}
              <span className="gradient-text">SMG Crypto Hub</span>{" "}
              community
            </h2>
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto text-balance">
              Learn together. Build together. Our mentors are practitioners, not just
              teachers. Our learners become contributors.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
              <Link href="/academy" className="btn-primary px-8 py-4 text-base">
                Start Learning Free
              </Link>
              <a
                href={SITE.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 text-base"
                aria-label="Join SMG Crypto Hub Official Telegram Channel (opens in new tab)"
              >
                Join Official Channel
              </a>
            </div>

            <p className="mt-8 text-xs text-brand-muted">
              100% open-source under MIT Licence ·{" "}
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:text-brand-blue-glow transition-colors"
              >
                View on GitHub
              </a>
              {" "}· No token issued in v1.0
            </p>
          </div>
        </div>

        {/* Community Links */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {COMMUNITY_LINKS.map(
            ({ icon: Icon, label, description, href, external, color, bg, border }) => {
              const props = external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <a
                  key={label}
                  href={href}
                  {...props}
                  className="card-glow group flex items-center gap-4 p-5"
                  aria-label={`${label} — ${description}${external ? " (opens in new tab)" : ""}`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} border ${border} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-white group-hover:text-brand-blue transition-colors">
                      {label}
                    </div>
                    <div className="text-xs text-brand-muted">{description}</div>
                  </div>
                </a>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
