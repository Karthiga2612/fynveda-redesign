import Section from "@/components/Section";

const MILESTONES = [
  { label: "5 Years Ago", value: "₹42,00,000", isToday: false },
  { label: "3 Years Ago", value: "₹68,50,000", isToday: false },
  { label: "1 Year Ago", value: "₹98,00,000", isToday: false },
  { label: "Today", value: "₹1,30,20,000", isToday: true },
];

export default function WealthGrowth() {
  return (
    <Section
      id="wealth-growth"
      tone="surface"
      dividerTo="base"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-left">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          Wealth Growth
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          From income to wealth creation.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Fyn Veda helps you see how your wealth is actually growing over
          time, not just how much you earn each month. As the picture
          becomes clear, users stop focusing solely on income and begin
          focusing on wealth creation.
        </p>
      </div>

      <div className="mt-16">
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-4">
            {MILESTONES.map((milestone) => (
              <span
                key={milestone.label}
                className={`text-center text-sm ${
                  milestone.isToday
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {milestone.label}
              </span>
            ))}
          </div>

          <div className="relative mt-4 grid grid-cols-4">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-border via-border to-accent"
              aria-hidden="true"
            />
            {MILESTONES.map((milestone) => (
              <div
                key={milestone.label}
                className="relative flex justify-center"
              >
                <span
                  className={
                    milestone.isToday
                      ? "h-4 w-4 rounded-full bg-accent shadow-[var(--shadow)] transition-transform duration-200 hover:scale-110"
                      : "h-3 w-3 rounded-full border-2 border-border bg-background transition-transform duration-200 hover:scale-110"
                  }
                />
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            {MILESTONES.map((milestone) => (
              <span
                key={milestone.label}
                className={`text-center text-lg font-semibold tracking-tight ${
                  milestone.isToday ? "text-accent" : "text-foreground"
                }`}
              >
                {milestone.value}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 md:hidden">
          {MILESTONES.map((milestone) => (
            <div
              key={milestone.label}
              className={`flex items-center justify-between border-l-2 pl-4 ${
                milestone.isToday ? "border-accent" : "border-border"
              }`}
            >
              <span
                className={`text-sm ${
                  milestone.isToday
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {milestone.label}
              </span>
              <span
                className={`text-lg font-semibold tracking-tight ${
                  milestone.isToday ? "text-accent" : "text-foreground"
                }`}
              >
                {milestone.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
