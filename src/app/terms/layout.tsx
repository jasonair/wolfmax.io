import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Workings",
  description: "Read the Workings Terms of Service. Understand your rights and responsibilities when using our platform.",
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
