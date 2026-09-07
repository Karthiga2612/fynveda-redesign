export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: BlogBlock[];
};

// Content taken from the corresponding posts on fynveda.com, for
// frontend-only reference — no CMS/backend exists in this project.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-real-net-worth",
    title: "Real Net Worth: the number almost nobody knows",
    category: "Ideas",
    date: "04 Aug 2026",
    excerpt:
      "Everything you own, plus everything you control, minus everything you owe. Why this single figure says more about your financial life than income ever will.",
    body: [
      {
        type: "p",
        text: "Ask someone how they're doing financially and you'll hear about salary. Ask what they're worth and the answer usually arrives as a list: a bank balance, a mutual fund app screenshot, a rough guess at what the flat might fetch.",
      },
      { type: "p", text: "That's not a number. That's fragments." },
      { type: "h3", text: "The definition" },
      {
        type: "p",
        text: "Real Net Worth = Everything you own + Everything you control − Everything you owe.",
      },
      {
        type: "p",
        text: "The middle term is the one most tools drop. A portfolio tracker knows your mutual funds. It does not know the shop your family runs, the land in your mother's name that you manage, or the stake you hold in a friend's company. For most Indian households, that omitted middle is the majority of the wealth.",
      },
      { type: "h3", text: "Why income is a poor proxy" },
      {
        type: "p",
        text: "Income tells you your current position. It says very little about direction. Two people earning identically can be moving in opposite directions — one accumulating assets, the other servicing obligations against a lifestyle.",
      },
      { type: "quote", text: "Income is a rate. Wealth is a level. Only one of them compounds." },
      { type: "h3", text: "Why the number has to be continuous" },
      {
        type: "p",
        text: "A net worth figure calculated once is trivia. Calculated continuously, it becomes a feedback loop — you can finally see whether the decisions of the last twelve months moved you forward.",
      },
      {
        type: "p",
        text: "That's the difference between financial data and financial understanding, and it's the whole reason FynVeda exists.",
      },
    ],
  },
  {
    slug: "beyond-portfolio-tracking",
    title: "Why portfolio trackers can't tell you what you're worth",
    category: "Product",
    date: "18 Jul 2026",
    excerpt:
      "Real estate, gold and business ownership hold most Indian household wealth — and most financial apps count none of it. That gap is the product.",
    body: [
      { type: "h3", text: "What gets left out" },
      {
        type: "p",
        text: "Portfolio applications typically display mutual funds, stocks, and sometimes deposits. However, they omit significant assets including residential and rental properties, physical or digital gold, stakes in family enterprises, and private venture investments. For many households, these unlisted assets substantially exceed the value of tracked investments.",
      },
      { type: "h3", text: "The category problem" },
      {
        type: "p",
        text: 'Conventional financial products center on "transactions," "investments," or "taxation." While each represents a legitimate organizational framework, none fundamentally addresses wealth itself.',
      },
      {
        type: "p",
        text: 'FynVeda structures around wealth as the primary organizing principle, which necessitates accommodating messy, illiquid, hard-to-value things rather than only the assets that come with a clean API.',
      },
      { type: "h3", text: "The trade-off we accept" },
      {
        type: "p",
        text: 'The platform acknowledges that certain data requires manual entry initially and some valuations represent estimates. The reasoning offered: "A considered estimate of your whole position is more useful than a precise measurement of one-third of it."',
      },
      {
        type: "p",
        text: "Account Aggregator connectivity will progressively automate data collection, though complete automation remains unlikely. Platforms limiting themselves to automatable data essentially function as portfolio trackers rather than comprehensive wealth platforms.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
