import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Individuals — Workings",
  description:
    "Prove your process. Protect your work. Workings for writers, creatives, developers, founders, students, and anyone whose authorship matters.",
  alternates: { canonical: "/individuals" },
};

export default function IndividualsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
