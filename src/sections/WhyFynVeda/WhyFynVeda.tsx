"use client";

import { useState } from "react";
import Section from "@/components/Section";

const PROBLEM_QUESTIONS = [
  {
    number: "01",
    question: "What do I truly own?",
    answer:
      "Bank balances, investments, gold, property and business stakes — everything you hold, seen together instead of scattered across five different apps.",
  },
  {
    number: "02",
    question: "What do I truly owe?",
    answer:
      "Home loans, personal loans, credit cards, business obligations — every liability weighed against what you actually have.",
  },
  {
    number: "03",
    question: "How much is my wealth actually growing?",
    answer:
      "Not your salary. Not your monthly SIP. The one number that reflects whether you're actually getting wealthier.",
  },
  {
    number: "04",
    question: "Am I financially healthier than I was last year?",
    answer:
      "Real Net Worth tracked over time, so progress — or the lack of it — is visible, not assumed.",
  },
  {
    number: "05",
    question: "How prepared am I for the goals ahead?",
    answer:
      "A clear view of what you've built so far makes it possible to plan honestly for what's still ahead.",
  },
];

const DATA_SOURCES = [
  { label: "Bank Accounts", left: 8 },
  { label: "Investments", left: 27 },
  { label: "Real Estate", left: 50 },
  { label: "Loans", left: 73 },
  { label: "Insurance", left: 92 },
];

export default function WhyFynVeda() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [hoveredSource, setHoveredSource] = useState<number | null>(null);

  return (
    <Section
      id="why-fyn-veda"
      tone="surface"
      dividerTo="accent"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-left">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          Why Fyn Veda
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You know the pieces. You don&apos;t know the picture.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          You know your bank balance, your salary, your mutual fund
          portfolio, and what&apos;s left on your home loan. What you rarely
          know is your true net worth.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          Banking, investing, insurance, credit and taxation have all
          evolved separately, each with its own systems and its own
          language. Individuals are left to connect the pieces themselves.
          The result is abundant financial data and very little clarity.
          Most products focus on transactions, investments or taxation.
          Very few focus on wealth itself.
        </p>
      </div>

      {/* ============ PIECES -> ONE PICTURE ============ */}
      <div className="relative mx-auto mt-16 max-w-2xl">
        {/* Desktop / tablet: converging diagram */}
        <div className="hidden sm:block">
          <div className="relative h-8">
            {DATA_SOURCES.map((source, index) => (
              <div
                key={source.label}
                className="absolute -translate-x-1/2"
                style={{ left: `${source.left}%` }}
                onMouseEnter={() => setHoveredSource(index)}
                onMouseLeave={() => setHoveredSource(null)}
              >
                <span
                  className={`inline-flex items-center whitespace-nowrap rounded-full border bg-background px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    hoveredSource === index
                      ? "-translate-y-0.5 border-accent text-accent shadow-[var(--shadow)]"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {source.label}
                </span>
              </div>
            ))}
          </div>

          <svg
            className="h-28 w-full"
            viewBox="0 0 1000 220"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            {DATA_SOURCES.map((source, index) => {
              const x = source.left * 10;
              return (
                <path
                  key={source.label}
                  d={`M${x},0 Q${x},130 500,205`}
                  stroke="var(--accent)"
                  strokeWidth={hoveredSource === index ? 2 : 1}
                  strokeOpacity={
                    hoveredSource === null
                      ? 0.25
                      : hoveredSource === index
                        ? 0.9
                        : 0.1
                  }
                  className="transition-all duration-200"
                />
              );
            })}
            {DATA_SOURCES.map((source, index) => (
              <circle
                key={`dot-${source.label}`}
                cx={source.left * 10}
                cy={100}
                r={hoveredSource === index ? 4 : 2.5}
                fill="var(--accent)"
                fillOpacity={hoveredSource === index ? 0.7 : 0.3}
                className="transition-all duration-200"
              />
            ))}
          </svg>

          <div className="relative -mt-2 flex justify-center">
            <div
              className="absolute inset-0 -z-10 animate-pulse rounded-full bg-accent/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="rounded-[var(--radius)] border border-accent/30 bg-background px-8 py-6 text-center shadow-[var(--shadow)]">
              <p className="text-xs font-medium uppercase tracking-wide text-accent">
                Fyn Veda
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
                ₹91,50,000
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Real Net Worth
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: simple stacked fallback */}
        <div className="flex flex-col items-center gap-4 sm:hidden">
          <div className="flex flex-wrap justify-center gap-2">
            {DATA_SOURCES.map((source) => (
              <span
                key={source.label}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {source.label}
              </span>
            ))}
          </div>
          <span className="text-lg text-accent" aria-hidden="true">
            ↓
          </span>
          <div className="rounded-[var(--radius)] border border-accent/30 bg-background px-8 py-6 text-center shadow-[var(--shadow)]">
            <p className="text-xs font-medium uppercase tracking-wide text-accent">
              Fyn Veda
            </p>
            <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-foreground">
              ₹91,50,000
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Real Net Worth
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl text-left">
        {/* ============ INTERACTIVE QUESTIONS ============ */}
        <div className="flex flex-col">
          {PROBLEM_QUESTIONS.map((item, index) => {
            const isOpen = openQuestion === index;
            return (
              <div
                key={item.number}
                className="border-b border-border last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenQuestion(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-sm font-semibold tabular-nums text-accent">
                      {item.number}
                    </span>
                    <span
                      className={`text-base transition-colors duration-200 sm:text-lg ${
                        isOpen ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {item.question}
                    </span>
                  </span>
                  <span
                    className={`flex-shrink-0 text-xl font-light text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 pl-9 text-sm text-muted-foreground sm:pl-10">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============ CORE BELIEF ============ */}
        <div className="mt-10 border-l-2 border-accent pl-6">
          <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Every individual deserves a single source of financial truth.
          </p>
          <p className="mt-2 text-base text-muted-foreground">
            Not a portfolio tracker. Not a tax filing platform. Not an
            investment app. A complete wealth platform.
          </p>
        </div>

        {/* ============ INCOME POSITION VISUAL ============ */}
        <div className="mt-10 rounded-[var(--radius)] border border-accent/20 bg-background p-8 shadow-[var(--shadow)] sm:p-10">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Where income actually lands
          </p>

          <div className="relative mt-10 h-1.5 rounded-full bg-border">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent/40"
              style={{ width: "85%" }}
            />
            <div
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-accent"
              style={{ left: "60%" }}
            />
            <div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-accent shadow-[var(--shadow)]"
              style={{ left: "85%" }}
            />
          </div>

          <div className="relative mt-3 h-12">
            <div
              className="absolute -translate-x-1/2 text-center"
              style={{ left: "60%" }}
            >
              <p className="text-sm font-semibold text-foreground">
                Top 10%
              </p>
              <p className="text-xs text-muted-foreground">₹3L–₹22L</p>
            </div>
            <div
              className="absolute -translate-x-1/2 text-center"
              style={{ left: "85%" }}
            >
              <p className="text-sm font-semibold text-foreground">
                Top 1%
              </p>
              <p className="text-xs text-muted-foreground">₹22L–₹50L</p>
            </div>
          </div>

          <p className="mt-6 border-t border-border pt-6 text-base text-muted-foreground">
            But income only shows where you stand today. Where
            you&apos;re actually heading depends entirely on asset
            generation — and that&apos;s the number almost nobody
            tracks.
          </p>
        </div>
      </div>
    </Section>
  );
}
