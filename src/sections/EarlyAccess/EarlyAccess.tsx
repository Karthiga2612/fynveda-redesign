"use client";

import { useId, useState, type FormEvent, type ReactNode, type SVGProps } from "react";

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

type Audience = "individual" | "ca";
type Status = "idle" | "error" | "submitting" | "success";
type ErrorField = "name" | "email" | null;

const TABS: { key: Audience; label: string }[] = [
  { key: "individual", label: "I want to track my wealth" },
  { key: "ca", label: "I'm a Chartered Accountant" },
];

const inputClasses =
  "w-full rounded-[8px] border bg-transparent px-4 py-3 text-[15px] text-ink transition-colors duration-200 placeholder:text-ink-soft/60";
const labelClasses = "mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-ink-soft";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClasses}>
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Early access — two-field-set form, per explicit follow-up request to
 * match a supplied reference's two-tab structure (individual vs
 * Chartered Accountant), restyled in FynVeda's own vellum/iris language
 * rather than the reference's dark styling. Shared fields (name, email,
 * phone) persist across tab switches; only the audience-specific fields
 * swap. No backend exists yet, so submission is mocked client-side.
 */
export default function EarlyAccess() {
  const [audience, setAudience] = useState<Audience>("individual");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    firm: "",
    hardest: "",
    clients: "",
    useCase: "",
  });

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const cityId = useId();
  const firmId = useId();
  const hardestId = useId();
  const clientsId = useId();
  const useCaseId = useId();
  const errorId = useId();

  const isCA = audience === "ca";

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorField(null);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!form.name.trim()) {
      setErrorMessage("Add your name to continue.");
      setErrorField("name");
      setStatus("error");
      return;
    }
    if (!isValidEmail(form.email)) {
      setErrorMessage("That email address looks incomplete.");
      setErrorField("email");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 600);
  }

  function borderFor(field: ErrorField) {
    return errorField === field ? "#b3294f" : "var(--rule-on-light)";
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
            Know your Real Net Worth.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-[16px] leading-snug text-ink-soft">
            FynVeda is opening early access. Tell us who you are and we&rsquo;ll get you set up.
          </p>

          {status === "success" ? (
            <div
              className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2.5 rounded-[8px] border py-3.5"
              style={{ borderColor: "var(--rule-on-light)" }}
              role="status"
              aria-live="polite"
            >
              <CheckIcon className="h-4.5 w-4.5 shrink-0" style={{ color: "var(--mint)" }} />
              <p className="text-[15px] font-medium text-ink">You&rsquo;re on the list.</p>
            </div>
          ) : (
            <>
              <div
                className="mx-auto mt-8 inline-flex flex-wrap justify-center gap-1 rounded-full border p-1"
                style={{ borderColor: "var(--rule-on-light)", background: "rgba(109,74,224,0.05)" }}
                role="tablist"
              >
                {TABS.map((tab) => {
                  const active = audience === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setAudience(tab.key)}
                      className="cursor-pointer rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-200"
                      style={{
                        background: active ? "var(--paper-strong)" : "transparent",
                        color: active ? "var(--iris)" : "var(--ink-soft)",
                        boxShadow: active ? "0 2px 8px -2px rgba(21,14,46,0.15)" : "none",
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} noValidate className="mx-auto mt-8 max-w-xl text-left">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" htmlFor={nameId}>
                    <input
                      id={nameId}
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={errorField === "name"}
                      aria-describedby={status === "error" ? errorId : undefined}
                      className={inputClasses}
                      style={{ borderColor: borderFor("name") }}
                    />
                  </Field>

                  <Field label="Email" htmlFor={emailId}>
                    <input
                      id={emailId}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={errorField === "email"}
                      aria-describedby={status === "error" ? errorId : undefined}
                      className={inputClasses}
                      style={{ borderColor: borderFor("email") }}
                    />
                  </Field>

                  <Field label="Phone (optional)" htmlFor={phoneId}>
                    <input
                      id={phoneId}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClasses}
                      style={{ borderColor: "var(--rule-on-light)" }}
                    />
                  </Field>

                  {isCA ? (
                    <Field label="Firm name" htmlFor={firmId}>
                      <input
                        id={firmId}
                        placeholder="Your practice"
                        value={form.firm}
                        onChange={(e) => update("firm", e.target.value)}
                        className={inputClasses}
                        style={{ borderColor: "var(--rule-on-light)" }}
                      />
                    </Field>
                  ) : (
                    <Field label="City" htmlFor={cityId}>
                      <input
                        id={cityId}
                        autoComplete="address-level2"
                        placeholder="Where you're based"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        className={inputClasses}
                        style={{ borderColor: "var(--rule-on-light)" }}
                      />
                    </Field>
                  )}
                </div>

                {isCA ? (
                  <>
                    <div className="mt-4">
                      <Field label="How many clients do you advise?" htmlFor={clientsId}>
                        <input
                          id={clientsId}
                          placeholder="e.g. 40–100"
                          value={form.clients}
                          onChange={(e) => update("clients", e.target.value)}
                          className={inputClasses}
                          style={{ borderColor: "var(--rule-on-light)" }}
                        />
                      </Field>
                    </div>
                    <div className="mt-4">
                      <Field label="How would you use FynVeda with your clients?" htmlFor={useCaseId}>
                        <textarea
                          id={useCaseId}
                          rows={3}
                          placeholder="Annual reviews, wealth reporting, client onboarding…"
                          value={form.useCase}
                          onChange={(e) => update("useCase", e.target.value)}
                          className={`${inputClasses} min-h-[92px] resize-y`}
                          style={{ borderColor: "var(--rule-on-light)" }}
                        />
                      </Field>
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <Field label="What's hardest to keep track of today?" htmlFor={hardestId}>
                      <textarea
                        id={hardestId}
                        rows={3}
                        placeholder="Real estate, gold, business ownership, loans…"
                        value={form.hardest}
                        onChange={(e) => update("hardest", e.target.value)}
                        className={`${inputClasses} min-h-[92px] resize-y`}
                        style={{ borderColor: "var(--rule-on-light)" }}
                      />
                    </Field>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 w-full cursor-pointer rounded-[8px] bg-iris px-6 py-3 text-[15px] font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-default disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? "Joining…" : "Get early access"}
                </button>

                <div className="mt-3 min-h-[18px]">
                  {status === "error" ? (
                    <p id={errorId} role="alert" className="text-[13px]" style={{ color: "#b3294f" }}>
                      {errorMessage}
                    </p>
                  ) : (
                    <p className="text-[13px] text-ink-soft">
                      We only use these details to contact you about FynVeda. No spam, ever.
                    </p>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
