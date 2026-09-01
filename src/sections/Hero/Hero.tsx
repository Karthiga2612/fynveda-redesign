"use client";

import { useState } from "react";
import Section from "@/components/Section";

const ASSET_CATEGORIES = [
  { label: "Bank Accounts", value: "₹8,40,000" },
  { label: "Investments", value: "₹32,50,000" },
  { label: "Real Estate", value: "₹65,00,000" },
  { label: "Gold", value: "₹4,20,000" },
];

const LIABILITIES = { label: "Liabilities", value: "−₹18,60,000" };

const TRUST_INDICATORS = [
  { label: "Complete wealth view", href: "#wealth-view" },
  { label: "Wealth growth tracking", href: "#wealth-growth" },
  { label: "CA-backed advisory", href: "#advisory" },
];

type FocusedItem = { label: string; value: string } | null;

export default function Hero() {
  const [focused, setFocused] = useState<FocusedItem>(null);

  return (
    <Section
      id="hero"
      tone="indigoMist"
      className="py-10 md:py-14 lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center lg:py-0"
    >
      <>
        <div className="relative w-full overflow-hidden">
          {/* Ambient lighting */}
          <div
            className="pointer-events-none absolute -left-16 -top-24 -z-30 h-[24rem] w-[24rem] rounded-full bg-white/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[34rem] rounded-full bg-accent/15 blur-3xl [mask-image:radial-gradient(60%_60%_at_60%_35%,black,transparent)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-20 bottom-0 -z-30 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />

          {/* Faint corner dot grid */}
          <div
            className="pointer-events-none absolute left-0 top-0 -z-20 h-64 w-64 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(var(--foreground) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(circle at top left, black 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(circle at top left, black 0%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Abstract growth lines, data points and orbit rings */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              maskImage:
                "radial-gradient(120% 100% at 55% 55%, black 30%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(120% 100% at 55% 55%, black 30%, transparent 85%)",
            }}
            aria-hidden="true"
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
            >
              <circle
                cx="560"
                cy="120"
                r="120"
                stroke="var(--accent)"
                strokeOpacity="0.14"
                strokeWidth="1"
              />
              <circle
                cx="560"
                cy="120"
                r="165"
                stroke="var(--accent)"
                strokeOpacity="0.08"
                strokeWidth="1"
              />

              <polyline
                points="0,340 90,325 170,290 250,300 330,255 410,265 490,210 570,220 650,160 730,170 800,120"
                stroke="var(--accent)"
                strokeOpacity="0.2"
                strokeWidth="1.5"
              />
              <polyline
                points="0,375 110,365 210,345 310,350 410,320 510,325 610,290 710,295 800,270"
                stroke="var(--accent)"
                strokeOpacity="0.1"
                strokeWidth="1.5"
              />

              {[
                [250, 300],
                [410, 265],
                [570, 220],
                [730, 170],
              ].map(([cx, cy]) => (
                <circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="3.5"
                  fill="var(--accent)"
                  fillOpacity="0.35"
                />
              ))}

              {/* connected data points near the column boundary */}
              <line
                x1="330"
                y1="140"
                x2="410"
                y2="190"
                stroke="var(--accent)"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
              <line
                x1="410"
                y1="190"
                x2="380"
                y2="250"
                stroke="var(--accent)"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
              {[
                [330, 140],
                [410, 190],
                [380, 250],
              ].map(([cx, cy]) => (
                <circle
                  key={`node-${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="2.5"
                  fill="var(--accent)"
                  fillOpacity="0.25"
                />
              ))}

              {[
                [60, 70],
                [130, 130],
                [40, 200],
                [700, 330],
              ].map(([cx, cy]) => (
                <circle
                  key={`dot-${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="2"
                  fill="var(--accent)"
                  fillOpacity="0.15"
                />
              ))}
            </svg>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div className="flex flex-col items-start gap-7 text-left">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
                Personal Wealth Operating System
              </span>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Your complete{" "}
                <span className="text-accent">financial reality</span>, in
                one place.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Understand what you own, what you owe, and how your wealth
                is growing.
              </p>
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:opacity-90"
              >
                Get Started
                <span
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
                {TRUST_INDICATORS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <span className="text-accent">✓</span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-12 -z-20 rounded-full bg-accent/10 blur-3xl"
                aria-hidden="true"
              />

              <div
                className="absolute inset-x-6 top-5 -bottom-5 -z-10 rounded-[var(--radius)] border border-border bg-background"
                aria-hidden="true"
              />

              <div className="relative w-full overflow-hidden rounded-[var(--radius)] border border-border bg-surface p-8 shadow-[0_28px_70px_-20px_color-mix(in_srgb,var(--accent)_42%,transparent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_36px_80px_-18px_color-mix(in_srgb,var(--accent)_52%,transparent)] sm:p-12">
                <div
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  aria-hidden="true"
                />

                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-300">
                  {focused ? focused.label : "Real Net Worth"}
                </p>
                <p
                  className={`mt-2 text-5xl font-bold tracking-tight tabular-nums transition-colors duration-300 sm:text-6xl ${
                    focused ? "text-accent" : "text-foreground"
                  }`}
                >
                  {focused ? focused.value : "₹91,50,000"}
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    What you own
                  </p>
                  <div className="mt-4 flex flex-col">
                    {ASSET_CATEGORIES.map((item) => (
                      <div
                        key={item.label}
                        onMouseEnter={() => setFocused(item)}
                        onMouseLeave={() => setFocused(null)}
                        className={`-mx-2 flex items-center justify-between rounded-md px-2 py-1.5 transition-all duration-200 hover:bg-background/70 ${
                          focused && focused.label !== item.label
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1 w-1 rounded-full bg-accent" />
                          {item.label}
                        </span>
                        <span className="text-sm font-medium tabular-nums text-foreground">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="flex items-center justify-center py-3"
                  aria-hidden="true"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    +
                  </span>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    What you owe
                  </p>
                  <div className="mt-4">
                    <div
                      onMouseEnter={() => setFocused(LIABILITIES)}
                      onMouseLeave={() => setFocused(null)}
                      className={`-mx-2 flex items-center justify-between rounded-md px-2 py-1.5 transition-all duration-200 hover:bg-background/70 ${
                        focused && focused.label !== LIABILITIES.label
                          ? "opacity-50"
                          : "opacity-100"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                        {LIABILITIES.label}
                      </span>
                      <span className="text-sm font-medium tabular-nums text-foreground">
                        {LIABILITIES.value}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 border-l-2 border-accent pl-4 text-sm text-muted-foreground">
                  What you own + what you owe ={" "}
                  <span className="font-semibold text-foreground">
                    your financial reality
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute -bottom-1 left-1/2 h-14 w-screen -translate-x-1/2 sm:h-20"
          aria-hidden="true"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z"
              fill="var(--surface)"
            />
          </svg>
        </div>
      </>
    </Section>
  );
}
