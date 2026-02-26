import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — Entity",
  description:
    "Sign in to Entity, the AI-native accounting platform. Access your books, invoices, and financial data.",
  robots: "noindex, nofollow",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
