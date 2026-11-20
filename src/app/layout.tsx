import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nitin — Full-Stack Engineer | Selected Work",
  description:
    "A curated portfolio of production-style Next.js products: analytics, AI assistants, commerce and workflow automation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
