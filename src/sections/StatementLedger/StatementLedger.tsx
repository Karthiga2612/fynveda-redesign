"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";
import { formatINR } from "@/lib/format";

function BankIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v9M10 10v9M14 10v9M19 10v9" />
      <path d="M3 19h18" />
    </svg>
  );
}
function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="11" width="14" height="9" rx="1" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 20 8 12 13 4 8Z" />
      <path d="M4 12l8 5 8-5" />
    </svg>
  );
}
function TrendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 17 10 11l4 4 6-8" />
      <path d="M14 7h6v6" />
    </svg>
  );
}
function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}
function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 19 6v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    </svg>
  );
}
function CoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.5 15.5c0 1 1 1.5 2.5 1.5s2.5-.6 2.5-1.6c0-2.4-5-1.1-5-3.5 0-1 1-1.6 2.5-1.6s2.5.5 2.5 1.5" />
    </svg>
  );
}
function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}
function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="8" width="18" height="11" rx="1" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
function SeedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20v-7" />
      <path d="M12 13c-3.5 0-5-2.5-5-6 3.5 0 5 2.5 5 6z" />
      <path d="M12 13c3.5 0 5-2.5 5-6-3.5 0-5 2.5-5 6z" />
    </svg>
  );
}
function CardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 10h18" />
    </svg>
  );
}
function MinusCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12h8" />
    </svg>
  );
}

type Item = {
  key: string;
  label: string;
  detail: string;
  value: number;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
};

// Mock values — sum to ₹1,24,00,000 in assets and ₹46,50,000 in
// liabilities, the same illustrative figures used in the Hero equation.
const ASSETS: Item[] = [
  { key: "bank", label: "Bank accounts", value: 400_000, detail: "Everyday balances, tracked across every account in real time.", icon: BankIcon },
  { key: "fd", label: "Fixed deposits", value: 800_000, detail: "Locked-in returns, maturity dates included.", icon: LockIcon },
  { key: "mf", label: "Mutual funds", value: 2_200_000, detail: "NAV-linked value, updated daily.", icon: LayersIcon },
  { key: "stocks", label: "Stocks", value: 1_500_000, detail: "Live market value, not what you paid for them.", icon: TrendIcon },
  { key: "bonds", label: "Bonds", value: 600_000, detail: "Fixed-income holdings, government and corporate.", icon: DocumentIcon },
  { key: "retirement", label: "Retirement accounts", value: 1_200_000, detail: "EPF, PPF and NPS, wherever they sit.", icon: ShieldIcon },
  { key: "gold", label: "Gold", value: 500_000, detail: "Physical and digital, valued at today's rate.", icon: CoinIcon },
  { key: "realestate", label: "Real estate", value: 4_200_000, detail: "Market-linked valuation, not purchase price.", icon: HomeIcon },
  { key: "business", label: "Business ownership", value: 800_000, detail: "Your stake, valued as a going concern.", icon: BriefcaseIcon },
  { key: "private", label: "Private investments", value: 200_000, detail: "Startups and private equity, wherever you've backed them.", icon: SeedIcon },
];

const LIABILITIES: Item[] = [
  { key: "homeloan", label: "Home loans", value: 3_200_000, detail: "Outstanding principal, updated with every EMI.", icon: HomeIcon },
  { key: "personalloan", label: "Personal loans", value: 600_000, detail: "Unsecured borrowing, tracked to the rupee.", icon: MinusCircleIcon },
  { key: "cards", label: "Credit cards", value: 350_000, detail: "Statement balance, not just the minimum due.", icon: CardIcon },
  { key: "bizobligations", label: "Business obligations", value: 500_000, detail: "Loans and guarantees tied to your business.", icon: BriefcaseIcon },
];

const TOTAL_ASSETS = ASSETS.reduce((sum, item) => sum + item.value, 0);
const TOTAL_LIABILITIES = LIABILITIES.reduce((sum, item) => sum + item.value, 0);
const REAL_NET_WORTH = TOTAL_ASSETS - TOTAL_LIABILITIES;

/**
 * The full asset and liability inventory, presented as an actual
 * two-part statement — not feature cards. fynveda-landing-layout.md §2
 * "05 — Everything in one statement". Hovering, focusing or clicking a
 * row spotlights it (value, share of its column, and the existing
 * one-line detail) while the rest of the statement quiets down; the
 * whole thing resolves into Total assets − Total liabilities = Real net
 * worth at the bottom.
 */
