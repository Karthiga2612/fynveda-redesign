# FynVeda — Landing Page Layout & Design Spec

Target stack: Next.js (App Router) + Tailwind or CSS Modules. This document is the build brief: tokens, section-by-section wireframes, copy, and interaction notes.

---

## 0. Design plan

### The idea in one line

The page *is* a personal wealth statement. Not a SaaS marketing page with a purple accent — a ledger you scroll through, where every section is a line item and the whole document resolves into one number.

### Why this and not the usual

The default for a fintech landing page is: light background, big hero number in a gradient, six identical rounded feature cards, three testimonials. That gets built for every product in this category and reads as generated. Two deliberate departures:

1. **Assets glow, liabilities dim.** Instead of the usual green/red split, value is rendered in luminous violet and debt in a desaturated slate-violet. Same hue family, different luminance. Debt isn't "bad red", it's just the part that doesn't light up. This is the whole visual system in one rule.
2. **A ledger spine, not stacked cards.** A hairline rail runs down the left edge of the entire page carrying the running section marker and a sticky net-worth readout. Content hangs off it. Sections are separated by rules and whitespace, not by boxes.

### Color

Deep violet base for the top and bottom thirds, pale violet paper for the middle. The switch happens once, at the point the page moves from "the problem" to "the product" — the page literally goes from dark to legible.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#150E2E` | Base background (deep violet-black, not a tinted black) |
| `--ink-raised` | `#1E1540` | Panels, table headers, inset areas |
| `--vellum` | `#F3EFFA` | Light section background ("paper") |
| `--iris` | `#6D4AE0` | Primary action, links, key rules |
| `--halo` | `#B49CFF` | Asset values, data highlights, glow |
| `--shade` | `#4A4166` | Liability values, dimmed data, secondary text on dark |
| `--mint` | `#5CD6A9` | Growth only. Used exclusively in the timeline. Nowhere else. |
| `--rule` | `rgba(180,156,255,0.18)` | Hairlines on dark; `rgba(21,14,46,0.12)` on vellum |

Rules: no gradient washes as decoration. One gradient exists in the whole page — the vertical fade on the hero equation column. No drop shadows anywhere; separation is done with rules and background value.

### Type

Two families, clearly distinct in job.

- **Display — Fraunces** (variable). Set `opsz: 96, wght: 500, SOFT: 0, WONK: 0`. Wonk dialled to zero keeps it serious rather than quirky. Used for section headlines and the belief statement only.
- **UI & body — Satoshi** (Fontshare). 400 / 500 / 700. All figures use `font-variant-numeric: tabular-nums lining-nums` so columns align on the decimal.

No monospace face. Ledger figures are tabular Satoshi — mono for "data labels" is a template tic, and real financial statements don't use it.

Scale (px): 13 · 15 · 17 · 21 · 27 · 36 · 48 · 64 · 84.
Body 17/1.6, max measure 66ch. Display 48–84 at 1.05 line-height, `letter-spacing: -0.02em`.

No all-caps eyebrows. No single-word color accents inside headlines. Section identity comes from the numbered rail, not from a label above the heading.

### Layout

12 columns, 1240px max, 24px gutters. On desktop the first 96px is the **ledger rail** — a hairline at x=96 with section number and title rotated 90° beside it, plus the sticky net-worth ticker. Content occupies columns 2–11.

Everything is left-aligned to a single spine. All currency figures are right-aligned to a shared axis. That mismatch — prose left, numbers right — is what makes it read as a statement rather than a brochure.

```
┌────┬──────────────────────────────────────────────────────┐
│ 01 │  headline hangs here                                 │
│ │  │  body copy, 66ch max                                 │
│ │  │                                                      │
│ │  │  Mutual funds ....................  ₹ 18,40,000      │
│ │  │  Home loan .......................  ₹ 42,10,000      │
│ ●  │                                     ───────────      │
│ │  │                                     ₹ 61,80,000      │
└────┴──────────────────────────────────────────────────────┘
  ↑ rail: number, tick marks, sticky total
```

Mobile: rail collapses to a 4px left border with the section number inline above the headline. Figures stay right-aligned.

### Principles

