import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News - Workings",
  description:
    "What we've been working on - milestones, releases, and news from the Workings team as we build the authorship tool for the age of AI.",
  alternates: { canonical: "/news" },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
