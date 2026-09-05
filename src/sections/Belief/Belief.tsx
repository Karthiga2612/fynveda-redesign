"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";

/**
 * The belief. Section 04 — fynveda-landing-layout.md. Heading and
 * supporting copy are the spec's belief statement, unchanged. The
 * visual beneath it — rebuilt per explicit follow-up request to match
 * a supplied reference composition — is a large radial hub: five
 * financial sources (mock data) sit in a row, thin curved SVG paths
 * fan them into one prominent central FynVeda node that visibly
 * responds when a source is selected.
 */
type SourceKey = "bank" | "investments" | "property" | "loans" | "insurance";

function BankIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v8M10 10v8M14 10v8M19 10v8" />
      <path d="M3 19h18" />
    </svg>
  );
}
function BarsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 19V13M12 19V9M19 19V5" />
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
function RupeeIcon(props: SVGProps<SVGSVGElement>) {
  const { className, style } = props;
  return (
    <svg viewBox="0 0 24 24" className={className} style={style}>
      <text x="12" y="17" textAnchor="middle" fontSize="15" fontWeight={600} fill="currentColor" stroke="none">
        ₹
      </text>
    </svg>
  );
}
function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 19 6v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const SOURCES: {
  key: SourceKey;
  x: number;
  label: string;
  desc: string;
  meta: string;
  value: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
}[] = [
  { key: "bank", x: 10, label: "Bank", desc: "Accounts & balances", meta: "4 accounts", value: "₹8.4L tracked", icon: BankIcon },
  { key: "investments", x: 30, label: "Investments", desc: "Mutual funds, stocks, bonds", meta: "12 holdings", value: "₹32.5L tracked", icon: BarsIcon },
  { key: "property", x: 50, label: "Property", desc: "Residential & commercial", meta: "1 property", value: "₹52L current value", icon: HomeIcon },
  { key: "loans", x: 70, label: "Loans", desc: "Home, car & personal", meta: "2 active loans", value: "₹32L outstanding", icon: RupeeIcon },
  { key: "insurance", x: 90, label: "Insurance", desc: "Policies & coverage", meta: "3 policies", value: "₹5L coverage", icon: ShieldIcon },
];

// viewBox 0 0 100 50 — x maps 1:1 to % of width, y*2 maps to % of height.
const DOT_Y = 15; // source connection point
const TARGET_Y = 25; // where the curves converge, just above the hub

function linePath(x: number) {
  const targetX = 50 + (x - 50) * 0.14;
  if (x === 50) return `M50 ${DOT_Y} L50 ${TARGET_Y}`;
  const midX = (x + targetX) / 2;
  return `M${x} ${DOT_Y} C${x} ${DOT_Y + 8}, ${midX} ${TARGET_Y - 4}, ${targetX} ${TARGET_Y}`;
}

