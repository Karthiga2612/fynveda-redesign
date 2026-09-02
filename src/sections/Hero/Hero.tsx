"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/Section";
import ScrollProgress from "./ScrollProgress";
import {
  IconRupee,
  IconCoins,
  IconCard,
  IconWallet,
  IconHome,
  IconGoldBar,
  IconChart,
} from "./icons";

const ASSET_CATEGORIES = [
  { label: "Bank Accounts", value: "₹8,40,000" },
  { label: "Investments", value: "₹32,50,000" },
  { label: "Real Estate", value: "₹65,00,000" },
  { label: "Gold", value: "₹4,20,000" },
];

const LIABILITIES = { label: "Liabilities", value: "−₹18,60,000" };

const TRUST_INDICATORS = [
  { label: "Complete wealth view", href: "#wealth-view" },
  { label: "Wealth growth tracking", href: "#wealth-growth" },
  { label: "CA-backed advisory", href: "#advisory" },
];

type Direction = "top" | "bottom" | "left" | "right";

type Token = {
  id: string;
  Icon: (props: { className?: string; strokeWidth?: number }) => React.ReactElement;
  top: number;
  left: number;
  size: number;
  depth: 1 | 2 | 3;
  enter: Direction;
  label: string;
  show: "all" | "md" | "lg";
};

// Positions are percentages within the visual stage, and double as
// coordinates in the 0–100 SVG viewBox used for the connection lines, so
// the drawn lines always meet the token chips exactly. The wealth core
// card is roughly 52% wide / centered, spanning about 24%–76% left and
// 20%–80% top — every token below clears that band by a firm margin on
// at least one axis, and stays inboard of the stage edges so nothing
// gets clipped by the section's own overflow-hidden.
const TOKENS: Token[] = [
  { id: "rupee", Icon: IconRupee, top: 10, left: 50, size: 13, depth: 1, enter: "top", label: "Every rupee, tracked", show: "all" },
  { id: "home", Icon: IconHome, top: 12, left: 90, size: 13, depth: 1, enter: "top", label: "Real estate", show: "lg" },
  { id: "card", Icon: IconCard, top: 24, left: 11, size: 14, depth: 2, enter: "left", label: "Bank & cards", show: "md" },
  { id: "gold", Icon: IconGoldBar, top: 50, left: 92, size: 11, depth: 3, enter: "right", label: "Gold & bullion", show: "lg" },
  { id: "coins", Icon: IconCoins, top: 62, left: 11, size: 14, depth: 2, enter: "left", label: "Investments", show: "md" },
  { id: "chart", Icon: IconChart, top: 90, left: 66, size: 14, depth: 3, enter: "bottom", label: "Portfolio growth", show: "all" },
  { id: "wallet", Icon: IconWallet, top: 90, left: 18, size: 13, depth: 2, enter: "bottom", label: "Liquid wealth", show: "lg" },
];

const CORE = { top: 50, left: 50 };

const NODES: { top: number; left: number }[] = [
  { top: 20, left: 88 },
  { top: 90, left: 30 },
  { top: 34, left: 10 },
];

function curvePath(x1: number, y1: number, x2: number, y2: number, bend: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return `M${x1},${y1} Q${mx + nx * bend},${my + ny * bend} ${x2},${y2}`;
}

const ENTER_OFFSET: Record<Direction, { x?: number; y?: number }> = {
  top: { y: -46 },
  bottom: { y: 46 },
  left: { x: -46 },
  right: { x: 46 },
};

const EXIT_OFFSET: Record<Direction, { x?: number; y?: number }> = {
  top: { y: -90 },
  bottom: { y: 90 },
  left: { x: -90 },
  right: { x: 90 },
};

const VISIBILITY_CLASS: Record<Token["show"], string> = {
  all: "flex",
  md: "hidden md:flex",
  lg: "hidden lg:flex",
};

type FocusedItem = { label: string; value: string } | null;

