import Section from "@/components/Section";

const OWN = [
  { label: "Bank accounts", value: "₹6,50,000" },
  { label: "Fixed deposits", value: "₹9,00,000" },
  { label: "Mutual funds", value: "₹22,00,000" },
  { label: "Stocks", value: "₹14,50,000" },
  { label: "Bonds", value: "₹5,00,000" },
  { label: "Retirement accounts", value: "₹18,00,000" },
  { label: "Gold", value: "₹4,20,000" },
  { label: "Real estate", value: "₹65,00,000" },
];

const CONTROL = [
  { label: "Business ownership", value: "₹20,00,000" },
  { label: "Private investments", value: "₹8,00,000" },
];

const OWE = [
  { label: "Home loans", value: "₹32,00,000" },
  { label: "Personal loans", value: "₹3,50,000" },
  { label: "Credit card liabilities", value: "₹1,20,000" },
  { label: "Business obligations", value: "₹5,30,000" },
];

const GROUPS = [
  { step: "1", title: "What You Own", total: "₹1,44,20,000", items: OWN },
  { step: "2", title: "What You Control", total: "₹28,00,000", items: CONTROL },
  { step: "3", title: "What You Owe", total: "₹42,00,000", items: OWE },
];

export default function RealNetWorth() {
  return (
    <Section
      id="real-net-worth"
      tone="accent"
      dividerTo="base"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl text-left">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          Real Net Worth
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Real Net Worth is the one number that matters.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Every account, holding and loan tells you something. None of them,
          on their own, tells you where you actually stand. Real Net Worth
          brings everything together into a single, honest measure of your
          financial well-being.
        </p>
      </div>

      <div className="mt-12 rounded-[var(--radius)] border border-accent/20 bg-background p-8 text-center shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-14">
        <p className="text-lg font-medium text-muted-foreground sm:text-xl">
          Everything You Own + Everything You Control − Everything You Owe
        </p>
        <p className="mt-4 text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
          = Real Net Worth
        </p>
        <p className="mt-8 text-5xl font-semibold tracking-tight text-foreground tabular-nums sm:text-6xl">
          ₹1,30,20,000
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-foreground">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-semibold text-accent">
                  {group.step}
                </span>
                {group.title}
              </h3>
              <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {group.total}
              </span>
            </div>
            <div className="mt-4 flex flex-col">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="-mx-2 flex items-center justify-between rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-background"
                >
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
