import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitepaper — Wolfmax",
  description: "Verifiable Process Recording: Restoring Trust in the Age of AI-Generated Content. Read the Wolfmax whitepaper on technical architecture, privacy model, and use cases.",
  alternates: {
    canonical: "/whitepaper",
  },
};

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
