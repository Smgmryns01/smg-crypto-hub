"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Globe, Zap, Star } from "lucide-react";
import { SITE } from "@/constants/site";

const STATS = [
  { label: "Courses Available", value: "9+", icon: BookOpen },
  { label: "ICP Integration Points", value: "15", icon: Code2 },
  { label: "Languages Supported", value: "4", icon: Globe },
  { label: "Open Source", value: "MIT", icon: Star },
] as const;

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Background: radial glow */}
      <div
        className="absolute inset-0 bg-radial-glow pointer-events-none"
        aria-hidden="true"
      />

      {/* Background: dot grid */}
      <div
        className="absolute inset-0 bg-grid bg-grid-pattern animate-grid-fade pointer-events-none opacity-40"
        aria-hidden="true"
      />

      {/* Accent orb — the signature element: a distributed network node cluster */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-blue/5 blur-3xl animate-glow-pulse" />

        {/* Network node dots */}
        {[
          { top: "20%", left: "15%", size: 4, delay: "0s", opacity: 0.4 },
          { top: "35%", left: "8%", size: 6, delay: "1.5s", opacity: 0.6 },
          { top: "60%", left: "12%", size: 3, delay: "3s", opacity: 0.3 },
          { top: "75%", left: "25%", size: 5, delay: "0.8s", opacity: 0.5 },
          { top: "15%", right: "20%", size: 5, delay: "2s", opacity: 0.4 },
          { top: "45%", right: "10%", size: 7, delay: "0.5s", opacity: 0.6 },
          { top: "70%", right: "15%", size: 4, delay: "2.5s", opacity: 0.35 },
          { top: "85%", right: "30%", size: 3, delay: "1s", opacity: 0.3 },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-brand-blue animate-float"
            style={{
              top: node.top,
              left: "left" in node ? node.left : undefined,
              right: "right" in node ? node.right : undefined,
              width: node.size,
              height: node.size,
              opacity: node.opacity,
              animationDelay: node.delay,
              boxShadow: `0 0 ${node.size * 3}px rgba(59,130,246,0.6)`,
            }}
          />
        ))}

        {/* Connecting lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="15%" y1="20%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="0.5" />
          <line x1="8%" y1="35%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="0.5" />
          <line x1="80%" y1="15%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="0.5" />
          <line x1="90%" y1="45%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="0.5" />
          <line x1="75%" y1="70%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="0.5" />
          <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container-wide px-4 py-20 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/5 px-4 py-2 text-xs font-medium text-brand-blue-glow backdrop-blur-sm">
            <Zap className="h-3 w-3" aria-hidden="true" />
            Powered by Internet Computer Protocol (ICP)
          </div>

          {/* Headline */}
          <h1 className="font-display text-display-xl sm:text-display-2xl font-extrabold text-balance text-brand-white leading-none tracking-tight">
            Your Gateway to{" "}
            <span className="gradient-text">Web3 Success</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed text-balance">
            SMG Crypto Hub is an open-source Web3 education platform built for{" "}
            <span className="text-brand-white font-medium">Africa</span> and the world.
            Learn blockchain, earn verifiable credentials, and build on ICP.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/academy" className="btn-primary px-8 py-4 text-base w-full sm:w-auto">
              Start Learning Free
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 py-4 text-base w-full sm:w-auto"
            >
              View on GitHub
            </Link>
          </div>

          {/* Deployment notice */}
          <p className="mt-6 text-xs text-brand-muted/60">
            Platform website: smgcryptohub.xyz · {SITE.deploymentStatus}
          </p>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-brand-border bg-brand-card/60 backdrop-blur-sm p-6 hover:border-brand-blue/30 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 border border-brand-blue/20 group-hover:bg-brand-blue/15 transition-all">
                    <Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                  </div>
                </div>
                <div className="font-display text-3xl font-extrabold text-brand-white">
                  {value}
                </div>
                <div className="mt-1 text-xs text-brand-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
