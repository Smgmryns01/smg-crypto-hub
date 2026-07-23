"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ExternalLink, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, NAVIGATION } from "@/constants/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-black/95 backdrop-blur-xl border-b border-brand-border"
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="SMG Crypto Hub — Home"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 border border-brand-blue/30 group-hover:bg-brand-blue/20 transition-all duration-200">
              <Zap className="h-4 w-4 text-brand-blue" aria-hidden="true" />
              <div className="absolute inset-0 rounded-lg bg-brand-blue/10 blur-sm group-hover:bg-brand-blue/20 transition-all duration-200" />
            </div>
            <div>
              <span className="font-display font-bold text-brand-white text-sm">
                SMG
              </span>
              <span className="font-display font-bold text-brand-blue text-sm">
                {" "}Crypto Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAVIGATION.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname.startsWith(item.href)
                        ? "text-brand-white bg-white/5"
                        : "text-brand-muted hover:text-brand-white hover:bg-white/5"
                    )}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        activeDropdown === item.label && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "text-brand-white bg-white/5"
                        : "text-brand-muted hover:text-brand-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-brand-card border border-brand-border shadow-card-hover animate-slide-down"
                    role="menu"
                  >
                    <div className="p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/5 group"
                          role="menuitem"
                        >
                          <span className="text-sm font-medium text-brand-white group-hover:text-brand-blue transition-colors">
                            {child.label}
                          </span>
                          {"description" in child && (
                            <span className="text-xs text-brand-muted">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs"
              aria-label="View on GitHub (opens in new tab)"
            >
              GitHub
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
            <Link href="/academy" className="btn-primary text-xs px-4 py-2">
              Start Learning
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-brand-muted hover:text-brand-white hover:bg-white/5 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-brand-border bg-brand-black/98 backdrop-blur-xl"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container-wide py-4 space-y-1">
            {NAVIGATION.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "text-brand-white bg-white/5"
                      : "text-brand-muted hover:text-brand-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-brand-muted hover:text-brand-white transition-all"
                      >
                        <span className="h-1 w-1 rounded-full bg-brand-blue/50" aria-hidden="true" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-brand-border space-y-2">
              <Link href="/academy" className="btn-primary w-full justify-center">
                Start Learning
              </Link>
              <Link
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center"
              >
                View on GitHub
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
