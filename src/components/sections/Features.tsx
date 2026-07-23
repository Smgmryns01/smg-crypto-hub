import {
  Shield,
  Globe,
  Smartphone,
  Award,
  Users,
  Zap,
  BookOpen,
  Lock,
  TrendingUp,
} from "lucide-react";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    description:
      "Six curriculum tracks from Beginner to Advanced: Crypto Basics, Blockchain, DeFi, NFTs, Security, and ICP Development.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: Award,
    title: "Verifiable Certificates",
    description:
      "Earn certificates with unique IDs. On-chain verification via ICP's certificate canister activates at Milestone 5.",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    border: "border-brand-gold/20",
  },
  {
    icon: Users,
    title: "Verified Mentors",
    description:
      "Learn from vetted African Web3 practitioners — experts who are active builders, not just teachers.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Globe,
    title: "4 Languages",
    description:
      "Available in English, French, Portuguese, and Swahili at launch. Hausa, Yoruba, and Amharic coming in Version 2.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Designed for Africa's smartphone-first internet population. No app download needed — fully browser-native.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Zap,
    title: "ICP Powered",
    description:
      "Built on Internet Computer Protocol — on-chain certificates, Internet Identity login, and reverse-gas interactions.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: Shield,
    title: "Open Source & MIT",
    description:
      "Fully open-source under the MIT Licence. 69 source files, 17 routes, 15 ICP integration points — all auditable.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: TrendingUp,
    title: "Geography-Free Income",
    description:
      "Web3 skills earn globally. African developers trained on ICP can contribute to protocols anywhere, paid in ckUSDT.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
  {
    icon: Lock,
    title: "Free to Start",
    description:
      "Beginner courses are completely free. Scholarship coupons available for learners who cannot afford paid content.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
] as const;

export function Features() {
  return (
    <section className="section" aria-labelledby="features-heading">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="badge-blue mb-4 mx-auto w-fit">Why SMG Crypto Hub</div>
          <h2
            id="features-heading"
            className="font-display text-display-md font-bold text-brand-white text-balance"
          >
            Built for real learners,{" "}
            <span className="gradient-text">real outcomes</span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-balance">
            Every design decision exists to remove barriers between an African
            learner and a globally portable Web3 career.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, color, bg, border }) => (
            <div
              key={title}
              className="card group"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg} border ${border} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
              </div>
              <h3 className="font-display text-base font-semibold text-brand-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
