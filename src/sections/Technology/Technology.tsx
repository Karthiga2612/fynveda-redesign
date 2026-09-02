import Section from "@/components/Section";

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
          Automation underneath, expertise alongside.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Account Aggregator integrations can help automate the collection
          of your financial data, so you don&apos;t have to gather it
          yourself. Fyn Veda does not replace your Chartered Accountant or
          financial advisor — it creates a stronger foundation for that
          relationship.
        </p>
      </div>

      <div className="mt-16 flex justify-center">
        <span className="rounded-full border border-accent/30 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
          CA-Backed Advisory Ecosystem
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-[var(--radius)] border border-border bg-surface p-8 transition-colors duration-200 hover:border-foreground/20">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            Technology
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
            Account Aggregator connectivity
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Through Account Aggregator integrations and future ecosystem
            partnerships, Fyn Veda automates financial data collection — so
            your wealth picture updates itself instead of waiting on a
            spreadsheet you keep meaning to open.
          </p>
        </div>

        <div
          id="advisory"
          className="scroll-mt-24 rounded-[var(--radius)] border border-accent bg-surface p-8 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            Advisors
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
            A CA-backed advisory ecosystem
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Fyn Veda does not replace Chartered Accountants. It gives them a
            stronger foundation to advise from — organised data, real
            transparency and meaningful collaboration, instead of a shoebox
            of statements every March.
          </p>
        </div>
      </div>
    </Section>
  );
}
