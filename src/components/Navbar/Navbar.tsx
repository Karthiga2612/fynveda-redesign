"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#real-net-worth", label: "Real net worth" },
  { href: "#for-cas", label: "For CAs" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-paper-strong/80 backdrop-blur-md border-b border-rule-light shadow-[0_1px_0_0_rgba(21,14,46,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5">
        <a
          href="#"
          className="flex items-center gap-2 font-display text-[21px] font-medium tracking-[-0.01em] text-ink"
        >
          <span className="inline-block h-2 w-2 bg-iris" />
          FynVeda
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative font-sans text-[15px] font-medium text-ink-soft transition-colors hover:text-iris focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-iris after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#early-access"
          className="inline-flex items-center justify-center rounded-[8px] bg-iris px-5 py-2.5 font-sans text-[15px] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris"
        >
          Get early access
        </a>
      </nav>
    </header>
  );
}
