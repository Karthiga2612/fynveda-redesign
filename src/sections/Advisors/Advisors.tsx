"use client";

import { useState } from "react";

type StageKey = "you" | "fynveda" | "ca";

const STAGES: Record<
  StageKey,
  { label: string; heading: string; items: string[]; detail: string }
> = {
  you: {
    label: "You",
    heading: "Complete financial position",
    items: ["Assets", "Investments", "Liabilities"],
    detail: "Everything you own, control and owe — brought together automatically.",
  },
  fynveda: {
    label: "FynVeda",
    heading: "Structured, current data",
    items: ["Reads", "Reconciles", "Shares"],
    detail: "Reads what's fragmented and keeps it current, every day — no manual compiling.",
  },
  ca: {
    label: "Your CA",
    heading: "",
    items: ["Structured, current data", "Nothing to chase", "Advice worth giving"],
    detail: "The conversation starts at advice, instead of ending at reconciliation.",
  },
};

const ORDER: StageKey[] = ["you", "fynveda", "ca"];

/**
 * The advisory ecosystem as a flow rather than a static comparison —
 * fynveda-landing-layout.md §2 "08 — Built with your CA, not around
 * them", restyled per explicit follow-up request. You → FynVeda →
 * Your CA: selecting a stage highlights it, mutes the others, reveals
 * one supporting line, and lights the connecting line(s) that touch
 * it. FynVeda sits in the middle as the constant bridge.
 */
