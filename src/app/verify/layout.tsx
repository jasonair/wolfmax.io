import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify a report — Workings",
  description:
    "Anyone can verify a Workings report is genuine. Confirm its authenticity, integrity, and the creative process behind it — no account needed.",
  alternates: { canonical: "/verify" },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
