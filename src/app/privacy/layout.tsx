import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Privacy Policy — Workings",
  description: "How Human Workings Ltd collects and uses personal data when you visit workings.io — essential storage only, no analytics or tracking. UK & EU GDPR compliant.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
