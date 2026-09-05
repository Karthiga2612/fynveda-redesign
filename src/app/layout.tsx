import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

// Spec calls for Satoshi (Fontshare) as the UI/body face. Satoshi isn't on
// Google Fonts and no licensed font files are vendored in this repo, so
// Inter stands in as the geometric-grotesk substitute — swap for Satoshi
// via next/font/local once the font files are added under src/app/fonts/.
const satoshiStandIn = Inter({
  variable: "--font-satoshi",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FynVeda — Know what you're actually worth.",
  description:
    "Your bank balance is not your net worth. FynVeda brings everything you own, control and owe into one continuously updated statement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${satoshiStandIn.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
