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

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

const PIN_SCROLL_DISTANCE = 1300; // px of extra scroll runway reserved for the pinned scrub, lg+ only

/**
 * The problem, felt rather than listed. On lg+ screens the whole section
 * pins in place (a sticky inner wrapper inside a taller outer one — same
 * trick as the "Income tells you where you stand" section below) for a
 * fixed scroll distance: while pinned, scroll position maps continuously
 * to a question index, so the right-hand panel plays through the answers
 * one by one before the page releases and continues scrolling. Below lg
 * there's no reserved scroll runway to pin against, so it falls back to
 * the gentler transit-based progress tied to the section's own
 * scroll-through. Hovering or focusing a question still previews its
 * answer immediately, overriding the scroll-linked one for as long as
 * the pointer/focus stays there.
 */
export default function Unknowns() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const activeIndex = hoveredIndex ?? scrollIndex;

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

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    let frame = 0;

    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const isPinned = window.innerWidth >= 1024; // matches the lg: breakpoint driving the sticky pin
      let progress: number;
      if (isPinned) {
        const scrollable = rect.height - window.innerHeight;
        progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
      } else {
        const total = rect.height + window.innerHeight;
        progress = clamp((window.innerHeight - rect.top) / total, 0, 1);
      }
      const idx = clamp(Math.floor(progress * QUESTIONS.length), 0, QUESTIONS.length - 1);
      setScrollIndex(idx);
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = QUESTIONS[activeIndex];

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

      <div ref={pinRef} className="lg:h-[calc(100vh+1300px)]">
        <div className="lg:sticky lg:top-20">
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
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex((prev) => (prev === i ? null : prev))}
                    onFocus={() => setHoveredIndex(i)}
                    onBlur={() => setHoveredIndex((prev) => (prev === i ? null : prev))}
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
                  width: "2.5rem",
                }}
                aria-hidden="true"
              />

              <div key={activeIndex} style={{ animation: "unknowns-answer-in 320ms ease-out" }}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
