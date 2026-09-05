"use client";

import { useState, type SVGProps } from "react";

function BankIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v8M10 10v8M14 10v8M19 10v8" />
      <path d="M3 19h18" />
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
function PieIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 12V4" />
      <path d="M12 12 18 16" />
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
function MinusCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12h8" />
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
function SeedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20v-7" />
      <path d="M12 13c-3.5 0-5-2.5-5-6 3.5 0 5 2.5 5 6z" />
      <path d="M12 13c3.5 0 5-2.5 5-6-3.5 0-5 2.5-5 6z" />
    </svg>
  );
}

type Item = {
  key: string;
  label: string;
  shortDetail: string;
  stat: string;
  value: string;
  detail: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
};

const AUTO: Item[] = [
  { key: "banks", label: "Banks", shortDetail: "Savings & current accounts", stat: "4 accounts linked", value: "₹8,40,000", detail: "Balances updated daily across every account.", icon: BankIcon },
  { key: "depositories", label: "Depositories", shortDetail: "Stocks & bonds", stat: "2 demat accounts", value: "₹32,50,000", detail: "Holdings valued at live market price.", icon: LayersIcon },
  { key: "mutualfunds", label: "Mutual funds", shortDetail: "NAV-linked folios", stat: "6 folios", value: "₹22,00,000", detail: "Value updated with each day's NAV.", icon: PieIcon },
  { key: "insurers", label: "Insurers", shortDetail: "Investment-linked policies", stat: "3 policies", value: "₹5,00,000", detail: "Surrender value of ULIPs and endowment plans.", icon: ShieldIcon },
  { key: "lenders", label: "Lenders", shortDetail: "Loans & credit", stat: "2 loan accounts", value: "₹32,00,000", detail: "Outstanding balance, updated with every EMI.", icon: MinusCircleIcon },
];

const MANUAL: Item[] = [
  { key: "property", label: "Property", shortDetail: "Real estate holdings", stat: "2 properties", value: "₹65,00,000", detail: "Valued at current market rate, not purchase price.", icon: HomeIcon },
  { key: "gold", label: "Gold", shortDetail: "Physical & digital gold", stat: "Across 2 forms", value: "₹9,50,000", detail: "Valued at today's gold rate.", icon: CoinIcon },
  { key: "business", label: "Business ownership", shortDetail: "Your equity stake", stat: "1 entity", value: "₹18,00,000", detail: "Valued as a going concern.", icon: BriefcaseIcon },
  { key: "private", label: "Private investments", shortDetail: "Startups & private equity", stat: "3 investments", value: "₹6,00,000", detail: "Wherever you've backed them.", icon: SeedIcon },
];

const RH = 64; // fixed row height (px) — keeps the SVG's y-coordinates in exact sync with the HTML rows
const MID_W = 220;
const MID_H = RH * AUTO.length; // 320 — the taller of the two groups sets the shared height
const CENTER = { x: MID_W / 2, y: MID_H / 2 };
const RIGHT_OFFSET = (MID_H - RH * MANUAL.length) / 2; // centers the shorter (manual) column within the shared height

function leftY(i: number) {
  return i * RH + RH / 2;
}
function rightY(i: number) {
  return RIGHT_OFFSET + i * RH + RH / 2;
}

/**
 * Technology and Account Aggregator, reframed around a supplied concept:
 * two groups — data connected automatically, and wealth added by hand —
 * both curving into one FynVeda "complete financial picture" node.
 * fynveda-landing-layout.md §2 "07 — Where the data comes from",
 * restyled as a compact premium composition rather than the spec's
 * literal horizontal pipeline. Selecting a row lights up only its own
 * curve into the centre; nothing moves on its own.
 */
