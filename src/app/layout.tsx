import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wolfmax - The Origin Layer for Human+AI Work",
  description: "The Internet can't tell what's human anymore. Wolfmax is building the proof layer for human work. Every capture, every action, every piece of work is provable.",
  keywords: ["human authorship", "AI verification", "proof of work", "content authenticity", "digital provenance"],
  authors: [{ name: "Wolfmax" }],
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
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
