"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";

/**
 * The belief. Section 04 — fynveda-landing-layout.md. Heading and
 * supporting copy are the spec's belief statement, unchanged.
 *
 * The visual: a vertical list of five financial sources on the left,
 * curving into one large FynVeda hub anchored on the right — the same
 * "list feeds a node" composition as the "Your data arrives on its own"
 * section (07), just single-sided and with a more prominent hub, per
 * explicit follow-up request to move away from the original horizontal
 * row-of-five-above-a-centered-hub layout.
 *
 * On lg+ screens the section pins in place (the same trick used in
 * sections 02 and 03) for a fixed scroll distance: while pinned, scroll
 * position maps continuously to a source index, so the hub cycles
 * through what each source contributes as you scroll, before releasing.
 * Hovering or focusing a row still previews it immediately, overriding
 * the scroll-linked source for as long as the pointer/focus stays there.
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
  label: string;
  desc: string;
  meta: string;
  value: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
}[] = [
  { key: "bank", label: "Bank", desc: "Accounts & balances", meta: "4 accounts", value: "₹8.4L tracked", icon: BankIcon },
  { key: "investments", label: "Investments", desc: "Mutual funds, stocks, bonds", meta: "12 holdings", value: "₹32.5L tracked", icon: BarsIcon },
  { key: "property", label: "Property", desc: "Residential & commercial", meta: "1 property", value: "₹52L current value", icon: HomeIcon },
  { key: "loans", label: "Loans", desc: "Home, car & personal", meta: "2 active loans", value: "₹32L outstanding", icon: RupeeIcon },
  { key: "insurance", label: "Insurance", desc: "Policies & coverage", meta: "3 policies", value: "₹5L coverage", icon: ShieldIcon },
];

const RH = 76; // fixed row height (px) — keeps the SVG's y-coordinates in exact sync with the HTML rows
const ROW_GAP = 20; // visible breathing room between the boxes
const LIST_H = RH * SOURCES.length + ROW_GAP * (SOURCES.length - 1);
const HUB_X = 58; // hub center, as a % across the connector's fluid width
const HUB_Y = LIST_H / 2;
const HUB_SIZE = "clamp(220px, 19vw, 300px)"; // scales with the section instead of a fixed px

function rowY(i: number) {
  return i * (RH + ROW_GAP) + RH / 2;
}

const CURVE_MID_X = HUB_X * 0.45; // shared control-point x for every curve (see rowY's C-curve below)
const RING_DOT_COUNT = 8;

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

const PIN_SCROLL_DISTANCE = 1300; // px of extra scroll runway reserved for the pinned scrub, lg+ only

export default function Belief() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingH, setHeadingH] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<SourceKey | null>(null);
  const [litCount, setLitCount] = useState(1); // how many sources (from the top) have connected so far
  const [pinProgress, setPinProgress] = useState(0); // 0–1 while pinned; stays 0 when not pinned (below lg)
  const allLit = litCount >= SOURCES.length;
  const headingT = clamp(pinProgress / 0.2, 0, 1); // heading is fully tucked away by 20% into the pinned scroll

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setHeadingH(entries[0].contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const hubActive = hoveredKey !== null || allLit;
  const hoveredSource = hoveredKey ? SOURCES.find((s) => s.key === hoveredKey) ?? null : null;
  const displaySource = hoveredSource ?? SOURCES[litCount - 1];

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
      const count = clamp(Math.ceil(progress * SOURCES.length), 1, SOURCES.length);
      setLitCount(count);
      setPinProgress(isPinned ? progress : 0);
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

  function handlersFor(key: SourceKey) {
    return {
      onMouseEnter: () => setHoveredKey(key),
      onMouseLeave: () => setHoveredKey(null),
      onFocus: () => setHoveredKey(key),
      onBlur: () => setHoveredKey(null),
    };
  }

  function Hub({ size }: { size: number | string }) {
    const active = hubActive;
    return (
      <div
        className="relative flex flex-col items-center justify-center rounded-full text-center transition-all duration-500 ease-out"
        style={{
          width: size,
          height: size,
          background: "var(--paper-strong)",
          border: `1px solid ${active ? "var(--iris)" : "var(--rule-on-light)"}`,
          transform: `scale(${active ? 1.04 : 1})`,
          boxShadow: active ? "0 10px 30px -18px rgba(109,74,224,0.35)" : "0 6px 20px -16px rgba(21,14,46,0.15)",
        }}
      >
        <span
          className="pointer-events-none absolute rounded-full transition-all duration-500 ease-out"
          style={{
            inset: -14,
            border: `1px dashed ${active ? "var(--iris)" : "var(--rule-on-light)"}`,
            opacity: active ? 0.8 : 0.5,
          }}
          aria-hidden="true"
        >
          {Array.from({ length: RING_DOT_COUNT }).map((_, i) => {
            const angle = (i / RING_DOT_COUNT) * 2 * Math.PI;
            const x = 50 + 50 * Math.cos(angle);
            const y = 50 + 50 * Math.sin(angle);
            return (
              <span
                key={i}
                className="absolute rounded-full transition-colors duration-500 ease-out"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  width: 5,
                  height: 5,
                  background: active ? "var(--iris)" : "var(--rule-on-light)",
                }}
              />
            );
          })}
        </span>
        <p className="font-display text-[26px] leading-none text-iris lg:text-[28px]" style={{ letterSpacing: "-0.02em" }}>
          FynVeda
        </p>
        <p className="mt-2 text-[11px] font-medium uppercase leading-tight text-ink-soft" style={{ letterSpacing: "0.06em" }}>
          One financial
          <br />
          picture
        </p>
      </div>
    );
  }

  function Row({ source, index }: { source: (typeof SOURCES)[number]; index: number }) {
    const isLit = index < litCount;
    const isHovered = hoveredKey === source.key;
    const isActive = isLit || isHovered;
    return (
      <button
        type="button"
        {...handlersFor(source.key)}
        aria-expanded={isActive}
        className="flex w-full cursor-pointer items-center gap-3 rounded-[10px] border px-3 text-left transition-all duration-300"
        style={{
          height: `${RH}px`,
          borderColor: isActive ? "var(--iris)" : "var(--rule-on-light)",
          background: isActive ? "rgba(109,74,224,0.05)" : "transparent",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-10px)",
          transitionDelay: visible ? `${index * 60}ms` : "0ms",
        }}
      >
        <span
          className="flex shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
          style={{ height: 58, width: 58, borderColor: isActive ? "var(--iris)" : "var(--rule-on-light)" }}
        >
          <source.icon className="h-5 w-5" style={{ color: isActive ? "var(--iris)" : "var(--ink-soft)" }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-medium transition-colors duration-300 sm:text-[16px]" style={{ color: isActive ? "var(--iris)" : "var(--ink)" }}>
            {source.label}
          </span>
          <span className="block truncate text-[12px] transition-colors duration-300 sm:text-[13px]" style={{ color: "var(--ink-soft)" }}>
            {source.desc}
          </span>
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 transition-all duration-300"
          style={{
            color: "var(--iris)",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(-4px)",
          }}
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    );
  }

  return (
    <section
      id="belief"
      className="border-l-4 pl-5 bg-vellum text-ink xl:border-l-0 xl:pl-24"
      style={{ borderColor: "var(--rule-on-light)", scrollMarginTop: "80px" }}
    >
      <div ref={pinRef} className="lg:h-[calc(100vh+1300px)]">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:pt-20">
          <div ref={sectionRef} className="container pt-14 pb-8 md:pt-20 md:pb-12 lg:flex lg:h-full lg:flex-col lg:py-0">
            <div
              style={{
                maxHeight: headingH !== null ? `${headingH * (1 - headingT)}px` : undefined,
                overflow: "hidden",
                opacity: 1 - headingT,
                transition: "max-height 200ms linear, opacity 200ms linear",
              }}
            >
              <div ref={headingRef}>
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
              </div>
            </div>

            {/* diagram area — always sits strictly below the heading (never overlaps it,
                even mid-collapse) and centers itself within whatever space remains */}
            <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-center">

            {/* ============ five sources (left) → FynVeda hub (right), sm and up ============ */}
            <div className="mt-10 hidden sm:grid sm:items-start sm:gap-10" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
              <div className="flex flex-col" style={{ gap: ROW_GAP }}>
                {SOURCES.map((s, i) => (
                  <Row key={s.key} source={s} index={i} />
                ))}
              </div>

              <div>
                <div className="relative" style={{ height: LIST_H }}>
                  <svg width="100%" height={LIST_H} viewBox={`0 0 100 ${LIST_H}`} preserveAspectRatio="none" aria-hidden="true">
                    {SOURCES.map((s, i) => {
                      const isActive = i < litCount || hoveredKey === s.key;
                      const y = rowY(i);
                      return (
                        <path
                          key={s.key}
                          d={`M0 ${y} C ${CURVE_MID_X} ${y}, ${CURVE_MID_X} ${HUB_Y}, ${HUB_X} ${HUB_Y}`}
                          fill="none"
                          vectorEffect="non-scaling-stroke"
                          strokeWidth={isActive ? 2 : 1.3}
                          style={{
                            stroke: isActive ? "var(--iris)" : "var(--rule-on-light)",
                            transition: "stroke 300ms ease, stroke-width 300ms ease",
                          }}
                        />
                      );
                    })}
                  </svg>

                  {/* small travelling dots along each curve — rendered as HTML,
                      not SVG, since the SVG's non-uniform stretch (preserveAspectRatio="none")
                      would otherwise squash circular <circle> markers into ellipses */}
                  {SOURCES.map((s, i) => {
                    const isActive = i < litCount || hoveredKey === s.key;
                    const y = rowY(i);
                    return [0.32, 0.68].map((t) => {
                      const dx = cubicBezier(t, 0, CURVE_MID_X, CURVE_MID_X, HUB_X);
                      const dy = cubicBezier(t, y, y, HUB_Y, HUB_Y);
                      return (
                        <span
                          key={`${s.key}-${t}`}
                          className="pointer-events-none absolute rounded-full transition-all duration-300"
                          style={{
                            left: `${dx}%`,
                            top: dy,
                            transform: "translate(-50%, -50%)",
                            width: isActive ? 6 : 4,
                            height: isActive ? 6 : 4,
                            background: isActive ? "var(--iris)" : "var(--rule-on-light)",
                            opacity: isActive ? 1 : 0.8,
                          }}
                          aria-hidden="true"
                        />
                      );
                    });
                  })}

                  {hoveredKey &&
                    (() => {
                      const hoveredIndex = SOURCES.findIndex((s) => s.key === hoveredKey);
                      if (hoveredIndex === -1) return null;
                      const source = SOURCES[hoveredIndex];
                      const y = rowY(hoveredIndex);
                      return (
                        <div
                          className="pointer-events-none absolute z-10 min-w-[132px] rounded-[10px] border px-3 py-2 text-left transition-all duration-200"
                          style={{
                            left: `${CURVE_MID_X}%`,
                            top: y - 12,
                            transform: "translate(-8%, -100%)",
                            background: "var(--paper-strong)",
                            borderColor: "var(--rule-on-light)",
                            boxShadow: "0 8px 20px -12px rgba(21,14,46,0.25)",
                          }}
                        >
                          <p className="text-[11px]" style={{ color: "var(--ink-soft)" }}>
                            {source.meta}
                          </p>
                          <p className="tabular text-[15px] font-semibold" style={{ color: "var(--iris)" }}>
                            {source.value}
                          </p>
                        </div>
                      );
                    })()}

                  <div
                    className="absolute transition-opacity duration-500 ease-out"
                    style={{
                      left: `${HUB_X}%`,
                      top: HUB_Y,
                      transform: "translate(-50%, -50%)",
                      opacity: visible ? 1 : 0,
                      transitionDelay: visible ? "400ms" : "0ms",
                    }}
                  >
                    <Hub size={HUB_SIZE} />
                  </div>
                </div>

                <div
                  key={hoveredKey ?? (allLit ? "complete" : litCount)}
                  className="mt-4 text-center transition-opacity duration-500 ease-out"
                  style={{ animation: "line-in 250ms ease-out both", opacity: visible ? 1 : 0, transitionDelay: visible ? "550ms" : "0ms" }}
                >
                  <p className="tabular text-[15px] font-medium" style={{ color: "var(--iris)" }}>
                    {displaySource.meta} · {displaySource.value}
                  </p>
                  <p className="mx-auto mt-1 max-w-[34ch] text-[13px] leading-snug" style={{ color: "var(--ink)", opacity: 0.55 }}>
                    {allLit && !hoveredSource ? "Everything connected. All your financial life, in one place." : "All your financial life, in one place."}
                  </p>
                </div>
              </div>
            </div>

            {/* ============ mobile fallback: compact 2-column grid → hub ============ */}
            <div className="mt-10 sm:hidden">
              <div className="grid grid-cols-2 gap-x-2 gap-y-6">
                {SOURCES.map((s, i) => {
                  const isActive = i < litCount || hoveredKey === s.key;
                  return (
                    <div key={s.key} className={i === SOURCES.length - 1 ? "col-span-2 flex justify-center" : ""}>
                      <button
                        type="button"
                        {...handlersFor(s.key)}
                        aria-expanded={isActive}
                        className="flex w-full cursor-pointer flex-col items-center rounded-lg border-0 bg-transparent p-1.5 text-center transition-all duration-300 ease-out"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: `translateY(${visible ? 0 : 10}px)`,
                          transitionDelay: visible ? `${i * 60}ms` : "0ms",
                          background: isActive ? "rgba(109,74,224,0.06)" : "transparent",
                        }}
                      >
                        <span
                          className="flex items-center justify-center rounded-full transition-all duration-300 ease-out"
                          style={{ height: 44, width: 44, border: `1px solid ${isActive ? "var(--iris)" : "var(--rule-on-light)"}` }}
                        >
                          <s.icon className="transition-colors duration-300 ease-out" style={{ height: 18, width: 18, color: isActive ? "var(--iris)" : "var(--ink-soft)" }} />
                        </span>
                        <p className="mt-2 text-[13px] font-medium transition-colors duration-300 ease-out" style={{ color: isActive ? "var(--iris)" : "var(--ink)" }}>
                          {s.label}
                        </p>
                        <p className="mt-0.5 max-w-[16ch] text-[10.5px] leading-snug transition-colors duration-300 ease-out" style={{ color: "var(--ink-soft)" }}>
                          {s.desc}
                        </p>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col items-center text-center">
                <span
                  aria-hidden="true"
                  className="block h-6 w-px origin-top transition-all duration-300 ease-out"
                  style={{
                    background: "var(--iris)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: visible ? "500ms" : "0ms",
                  }}
                />
                <div className="mt-2" style={{ opacity: visible ? 1 : 0, transition: "opacity 500ms ease-out", transitionDelay: visible ? "600ms" : "0ms" }}>
                  <Hub size={112} />
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
          </div>
        </div>
      </div>
    </section>
  );
}
