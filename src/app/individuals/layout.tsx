import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Individuals - Workings",
  description:
    "Record your process, protect your work. Workings for writers, creatives, developers, inventors, students, and anyone whose authorship matters.",
  alternates: { canonical: "/individuals" },
};

export default function IndividualsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
