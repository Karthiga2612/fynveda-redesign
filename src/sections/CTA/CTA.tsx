import Section from "@/components/Section";

export default function CTA() {
  return (
    <Section
      id="cta"
      tone="accentSolid"
      dividerTo="base"
      className="py-20 text-center md:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your wealth deserves more than fragments.
        </h2>
        <p className="mt-6 text-lg text-white/80">
          Fyn Veda brings together everything you own, control and owe, so
          you can finally see your complete financial reality and build
          lasting awareness of your wealth.
        </p>
        <a
          href="#"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-accent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:opacity-90"
        >
          Get Started
        </a>
      </div>
    </Section>
  );
}
