import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Workings",
  description:
    "Everything you need to know about Workings - how it works, who it's for, and how we handle your data.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
