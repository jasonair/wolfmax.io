import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Wolfmax",
  description: "Learn how Wolfmax collects, uses, and protects your personal information. Your privacy matters to us.",
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
