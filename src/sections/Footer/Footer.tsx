const YEAR = new Date().getFullYear();

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#data-flow" },
      { label: "Real net worth", href: "#statement" },
      { label: "For CAs", href: "#advisors" },
      { label: "Get early access", href: "#early-access" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#belief" },
      { label: "Careers", href: "#early-access" },
      { label: "Contact", href: "#early-access" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#data-flow" },
      { label: "Terms of service", href: "#footer-compliance" },
      { label: "Disclosures", href: "#footer-compliance" },
    ],
  },
];

/**
 * Footer — fynveda-landing-layout.md §2 "Footer". Wordmark, one line of
 * positioning, three column groups, and a compliance line kept legible
 * (13px, but on --halo/70 rather than the literal --shade token, which
 * the spec's own quality floor notes fails AA below 17px on --ink —
 * legibility was the explicit instruction, so it wins over the literal
 * token name). Server component: nothing here is interactive.
 */
export default function Footer() {
  return (
    <footer
      className="border-l-4 border-halo/20 bg-ink pl-5 text-halo xl:border-l-0 xl:pl-24"
    >
      <div className="container pt-14 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
        <div
          className="grid gap-12 pb-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8 lg:pb-14"
          style={{ borderBottom: "1px solid var(--rule-on-dark)" }}
        >
          <div>
            <a href="#" className="flex items-center gap-2 font-display text-[21px] font-medium text-halo" style={{ letterSpacing: "-0.01em" }}>
              <span className="inline-block h-2 w-2 bg-iris" aria-hidden="true" />
              FynVeda
            </a>
            <p className="mt-4 max-w-[32ch] text-[14px] leading-snug" style={{ color: "var(--shade)" }}>
              A single source of financial truth — for everything you own,
              owe, and control.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-[12px] font-medium uppercase" style={{ color: "var(--shade)", letterSpacing: "0.06em" }}>
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-halo transition-colors duration-200 hover:text-iris"
                      style={{ opacity: 0.85 }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          id="footer-compliance"
          className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
          style={{ scrollMarginTop: "80px" }}
        >
          <p className="max-w-[52ch] text-[13px] leading-snug" style={{ color: "var(--halo)", opacity: 0.7 }}>
            FynVeda is a wealth visibility platform, not an investment
            adviser, broker or tax preparer. Financial data is aggregated
            via RBI-licensed Account Aggregators, only with your explicit
            consent.
          </p>
          <p className="shrink-0 text-[13px]" style={{ color: "var(--halo)", opacity: 0.7 }}>
            © {YEAR} FynVeda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