- One memorable element: the hero equation assembling itself. Everything else stays quiet.
- Structure encodes meaning. Numbered markers appear only on the rail and the timeline, because those are the only true sequences.
- Motion happens twice unprompted: hero assembly on load, and nothing else. Everything further is user-triggered.
- Radius: 2px on inputs and buttons, 0 on everything else. No uniform 16px rounding across all elements.

---

## 1. Page architecture

| # | Section | Background | Job |
|---|---|---|---|
| — | Nav | ink, transparent → solid on scroll | Wordmark, 3 links, one CTA |
| 01 | Hero — the equation | ink | Land the concept of real net worth in five seconds |
| 02 | What you don't know | ink | The problem, felt rather than listed |
| 03 | Income tells you where you stand | ink → vellum | The percentile insight; income ≠ wealth |
| 04 | A single source of financial truth | vellum | The belief. Quiet, large, almost empty. |
| 05 | Everything in one statement | vellum | The full asset/liability ledger |
| 06 | The wealth growth story | vellum | The timeline chart |
| 07 | Where the data comes from | vellum | Account Aggregator + technology |
| 08 | Built with your CA, not around them | vellum | Advisory ecosystem |
| 09 | Not a portfolio tracker | ink | Differentiation, as a comparison ledger |
| — | Early access | ink | Email capture |
| — | Footer | ink | Legal, contact, compliance |

---

## 2. Section specs

### Nav

```
┌──────────────────────────────────────────────────────────┐
│ FynVeda        How it works   Real net worth   For CAs   │
│                                        [ Get early access ]│
└──────────────────────────────────────────────────────────┘
```

Wordmark in Fraunces 500, 21px, `letter-spacing: -0.01em`. Links in Satoshi 15/500 at `--shade`, hover to `--halo`. CTA is a 2px-radius `--iris` fill.

Transparent over the hero; at 80px scroll it gains `--ink` at 92% opacity with a bottom hairline. No shrink animation, no blur-heavy glass effect.

---

### 01 — Hero: the equation

**Job:** show, don't explain. The most characteristic object in this product's world is the net worth calculation, so the hero *is* the calculation resolving.

```
┌────┬─────────────────────────────────┬────────────────────┐
│ 01 │                                 │  Everything you own│
│    │  Know what you're               │  ₹ 1,04,20,000     │
│    │  actually worth.                │                    │
│    │                                 │  + you control     │
│    │  Your bank balance is not your  │  ₹   28,00,000     │
│    │  net worth. Neither is your      │                    │
│    │  portfolio. FynVeda brings       │  − you owe         │
│    │  everything you own, control     │  ₹   46,50,000     │
│    │  and owe into one continuously   │  ─────────────────  │
│    │  updated statement.              │  Real net worth    │
│    │                                 │  ₹ 85,70,000       │
│    │  [ Get early access ]  See how  │                    │
└────┴─────────────────────────────────┴────────────────────┘
```

**Copy**
- H1: `Know what you're actually worth.`
- Sub: `Your bank balance is not your net worth. Neither is your portfolio. FynVeda brings everything you own, everything you control and everything you owe into one continuously updated statement.`
- Primary CTA: `Get early access` · Secondary text link: `See how it works`

**The equation column** (right, ~5 cols): asset rows in `--halo`, the liability row in `--shade`, a `--rule` hairline above the total, and the total in Fraunces 64px, `--halo` with a soft radial glow behind it (the only glow on the page).

**Motion — the one orchestrated moment.** On load: each line writes in top to bottom, ~90ms apart, figures counting up with an ease-out over 700ms; the rule draws left-to-right; the total resolves last. Total sequence under 1.6s. Under `prefers-reduced-motion` render the final state immediately with no counting.

The numbers are illustrative, so label them honestly — a 13px `--shade` note under the block: `Illustrative figures.`

---

### 02 — What you don't know

**Job:** the problem statement, but as an experience rather than a bullet list. Each unknown is a statement with its answer redacted. Hovering (or tapping) a row reveals a plausible figure — the point being that FynVeda is what turns the blur into a number.

