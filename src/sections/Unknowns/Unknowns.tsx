"use client";

import { useEffect, useRef, useState } from "react";

// Scoped, section-local palette — a warm off-white/cream with the
// faintest lavender cast, distinct from the global (dark) tokens used
// elsewhere. --iris is the sole accent here (--halo is tuned for dark
// backgrounds and doesn't read on this light one), reserved for active
// states and revealed values, per the brief.
const PALETTE = {
  bg: "#F8F5F6",
  textPrimary: "#221F27",
  textSecondary: "#6C6875",
  railBorder: "rgba(109,74,224,0.20)",
  hairline: "rgba(109,74,224,0.14)",
};

const QUESTIONS: {
  question: string;
  value: string;
  label: string;
  points: { label: string; value: string }[];
  insight: string;
}[] = [
  {
    question: "What do I truly own?",
    value: "₹1.24 Cr",
    label: "Total assets",
    points: [
      { label: "Bank & fixed deposits", value: "₹18.4L" },
      { label: "Mutual funds", value: "₹42.6L" },
      { label: "Real estate", value: "₹52.0L" },
      { label: "Gold", value: "₹11.0L" },
    ],
    insight: "Across accounts, property and investments.",
  },
  {
    question: "What do I truly owe?",
    value: "₹46.5L",
    label: "Total liabilities",
    points: [
      { label: "Home loan", value: "₹32.0L" },
      { label: "Personal loan", value: "₹8.5L" },
      { label: "Credit cards", value: "₹6.0L" },
    ],
    insight: "Loans, credit cards and other liabilities.",
  },
  {
    question: "How fast is my wealth growing?",
    value: "+12.3%",
    label: "Wealth growth rate",
    points: [
      { label: "Last year", value: "₹69.0L" },
      { label: "This year", value: "₹77.5L" },
      { label: "3-year CAGR", value: "11.2%" },
    ],
    insight: "Compounding is doing more work than your salary.",
  },
  {
    question: "Am I better off than last year?",
    value: "+₹8.5L",
    label: "Net worth change",
    points: [
      { label: "Last year", value: "₹69.0L" },
      { label: "This year", value: "₹77.5L" },
    ],
    insight: "Growth held steady even after this year's expenses.",
  },
  {
    question: "Am I on track for what's next?",
    value: "65%",
    label: "Goal progress",
    points: [
      { label: "Current net worth", value: "₹77.5L" },
      { label: "2030 target", value: "₹1.2 Cr" },
      { label: "Years remaining", value: "5" },
    ],
    insight: "On pace to reach your 2030 target.",
  },
];

/**
 * The problem, felt rather than listed. Hovering, focusing or tapping a
 * question calmly reveals its answer in the panel on the right — a
 * single quiet financial-insight readout, not a per-row redaction or a
 * dashboard widget.
 */
