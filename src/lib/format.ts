const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/** Indian digit grouping: ₹1,04,20,000 — not ₹10,420,000. */
export function formatINR(value: number): string {
  return `₹${inrFormatter.format(Math.round(Math.abs(value)))}`;
}

export function formatSignedINR(value: number): string {
  const sign = value < 0 ? "−" : value > 0 ? "+ " : "";
  return `${sign}${formatINR(value)}`;
}

/**
 * Same Indian grouping, with a space after ₹ (₹ 1,04,20,000) — used by
 * newer sections (Hero, IncomePercentile) built against that convention.
 * Older sections use formatINR (no space); left as-is rather than
 * reformatting sections this change didn't touch.
 */
export function formatInr(value: number): string {
  return `₹ ${inrFormatter.format(Math.round(value))}`;
}
