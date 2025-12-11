import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Piece President | Trump's Peace Deals Tracker",
  description: "Tracking Trump's claimed 'peace deals' against reality on the ground. A satirical yet factual look at presidential promises vs. real-world outcomes.",
  keywords: ["Trump", "peace deals", "foreign policy", "satire", "political tracker"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${workSans.variable}`}>
      <body className="font-body bg-cream antialiased">{children}</body>
    </html>
  );
}