export default function Unknowns() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = activeIndex !== null ? QUESTIONS[activeIndex] : null;

  return (
    <section
      id="unknowns"
      className="border-l-4 pl-5 xl:border-l-0 xl:pl-24"
      style={{
        background: PALETTE.bg,
        color: PALETTE.textPrimary,
        borderColor: PALETTE.railBorder,
        scrollMarginTop: "80px",
      }}
    >
      <style>{`
        @keyframes unknowns-answer-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div ref={sectionRef} className="container py-14 md:py-20 lg:py-24">
        <span className="tabular mb-6 block text-[13px] font-medium text-iris xl:hidden">
          02
        </span>

        <div className="grid gap-16 lg:grid-cols-[7fr_5fr] lg:gap-12">
          {/* ============ questions column ============ */}
          <div>
            <h2
              className="font-display max-w-xl text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
              style={{ letterSpacing: "-0.02em", color: PALETTE.textPrimary }}
            >
              Most people can name their salary. Almost no one can answer
              these.
            </h2>

            <div className="mt-12">
              {QUESTIONS.map((q, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={q.question}
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex((prev) => (prev === i ? null : prev))}
                    onFocus={() => setActiveIndex(i)}
                    onBlur={() => setActiveIndex((prev) => (prev === i ? null : prev))}
                    aria-expanded={isActive}
                    className="block w-full cursor-pointer py-6 text-left transition-all duration-500 ease-out"
                    style={{
                      borderBottom: `1px solid ${PALETTE.hairline}`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(10px)",
                      transitionDelay: visible ? `${i * 70}ms` : "0ms",
                    }}
                  >
                    <div className="relative flex items-center gap-4 pl-4">
                      <span
                        className="absolute left-0 h-6 w-[2px] transition-all duration-300"
                        style={{
                          background: "var(--iris)",
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "scaleY(1)" : "scaleY(0.3)",
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="tabular text-[13px] font-medium transition-colors duration-300"
                        style={{ color: isActive ? "var(--iris)" : PALETTE.textSecondary }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="flex-1 text-[17px] transition-colors duration-300 sm:text-[21px]"
                        style={{ color: isActive ? PALETTE.textPrimary : `${PALETTE.textPrimary}D9` }}
                      >
                        {q.question}
                      </span>
                      <span
                        className="hidden h-px shrink-0 transition-all duration-300 sm:block"
                        style={{
                          background: "linear-gradient(to right, var(--iris), transparent)",
                          width: isActive ? "2.5rem" : "0rem",
                          opacity: isActive ? 1 : 0,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="shrink-0 transition-all duration-300"
                        style={{
                          color: isActive ? "var(--iris)" : PALETTE.textSecondary,
                          opacity: isActive ? 1 : 0.35,
                          transform: isActive ? "translateX(2px)" : "translateX(0)",
                        }}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p
              className="mt-12 max-w-[46ch] text-[17px] leading-[1.6]"
              style={{ color: PALETTE.textSecondary }}
            >
              The financial system gave us more data than ever and less
              clarity than ever. FynVeda turns financial data into financial
              understanding.
            </p>
          </div>

          {/* ============ answer panel ============ */}
          <div className="relative">
            <div className="lg:sticky lg:top-32">
              <div
                className="mb-8 h-px transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, var(--iris), transparent)",
                  width: active ? "2.5rem" : "0rem",
                  opacity: active ? 1 : 0,
                }}
                aria-hidden="true"
              />

              <div key={activeIndex ?? "idle"} style={{ animation: "unknowns-answer-in 320ms ease-out" }}>
                {active ? (
                  <div>
                    <p
                      className="text-[13px] font-medium uppercase"
                      style={{ color: "var(--iris)", letterSpacing: "0.04em" }}
                    >
                      {active.label}
                    </p>
                    <p
                      className="font-display tabular mt-3 text-[44px] leading-none lg:text-[52px]"
                      style={{ color: "var(--iris)", letterSpacing: "-0.02em" }}
                    >
                      {active.value}
                    </p>

                    <div className="mt-6" style={{ borderTop: `1px solid ${PALETTE.hairline}` }}>
                      {active.points.map((point) => (
                        <div
                          key={point.label}
                          className="flex items-baseline justify-between gap-4 py-2.5"
                          style={{ borderBottom: `1px solid ${PALETTE.hairline}` }}
                        >
                          <span className="text-[13px]" style={{ color: PALETTE.textSecondary }}>
                            {point.label}
                          </span>
                          <span
                            className="tabular text-[13px] font-medium"
                            style={{ color: PALETTE.textPrimary }}
                          >
                            {point.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p
                      className="mt-5 max-w-[32ch] text-[14px] leading-snug"
                      style={{ color: PALETTE.textSecondary }}
                    >
                      {active.insight}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p
                      className="text-[13px] font-medium uppercase"
                      style={{ color: PALETTE.textSecondary, letterSpacing: "0.04em" }}
                    >
                      The full picture
                    </p>
                    <p
                      className="font-display mt-3 text-[44px] leading-none lg:text-[52px]"
                      style={{ color: PALETTE.textSecondary, opacity: 0.4 }}
                    >
                      —
                    </p>
                    <p
                      className="mt-4 max-w-[30ch] text-[14px] italic leading-snug"
                      style={{ color: PALETTE.textSecondary }}
                    >
                      Hover a question to see what it&apos;s really asking.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