```
┌────┬──────────────────────────────────────────────────────┐
│ 02 │  Most people can name their salary.                  │
│    │  Almost no one can answer these.                     │
│    │                                                      │
│    │  What do I truly own?               ▓▓▓▓▓▓▓▓         │
│    │  What do I truly owe?               ▓▓▓▓▓▓           │
│    │  How fast is my wealth growing?     ▓▓▓▓             │
│    │  Am I better off than last year?    ▓▓▓▓▓▓▓          │
│    │  Am I on track for what's next?     ▓▓▓▓▓            │
│    │                                                      │
│    │  The financial system gave us more data than ever    │
│    │  and less clarity than ever. FynVeda turns financial │
│    │  data into financial understanding.                  │
└────┴──────────────────────────────────────────────────────┘
```

Rows are separated by hairlines and sit on a shared right axis. Redaction blocks are `--shade` bars with a 3px blur; on hover they cross-fade to a `--halo` figure over 200ms. Keyboard: rows are focusable and reveal on focus.

---

### 03 — Income tells you where you stand

**Job:** carry the top 10% / top 1% insight, and immediately undercut it. This is the page's second interactive moment and the strongest argument in the copy.

```
┌────┬──────────────────────────────────────────────────────┐
│ 03 │  Income tells you where you stand.                   │
│    │  Assets tell you where you're going.                 │
│    │                                                      │
│    │  Annual income                                       │
│    │  ├────────────●──────────────────────────────┤       │
│    │  ₹3L                    ₹18L               ₹50L+     │
│    │                                                      │
│    │  You're in the top 10% of earners in India.          │
│    │  That's a starting position, not a destination.      │
│    │  Where you actually end up is decided by what        │
│    │  you convert income into.                            │
└────┴──────────────────────────────────────────────────────┘
```

A single draggable slider. Bands: ₹3L–₹22L → top 10%; ₹22L–₹50L → top 1%. The sentence beneath rewrites as the handle moves. The slider track is `--shade`, the filled portion `--iris`, handle a 12px `--halo` circle with a visible focus ring.

The background transition from `--ink` to `--vellum` happens at the bottom edge of this section — a hard edge, not a gradient fade.

---

### 04 — A single source of financial truth

**Job:** the belief. This section is almost entirely empty space; it's the breath before the product.

```
┌────┬──────────────────────────────────────────────────────┐
│ 04 │                                                      │
│    │  Every individual deserves a single                  │
│    │  source of financial truth.                          │
│    │                                                      │
│    │  Not a portfolio tracker. Not a tax filing platform. │
│    │  Not another investment app.                         │
│    │                                                      │
└────┴──────────────────────────────────────────────────────┘
```

Fraunces 64/72px on vellum in `--ink`, measure held to ~24ch so it breaks across two lines naturally. Supporting line in Satoshi 21 at 60% opacity. Vertical padding 200px desktop / 96px mobile. Nothing else in this section.

---

### 05 — Everything in one statement

**Job:** the full asset and liability inventory. This is where the ledger metaphor pays off — present it as an actual two-part statement, not as feature cards.

```
┌────┬──────────────────────────────────────────────────────┐
│ 05 │  Everything in one statement.                        │
│    │                                                      │
│    │  ASSETS                          LIABILITIES         │
│    │  ──────────────────────────      ─────────────────── │
│    │  Bank accounts                   Home loans          │
│    │  Fixed deposits                  Personal loans      │
│    │  Mutual funds                    Credit cards        │
│    │  Stocks                          Business obligations│
│    │  Bonds                                               │
│    │  Retirement accounts             ─────────────────── │
│    │  Gold                            Everything most      │
│    │  Real estate                     apps ignore is      │
│    │  Business ownership              exactly what        │
│    │  Private investments             decides your        │
│    │                                  net worth.          │
└────┴──────────────────────────────────────────────────────┘
```

Two columns, 6/6 on desktop, stacked on mobile. Each line is a row with a hairline beneath, a 16px monoline icon at the left, and the label in Satoshi 17/500. Asset column labels in `--ink`; liability column at 70% opacity — carrying the "value glows, debt dims" rule into the light section.

The column headers are the one place small caps are acceptable, because they are table headers doing a table header's job. Set them 13px, 500 weight, `--iris`, with no letter-spacing tracking beyond 0.04em.

Optional enhancement: each row is clickable and expands one line of detail (e.g. *Real estate — market-linked valuation, not purchase price*). Expansion is user-triggered motion, which is welcome.

---

