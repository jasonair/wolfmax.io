import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — Workings",
  description: "Terms of use for the workings.io website and pre-launch services — waitlist, demos, and beta access enquiries.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