// Apply the pre-entrance (hidden) state before the browser paints, so the
// heading/tokens never flash fully visible before GSAP hides them.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Hero() {
  const [focused, setFocused] = useState<FocusedItem>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cleanupFns: Array<() => void> = [];
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
        const eyebrow = root.querySelector("[data-hero-eyebrow]");
        const lines = root.querySelectorAll("[data-hero-line]");
        const desc = root.querySelector("[data-hero-desc]");
        const cta = root.querySelector("[data-hero-cta]");
        const core = root.querySelector("[data-hero-core]");
        const tokens = gsap.utils.toArray<HTMLElement>("[data-token]", root);
        const connectors = gsap.utils.toArray<SVGPathElement>(
          "[data-connector]",
          root
        );
        const chartPaths = gsap.utils.toArray<SVGPolylineElement>(
          "[data-draw]",
          root
        );
        const nodes = gsap.utils.toArray<HTMLElement>("[data-node]", root);
        const badge = root.querySelector("[data-hero-badge]");

        if (reduce) {
          gsap.set(
            [eyebrow, lines, desc, cta, core, tokens, nodes, badge],
            { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 }
          );
          gsap.set(connectors, { opacity: 1, strokeDashoffset: 0 });
          gsap.set(chartPaths, { strokeDashoffset: 0 });
          return;
        }

        // ---- initial (pre-entrance) state ----
        gsap.set(lines, { yPercent: 110 });
        gsap.set([eyebrow, desc, cta], { autoAlpha: 0, y: 16 });
        gsap.set(core, { autoAlpha: 0, y: 24, scale: 0.94 });
        gsap.set(connectors, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(chartPaths, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(nodes, { autoAlpha: 0, scale: 0.4 });
        if (badge) gsap.set(badge, { autoAlpha: 0, y: 10 });
        tokens.forEach((el) => {
          const dir = (el.dataset.enter as Direction) || "top";
          gsap.set(el, { autoAlpha: 0, scale: 0.78, ...ENTER_OFFSET[dir] });
        });

        // ---- entrance timeline: the system assembles itself ----
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.25,
        });

        tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.6 })
          .to(
            lines,
            { yPercent: 0, duration: 0.95, stagger: 0.12, ease: "power4.out" },
            "-=0.3"
          )
          .to(desc, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.55")
          .to(
            core,
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "back.out(1.5)" },
            "-=0.45"
          )
          .to(
            tokens,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.09,
              ease: "power3.out",
            },
            "-=0.35"
          )
          .to(
            connectors,
            { strokeDashoffset: 0, duration: 0.7, stagger: 0.05, ease: "power2.inOut" },
            "-=0.55"
          )
          .to(
            chartPaths,
            { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
            "-=0.3"
          )
          .to(nodes, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.08 }, "-=0.35")
          .to(badge ?? [], { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.25")
          .to(cta, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3");

        // ---- one continuous scroll-through timeline, top of hero to bottom ----
        // Everything below shares this single ScrollTrigger. Two separate
        // triggers driving the same elements (one for "in view" parallax,
        // another for "leaving" motion) fight each other once their ranges
        // overlap — scrubbing back up would show elements caught between
        // the two, which read as things randomly reappearing. One timeline,
        // sequenced by time, avoids that entirely and stays reversible.
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        // The timeline's total span is a normalized 0→1 "scroll-through"
        // of the hero. Every tween below sets an explicit duration so its
        // position label is an exact fraction of that span, not whatever
        // GSAP's default 0.5s duration happens to add up to.
        scrollTl
          .to("[data-bg-slow]", { yPercent: 8, ease: "none", duration: 1 }, 0)
          .to("[data-bg-mid]", { yPercent: 18, ease: "none", duration: 1 }, 0)
          .to("[data-hero-textblock]", { yPercent: -8, ease: "none", duration: 1 }, 0)
          .to(core, { yPercent: -4, ease: "none", duration: 1 }, 0);

        // fragments drift gently while the hero is mostly in view...
        tokens.forEach((el) => {
          const depth = Number(el.dataset.depth) || 1;
          scrollTl.to(
            el,
            { yPercent: -12 * depth, ease: "none", duration: 0.7 },
            0
          );
        });

        // ...then scatter outward as the hero finishes leaving the viewport.
        tokens.forEach((el, i) => {
          const dir = (el.dataset.enter as Direction) || "top";
          scrollTl.to(
            el,
            {
              ...EXIT_OFFSET[dir],
              autoAlpha: 0,
              rotate: i % 2 === 0 ? 8 : -8,
              ease: "power1.in",
              duration: 0.35,
            },
            0.65
          );
        });
        scrollTl.to(
          connectors,
          { strokeDashoffset: -1, autoAlpha: 0, ease: "power1.in", duration: 0.35 },
          0.65
        );
        scrollTl.to(
          nodes,
          { autoAlpha: 0, scale: 0.4, ease: "power1.in", duration: 0.3 },
          0.68
        );
        if (badge) {
          scrollTl.to(
            badge,
            { autoAlpha: 0, y: -18, ease: "power1.in", duration: 0.3 },
            0.68
          );
        }
        // The wealth core is the one complete picture — it should read
        // clearly for longer than the fragments dissolving around it.
        scrollTl.to(
          core,
          { autoAlpha: 0.2, scale: 0.94, ease: "power1.in", duration: 0.22 },
          0.78
        );

        // ---- subtle cursor parallax (desktop only) ----
        if (isFinePointer) {
          const layer = root.querySelector<HTMLElement>("[data-token-layer]");
          if (layer) {
            const qx = gsap.quickTo(layer, "x", { duration: 0.8, ease: "power3.out" });
            const qy = gsap.quickTo(layer, "y", { duration: 0.8, ease: "power3.out" });
            const qcx = gsap.quickTo(core, "x", { duration: 1, ease: "power3.out" });
            const qcy = gsap.quickTo(core, "y", { duration: 1, ease: "power3.out" });

            const onMove = (e: MouseEvent) => {
              const rect = root.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width - 0.5;
              const py = (e.clientY - rect.top) / rect.height - 0.5;
              qx(px * 16);
              qy(py * 16);
              qcx(-px * 5);
              qcy(-py * 5);
            };
            root.addEventListener("mousemove", onMove);
            cleanupFns.push(() => root.removeEventListener("mousemove", onMove));
          }

          // magnetic CTA
          const magnet = ctaRef.current;
          if (magnet) {
            const mqx = gsap.quickTo(magnet, "x", { duration: 0.3, ease: "power3.out" });
            const mqy = gsap.quickTo(magnet, "y", { duration: 0.3, ease: "power3.out" });
            const onMagnetMove = (e: MouseEvent) => {
              const r = magnet.getBoundingClientRect();
              mqx((e.clientX - r.left - r.width / 2) * 0.3);
              mqy((e.clientY - r.top - r.height / 2) * 0.3);
            };
            const onMagnetLeave = () => {
              mqx(0);
              mqy(0);
            };
            magnet.addEventListener("mousemove", onMagnetMove);
            magnet.addEventListener("mouseleave", onMagnetLeave);
            cleanupFns.push(() => {
              magnet.removeEventListener("mousemove", onMagnetMove);
              magnet.removeEventListener("mouseleave", onMagnetLeave);
            });
          }
        }
      }, root);

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <Section
      id="hero"
      tone="base"
      className="relative overflow-hidden py-14 md:py-20 lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center lg:py-0"
    >
      <div ref={rootRef} className="relative w-full">
        {/* ============ LAYERED BACKGROUND ============ */}
        <div className="pointer-events-none absolute inset-0 -z-30" aria-hidden="true">
          {/* faint ledger rules — a financial document brought to life */}
          <div
            data-bg-slow
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)",
            }}
          />
          {/* soft lavender fields */}
          <div
            data-bg-mid
            className="absolute -left-24 -top-16 h-[26rem] w-[26rem] rounded-full opacity-70 blur-3xl"
            style={{ background: "var(--accent-mist)" }}
          />
          <div
            data-bg-mid
            className="absolute -right-28 top-1/3 h-[30rem] w-[30rem] rounded-full opacity-60 blur-3xl"
            style={{ background: "var(--accent-soft)", opacity: 0.35 }}
          />
          {/* faint dot grid, corner-anchored like a spec sheet */}
          <div
            data-bg-slow
            className="absolute left-0 top-0 h-72 w-72 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(var(--accent-deep) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(circle at top left, black 0%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(circle at top left, black 0%, transparent 70%)",
            }}
          />
          {/* faint orbit rings */}
          <svg
            data-bg-mid
            className="absolute right-[6%] top-[8%] h-64 w-64 opacity-30"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="70" stroke="var(--accent-deep)" strokeOpacity="0.18" />
            <circle cx="100" cy="100" r="96" stroke="var(--accent-deep)" strokeOpacity="0.1" />
          </svg>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* ============ COPY COLUMN ============ */}
          <div
            data-hero-textblock
            className="flex flex-col items-start gap-7 text-left"
          >
            <span
              data-hero-eyebrow
              className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-background/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-accent"
            >
              Personal Wealth Operating System
            </span>

            <h1 className="font-display max-w-xl text-5xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
              <span className="block overflow-hidden pb-1">
                <span data-hero-line className="block">
                  Your complete
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  data-hero-line
                  className="block italic text-accent"
                >
                  financial reality
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  in one place.
                </span>
              </span>
            </h1>

            <p
              data-hero-desc
              className="max-w-md text-lg leading-relaxed text-muted-foreground"
            >
              Fyn Veda brings together everything you own, control and owe
              — assets, investments, liabilities and ownership — into one
              clear picture of your wealth.
            </p>

            <div data-hero-cta className="flex flex-col gap-5">
              <a
                ref={ctaRef}
                href="#cta"
                data-magnetic
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-shadow duration-200 hover:shadow-lg"
              >
                Get Started
                <span
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {TRUST_INDICATORS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <span className="text-accent">＋</span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ============ WEALTH SYSTEM VISUAL ============ */}
          {/* Taller than it is wide: the wealth-core card needs vertical
              room, and every token position below is chosen to clear it. */}
          <div className="relative mx-auto h-[600px] w-full max-w-[620px] sm:h-[700px]">
            {/* floating financial fragments */}
            <div data-token-layer className="absolute inset-0">
              {/* connection lines: fragments wiring into one system */}
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                {TOKENS.map((t, i) => (
                  <path
                    key={t.id}
                    data-connector
                    d={curvePath(CORE.left, CORE.top, t.left, t.top, i % 2 === 0 ? 6 : -6)}
                    stroke="var(--accent)"
                    strokeOpacity="0.4"
                    strokeWidth="0.35"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {NODES.map((n, i) => (
                  <path
                    key={`node-line-${i}`}
                    data-connector
                    d={curvePath(CORE.left, CORE.top, n.left, n.top, 4)}
                    stroke="var(--accent-deep)"
                    strokeOpacity="0.15"
                    strokeWidth="0.3"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
              {TOKENS.map((t) => (
                <div
                  key={t.id}
                  data-token
                  data-depth={t.depth}
                  data-enter={t.enter}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 items-center justify-center ${VISIBILITY_CLASS[t.show]}`}
                  style={{ top: `${t.top}%`, left: `${t.left}%`, width: `${t.size}%`, aspectRatio: "1" }}
                >
                  <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-accent/15 bg-surface p-3 text-accent shadow-[0_16px_32px_-18px_rgba(36,27,63,0.4)]">
                    <t.Icon className="h-full w-full" strokeWidth={1.3} />
                  </div>
                  <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-deep px-2.5 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {t.label}
                  </span>
                </div>
              ))}

              {/* tiny data nodes — the smallest signals, assembled last */}
              {NODES.map((n, i) => (
                <div
                  key={`node-${i}`}
                  data-node
                  className="absolute hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent lg:block"
                  style={{ top: `${n.top}%`, left: `${n.left}%` }}
                />
              ))}

              {/* percentage indicator, near the growth chart */}
              <div
                data-hero-badge
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 bg-surface px-2.5 py-1 text-[11px] font-medium tabular-nums text-accent shadow-[var(--shadow)]"
                style={{ top: "88%", left: "88%" }}
              >
                +12.4%
              </div>
            </div>

            {/* wealth core — the one complete picture everything resolves into */}
            <div
              data-hero-core
              className="absolute w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius)] border border-border bg-surface p-6 shadow-[0_28px_70px_-24px_rgba(36,27,63,0.45)] sm:w-[58%] sm:p-7"
              style={{ top: `${CORE.top}%`, left: `${CORE.left}%` }}
            >
              <div
                className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
                aria-hidden="true"
              />
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-300">
                {focused ? focused.label : "Real Net Worth"}
              </p>
              <p
                className={`font-display mt-2 text-3xl font-medium tracking-tight tabular-nums transition-colors duration-300 sm:text-4xl ${
                  focused ? "text-accent" : "text-foreground"
                }`}
              >
                {focused ? focused.value : "₹91,50,000"}
              </p>

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  What you own
                </p>
                <div className="mt-2 flex flex-col">
                  {ASSET_CATEGORIES.map((item) => (
                    <div
                      key={item.label}
                      onMouseEnter={() => setFocused(item)}
                      onMouseLeave={() => setFocused(null)}
                      className={`-mx-2 flex items-center justify-between rounded-md px-2 py-1 transition-all duration-200 hover:bg-background/70 ${
                        focused && focused.label !== item.label
                          ? "opacity-50"
                          : "opacity-100"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        {item.label}
                      </span>
                      <span className="text-sm font-medium tabular-nums text-foreground">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  What you owe
                </p>
                <div
                  onMouseEnter={() => setFocused(LIABILITIES)}
                  onMouseLeave={() => setFocused(null)}
                  className={`-mx-2 mt-2 flex items-center justify-between rounded-md px-2 py-1 transition-all duration-200 hover:bg-background/70 ${
                    focused && focused.label !== LIABILITIES.label
                      ? "opacity-50"
                      : "opacity-100"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    {LIABILITIES.label}
                  </span>
                  <span className="text-sm font-medium tabular-nums text-foreground">
                    {LIABILITIES.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollProgress />
    </Section>
  );
}
