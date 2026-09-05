"use client";

import { useState, type SVGProps } from "react";
import { formatINR } from "@/lib/format";

function BarChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 19V10M12 19V5M19 19v-7" />
    </svg>
  );
}
function BankIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v8M10 10v8M14 10v8M19 10v8" />
      <path d="M3 19h18" />
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
function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
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
function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="8" width="18" height="11" rx="1" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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
function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 19 6v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    </svg>
  );
}
function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v4.5M12 8.5v.01" />
    </svg>
  );
}

type LimitedRow = {
  label: string;
  value: number;
  note: string;
  icon: (p: SVGProps<SVGSVGElement>) => React.ReactElement;
};

const LIMITED_VIEW: LimitedRow[] = [
  { label: "Investments", value: 3_200_000, note: "Doesn't include property, gold or business stake.", icon: BarChartIcon },
  { label: "Bank balance", value: 850_000, note: "Just one account type — not the full picture.", icon: BankIcon },
  { label: "Market value", value: 1_200_000, note: "A snapshot, not your net worth.", icon: TrendIcon },
];

type CompleteRow = {
  label: string;
  value: number | "included";
  icon: (p: SVGProps<SVGSVGElement>) => React.ReactElement;
};

const COMPLETE_VIEW: CompleteRow[] = [
  { label: "Property & real estate", value: 6_500_000, icon: HomeIcon },
  { label: "Gold & other assets", value: 400_000, icon: CoinIcon },
  { label: "Business stake", value: 2_000_000, icon: BriefcaseIcon },
  { label: "Loans & liabilities", value: -4_650_000, icon: MinusCircleIcon },
  { label: "Insurance & protection", value: "included", icon: ShieldIcon },
  { label: "Investments & bank", value: 4_050_000, icon: BarChartIcon },
];

const REAL_NET_WORTH = COMPLETE_VIEW.reduce(
  (sum, row) => (typeof row.value === "number" ? sum + row.value : sum),
  0
);
const POSITIVE_TOTAL = COMPLETE_VIEW.reduce(
  (sum, row) => (typeof row.value === "number" && row.value > 0 ? sum + row.value : sum),
  0
);

/**
 * The USPs, delivered as a "limited view → connects it all → complete
 * picture" composition rather than a plain comparison table — restyled
 * around a supplied reference image, keeping the md spec's underlying
 * differentiators (property/gold/business stake included) rather than
 * its literal row-by-row layout. fynveda-landing-layout.md §2 "09 — Not
 * a portfolio tracker". Background stays --ink: the page closes the way
 * it opened. Hovering, focusing or tapping a row in either panel
 * highlights it and quiets its neighbours; FynVeda's rows also reveal
 * their share of the total, showing exactly how each piece contributes
 * to the number a tracker never shows.
 */
