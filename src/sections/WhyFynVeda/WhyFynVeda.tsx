import Section from "@/components/Section";

const FINANCIAL_PIECES = [
  "Bank Balance",
  "Salary",
  "Mutual Funds",
  "Home Loan",
  "Insurance",
  "Credit Score",
  "Taxes",
];

const SCATTER_OFFSET = [
  "lg:translate-y-1 lg:-rotate-1",
  "lg:-translate-y-1 lg:rotate-1",
  "lg:translate-y-2 lg:rotate-1",
  "lg:-translate-y-1 lg:-rotate-1",
  "lg:translate-y-1 lg:rotate-1",
  "lg:-translate-y-2 lg:-rotate-1",
  "lg:translate-y-1 lg:rotate-1",
];

export default function WhyFynVeda() {
  return (
    <Section
      id="why-fyn-veda"
      tone="surface"
      dividerTo="accent"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-left">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          Why Fyn Veda
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You know the pieces. You don&apos;t know the picture.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          You know your bank balance, your salary, your mutual fund
          portfolio, and what&apos;s left on your home loan. What you rarely
          know is your true net worth.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          Banking, investing, insurance, credit and taxation have all
          evolved separately, each with its own systems and its own
          language. Individuals are left to connect the pieces themselves.
          The result is abundant financial data and very little clarity.
          Most products focus on transactions, investments or taxation.
          Very few focus on wealth itself.
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
        <div className="rounded-[var(--radius)] border border-dashed border-border bg-background p-8 opacity-90 lg:-rotate-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Fragmented Financial Information
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {FINANCIAL_PIECES.map((item, index) => (
              <span
                key={item}
                className={`rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:border-foreground/30 ${SCATTER_OFFSET[index % SCATTER_OFFSET.length]}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden flex-col items-center gap-2 lg:flex">
          <div className="h-10 w-px bg-border" aria-hidden="true" />
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent bg-background text-xs font-semibold text-accent shadow-[var(--shadow)]">
            FV
          </div>
          <div className="h-10 w-px bg-border" aria-hidden="true" />
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-background p-8 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            One Complete Financial Picture
          </p>
          <div className="mt-6 flex flex-col">
            {FINANCIAL_PIECES.map((item) => (
              <div
                key={item}
                className="-mx-2 flex items-center gap-3 rounded-md border-b border-border px-2 py-3 transition-colors duration-200 last:border-b-0 hover:bg-surface"
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