export default function DataFlow() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const activeKey = hoveredKey ?? selectedKey;
  const activeItem = [...AUTO, ...MANUAL].find((i) => i.key === activeKey) ?? null;
  const activeAutoIndex = AUTO.findIndex((i) => i.key === activeKey);
  const activeManualIndex = MANUAL.findIndex((i) => i.key === activeKey);

  const announcement = activeItem
    ? `${activeItem.label}: ${activeItem.stat}, ${activeItem.value}. ${activeItem.detail}`
    : "";

  function row(item: Item, fixedHeight: boolean) {
    const isActive = activeKey === item.key;
    const dim = activeKey !== null && !isActive;
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
        className="flex w-full cursor-pointer items-center gap-3 rounded-[10px] border px-3 text-left transition-all duration-300"
        style={{
          height: fixedHeight ? `${RH}px` : undefined,
          paddingBlock: fixedHeight ? undefined : "10px",
          borderColor: isActive ? "var(--iris)" : "var(--rule-on-light)",
          background: isActive ? "rgba(109,74,224,0.05)" : "transparent",
          opacity: dim ? 0.45 : 1,
        }}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
          style={{ borderColor: isActive ? "var(--iris)" : "var(--rule-on-light)" }}
        >
          <item.icon className="h-4 w-4" style={{ color: "var(--iris)" }} />
        </span>
        <span className="min-w-0 flex-1">
          <span
            className="block truncate text-[14px] font-medium transition-colors duration-300"
            style={{ color: isActive ? "var(--iris)" : "var(--ink)" }}
          >
            {item.label}
          </span>
          <span className="block truncate text-[11px]" style={{ color: "var(--ink)", opacity: 0.55 }}>
            {item.shortDetail}
          </span>
        </span>
      </button>
    );
  }

  return (
    <section
      id="data-flow"
      className="border-l-4 pl-5 bg-vellum text-ink xl:border-l-0 xl:pl-24"
      style={{ borderColor: "var(--rule-on-light)", scrollMarginTop: "80px" }}
    >
      <div className="container py-14 md:py-20 lg:py-24">
        <span className="tabular mb-6 block text-[13px] font-medium text-iris xl:hidden">
          07
        </span>

        <h2
          className="font-display max-w-xl text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Your data arrives on its own.
        </h2>

        {/* ============ desktop: two groups curving into FynVeda ============ */}
        <div className="mt-14 hidden lg:block lg:mt-16">
          <div className="grid gap-8" style={{ gridTemplateColumns: `1fr ${MID_W}px 1fr` }}>
            <div>
              <p className="uppercase text-[13px] font-medium" style={{ color: "var(--iris)", letterSpacing: "0.04em" }}>
                Connected automatically
              </p>
              <p className="mt-1 text-[12px]" style={{ color: "var(--ink)", opacity: 0.5 }}>
                Synced via Account Aggregator
              </p>
            </div>
            <div />
            <div className="text-right">
              <p className="uppercase text-[13px] font-medium" style={{ color: "var(--iris)", letterSpacing: "0.04em" }}>
                Added by you
              </p>
              <p className="mt-1 text-[12px]" style={{ color: "var(--ink)", opacity: 0.5 }}>
                Add once, revalue when needed
              </p>
            </div>
          </div>

          <div className="mt-6 grid items-start gap-8" style={{ gridTemplateColumns: `1fr ${MID_W}px 1fr` }}>
            <div className="flex flex-col gap-0" style={{ height: MID_H }}>
              {AUTO.map((item) => row(item, true))}
            </div>

            <div className="relative" style={{ width: MID_W, height: MID_H }}>
              <svg width={MID_W} height={MID_H} viewBox={`0 0 ${MID_W} ${MID_H}`} aria-hidden="true">
                {AUTO.map((item, i) => {
                  const isActive = activeAutoIndex === i;
                  const y = leftY(i);
                  return (
                    <path
                      key={item.key}
                      d={`M0 ${y} C ${CENTER.x * 0.5} ${y}, ${CENTER.x * 0.5} ${CENTER.y}, ${CENTER.x} ${CENTER.y}`}
                      fill="none"
                      strokeWidth={isActive ? 2 : 1.3}
                      style={{
                        stroke: isActive ? "var(--iris)" : "var(--rule-on-light)",
                        opacity: activeKey !== null && !isActive ? 0.35 : 1,
                        transition: "stroke 300ms ease, opacity 300ms ease",
                      }}
                    />
                  );
                })}
                {MANUAL.map((item, i) => {
                  const isActive = activeManualIndex === i;
                  const y = rightY(i);
                  const midX = CENTER.x + (MID_W - CENTER.x) * 0.5;
                  return (
                    <path
                      key={item.key}
                      d={`M${CENTER.x} ${CENTER.y} C ${midX} ${CENTER.y}, ${midX} ${y}, ${MID_W} ${y}`}
                      fill="none"
                      strokeWidth={isActive ? 2 : 1.3}
                      style={{
                        stroke: isActive ? "var(--iris)" : "var(--rule-on-light)",
                        opacity: activeKey !== null && !isActive ? 0.35 : 1,
                        transition: "stroke 300ms ease, opacity 300ms ease",
                      }}
                    />
                  );
                })}
                <circle cx={CENTER.x} cy={CENTER.y} r={22} fill="none" strokeWidth="1" style={{ stroke: "var(--rule-on-light)" }} />
                <circle
                  cx={CENTER.x}
                  cy={CENTER.y}
                  r={activeKey ? 13 : 11}
                  style={{ fill: "var(--iris)", transition: "r 300ms ease" }}
                />
              </svg>

              <div
                className="pointer-events-none absolute text-center"
                style={{ left: "50%", top: `${((CENTER.y + 30) / MID_H) * 100}%`, transform: "translateX(-50%)" }}
              >
                <p className="font-display text-[17px] font-medium" style={{ color: "var(--iris)" }}>
                  FynVeda
                </p>
                <div key={activeKey ?? "idle"} style={{ animation: "line-in 250ms ease-out both" }}>
                  {activeItem ? (
                    <>
                      <p className="tabular mt-1 text-[13px] font-medium" style={{ color: "var(--iris)" }}>
                        {activeItem.stat} · {activeItem.value}
                      </p>
                      <p className="mt-0.5 max-w-[22ch] text-[11px] leading-snug" style={{ color: "var(--ink)", opacity: 0.55 }}>
                        {activeItem.detail}
                      </p>
                    </>
                  ) : (
                    <p className="mt-1 max-w-[16ch] text-[12px] leading-snug" style={{ color: "var(--ink)", opacity: 0.55 }}>
                      Complete financial picture
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-0" style={{ height: MID_H }}>
              {MANUAL.map((item) => row(item, true))}
            </div>
          </div>
        </div>

        {/* ============ mobile: stacked groups + centre node ============ */}
        <div className="mt-14 flex flex-col gap-10 lg:hidden">
          <div>
            <p className="uppercase text-[13px] font-medium" style={{ color: "var(--iris)", letterSpacing: "0.04em" }}>
              Connected automatically
            </p>
            <p className="mt-1 text-[12px]" style={{ color: "var(--ink)", opacity: 0.5 }}>
              Synced via Account Aggregator
            </p>
            <div className="mt-4 flex flex-col gap-2">{AUTO.map((item) => row(item, false))}</div>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "var(--iris)" }} aria-hidden="true" />
            <p className="font-display mt-3 text-[17px] font-medium" style={{ color: "var(--iris)" }}>
              FynVeda
            </p>
            <div key={activeKey ?? "idle-m"} style={{ animation: "line-in 250ms ease-out both" }}>
              {activeItem ? (
                <>
                  <p className="tabular mt-1 text-[13px] font-medium" style={{ color: "var(--iris)" }}>
                    {activeItem.stat} · {activeItem.value}
                  </p>
                  <p className="mt-0.5 max-w-[28ch] text-[12px] leading-snug" style={{ color: "var(--ink)", opacity: 0.55 }}>
                    {activeItem.detail}
                  </p>
                </>
              ) : (
                <p className="mt-1 text-[12px]" style={{ color: "var(--ink)", opacity: 0.55 }}>
                  Complete financial picture
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="uppercase text-[13px] font-medium" style={{ color: "var(--iris)", letterSpacing: "0.04em" }}>
              Added by you
            </p>
            <p className="mt-1 text-[12px]" style={{ color: "var(--ink)", opacity: 0.5 }}>
              Add once, revalue when needed
            </p>
            <div className="mt-4 flex flex-col gap-2">{MANUAL.map((item) => row(item, false))}</div>
          </div>
        </div>

        <p className="sr-only">
          Data flows from your banks, depositories, mutual funds, insurers
          and lenders through an RBI-regulated, consent-based Account
          Aggregator into one FynVeda profile. Property, gold, business
          ownership and private investments are added by hand and
          revalued on your schedule.
        </p>
        <span className="sr-only" role="status" aria-live="polite">
          {announcement}
        </span>

        {/* consent — integrated as the composition's trust seal, not a bare paragraph */}
        <div className="mt-14 flex max-w-[60ch] items-start gap-3 pt-7 lg:mt-16" style={{ borderTop: "1px solid var(--rule-on-light)" }}>
          <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--iris)" }} />
          <p className="text-[15px] font-medium leading-[1.6] sm:text-[16px]" style={{ color: "var(--ink)" }}>
            Nothing is fetched without your explicit, revocable consent.
            FynVeda reads; it never moves money.
          </p>
        </div>
      </div>
    </section>
  );
}