export default function Belief() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<SourceKey | null>(null);
  const [selectedKey, setSelectedKey] = useState<SourceKey | null>(null);
  const activeKey = hoveredKey ?? selectedKey;
  const activeIndex = SOURCES.findIndex((s) => s.key === activeKey);

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

  function handlersFor(key: SourceKey) {
    return {
      onMouseEnter: () => setHoveredKey(key),
      onFocus: () => setHoveredKey(key),
      onBlur: () => setHoveredKey(null),
      onClick: () => setSelectedKey((prev) => (prev === key ? null : key)),
    };
  }

  function Hub({ size, pctOfParent }: { size?: string; pctOfParent?: number }) {
    const active = activeKey !== null;
    const sizeStyle = pctOfParent ? { width: `${pctOfParent}%`, aspectRatio: "1" } : {};
    return (
      <div
        className={`relative flex ${size ?? ""} flex-col items-center justify-center rounded-full text-center transition-all duration-500 ease-out`}
        style={{
          ...sizeStyle,
          containerType: pctOfParent ? "inline-size" : undefined,
          background: "var(--paper-strong)",
          border: `1px solid ${active ? "var(--iris)" : "var(--rule-on-light)"}`,
          transform: `scale(${active ? 1.04 : 1})`,
          boxShadow: active ? "0 10px 30px -18px rgba(109,74,224,0.35)" : "0 6px 20px -16px rgba(21,14,46,0.15)",
        }}
      >
        <span
          className="pointer-events-none absolute rounded-full transition-all duration-500 ease-out"
          style={{ inset: active ? "-8%" : "-5%", border: "1px solid var(--rule-on-light)", opacity: active ? 0.9 : 0.5 }}
          aria-hidden="true"
        />
        <p
          className="font-display text-[22px] leading-none text-iris sm:text-[26px] lg:text-[30px]"
          style={{ letterSpacing: "-0.02em", fontSize: pctOfParent ? "14cqw" : undefined }}
        >
          FynVeda
        </p>
        <p
          className="mt-2 text-[10px] font-medium uppercase leading-tight text-ink-soft sm:text-[11px]"
          style={{ letterSpacing: "0.06em", fontSize: pctOfParent ? "5.2cqw" : undefined }}
        >
          One financial
          <br />
          picture
        </p>
      </div>
    );
  }

  function DetailCard({ source, index }: { source: (typeof SOURCES)[number]; index: number }) {
    const align = index === 0 ? "0%" : index === SOURCES.length - 1 ? "-100%" : "-50%";
    return (
      <div
        className="pointer-events-none absolute z-10 w-[148px] rounded-md p-2.5 text-left transition-all duration-300 ease-out sm:w-[160px]"
        style={{
          left: `${source.x}%`,
          top: "34%",
          transform: `translateX(${align}) translateY(${activeKey === source.key ? 0 : -4}px)`,
          opacity: activeKey === source.key ? 1 : 0,
          background: "var(--paper-strong)",
          border: "1px solid var(--rule-on-light)",
          boxShadow: "0 8px 20px -14px rgba(21,14,46,0.25)",
        }}
      >
        <p className="text-[12px] font-medium text-ink">{source.meta}</p>
        <p className="tabular mt-0.5 text-[12px] text-iris">{source.value}</p>
      </div>
    );
  }

  function SourceButton({ source, index, compact = false }: { source: (typeof SOURCES)[number]; index: number; compact?: boolean }) {
    const isActive = activeKey === source.key;
    const isDimmed = activeKey !== null && !isActive;
    return (
      <button
        type="button"
        {...handlersFor(source.key)}
        aria-pressed={selectedKey === source.key}
        className={`flex ${compact ? "w-full" : ""} cursor-pointer flex-col items-center rounded-lg border-0 bg-transparent p-1.5 text-center transition-all duration-300 ease-out`}
        style={{
          opacity: visible ? (isDimmed ? 0.4 : 1) : 0,
          transform: `translateY(${visible ? 0 : 10}px) ${isActive ? "translateY(-2px)" : ""}`,
          transitionDelay: visible ? `${index * 60}ms` : "0ms",
          background: isActive ? "rgba(109,74,224,0.06)" : "transparent",
        }}
      >
        <span
          className="flex items-center justify-center rounded-full transition-all duration-300 ease-out"
          style={{
            height: compact ? 44 : 52,
            width: compact ? 44 : 52,
            border: `1px solid ${isActive ? "var(--iris)" : "var(--rule-on-light)"}`,
          }}
        >
          <source.icon
            className="transition-colors duration-300 ease-out"
            style={{ height: compact ? 18 : 20, width: compact ? 18 : 20, color: isActive ? "var(--iris)" : "var(--ink-soft)" }}
          />
        </span>
        <p className="mt-2 text-[13px] font-medium transition-colors duration-300 ease-out sm:text-[14px]" style={{ color: isActive ? "var(--iris)" : "var(--ink)" }}>
          {source.label}
        </p>
        <p className="mt-0.5 max-w-[16ch] text-[10.5px] leading-snug transition-colors duration-300 ease-out sm:text-[11px]" style={{ color: "var(--ink-soft)" }}>
          {source.desc}
        </p>
      </button>
    );
  }

  return (
    <section
      id="belief"
      className="border-l-4 pl-5 bg-vellum text-ink xl:border-l-0 xl:pl-24"
      style={{ borderColor: "var(--rule-on-light)", scrollMarginTop: "80px" }}
    >
      <div ref={sectionRef} className="container pt-14 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
        <span className="tabular mb-6 block text-[13px] font-medium text-iris xl:hidden">
          04
        </span>

        <h2
          className="font-display max-w-xl text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Every individual deserves a single source of financial truth.
        </h2>

        <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.6] text-ink" style={{ opacity: 0.6 }}>
          Not a portfolio tracker. Not a tax filing platform. Not another
          investment app.
        </p>

        {/* ============ five sources → FynVeda hub (sm and up) ============ */}
        <div className="mt-10 hidden sm:block lg:mt-12">
          <div className="relative w-full aspect-[100/50] lg:aspect-[100/38]">
            <svg
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {SOURCES.map((s, i) => {
                const isActive = activeKey === s.key;
                const isDimmed = activeKey !== null && !isActive;
                return (
                  <path
                    key={s.key}
                    d={linePath(s.x)}
                    fill="none"
                    stroke={isActive ? "var(--iris)" : "var(--rule-on-light)"}
                    strokeWidth={isActive ? 0.5 : 0.3}
                    pathLength={1}
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: visible ? 0 : 1,
                      opacity: isDimmed ? 0.3 : 1,
                      transition: `stroke-dashoffset 900ms ease-out ${i * 90 + 200}ms, stroke 300ms ease, stroke-width 300ms ease, opacity 300ms ease`,
                    }}
                  />
                );
              })}
            </svg>

            {SOURCES.map((s, i) => (
              <div
                key={s.key}
                className="absolute w-[19%] -translate-x-1/2"
                style={{ left: `${s.x}%`, top: "0%" }}
              >
                <SourceButton source={s} index={i} />
                <span
                  aria-hidden="true"
                  className="mx-auto mt-1 block h-1.5 w-1.5 rounded-full transition-colors duration-300 ease-out"
                  style={{
                    background: activeKey === s.key ? "var(--iris)" : "var(--ink-soft)",
                    opacity: visible ? 1 : 0,
                    transition: `opacity 300ms ease ${i * 60 + 100}ms, background-color 300ms ease`,
                  }}
                />
              </div>
            ))}

            {activeIndex >= 0 && <DetailCard source={SOURCES[activeIndex]} index={activeIndex} />}

            <div
              className="absolute left-1/2 top-[66%] w-[16%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ease-out lg:top-[70%] lg:w-[19%]"
              style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "700ms" : "0ms" }}
            >
              <Hub size="w-full h-auto" pctOfParent={100} />
            </div>
          </div>

          <p
            className="mx-auto mt-3 max-w-[36ch] text-center text-[13px] leading-snug text-ink transition-opacity duration-500 ease-out"
            style={{ opacity: visible ? 0.65 : 0, transitionDelay: visible ? "900ms" : "0ms" }}
          >
            All your financial life, in one place.
          </p>
        </div>

        {/* ============ mobile fallback: compact 2-column grid → hub ============ */}
        <div className="mt-10 sm:hidden">
          <div className="grid grid-cols-2 gap-x-2 gap-y-6">
            {SOURCES.map((s, i) => (
              <div key={s.key} className={i === SOURCES.length - 1 ? "col-span-2 flex justify-center" : ""}>
                <SourceButton source={s} index={i} compact />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-center text-center">
            <span
              aria-hidden="true"
              className="block h-6 w-px origin-top transition-all duration-300 ease-out"
              style={{
                background: activeKey !== null ? "var(--iris)" : "var(--rule-on-light)",
                opacity: visible ? 1 : 0,
                transform: visible ? "scaleY(1)" : "scaleY(0)",
                transitionDelay: visible ? "500ms" : "0ms",
              }}
            />
            <div className="mt-2" style={{ opacity: visible ? 1 : 0, transition: "opacity 500ms ease-out", transitionDelay: visible ? "600ms" : "0ms" }}>
              <Hub size="h-28 w-28" />
            </div>
            <p
              className="mt-4 max-w-[28ch] text-[13px] leading-snug text-ink transition-opacity duration-500 ease-out"
              style={{ opacity: visible ? 0.65 : 0, transitionDelay: visible ? "750ms" : "0ms" }}
            >
              All your financial life, in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
