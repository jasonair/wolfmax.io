import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Wolfmax",
  description: "Join the Wolfmax team. Help us build the future of creative integrity. View open positions and apply.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