export default function StatementLedger() {
  const [visible, setVisible] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const activeKey = hoveredKey ?? selectedKey;
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function renderColumn(items: Item[], tone: "asset" | "liability", columnTotal: number, startDelay: number) {
    return items.map((item, i) => {
      const isActive = activeKey === item.key;
      const isDimmed = activeKey !== null && !isActive;
      const pctOfColumn = Math.round((item.value / columnTotal) * 100);

      return (
        <button
          key={item.key}
          type="button"
          onMouseEnter={() => setHoveredKey(item.key)}
          onMouseLeave={() => setHoveredKey(null)}
          onFocus={() => setHoveredKey(item.key)}
          onBlur={() => setHoveredKey(null)}
          onClick={() => setSelectedKey((prev) => (prev === item.key ? null : item.key))}
          aria-pressed={selectedKey === item.key}
          className="relative flex w-full cursor-pointer items-start gap-3 border-b py-3.5 text-left transition-all duration-500 ease-out"
          style={{
            borderColor: "var(--rule-on-light)",
            opacity: visible ? (isDimmed ? 0.5 : 1) : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: visible ? `${startDelay + i * 40}ms` : "0ms",
          }}
        >
          <span
            className="absolute left-[-21px] top-4 h-4 w-[2px] transition-opacity duration-300"
            style={{ background: "var(--iris)", opacity: isActive ? 1 : 0 }}
            aria-hidden="true"
          />
          <item.icon
            className="mt-0.5 h-4 w-4 shrink-0 transition-colors duration-300"
            style={{
              color: isActive ? "var(--iris)" : tone === "asset" ? "var(--iris)" : "var(--ink)",
              opacity: isActive ? 1 : tone === "liability" ? 0.7 : 1,
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-4">
              <span
                className="text-[17px] font-medium transition-colors duration-300"
                style={{
                  color: isActive ? "var(--iris)" : "var(--ink)",
                  opacity: isActive ? 1 : tone === "liability" ? 0.7 : 1,
                }}
              >
                {item.label}
              </span>
              <span
                className="tabular shrink-0 text-[15px] font-medium transition-opacity duration-300"
                style={{ color: "var(--iris)", opacity: isActive ? 1 : 0 }}
              >
                {formatINR(item.value)}
              </span>
            </div>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[36ch] pt-1.5 text-[13px] leading-snug" style={{ color: "var(--ink)", opacity: 0.55 }}>
                  {item.detail}
                </p>
                <p className="mt-1 text-[12px] font-medium" style={{ color: "var(--iris)" }}>
                  {pctOfColumn}% of {tone === "asset" ? "assets" : "liabilities"}
                </p>
              </div>
            </div>
          </div>
        </button>
      );
    });
  }

  return (
    <section
      id="statement"
      className="border-l-4 pl-5 bg-vellum text-ink xl:border-l-0 xl:pl-24"
      style={{ borderColor: "var(--rule-on-light)", scrollMarginTop: "80px" }}
    >
      <div ref={sectionRef} className="container py-14 md:py-20 lg:py-24">
        <span className="tabular mb-6 block text-[13px] font-medium text-iris xl:hidden">
          05
        </span>

        <h2
          className="font-display max-w-xl text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
          style={{
            letterSpacing: "-0.02em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 500ms ease-out, transform 500ms ease-out",
          }}
        >
          Everything in one statement.
        </h2>

        <div className="mt-14 grid gap-12 pl-6 lg:grid-cols-2 lg:gap-x-16 lg:mt-16">
          {/* ============ assets ============ */}
          <div>
            <p
              className="uppercase text-[13px] font-medium text-iris"
              style={{ letterSpacing: "0.04em" }}
            >
              Assets
            </p>
            <div className="mt-3 h-px" style={{ background: "var(--rule-on-light)" }} />
            <div className="mt-1">{renderColumn(ASSETS, "asset", TOTAL_ASSETS, 0)}</div>
          </div>

          {/* ============ liabilities ============ */}
          <div>
            <p
              className="uppercase text-[13px] font-medium text-iris"
              style={{ letterSpacing: "0.04em" }}
            >
              Liabilities
            </p>
            <div className="mt-3 h-px" style={{ background: "var(--rule-on-light)" }} />
            <div className="mt-1">{renderColumn(LIABILITIES, "liability", TOTAL_LIABILITIES, 60)}</div>
          </div>
        </div>

        {/* ============ Total assets − Total liabilities = Real net worth ============ */}
        <div
          className="mt-16 pl-6 lg:mt-20"
          style={{
            borderTop: "1px solid var(--rule-on-light)",
            paddingTop: "2.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 500ms ease-out 420ms, transform 500ms ease-out 420ms",
          }}
        >
          <div
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px]"
            style={{ color: "var(--ink)", opacity: 0.7 }}
          >
            <span>Total assets</span>
            <span className="tabular font-medium" style={{ color: "var(--iris)", opacity: 1 }}>
              {formatINR(TOTAL_ASSETS)}
            </span>
            <span>&minus; total liabilities</span>
            <span className="tabular font-medium" style={{ color: "var(--ink)", opacity: 1 }}>
              {formatINR(TOTAL_LIABILITIES)}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[15px]" style={{ color: "var(--ink)", opacity: 0.6 }}>
                Real net worth
              </p>
              <p
                className="font-display tabular text-[48px] leading-none text-iris lg:text-[64px]"
                style={{ letterSpacing: "-0.02em" }}
              >
                {formatINR(REAL_NET_WORTH)}
              </p>
            </div>
            <p
              className="max-w-[32ch] text-[15px] leading-snug sm:text-right"
              style={{ color: "var(--ink)", opacity: 0.6 }}
            >
              Everything most apps ignore is exactly what decides your net worth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