### 06 — The wealth growth story

**Job:** the only genuine sequence on the page, so this is the only place numbered/dated markers belong.

```
┌────┬──────────────────────────────────────────────────────┐
│ 06 │  Watch net worth compound, year over year.           │
│    │                                                      │
│    │   ₹                                          ╱       │
│    │   │                                    ╱─────        │
│    │   │                          ╱────────                │
│    │   │            ╱─────────────                         │
│    │   │  ──────────                                       │
│    │   └────┬────┬────┬────┬────┬────┬────┬───────         │
│    │      2021 2022 2023 2024 2025 2026 2027               │
│    │                                                      │
│    │  Salary is a number that resets every month.          │
│    │  Net worth is the number that remembers.              │
└────┴──────────────────────────────────────────────────────┘
```

A single line chart in `--mint` — the only appearance of that color in the page, which is what gives it weight. Thin 1.5px stroke, no area fill, no gridlines except a hairline baseline. Year markers on the x-axis in 13px `--shade`.

Interaction: hovering a year pins a small readout showing net worth, assets and liabilities for that year. On mobile, a horizontal scrub. Chart draws on scroll-into-view once — the single exception to "no scroll-triggered motion", justified because the drawing *is* the content.

Recharts or a hand-rolled SVG path both work; hand-rolled keeps the bundle small since this is the only chart.

---

### 07 — Where the data comes from

**Job:** technology and Account Aggregator, explained as a flow rather than as three feature cards.

```
┌────┬──────────────────────────────────────────────────────┐
│ 07 │  Your data arrives on its own.                       │
│    │                                                      │
│    │  Banks ─┐                                            │
│    │  Depositories ─┤                                     │
│    │  Mutual funds ─┼─→ Account Aggregator ─→ FynVeda     │
│    │  Insurers ─┤              (RBI-regulated,            │
│    │  Lenders ─┘                consent-based)            │
│    │                                                      │
│    │  Manually held wealth — property, gold, business      │
│    │  ownership, private investments — is added once and  │
│    │  revalued on your schedule.                          │
└────┴──────────────────────────────────────────────────────┘
```

Build as an inline SVG with `--rule` connector strokes and `--iris` nodes. Static. Do not animate the flow with travelling dots — that's the tell.

Below the diagram, a short line on consent: `Nothing is fetched without your explicit, revocable consent. FynVeda reads; it never moves money.` This addresses the trust question the diagram raises, and it's the single most important sentence on the page for conversion.

---

### 08 — Built with your CA, not around them

**Job:** the advisory ecosystem, positioned as a relationship rather than a feature.

```
┌────┬──────────────────────────────────────────────────────┐
│ 08 │  Built with your CA, not around them.                │
│    │                                                      │
│    │  FynVeda doesn't replace your Chartered Accountant.  │
│    │  It gives them something they've never had: your     │
│    │  complete financial position, organised, current and │
│    │  shareable — so the conversation starts at advice    │
│    │  instead of ending at reconciliation.                │
│    │                                                      │
│    │  You                    Your CA                      │
│    │  ─────────────          ─────────────                │
│    │  Complete position      Structured, current data     │
│    │  Nothing to compile     Nothing to chase             │
│    │  Advice you can act on  Advice worth giving          │
└────┴──────────────────────────────────────────────────────┘
```

Two aligned columns on a shared baseline grid, hairline between. This is a two-sided value statement, and showing it as two literal sides is the structure doing the explaining.

---

### 09 — Not a portfolio tracker

**Job:** the USPs. Delivered as a comparison ledger rather than a grid of six identical cards, because the USPs are all defined *against* what other apps do.

Background returns to `--ink` here — the page closes the way it opened.

```
┌────┬──────────────────────────────────────────────────────┐
│ 09 │  Not a portfolio tracker.                            │
│    │                                                      │
│    │                    Everything else      FynVeda      │
│    │  ─────────────────────────────────────────────────── │
│    │  Measures           Portfolio value     Real net worth│
│    │  Covers             Market instruments  Everything you│
│    │                                         own & control │
│    │  Property & gold    Not included        Included      │
│    │  Business stake     Not included        Included      │
│    │  Time horizon       Today               Year over year│
│    │  Your CA            No role             In the loop   │
│    │  Data collection    Manual              Account       │
│    │                                         Aggregator    │
└────┴──────────────────────────────────────────────────────┘
```

