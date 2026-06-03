import type { Metadata } from "next";
import { Barlow_Condensed, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "BRAINST — Landscape Architecture & Research Studio",
  description:
    "A landscape architecture and research studio exploring people, nature, and the built environment.",
  openGraph: {
    title: "BRAINST",
    description: "Welcome to Brain Street — ideas come first.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlow.variable} ${dm.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
