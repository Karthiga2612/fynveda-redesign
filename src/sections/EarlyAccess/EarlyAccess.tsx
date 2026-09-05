"use client";

import { useId, useState, type FormEvent, type SVGProps } from "react";

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.5l2.4 2.4L15.5 9.5" />
    </svg>
  );
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

type Status = "idle" | "error" | "submitting" | "success";

/**
 * Early access — fynveda-landing-layout.md §2 "Early access". Single
 * field, single button; the confirmation and error copy are lifted
 * verbatim from the spec. No backend exists yet, so submission is
 * mocked client-side (a brief delay, then the confirmed state) rather
 * than left unimplemented.
 */
export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();
  const errorId = useId();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 600);
  }

  return (
    <section
      id="early-access"
      className="border-l-4 bg-vellum pl-5 text-ink xl:border-l-0 xl:pl-24"
      style={{ borderColor: "var(--rule-on-light)", scrollMarginTop: "80px" }}
    >
      <div className="container py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-display text-3xl leading-[1.15] sm:text-4xl lg:text-[48px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Start with one number.
            <br />
            Find out what you&rsquo;re actually worth.
          </h2>

          <div className="mx-auto mt-10 max-w-md">
            {status === "success" ? (
              <div
                className="flex items-center justify-center gap-2.5 rounded-[8px] border py-3.5"
                style={{ borderColor: "var(--rule-on-light)" }}
                role="status"
                aria-live="polite"
              >
                <CheckIcon className="h-4.5 w-4.5 shrink-0" style={{ color: "var(--mint)" }} />
                <p className="text-[15px] font-medium text-ink">You&rsquo;re on the list.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor={inputId} className="sr-only">
                    Email address
                  </label>
                  <input
                    id={inputId}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? errorId : undefined}
                    className="w-full rounded-[8px] border bg-transparent px-4 py-3 text-[15px] text-ink transition-colors duration-200"
                    style={{
                      borderColor: status === "error" ? "#b3294f" : "var(--rule-on-light)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="shrink-0 cursor-pointer rounded-[8px] bg-iris px-6 py-3 text-[15px] font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-default disabled:opacity-60"
                  >
                    {status === "submitting" ? "Joining…" : "Get early access"}
                  </button>
                </div>

                <div className="mt-3 min-h-[18px] text-left sm:text-center">
                  {status === "error" ? (
                    <p id={errorId} role="alert" className="text-[13px]" style={{ color: "#b3294f" }}>
                      That email address looks incomplete.
                    </p>
                  ) : (
                    <p className="text-[13px] text-ink-soft">
                      Early access opens in batches. No spam.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