"Everything else" column in `--shade`, FynVeda column in `--halo`. Row hairlines only — no vertical borders, no cell fills, no zebra striping.

---

### Early access

```
┌────┬──────────────────────────────────────────────────────┐
│    │  Start with one number.                              │
│    │  Find out what you're actually worth.                │
│    │                                                      │
│    │  [ your@email.com          ] [ Get early access ]    │
│    │  Early access opens in batches. No spam.             │
└────┴──────────────────────────────────────────────────────┘
```

Single field, single button. Button label matches the nav CTA exactly and matches the confirmation state: submitting produces `You're on the list.` Errors are specific: `That email address looks incomplete.` — never a generic "Something went wrong."

---

### Footer

Wordmark, one line of positioning, three column groups (Product / Company / Legal), and the compliance line. Keep the compliance and disclaimer text legible at 13px `--shade` — this is a finance product and the fine print being visibly readable is itself a trust signal.

---

## 3. Next.js structure

```
app/
  layout.tsx              # fonts, metadata, theme tokens
  page.tsx                # composes sections in order
  globals.css             # tokens, type scale, reset
components/
  nav.tsx
  sections/
    hero-equation.tsx     # 'use client' — load animation
    unknowns.tsx          # 'use client' — reveal on hover/focus
    income-percentile.tsx # 'use client' — slider
    belief.tsx            # server
    statement-ledger.tsx  # server (client only if rows expand)
    growth-timeline.tsx   # 'use client' — draw + scrub
    data-flow.tsx         # server, inline SVG
    advisors.tsx          # server
    comparison.tsx        # server
    early-access.tsx      # 'use client' — form
    footer.tsx            # server
  ui/
    ledger-rail.tsx       # sticky rail, section observer
    figure.tsx            # tabular-nums ₹ formatter (Intl, en-IN)
    rule.tsx
lib/
  format.ts               # ₹ lakh/crore formatting
  sections.ts             # section registry for the rail
```

Notes:

- Only six components need `'use client'`. Everything else stays a server component.
- `next/font/local` for Satoshi, `next/font/google` for Fraunces. Preload both; subset to latin.
- Indian number formatting throughout: `new Intl.NumberFormat('en-IN')`. ₹1,04,20,000 — not ₹10,420,000. Getting this wrong is instantly noticed by the audience.
- The ledger rail uses one `IntersectionObserver` over all sections; don't attach one per section.
- Metadata: OG image should be the hero equation rendered statically, not a logo on a gradient.

---

## 4. Quality floor

**Responsive.** Three breakpoints: ≥1200 (rail + full grid), 768–1199 (rail collapses to a border, two-column blocks stay), <768 (single column, figures still right-aligned). The comparison ledger in section 09 becomes stacked pairs on mobile rather than a scrolling table.

**Motion.** Wrap every animation in `@media (prefers-reduced-motion: no-preference)`. Reduced-motion users get the hero's resolved state, the timeline's completed path, and no counting.

**Keyboard & a11y.** Every interactive element has a visible focus ring (2px `--halo`, 2px offset). The redacted rows in 02 are `<button>`s. The slider in 03 is a native `<input type="range">` with an `aria-label` and a live region announcing the percentile change. Contrast: `--halo` on `--ink` clears AA at body size; `--shade` on `--ink` does **not** — use `--shade` only for 17px+ secondary text, never for anything essential.

**Performance.** One chart, one SVG diagram, no image assets above the fold. Target LCP under 1.5s — the hero is pure text, so this is achievable if fonts are preloaded and the count-up doesn't block paint.

---

## 5. Open questions before build

1. Are the hero figures illustrative or drawn from a real anonymised profile? Affects the disclaimer and whether the numbers can be A/B tested.
2. Is early access gated by waitlist or open signup? Changes the CTA copy and the confirmation state.
3. Should section 07 name the specific AA (Finvu, Onemoney, etc.) or stay generic? Naming builds trust but commits you.
4. Is there a logomark, or is the wordmark it? The rail has a natural spot for a mark at the top if one exists.
5. Regulatory line for the footer — confirm exact wording with whoever handles compliance before launch.
