"use client";

import { useState, type FormEvent } from "react";
import Section from "@/components/Section";

type Mode = "individual" | "ca";

export default function CTA() {
  const [mode, setMode] = useState<Mode>("individual");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section
      id="cta"
      tone="surface"
      dividerTo="base"
      className="py-20 text-center md:py-28"
    >
      <div className="mx-auto max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Know your Real Net Worth.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Fyn Veda is opening early access. Tell us who you are and
          we&apos;ll get you set up.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl rounded-[var(--radius)] border border-accent/20 bg-background p-6 text-left shadow-[var(--shadow)] sm:p-10">
        {submitted ? (
          <div className="py-10 text-center">
            <p className="text-xl font-semibold text-foreground">
              Thanks — we&apos;ll be in touch.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ve got your details and will reach out as early access
              opens up.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMode("individual")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  mode === "individual"
                    ? "bg-accent text-white"
                    : "border border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
                }`}
              >
                I want to track my wealth
              </button>
              <button
                type="button"
                onClick={() => setMode("ca")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  mode === "ca"
                    ? "bg-accent text-white"
                    : "border border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
                }`}
              >
                I&apos;m a Chartered Accountant
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Full name
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Phone (optional)
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91"
                  className="rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                City
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Where you're based"
                  className="rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-accent"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              What&apos;s hardest to keep track of today?
              <textarea
                name="hardest"
                rows={3}
                placeholder="Real estate, gold, business ownership, loans..."
                className="resize-none rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-accent"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center self-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get early access
            </button>

            <p className="text-center text-xs text-muted-foreground">
              We only use these details to contact you about Fyn Veda. No
              spam, ever.
            </p>
          </form>
        )}
      </div>
    </Section>
  );
}
