const FOOTER_LINKS = [
  { label: "Why Fyn Veda", href: "#why-fyn-veda" },
  { label: "Real Net Worth", href: "#real-net-worth" },
  { label: "Wealth Growth", href: "#wealth-growth" },
  { label: "Technology", href: "#technology" },
  { label: "Advisory", href: "#advisory" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Fyn Veda
            </span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Personal Wealth Operating System — your complete financial
              reality, in one place.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">© {year} Fyn Veda.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Fyn Veda is a wealth visibility platform, not an investment
            adviser.
          </p>
        </div>
      </div>
    </footer>
  );
}
