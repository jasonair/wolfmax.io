import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://wolfmax.io"),
  title: "Wolfmax - Prove your process. Protect your work.",
  description: "Wolfmax captures how your work was created by humans, AI, or both locally on your device. Share only what's needed to protect your credibility.",
  keywords: ["human authorship", "AI verification", "proof of work", "content authenticity", "digital provenance"],
  authors: [{ name: "Wolfmax" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Wolfmax - Prove your process. Protect your work.",
    description: "Wolfmax captures how your work was created by humans, AI, or both locally on your device. Share only what's needed to protect your credibility.",
    type: "website",
    siteName: "Wolfmax",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolfmax - Prove your process. Protect your work.",
    description: "Wolfmax captures how your work was created by humans, AI, or both locally on your device. Share only what's needed to protect your credibility.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="antialiased">
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
      </body>
    </html>
  );
}
