import type { SVGProps } from "react";

/**
 * Minimal, geometric line-art icons for the hero's wealth composition.
 * Deliberately plain (no color, no fills beyond a hairline) so every
 * fragment reads as part of one drawn system rather than a decorative
 * sticker set.
 */

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconRupee(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 5h11M6 9h11M6 5c4.5 0 7 1.2 7 4s-2.5 4-7 4M6 13h5l6 6" />
    </svg>
  );
}

export function IconCoins(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="9.5" cy="8" rx="6" ry="3.2" />
      <path d="M3.5 8v4c0 1.77 2.69 3.2 6 3.2s6-1.43 6-3.2V8" />
      <ellipse cx="15" cy="14.2" rx="5.5" ry="2.9" />
      <path d="M9.5 14.2V17c0 1.6 2.46 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-2.8" />
    </svg>
  );
}

export function IconCard(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" />
      <path d="M2.5 9.8h19" />
      <rect x="5.2" y="13" width="4.2" height="2.8" rx="0.6" />
    </svg>
  );
}

export function IconWallet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7.5c0-1.1.9-2 2-2h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M4 9.5h13.5a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1-2.5 2.5H4" />
      <circle cx="16.3" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v8.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10" />
      <path d="M10 19.5v-5h4v5" />
    </svg>
  );
}

export function IconGoldBar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 9h13l2 8.5h-17z" />
      <path d="M5.5 9 7.2 6h9.6l1.7 3" />
      <path d="M9 12.2h6" />
    </svg>
  );
}

/**
 * Small line/area chart. The trend polyline carries `data-draw` and a
 * normalized `pathLength` so the hero can drive a stroke-draw animation
 * on load and on scroll instead of the icon simply fading in.
 */
export function IconChart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.2" strokeOpacity="0.5" />
      <polyline
        data-draw
        pathLength={1}
        points="4.5,16 8,13 11,15 14.5,9 18,11 19.7,6.5"
      />
    </svg>
  );
}

export function IconNode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" {...props}>
      <circle cx="6" cy="6" r="3" />
    </svg>
  );
}
