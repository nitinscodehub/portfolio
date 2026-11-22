import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile, siteConfig } from "@/data/profile";
import { socials } from "@/data/socials";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CommandPalette from "@/components/layout/CommandPalette";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  headline: profile.headline,
  description: profile.secondaryTagline,
  url: siteConfig.url,
  jobTitle: profile.roles,
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
  sameAs: socials.map((social) => social.href),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: profile.brand, template: `%s — ${profile.name}` },
  description: siteConfig.description,
  keywords: [
    "Nitin Dhurve",
    "Cybersecurity Engineer",
    "Full-Stack Developer",
    ".NET Developer",
    "Flutter Developer",
    "AI ML Engineer",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: profile.brand,
    title: profile.brand,
    description: profile.heroTagline,
  },
  twitter: {
    card: "summary_large_image",
    title: profile.brand,
    description: profile.heroTagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScrollProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <SiteHeader />
          <CommandPalette />
          <div id="main">{children}</div>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