export default function Comparison() {
  const [leftHover, setLeftHover] = useState<string | null>(null);
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const leftActive = leftHover ?? leftSelected;

  const [rightHover, setRightHover] = useState<string | null>(null);
  const [rightSelected, setRightSelected] = useState<string | null>(null);
  const rightActive = rightHover ?? rightSelected;

  const anyActive = leftActive !== null || rightActive !== null;

  return (
    <section
      id="comparison"
      className="border-l-4 border-halo/20 pl-5 text-halo xl:border-l-0 xl:pl-24"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="container py-14 md:py-20 lg:py-24">
        <span className="tabular mb-6 block text-[13px] font-medium text-iris xl:hidden">
          09
        </span>

        {/* ============ header ============ */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[12px] font-medium uppercase text-iris" style={{ letterSpacing: "0.08em" }}>
              A different approach
            </p>
            <h2
              className="font-display mt-3 max-w-xl text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Not a portfolio tracker.
            </h2>
            <span className="mt-4 block h-[3px] w-12" style={{ background: "var(--iris)" }} aria-hidden="true" />
          </div>
          <p className="hidden text-right text-[14px] leading-snug lg:block" style={{ color: "var(--shade)" }}>
            More than numbers.
            <br />
            A clearer financial life.
          </p>
        </div>

        {/* ============ limited view → connector → complete view ============ */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_120px_1.15fr] lg:items-stretch lg:gap-6">
          {/* ============ what most apps see ============ */}
          <div
            className="rounded-[14px] border p-6"
            style={{ borderColor: "var(--rule-on-dark)", background: "var(--ink-raised)" }}
          >
            <p className="text-[19px] font-medium" style={{ color: "var(--halo)" }}>
              What most financial apps see
            </p>
            <p className="mt-1 text-[13px]" style={{ color: "var(--shade)" }}>
              Only a part of your financial life.
            </p>

            <div className="mt-6 flex flex-col">
              {LIMITED_VIEW.map((row) => {
                const isActive = leftActive === row.label;
                const dim = leftActive !== null && !isActive;
                return (
                  <button
                    key={row.label}
                    type="button"
                    onMouseEnter={() => setLeftHover(row.label)}
                    onMouseLeave={() => setLeftHover(null)}
                    onFocus={() => setLeftHover(row.label)}
                    onBlur={() => setLeftHover(null)}
                    onClick={() => setLeftSelected((prev) => (prev === row.label ? null : row.label))}
                    aria-pressed={leftSelected === row.label}
                    className="w-full cursor-pointer border-0 bg-transparent p-0 py-2.5 text-left transition-opacity duration-300"
                    style={{ opacity: dim ? 0.4 : 1 }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <row.icon
                          className="h-4 w-4 shrink-0 transition-colors duration-300"
                          style={{ color: "var(--iris)" }}
                        />
                        <span
                          className="text-[15px] transition-colors duration-300"
                          style={{ color: "var(--halo)", opacity: isActive ? 1 : 0.85 }}
                        >
                          {row.label}
                        </span>
                      </span>
                      <span className="tabular text-[15px] font-medium" style={{ color: "var(--halo)" }}>
                        {formatINR(row.value)}
                      </span>
                    </div>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[32ch] pl-7 pt-1.5 text-[12px] leading-snug" style={{ color: "var(--shade)" }}>
                          {row.note}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              className="mt-6 flex items-start gap-2.5 rounded-[10px] border p-3.5"
              style={{ borderColor: "var(--rule-on-dark)", background: "rgba(180,156,255,0.04)" }}
            >
              <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--shade)" }} />
              <p className="text-[13px] leading-snug" style={{ color: "var(--shade)" }}>
                Stops at market-linked assets. Your bigger picture stays
                hidden.
              </p>
            </div>
          </div>

          {/* ============ connector ============ */}
          <div className="flex flex-row items-center gap-4 lg:flex-col lg:justify-center lg:gap-3">
            <span
              className="hidden h-px flex-1 lg:block"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${anyActive ? "var(--iris)" : "var(--rule-on-dark)"} 50%, transparent 50%)`,
                backgroundSize: "1px 8px",
                width: "1px",
                height: "100%",
                transition: "background-image 300ms ease",
              }}
              aria-hidden="true"
            />
            <span
              className="block h-px flex-1 lg:hidden"
              style={{
                backgroundImage: `linear-gradient(to right, ${anyActive ? "var(--iris)" : "var(--rule-on-dark)"} 50%, transparent 50%)`,
                backgroundSize: "8px 1px",
                transition: "background-image 300ms ease",
              }}
              aria-hidden="true"
            />
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[15px] transition-all duration-300"
              style={{
                borderColor: "var(--iris)",
                color: anyActive ? "white" : "var(--iris)",
                background: anyActive ? "var(--iris)" : "transparent",
              }}
              aria-hidden="true"
            >
              →
            </span>
            <div className="shrink-0 text-center">
              <p className="text-[11px] font-medium uppercase text-iris" style={{ letterSpacing: "0.06em" }}>
                FynVeda connects it all
              </p>
              <p className="mt-2 max-w-[16ch] text-[12px] leading-snug" style={{ color: "var(--shade)" }}>
                Beyond investments. Across your entire financial life.
                Always up to date.
              </p>
            </div>
            <span
              className="hidden h-px flex-1 lg:block"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${anyActive ? "var(--iris)" : "var(--rule-on-dark)"} 50%, transparent 50%)`,
                backgroundSize: "1px 8px",
                width: "1px",
                height: "100%",
                transition: "background-image 300ms ease",
              }}
              aria-hidden="true"
            />
            <span
              className="block h-px flex-1 lg:hidden"
              style={{
                backgroundImage: `linear-gradient(to right, ${anyActive ? "var(--iris)" : "var(--rule-on-dark)"} 50%, transparent 50%)`,
                backgroundSize: "8px 1px",
                transition: "background-image 300ms ease",
              }}
              aria-hidden="true"
            />
          </div>

          {/* ============ what FynVeda sees ============ */}
          <div
            className="rounded-[14px] border p-6 lg:p-7"
            style={{ borderColor: "var(--iris)", background: "var(--ink-raised)" }}
          >
            <p className="text-[19px] font-medium" style={{ color: "var(--halo)" }}>
              What FynVeda sees
            </p>
            <p className="mt-1 text-[13px] text-iris">Your complete financial picture.</p>

            <div className="mt-6 flex flex-col">
              {COMPLETE_VIEW.map((row) => {
                const isActive = rightActive === row.label;
                const dim = rightActive !== null && !isActive;
                const pct =
                  typeof row.value === "number"
                    ? Math.round((Math.abs(row.value) / POSITIVE_TOTAL) * 100)
                    : null;
                return (
                  <button
                    key={row.label}
                    type="button"
                    onMouseEnter={() => setRightHover(row.label)}
                    onMouseLeave={() => setRightHover(null)}
                    onFocus={() => setRightHover(row.label)}
                    onBlur={() => setRightHover(null)}
                    onClick={() => setRightSelected((prev) => (prev === row.label ? null : row.label))}
                    aria-pressed={rightSelected === row.label}
                    className="w-full cursor-pointer border-0 bg-transparent p-0 py-2.5 text-left transition-opacity duration-300"
                    style={{ opacity: dim ? 0.4 : 1 }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <row.icon
                          className="h-4 w-4 shrink-0 transition-colors duration-300"
                          style={{ color: isActive ? "white" : "var(--iris)" }}
                        />
                        <span
                          className="text-[15px] font-medium transition-colors duration-300"
                          style={{ color: isActive ? "var(--iris)" : "var(--halo)" }}
                        >
                          {row.label}
                        </span>
                      </span>
                      <span className="tabular text-[15px] font-medium" style={{ color: "var(--halo)" }}>
                        {row.value === "included"
                          ? "Included"
                          : `${row.value < 0 ? "−" : ""}${formatINR(row.value)}`}
                      </span>
                    </div>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="pl-7 pt-1.5 text-[12px] font-medium" style={{ color: "var(--iris)" }}>
                          {pct !== null
                            ? `${pct}% of ${typeof row.value === "number" && row.value < 0 ? "assets, subtracted" : "assets"}`
                            : "Tracked, not just noted."}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              className="mt-6 grid gap-4 rounded-[10px] border p-4 sm:grid-cols-2"
              style={{ borderColor: "var(--rule-on-dark)", background: "rgba(180,156,255,0.05)" }}
            >
              <div>
                <p className="text-[13px]" style={{ color: "var(--shade)" }}>
                  Your real net worth
                </p>
                <p
                  className="font-display tabular mt-1 text-[32px] leading-none text-halo sm:text-[36px]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {formatINR(REAL_NET_WORTH)}
                </p>
              </div>
              <div className="flex flex-col justify-center gap-1 text-[13px]" style={{ color: "var(--shade)" }}>
                <p>Everything you own.</p>
                <p>Everything you control.</p>
                <p>In one place.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
