"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Why Fyn Veda", href: "#why-fyn-veda" },
  { label: "Real Net Worth", href: "#real-net-worth" },
  { label: "Wealth View", href: "#wealth-view" },
  { label: "Wealth Growth", href: "#wealth-growth" },
  { label: "Technology", href: "#technology" },
  { label: "Advisory", href: "#advisory" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fv-nav-animate sticky top-0 z-50 border-b border-border bg-background/80 shadow-sm backdrop-blur">
      <nav className="container flex h-16 items-center justify-between md:h-18">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-80"
        >
          Fyn Veda
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="hidden items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:opacity-90 md:inline-flex"
        >
          Get Started
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground transition-colors duration-200 hover:bg-surface md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="border-t border-border md:hidden">
          <ul className="container flex flex-col gap-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#cta"
                onClick={() => setIsOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
