"use client";

import Link from "next/link";
import { Zap, Twitter, Github, Send, Mail } from "lucide-react";
import { SITE, FOOTER_LINKS } from "@/constants/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-black" role="contentinfo">
      {/* Newsletter Banner */}
      <div className="border-b border-brand-border">
        <div className="container-wide py-12 px-4">
          <div className="rounded-2xl bg-gradient-to-r from-brand-blue/10 via-icp-secondary/5 to-transparent border border-brand-blue/20 p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold text-brand-white">
                  Stay updated on Web3 &amp; ICP
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Get the latest courses, ecosystem news, and community updates.
                </p>
              </div>
              <form
                className="flex w-full max-w-sm gap-2"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="your@email.com"
                  className="input flex-1 text-sm"
                  required
                  aria-required="true"
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap px-4 py-3"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-16 px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 w-fit" aria-label="SMG Crypto Hub home">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 border border-brand-blue/30">
                <Zap className="h-4 w-4 text-brand-blue" aria-hidden="true" />
              </div>
              <div>
                <span className="font-display font-bold text-brand-white">SMG</span>
                <span className="font-display font-bold text-brand-blue"> Crypto Hub</span>
              </div>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
              Open-source Web3 education platform built for Africa and the world,
              powered by the Internet Computer Protocol (ICP) Blockchain.
            </p>
            <p className="text-xs text-brand-muted/60">
              <span className="font-medium text-brand-muted">SMG</span> = Smart Modern Growth
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={SITE.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-muted hover:text-brand-white hover:border-brand-blue/50 transition-all duration-200"
                aria-label="Follow SMG Crypto Hub on Twitter / X"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              {/* 🟡 Official Channel */}
              <a
                href="https://t.me/SMGCryptohHubChannel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-brand-gold/25 bg-brand-gold/5 px-3 py-1.5 text-xs font-medium text-brand-gold hover:border-brand-gold/50 hover:bg-brand-gold/10 transition-all duration-200"
                aria-label="Join SMG Crypto Hub Official Telegram Channel — announcements"
              >
                <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                🟡 Official Channel
              </a>
              {/* 🔵 Community Group */}
              <a
                href="https://t.me/SMGCryptoHubCommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-brand-blue/25 bg-brand-blue/5 px-3 py-1.5 text-xs font-medium text-brand-blue hover:border-brand-blue/50 hover:bg-brand-blue/10 transition-all duration-200"
                aria-label="Join SMG Crypto Hub Telegram Community Group — learner discussions"
              >
                <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                🔵 Community Group
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-muted hover:text-brand-white hover:border-brand-blue/50 transition-all duration-200"
                aria-label="View SMG Crypto Hub on GitHub"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-muted hover:text-brand-white hover:border-brand-blue/50 transition-all duration-200"
                aria-label="Email SMG Crypto Hub"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation — Learn">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-muted">
              Learn
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer navigation — Ecosystem">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-muted">
              Ecosystem
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.ecosystem.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer navigation — Company">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-muted">
              Company
            </h4>
            <ul className="space-y-3">
              {[...FOOTER_LINKS.community, ...FOOTER_LINKS.legal].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-border">
        <div className="container-wide py-6 px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-brand-muted">
              © {currentYear} SMG Crypto Hub. MIT Licensed. Built for Africa. Open to the World.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-brand-muted/60">
                ⛓ Powered by ICP Blockchain
              </span>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-muted hover:text-brand-white transition-colors"
              >
                Open Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
