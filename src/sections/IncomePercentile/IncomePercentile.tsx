"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type SVGProps } from "react";
import { formatINR } from "@/lib/format";

const MIN = 300_000; // ₹3L
const MAX = 5_000_000; // ₹50L
const STEP = 50_000;
const BAND_BOUNDARY = 2_200_000; // ₹22L — top 10% below, top 1% at/above
const DEFAULT_INCOME = 1_800_000; // ₹18L, per the wireframe's resting handle position

type Band = "top10" | "top1";

const COPY: Record<Band, string> = {
  top10:
    "You're in the top 10% of earners in India. That's a starting position, not a destination. Where you actually end up is decided by what you convert income into.",
  top1:
    "You're in the top 1% of earners in India. Even here, income is still a starting position. What decides your net worth is what happens to it after it's earned.",
};

function formatLakhShort(value: number): string {
  if (value >= MAX) return `₹${Math.round(MAX / 100_000)}L+`;
  return `₹${Math.round(value / 100_000)}L`;
}

function LivingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

function SavingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="11" width="14" height="9" rx="1" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function InvestingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20v-7" />
      <path d="M12 13c-3.5 0-5-2.5-5-6 3.5 0 5 2.5 5 6z" />
      <path d="M12 13c3.5 0 5-2.5 5-6-3.5 0-5 2.5-5 6z" />
    </svg>
  );
}

type AllocationKey = "living" | "saving" | "investing";

const ALLOCATIONS: {
  key: AllocationKey;
  label: string;
  share: number;
  highlight?: boolean;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
}[] = [
  { key: "living", label: "Living", share: 0.5, icon: LivingIcon },
  { key: "saving", label: "Saving", share: 0.2, icon: SavingIcon },
  { key: "investing", label: "Investing", share: 0.3, highlight: true, icon: InvestingIcon },
];

const FLOW_STAGES = ["Income", "Save / Invest", "Assets", "Wealth"];

/**
 * The page's second interactive moment. A single slider carries the
 * whole argument: move it, and the percentile — and the sentence
 * underneath — updates immediately, undercutting the insight it just
 * gave. The right side answers the question the slider raises: where
 * does that income actually go, and how much of it goes to work?
 * fynveda-landing-layout.md §2 "03 — Income tells you where you stand".
 * Still --ink (dark) — the spec marks section 03 as where the ink→vellum
 * transition happens at the *bottom* edge, so 03 itself stays dark,
 * matching 01/02.
 */
export default function IncomePercentile() {
  const [income, setIncome] = useState(DEFAULT_INCOME);
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const band: Band = income <= BAND_BOUNDARY ? "top10" : "top1";
  const pct = ((income - MIN) / (MAX - MIN)) * 100;

  const announcement = useMemo(
    () =>
      `${formatINR(income)} a year — top ${band === "top10" ? "10" : "1"} percent of earners in India.`,
    [income, band]
  );

  return (
    <section
      id="income-percentile"
      className="border-l-4 border-halo/20 bg-ink pl-5 text-halo xl:border-l-0 xl:pl-24"
      style={{ scrollMarginTop: "80px" }}
    >
      <div ref={sectionRef} className="container py-14 md:py-20 lg:py-24">
        <span className="tabular mb-6 block text-[13px] font-medium text-iris xl:hidden">
          03
        </span>

        <div className="grid gap-16 lg:grid-cols-[7fr_5fr] lg:gap-12">
          {/* ============ income column ============ */}
          <div>
            <h2
              className="font-display max-w-xl text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
              style={{
                letterSpacing: "-0.02em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 500ms ease-out, transform 500ms ease-out",
              }}
            >
              Income tells you where you stand.
              <br />
              Assets tell you where you&rsquo;re going.
            </h2>

            <div
              className="mt-16 max-w-xl lg:mt-20"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 500ms ease-out 90ms, transform 500ms ease-out 90ms",
              }}
            >
              <p className="text-[15px] font-medium" style={{ color: "var(--halo)", opacity: 0.55 }}>Annual income</p>

              <div className="relative mt-6">
                <input
                  type="range"
                  className="range-ledger"
                  min={MIN}
                  max={MAX}
                  step={STEP}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  aria-label="Annual income"
                  aria-valuetext={announcement}
                  style={
                    {
                      "--track-fill": `linear-gradient(to right, var(--iris) 0%, var(--iris) ${pct}%, var(--shade) ${pct}%, var(--shade) 100%)`,
                      "--thumb-color": "var(--halo)",
                    } as CSSProperties
                  }
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[13px]" style={{ color: "var(--halo)", opacity: 0.55 }}>
                <span>₹3L</span>
                <span className="tabular font-medium text-halo" style={{ opacity: 1 }}>{formatLakhShort(income)}</span>
                <span>₹50L+</span>
              </div>

              <span className="sr-only" role="status" aria-live="polite">
                {announcement}
              </span>
            </div>

            <div
              key={band}
              className="mt-10 max-w-[46ch] lg:mt-12"
              style={{ animation: visible ? "line-in 420ms ease-out both" : undefined }}
            >
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--halo)", opacity: 0.7 }}>{COPY[band]}</p>
            </div>
          </div>

          {/* ============ where your income goes ============ */}
          <div>
            <div
              className="lg:sticky lg:top-32"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 500ms ease-out 180ms, transform 500ms ease-out 180ms",
              }}
            >
              <p
                className="text-[13px] font-medium uppercase text-iris"
                style={{ letterSpacing: "0.06em" }}
              >
                Where your income goes
              </p>

              <div className="mt-6 flex flex-col">
                {ALLOCATIONS.map((a) => (
                  <div key={a.key} className="border-b border-halo/10 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                          style={{ borderColor: a.highlight ? "var(--iris)" : "rgba(180,156,255,0.2)" }}
                        >
                          <a.icon
                            className="h-4 w-4"
                            style={{ color: a.highlight ? "var(--iris)" : "var(--halo)", opacity: a.highlight ? 1 : 0.55 }}
                          />
                        </span>
                        <span
                          className="text-[15px]"
                          style={{ color: "var(--halo)", opacity: a.highlight ? 1 : 0.6 }}
                        >
                          {a.label}
                        </span>
                      </span>
                      <span
                        className="tabular font-medium"
                        style={{
                          color: a.highlight ? "var(--iris)" : "var(--halo)",
                          fontSize: a.highlight ? "21px" : "17px",
                        }}
                      >
                        {formatINR(income * a.share)}
                      </span>
                    </div>
                    {a.highlight && (
                      <p className="mt-1.5 pl-11 text-[13px]" style={{ color: "var(--halo)", opacity: 0.6 }}>
                        Grows into your net worth over time.
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px]">
                {FLOW_STAGES.map((stage, i) => (
                  <span key={stage} className="flex items-center gap-2">
                    {i > 0 && (
                      <span
                        className="h-px w-6"
                        style={{ background: "rgba(180,156,255,0.2)" }}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      style={{
                        color: i === FLOW_STAGES.length - 1 ? "var(--iris)" : "var(--halo)",
                        opacity: i === FLOW_STAGES.length - 1 ? 1 : 0.55,
                        fontWeight: i === FLOW_STAGES.length - 1 ? 500 : 400,
                      }}
                    >
                      {stage}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
