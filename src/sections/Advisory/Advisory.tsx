import Section from "@/components/Section";

export default function Advisory() {
  return (
    <Section
      id="advisory"
      tone="surface"
      dividerTo="accentSolid"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-left">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          Advisory
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          A stronger foundation for advisory relationships.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Fyn Veda does not replace your Chartered Accountant or financial
          advisor. It creates a stronger foundation for that relationship.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          When your financial data is organized and easy to understand, it
          enables greater transparency and more meaningful collaboration
          between you and your advisor.
        </p>
      </div>

      <div className="mt-16 flex justify-center">
        <span className="rounded-full border border-accent/30 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          CA-Backed Advisory Ecosystem
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        <div className="rounded-[var(--radius)] border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <span className="text-sm font-medium text-foreground">You</span>
        </div>

        <div
          className="hidden text-xl text-accent lg:block"
          aria-hidden="true"
        >
          →
        </div>

        <div className="rounded-[var(--radius)] border border-accent bg-background p-7 text-center shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <span className="text-sm font-medium text-foreground">
            Fyn Veda
          </span>
          <p className="mt-1 text-xs text-muted-foreground">
            Organized Financial Data
          </p>
        </div>

        <div
          className="hidden text-xl text-accent lg:block"
          aria-hidden="true"
        >
          →
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <span className="text-sm font-medium text-foreground">
            Your CA / Advisor
          </span>
        </div>
      </div>
    </Section>
  );
}
