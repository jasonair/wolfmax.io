import type { Metadata } from "next";
import { Newsreader, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IntroOverlay } from "@/components/IntroOverlay";
import { WaitlistProvider } from "@/components/waitlist/WaitlistProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, siteGraph } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: "Workings - The way you work.",
  description: "Workings is an authorship tool designed to privately capture the way you work. Create a high-fidelity record of how your work was made - by humans, AI, or both - stored locally on your computer.",
  keywords: ["human authorship", "AI verification", "proof of work", "content authenticity", "digital provenance"],
  authors: [{ name: "Workings" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Workings - The way you work.",
    description: "Workings is an authorship tool designed to privately capture the way you work. Create a high-fidelity record of how your work was made - by humans, AI, or both - stored locally on your computer.",
    url: "/",
    type: "website",
    siteName: "Workings",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 652,
        alt: "Workings - Capture your Workings. A private, tamper-evident record to prove how the work was made.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workings - The way you work.",
    description: "Workings is an authorship tool designed to privately capture the way you work.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <JsonLd data={siteGraph} />
        {/* Decide before first paint whether to play the intro, so neither the
            overlay nor the bare logo flashes. Plays on every load; skips only
            when the user prefers reduced motion. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!m){document.documentElement.dataset.intro='play';}}catch(e){}})();`,
          }}
        />
        <IntroOverlay />
        {gaId && <Analytics gaId={gaId} />}
        <WaitlistProvider>
          <Navbar />
          {children}
          <Footer />
        </WaitlistProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
