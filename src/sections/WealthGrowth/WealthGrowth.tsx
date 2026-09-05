"use client";

import { useEffect, useRef, useState } from "react";
import { formatINR } from "@/lib/format";

type YearPoint = {
  year: number;
  netWorth: number;
  assets: number;
  liabilities: number;
};

// Illustrative figures — the 2027 point is the same ₹77,50,000 /
// ₹1,24,00,000 / ₹46,50,000 net worth, assets and liabilities used in
// the Statement ledger (§05), so the two sections tell one consistent
// story: this is how that "today" figure got there.
const DATA: YearPoint[] = [
  { year: 2021, netWorth: 850_000, assets: 1_000_000, liabilities: 150_000 },
  { year: 2022, netWorth: 1_550_000, assets: 1_850_000, liabilities: 300_000 },
  { year: 2023, netWorth: 2_450_000, assets: 4_250_000, liabilities: 1_800_000 },
  { year: 2024, netWorth: 3_550_000, assets: 6_350_000, liabilities: 2_800_000 },
  { year: 2025, netWorth: 4_850_000, assets: 8_450_000, liabilities: 3_600_000 },
  { year: 2026, netWorth: 6_250_000, assets: 10_450_000, liabilities: 4_200_000 },
  { year: 2027, netWorth: 7_750_000, assets: 12_400_000, liabilities: 4_650_000 },
];

const VB_WIDTH = 700;
const PAD_X = 20;
const Y_TOP = 14;
const Y_BASELINE = 170;
const DOMAIN_MAX = Math.max(...DATA.map((d) => d.netWorth)) * 1.15;

const STEP = (VB_WIDTH - PAD_X * 2) / (DATA.length - 1);
const POINTS = DATA.map((d, i) => ({
  x: PAD_X + i * STEP,
  y: Y_BASELINE - (d.netWorth / DOMAIN_MAX) * (Y_BASELINE - Y_TOP),
}));

/** Smooth quadratic-through-midpoints curve — no charting library needed for one line. */
function smoothPath(points: { x: number; y: number }[]) {
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    d += ` Q${p0.x} ${p0.y} ${(p0.x + p1.x) / 2} ${(p0.y + p1.y) / 2}`;
  }
  const last = points[points.length - 1];
  d += ` T${last.x} ${last.y}`;
  return d;
}

const LINE_PATH = smoothPath(POINTS);

/**
 * The wealth growth story — fynveda-landing-layout.md §2 "06 — The
 * wealth growth story". The only genuine sequence on the page: a
 * single `--mint` line chart, thin stroke, no fill, no gridlines
 * beyond a hairline baseline. It draws once on scroll into view (the
 * spec's one deliberate exception to "no scroll-triggered motion").
 * Hovering or focusing a year — or dragging across the chart on touch
 * — pins a small readout of that year's net worth, assets and
 * liabilities.
 */
export default function WealthGrowth() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function scrubToClientX(clientX: number) {
    const el = chartRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setActiveIndex(Math.round(fraction * (DATA.length - 1)));
  }

  const shown = DATA[activeIndex ?? DATA.length - 1];
  const point = POINTS[activeIndex ?? DATA.length - 1];
  const isPinned = activeIndex !== null;

  return (
    <section
      id="growth"
      className="border-l-4 pl-5 bg-vellum text-ink xl:border-l-0 xl:pl-24"
      style={{ borderColor: "var(--rule-on-light)", scrollMarginTop: "80px" }}
    >
      <div ref={sectionRef} className="container py-14 md:py-20 lg:py-24">
        <span className="tabular mb-6 block text-[13px] font-medium text-iris xl:hidden">
          06
        </span>

        <div className="max-w-2xl">
          <h2
            className="font-display text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Watch net worth compound, year over year.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink" style={{ opacity: 0.6 }}>
            Salary is a number that resets every month. Net worth is the
            number that remembers.
          </p>
        </div>

        {/* ============ readout ============ */}
        <div
          className="mt-16 flex min-h-[80px] flex-col gap-1 lg:mt-20"
          aria-live="polite"
        >
          <p className="tabular text-[13px] font-medium text-shade">{shown.year}</p>
          <p
            className="font-display tabular text-[36px] leading-none text-ink sm:text-[44px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {formatINR(shown.netWorth)}
          </p>
          <p className="tabular text-[13px] text-shade">
            Assets {formatINR(shown.assets)} · Liabilities {formatINR(shown.liabilities)}
          </p>
        </div>

        {/* ============ chart ============ */}
        <div
          ref={chartRef}
          className="relative mt-8 h-[220px] cursor-crosshair touch-pan-y select-none sm:h-[260px]"
          onPointerMove={(e) => {
            if (e.pointerType === "mouse" || e.buttons > 0 || e.pointerType === "touch") {
              scrubToClientX(e.clientX);
            }
          }}
          onPointerDown={(e) => scrubToClientX(e.clientX)}
          onPointerLeave={() => setActiveIndex(null)}
        >
          <svg
            viewBox={`0 0 ${VB_WIDTH} ${Y_BASELINE + 10}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <line
              x1={PAD_X}
              y1={Y_BASELINE}
              x2={VB_WIDTH - PAD_X}
              y2={Y_BASELINE}
              stroke="var(--rule-on-light)"
              strokeWidth={1}
            />

            {isPinned && (
              <line
                x1={point.x}
                y1={Y_TOP}
                x2={point.x}
                y2={Y_BASELINE}
                stroke="var(--rule-on-light)"
                strokeWidth={1}
              />
            )}

            <path
              d={LINE_PATH}
              fill="none"
              stroke="var(--mint)"
              strokeWidth={1.5}
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: visible ? 0 : 1,
                transition: "stroke-dashoffset 1400ms ease-out",
              }}
            />

            <circle
              cx={point.x}
              cy={point.y}
              r={isPinned ? 4 : 3}
              fill="var(--mint)"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 400ms ease 1300ms, r 200ms ease, cx 150ms ease, cy 150ms ease",
              }}
            />
          </svg>

          {/* year markers */}
          {DATA.map((d, i) => (
            <button
              key={d.year}
              type="button"
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex((prev) => (prev === i ? null : prev))}
              className="tabular absolute bottom-0 -translate-x-1/2 cursor-pointer border-0 bg-transparent p-1 text-[13px] font-medium text-shade transition-opacity duration-300"
              style={{
                left: `${(POINTS[i].x / VB_WIDTH) * 100}%`,
                opacity: visible ? (activeIndex === i ? 1 : 0.85) : 0,
                color: activeIndex === i ? "var(--iris)" : "var(--shade)",
                transitionDelay: visible ? "1100ms" : "0ms",
              }}
              aria-label={`${d.year}: net worth ${formatINR(d.netWorth)}, assets ${formatINR(d.assets)}, liabilities ${formatINR(d.liabilities)}`}
            >
              {d.year}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
