import Section from "@/components/Section";

const WEALTH_CATEGORIES = [
  { label: "Bank accounts", value: "₹6,50,000" },
  { label: "Fixed deposits", value: "₹9,00,000" },
  { label: "Mutual funds", value: "₹22,00,000" },
  { label: "Stocks", value: "₹14,50,000" },
  { label: "Bonds", value: "₹5,00,000" },
  { label: "Retirement accounts", value: "₹18,00,000" },
  { label: "Gold", value: "₹4,20,000" },
  { label: "Real estate", value: "₹65,00,000" },
  { label: "Business ownership", value: "₹20,00,000" },
  { label: "Private investments", value: "₹8,00,000" },
];

const LIABILITIES = [
  { label: "Home loans", value: "₹32,00,000" },
  { label: "Personal loans", value: "₹3,50,000" },
  { label: "Credit card liabilities", value: "₹1,20,000" },
  { label: "Business obligations", value: "₹5,30,000" },
];

export default function WealthView() {
  return (
    <Section
      id="wealth-view"
      dividerTo="surface"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-left">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          Wealth View
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Everything that makes up your wealth, in one view.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Fyn Veda brings the meaningful components of your wealth, your
          accounts, investments, retirement savings, property and business
          interests, together with everything you owe, into a single,
          complete view.
        </p>
      </div>

      <div className="mt-12 rounded-[var(--radius)] border border-border bg-surface p-8 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-12">
        <p className="text-sm text-muted-foreground">Real Net Worth</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-foreground tabular-nums sm:text-5xl">
          ₹1,30,20,000
        </p>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Wealth
          </p>
          <div className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {WEALTH_CATEGORIES.map((item) => (
              <div
                key={item.label}
                className="-mx-2 flex items-center justify-between rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-background/70"
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {item.label}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Liabilities
          </p>
          <div className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {LIABILITIES.map((item) => (
              <div
                key={item.label}
                className="-mx-2 flex items-center justify-between rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-background/70"
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  {item.label}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
