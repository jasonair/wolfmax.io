import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IntroOverlay } from "@/components/IntroOverlay";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wolfmax.io"),
  alternates: {
    canonical: "/",
  },
  title: "Workings - The way you work.",
  description: "Workings is an authorship tool that privately captures how your work was made by humans, AI, or both, locally on your device. Prove your process, protect your IP, and share only what's needed.",
  keywords: ["human authorship", "AI verification", "proof of work", "content authenticity", "digital provenance"],
  authors: [{ name: "Workings" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Workings - The way you work.",
    description: "Workings is an authorship tool that privately captures how your work was made by humans, AI, or both, locally on your device. Prove your process, protect your IP, and share only what's needed.",
    type: "website",
    siteName: "Workings",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workings - The way you work.",
    description: "Workings is an authorship tool that privately captures how your work was made by humans, AI, or both, locally on your device. Prove your process, protect your IP, and share only what's needed.",
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
      className={`${manrope.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        {/* Decide before first paint whether to play the intro, so neither the
            overlay nor the bare logo flashes. Plays on every load; skips only
            when the user prefers reduced motion. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!m){document.documentElement.dataset.intro='play';}}catch(e){}})();`,
          }}
        />
        <IntroOverlay />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
