import type { ReactNode } from "react";

type SectionTone =
  | "base"
  | "surface"
  | "accent"
  | "accentSolid"
  | "dark"
  | "periwinkle"
  | "ivoryBlue"
  | "indigoMist";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: SectionTone;
  dividerTo?: SectionTone;
}

const TONE_CLASSES: Record<SectionTone, string> = {
  base: "bg-background",
  surface: "bg-surface",
  accent: "bg-accent/5",
  accentSolid: "bg-accent",
  dark: "bg-[#0a0a0a]",
  periwinkle: "bg-[#d9def8]",
  ivoryBlue:
    "bg-[linear-gradient(160deg,#faf8f4_0%,#f2f0fa_45%,#e9eefb_100%)]",
  indigoMist:
    "bg-[linear-gradient(135deg,#e3e7fb_0%,#cdd5f7_40%,#a9b7ef_100%)]",
};

export default function Section({
  children,
  className,
  id,
  tone = "base",
  dividerTo,
}: SectionProps) {
  return (
    <section id={id} className={`relative ${TONE_CLASSES[tone]}`}>
      <div className={`container${className ? ` ${className}` : ""}`}>
        {children}
      </div>

      {dividerTo && (
        <div className="relative h-14 overflow-hidden sm:h-20" aria-hidden="true">
          <div
            className={`absolute inset-x-0 -top-12 h-40 -skew-y-2 sm:-top-14 sm:h-48 ${TONE_CLASSES[dividerTo]}`}
          />
        </div>
      )}
    </section>
  );
}
