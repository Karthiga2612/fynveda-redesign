"use client";

import { useLayoutEffect, useEffect, useRef, type SVGProps } from "react";
import gsap from "gsap";
import { formatInr } from "@/lib/format";

// Illustrative figures (§5 Open questions #1 — not drawn from a real
// anonymised profile).
const FIGURES = {
  own: 10_420_000,
  control: 2_800_000,
  owe: 4_650_000,
};
const NET_WORTH = FIGURES.own + FIGURES.control - FIGURES.owe;

type RowKey = "own" | "control" | "owe";

const ROWS: { key: RowKey; label: string; value: number; tone: "asset" | "liability" }[] = [
  { key: "own", label: "Everything you own", value: FIGURES.own, tone: "asset" },
  { key: "control", label: "+ you control", value: FIGURES.control, tone: "asset" },
  { key: "owe", label: "− you owe", value: FIGURES.owe, tone: "liability" },
];

function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9 7l8 5-8 5V7z" />
    </svg>
  );
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The hero *is* the calculation resolving — a light-vellum statement
 * card on a lavender field, matching the supplied reference exactly.
 */
export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const figureRefs = useRef<Record<RowKey, HTMLSpanElement | null>>({
    own: null,
    control: null,
    owe: null,
  });

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-hero-line]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-eq-row]", root);
      const rule = root.querySelector("[data-eq-rule]");
      const total = root.querySelector("[data-eq-total]");
      const note = root.querySelector("[data-eq-note]");

      if (reduce) {
        gsap.set(root, { opacity: 1 });
        gsap.set([lines, rows, rule, total, note], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scaleX: 1,
        });
        ROWS.forEach((row) => {
          const el = figureRefs.current[row.key];
          if (el) el.textContent = formatInr(row.value);
        });
        if (totalRef.current) totalRef.current.textContent = formatInr(NET_WORTH);
        return;
      }

      function animateCount(el: HTMLSpanElement | null, target: number, duration = 0.7) {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (el) el.textContent = formatInr(counter.value);
          },
        });
      }

      gsap.set(lines, { autoAlpha: 0, y: 14 });
      gsap.set(rows, { autoAlpha: 0, y: 10 });
      gsap.set(rule, { scaleX: 0 });
      gsap.set(total, { autoAlpha: 0, y: 10 });
      gsap.set(note, { autoAlpha: 0 });
      ROWS.forEach((row) => {
        const el = figureRefs.current[row.key];
        if (el) el.textContent = formatInr(0);
      });
      if (totalRef.current) totalRef.current.textContent = formatInr(0);

      gsap.set(root, { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

      tl.to(lines, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.09 })
        .to(rows[0], { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.15")
        .call(() => animateCount(figureRefs.current.own, FIGURES.own), undefined, "<")
        .to(rows[1], { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.25")
        .call(() => animateCount(figureRefs.current.control, FIGURES.control), undefined, "<")
        .to(rows[2], { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.25")
        .call(() => animateCount(figureRefs.current.owe, FIGURES.owe), undefined, "<")
        .to(rule, { scaleX: 1, duration: 0.45, ease: "power2.inOut" }, "-=0.1")
        .to(total, { autoAlpha: 1, y: 0, duration: 0.55, ease: "back.out(1.4)" }, "-=0.05")
        .call(() => animateCount(totalRef.current, NET_WORTH, 0.6), undefined, "<")
        .to(note, { autoAlpha: 1, duration: 0.35 }, "-=0.1");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-vellum">
      <div
        ref={rootRef}
        className="container relative flex min-h-screen flex-col justify-center gap-12 pt-32 pb-20 opacity-0 lg:pt-24"
      >
        {/* persistent left rail */}
        <div className="pointer-events-none absolute bottom-20 left-0 top-32 hidden w-6 lg:block" aria-hidden="true">
          <span className="font-sans text-[13px] font-medium tabular-nums text-iris">01</span>
          <div className="absolute bottom-2 left-1 top-9 w-px bg-rule-light" />
          <span className="absolute bottom-0 left-[1px] h-1.5 w-1.5 -translate-x-1/2 bg-iris" />
        </div>
        <span className="font-sans text-[13px] font-medium tabular-nums text-iris lg:hidden">01</span>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-16 lg:pl-10">
          {/* ============ copy column ============ */}
          <div className="flex flex-col items-start gap-6">
            <span
              data-hero-line
              className="inline-flex items-center gap-2 rounded-full border border-rule-light bg-paper-strong px-4 py-1.5 font-sans text-[13px] font-medium text-ink-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-iris" />
              Now building — early access opening soon
            </span>

            <h1
              className="font-display max-w-xl text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[56px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span data-hero-line className="block">
                Know what you&apos;re actually worth.
              </span>
            </h1>

            <p data-hero-line className="max-w-[46ch] font-sans text-[17px] leading-[1.6] text-ink-soft">
              Your bank balance is not your net worth. Neither is your
              portfolio. FynVeda brings everything you own, everything you
              control and everything you owe into one continuously updated
              statement.
            </p>

            <div data-hero-line className="flex flex-wrap items-center gap-5">
              <a
                href="#early-access"
                className="inline-flex items-center gap-2 rounded-[8px] bg-iris px-6 py-3 font-sans text-[15px] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris"
              >
                Get early access
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2.5 font-sans text-[15px] font-medium text-ink transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-iris text-iris">
                  <PlayIcon className="h-3.5 w-3.5" />
                </span>
                See how it works
              </a>
            </div>
          </div>

          {/* ============ statement card ============ */}
          <div className="relative">
            <div className="relative rounded-[18px] border border-rule-light bg-paper-strong p-7 shadow-[0_30px_60px_-30px_rgba(76,59,140,0.30)] sm:p-8">
              <span className="absolute -right-3 -top-3 rotate-[10deg] rounded-full border border-iris bg-paper-strong px-2.5 py-1 font-sans text-[11px] font-medium text-iris">
                LIVE
              </span>

              <div className="flex items-baseline justify-between">
                <span className="font-sans text-[12px] font-medium uppercase tracking-[0.06em] text-ink-soft">
                  Statement
                </span>
                <span className="font-sans text-[13px] text-ink-soft">As of today</span>
              </div>
              <div className="mt-4 h-px bg-rule-light" />

              {ROWS.map((row) => (
                <div
                  key={row.key}
                  data-eq-row
                  className="flex items-baseline justify-between gap-4 border-b border-rule-light py-4"
                >
                  <span className="font-sans text-[15px] text-ink-soft">{row.label}</span>
                  <span
                    className={`font-sans text-[19px] font-medium tabular-nums ${
                      row.tone === "asset" ? "text-iris" : "text-ink"
                    }`}
                  >
                    <span
                      ref={(el) => {
                        figureRefs.current[row.key] = el;
                      }}
                    >
                      {formatInr(0)}
                    </span>
                  </span>
                </div>
              ))}

              <div data-eq-rule className="mt-5 h-[2px] origin-right bg-iris" />

              <div data-eq-total className="flex items-end justify-between gap-4 pt-5">
                <p className="max-w-[8ch] font-sans text-[15px] leading-tight text-ink-soft">
                  Real net worth
                </p>
                <p
                  className="font-display text-[40px] leading-none tabular-nums text-iris sm:text-[44px]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  <span ref={totalRef}>{formatInr(0)}</span>
                </p>
              </div>

              <p data-eq-note className="mt-4 font-sans text-[12px] text-ink-soft">
                Illustrative figures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
