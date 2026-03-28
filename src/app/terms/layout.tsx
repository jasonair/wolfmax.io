import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Wolfmax",
  description: "Read the Wolfmax Terms of Service. Understand your rights and responsibilities when using our platform.",
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
