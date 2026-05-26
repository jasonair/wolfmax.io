import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutions - Workings",
  description:
    "Workings for educators and businesses - academic integrity, responsible AI adoption, and trust at scale, without compromising privacy.",
  alternates: { canonical: "/institutions" },
};

export default function InstitutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