export default function Advisors() {
  const [hoveredKey, setHoveredKey] = useState<StageKey | null>(null);
  const [selectedKey, setSelectedKey] = useState<StageKey | null>(null);
  const activeKey = hoveredKey ?? selectedKey;

  const leftLineActive = activeKey === "you" || activeKey === "fynveda";
  const rightLineActive = activeKey === "fynveda" || activeKey === "ca";

  function stageProps(key: StageKey) {
    const isActive = activeKey === key;
    const isDimmed = activeKey !== null && !isActive;
    return {
      isActive,
      isDimmed,
      onMouseEnter: () => setHoveredKey(key),
      onFocus: () => setHoveredKey(key),
      onBlur: () => setHoveredKey(null),
      onClick: () => setSelectedKey((prev) => (prev === key ? null : key)),
    };
  }

  function Marker({ stageKey, isActive }: { stageKey: StageKey; isActive: boolean }) {
    const isFynveda = stageKey === "fynveda";
    return (
      <span className="relative flex h-8 items-center justify-center" aria-hidden="true">
        <span
          className="absolute rounded-full transition-all duration-[350ms] ease-out"
          style={{
            height: isFynveda ? 22 : 20,
            width: isFynveda ? 22 : 20,
            border: `1px solid ${isFynveda || isActive ? "var(--iris)" : "var(--rule-on-light)"}`,
            opacity: isFynveda ? 1 : isActive ? 1 : 0,
            transform: isActive ? "scale(1.1)" : "scale(1)",
          }}
        />
        <span
          className="rounded-full transition-all duration-[350ms] ease-out"
          style={{
            height: isFynveda ? 8 : isActive ? 7 : 6,
            width: isFynveda ? 8 : isActive ? 7 : 6,
            background: isFynveda || isActive ? "var(--iris)" : "var(--ink-soft)",
          }}
        />
      </span>
    );
  }

  function Connector({ active }: { active: boolean }) {
    return (
      <div className="relative hidden h-8 w-12 shrink-0 items-center justify-center md:flex lg:w-20" aria-hidden="true">
        <span
          className="h-px w-full transition-colors duration-[350ms] ease-out"
          style={{ background: active ? "var(--iris)" : "var(--rule-on-light)" }}
        />
        <span
          className="absolute text-[13px] leading-none transition-colors duration-[350ms] ease-out"
          style={{ color: active ? "var(--iris)" : "var(--ink-soft)", background: "var(--vellum)", padding: "0 4px" }}
        >
          →
        </span>
      </div>
    );
  }

  function MobileConnector({ active }: { active: boolean }) {
    return (
      <div className="relative flex h-10 w-8 flex-col items-center justify-center md:hidden" aria-hidden="true">
        <span
          className="w-px flex-1 transition-colors duration-[350ms] ease-out"
          style={{ background: active ? "var(--iris)" : "var(--rule-on-light)" }}
        />
        <span
          className="absolute text-[13px] leading-none transition-colors duration-[350ms] ease-out"
          style={{ color: active ? "var(--iris)" : "var(--ink-soft)", background: "var(--vellum)", padding: "4px 0" }}
        >
          ↓
        </span>
      </div>
    );
  }

  function StageContent({ stageKey }: { stageKey: StageKey }) {
    const stage = STAGES[stageKey];
    const { isActive, isDimmed, ...handlers } = stageProps(stageKey);
    const isFynveda = stageKey === "fynveda";

    return (
      <button
        type="button"
        {...handlers}
        aria-pressed={selectedKey === stageKey}
        className="relative flex w-full cursor-pointer flex-col items-start rounded-lg border-0 -m-3 p-3 text-left transition-all duration-[350ms] ease-out"
        style={{
          opacity: isDimmed ? 0.45 : 1,
          background: isActive ? "rgba(109,74,224,0.07)" : "transparent",
          transform: isActive ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        <Marker stageKey={stageKey} isActive={isActive} />

        <p
          className="mt-3 text-[13px] font-medium uppercase transition-colors duration-[350ms] ease-out"
          style={{ color: isFynveda ? "var(--iris)" : isActive ? "var(--iris)" : "var(--ink-soft)", letterSpacing: "0.04em" }}
        >
          {stage.label}
        </p>

        {stage.heading && (
          <p
            className="font-display mt-2 max-w-[22ch] text-[19px] leading-[1.2] transition-all duration-[350ms] ease-out sm:text-[21px]"
            style={{
              color: isFynveda ? "var(--iris)" : isActive ? "var(--iris)" : "var(--ink)",
              letterSpacing: "-0.01em",
              fontWeight: isActive || isFynveda ? 500 : 400,
            }}
          >
            {stage.heading}
          </p>
        )}

        <div className={stageKey === "ca" ? "mt-3 flex flex-col gap-1.5" : "mt-3"}>
          {stageKey === "ca" ? (
            stage.items.map((item) => (
              <p
                key={item}
                className="text-[15px] leading-snug transition-opacity duration-[350ms] ease-out"
                style={{ color: "var(--ink)", opacity: isActive ? 0.9 : 0.75 }}
              >
                {item}
              </p>
            ))
          ) : (
            <p
              className="text-[14px] transition-opacity duration-[350ms] ease-out"
              style={{ color: "var(--ink)", opacity: isActive ? 0.75 : 0.6 }}
            >
              {stage.items.join(" · ")}
            </p>
          )}
        </div>

        <div
          className="pointer-events-none absolute left-3 right-3 top-full transition-all duration-[350ms] ease-out"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(-4px)",
          }}
        >
          <p
            className="max-w-[30ch] pt-3 text-[13px] leading-snug"
            style={{ color: "var(--iris)" }}
          >
            {stage.detail}
          </p>
        </div>
      </button>
    );
  }

  return (
    <section
      id="advisors"
      className="border-l-4 pl-5 bg-vellum text-ink xl:border-l-0 xl:pl-24"
      style={{ borderColor: "var(--rule-on-light)", scrollMarginTop: "80px" }}
    >
      <div className="container py-14 md:py-20 lg:py-24">
        <span className="tabular mb-6 block text-[13px] font-medium text-iris xl:hidden">
          08
        </span>

        <h2
          className="font-display max-w-xl text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Built with your CA, not around them.
        </h2>

        <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.6] text-ink" style={{ opacity: 0.7 }}>
          FynVeda doesn&apos;t replace your Chartered Accountant. It gives
          them something they&apos;ve never had: your complete financial
          position, organised, current and shareable — so the conversation
          starts at advice instead of ending at reconciliation.
        </p>

        {/* ============ You → FynVeda → Your CA ============ */}
        <div
          className="mt-14 flex flex-col md:mt-16 md:flex-row md:items-start"
          onMouseLeave={() => setHoveredKey(null)}
        >
          <div className="md:flex-1">
            <StageContent stageKey="you" />
          </div>

          <MobileConnector active={leftLineActive} />
          <Connector active={leftLineActive} />

          <div className="md:flex-[1.1]">
            <StageContent stageKey="fynveda" />
          </div>

          <MobileConnector active={rightLineActive} />
          <Connector active={rightLineActive} />

          <div className="md:flex-1">
            <StageContent stageKey="ca" />
          </div>
        </div>
      </div>
    </section>
  );
}
