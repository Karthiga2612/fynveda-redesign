"use client";

import { useState } from "react";
import Section from "@/components/Section";

const CATEGORIES = [
  {
    key: "own",
    title: "What You Own",
    operator: "+",
    total: "₹1,44,20,000",
    preview: ["Bank Accounts", "Investments", "Real Estate", "Gold"],
    items: [
      { label: "Bank accounts", value: "₹6,50,000" },
      { label: "Fixed deposits", value: "₹9,00,000" },
      { label: "Mutual funds", value: "₹22,00,000" },
      { label: "Stocks", value: "₹14,50,000" },
      { label: "Bonds", value: "₹5,00,000" },
      { label: "Retirement accounts", value: "₹18,00,000" },
      { label: "Gold", value: "₹4,20,000" },
      { label: "Real estate", value: "₹65,00,000" },
    ],
  },
  {
    key: "control",
    title: "What You Control",
    operator: "+",
    total: "₹28,00,000",
    preview: ["Business", "Private Holdings"],
    items: [
      { label: "Business ownership", value: "₹20,00,000" },
      { label: "Private investments", value: "₹8,00,000" },
    ],
  },
  {
    key: "owe",
    title: "What You Owe",
    operator: "−",
    total: "₹42,00,000",
    preview: ["Home Loan", "Personal Loan", "Credit Card"],
    items: [
      { label: "Home loans", value: "₹32,00,000" },
      { label: "Personal loans", value: "₹3,50,000" },
      { label: "Credit card liabilities", value: "₹1,20,000" },
      { label: "Business obligations", value: "₹5,30,000" },
    ],
  },
];

export default function RealNetWorth() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Section
      id="real-net-worth"
      tone="accent"
      dividerTo="surface"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl text-left">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          Real Net Worth
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Real Net Worth is the one number that matters.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Every account, holding and loan tells you something. None of them,
          on their own, tells you where you actually stand. Real Net Worth
          brings everything together into a single, honest measure of your
          financial well-being.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-3xl rounded-[var(--radius)] border border-border bg-background px-6 py-10 shadow-[var(--shadow)] sm:px-10">
        {/* ============ EQUATION ============ */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-0">
          {CATEGORIES.map((cat, index) => {
            const isDimmed = hovered !== null && hovered !== index;
            const isExpanded = expanded === index;

            return (
              <div key={cat.key} className="contents">
                <div
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex flex-1 flex-col items-center px-4 text-center transition-opacity duration-300 ${
                    isDimmed ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {cat.title}
                  </p>
                  <p
                    className={`mt-2 text-2xl font-bold tabular-nums tracking-tight transition-colors duration-300 sm:text-3xl ${
                      hovered === index ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {cat.total}
                  </p>

                  {!isExpanded && (
                    <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1">
                      {cat.preview.map((label) => (
                        <span
                          key={label}
                          className={`text-xs transition-colors duration-300 ${
                            hovered === index
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    className={`grid w-full transition-[grid-template-rows] duration-300 ease-out ${
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3 text-left">
                        {cat.items.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between gap-3"
                          >
                            <span className="text-xs text-muted-foreground">
                              {item.label}
                            </span>
                            <span className="text-xs font-medium tabular-nums text-foreground">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : index)}
                    aria-expanded={isExpanded}
                    className="mt-3 text-[11px] font-medium uppercase tracking-wide text-accent transition-opacity duration-200 hover:opacity-70"
                  >
                    {isExpanded ? "Show less" : "View breakdown"}
                  </button>
                </div>

                {index < CATEGORIES.length - 1 && (
                  <span
                    className="text-2xl font-light text-accent lg:mt-8"
                    aria-hidden="true"
                  >
                    {CATEGORIES[index + 1].operator}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ============ RESULT ============ */}
        <div className="mt-10 flex flex-col items-center border-t border-border pt-8">
          <span className="text-xl text-accent" aria-hidden="true">
            ↓
          </span>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-accent">
            Real Net Worth
          </p>
          <p className="mt-2 text-5xl font-bold tabular-nums tracking-tight text-foreground sm:text-6xl">
            ₹1,30,20,000
          </p>
          <p className="mt-3 text-sm font-medium text-accent">
            ↑ 12.4% this year
          </p>
          <svg
            className="mt-4 h-6 w-24"
            viewBox="0 0 96 24"
            fill="none"
            aria-hidden="true"
          >
            <polyline
              points="0,20 24,16 48,14 72,7 96,3"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <circle cx="96" cy="3" r="2" fill="var(--accent)" />
          </svg>
        </div>
      </div>
    </Section>
  );
}
