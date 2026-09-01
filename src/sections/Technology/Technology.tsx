import Section from "@/components/Section";

const DATA_SOURCES = [
  "Bank Accounts",
  "Investments",
  "Insurance",
  "Loans",
  "Credit",
  "Real Estate",
];

export default function Technology() {
  return (
    <Section
      id="technology"
      dividerTo="surface"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-left">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          Technology
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Technology that quietly connects your financial life.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Account Aggregator integrations can help automate the collection
          of your financial data, so you don&apos;t have to gather it
          yourself. As the ecosystem evolves, future partnerships can
          further improve how well your data connects.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          The goal isn&apos;t more data. It&apos;s better understanding, so
          you can make clearer financial decisions, simply and directly.
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-3">
        <div className="w-full rounded-[var(--radius)] border border-border bg-surface p-6 transition-colors duration-200 hover:border-foreground/20">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Financial Information
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {DATA_SOURCES.map((source) => (
              <span
                key={source}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {source}
              </span>
            ))}
          </div>
        </div>

        <span className="text-lg text-muted-foreground" aria-hidden="true">
          ↓
        </span>

        <div className="rounded-full border border-border px-6 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Organized
        </div>

        <span className="text-lg text-accent" aria-hidden="true">
          ↓
        </span>

        <div className="flex h-36 w-36 flex-shrink-0 items-center justify-center rounded-full border border-accent bg-surface p-6 text-center shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <span className="text-sm font-medium text-foreground">
            Unified Wealth View
          </span>
        </div>
      </div>
    </Section>
  );
}
