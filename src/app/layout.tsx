import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wolfmax - The Origin Layer for Human+AI Work",
  description: "The Internet can't tell what's human anymore. Wolfmax is building the proof layer for human work. Every capture, every action, every piece of work is provable.",
  keywords: ["human authorship", "AI verification", "proof of work", "content authenticity", "digital provenance"],
  authors: [{ name: "Wolfmax" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Wolfmax - The Origin Layer for Human+AI Work",
    description: "The Internet can't tell what's human anymore. Wolfmax is building the proof layer for human work.",
    type: "website",
    siteName: "Wolfmax",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolfmax - The Origin Layer for Human+AI Work",
    description: "The Internet can't tell what's human anymore. Wolfmax is building the proof layer for human work.",
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
        {children}
      </body>
    </html>
  );
}
