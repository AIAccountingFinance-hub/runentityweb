import type { Metadata } from "next";
import { Inter, Manrope, Chivo_Mono } from "next/font/google";
import DemoModalProvider from "@/components/ui/DemoModalProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-chivo-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Entity | AI-Native Accounting Platform",
  description:
    "The accounting platform where AI does the work. You stay in control. Every transaction automatically recorded, categorized, and reconciled.",
  keywords: [
    "accounting software",
    "AI accounting",
    "bookkeeping",
    "GST compliance",
    "financial management",
  ],
  openGraph: {
    title: "Entity | AI-Native Accounting Platform",
    description:
      "The accounting platform where AI does the work. You stay in control.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${manrope.variable} ${chivoMono.variable} antialiased`}
      >
        <DemoModalProvider>{children}</DemoModalProvider>
      </body>
    </html>
  );
}
