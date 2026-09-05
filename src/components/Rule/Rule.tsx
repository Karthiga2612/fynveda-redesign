import type { HTMLAttributes } from "react";

interface RuleProps extends HTMLAttributes<HTMLHRElement> {
  tone?: "ink" | "vellum";
}

/** A hairline separator — rule tokens from fynveda-landing-layout.md §0 Color. */
export default function Rule({ tone = "ink", className = "", style, ...rest }: RuleProps) {
  return (
    <hr
      className={`m-0 border-0 border-t ${className}`}
      style={{
        borderColor: tone === "ink" ? "var(--rule-on-dark)" : "var(--rule-on-light)",
        ...style,
      }}
      {...rest}
    />
  );
}
