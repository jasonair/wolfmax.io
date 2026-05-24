import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify a Report | Workings",
  description: "Verify the authenticity of a Workings report. Confirm that a creative process report is genuine, untampered, and reflects real human work.",
  alternates: {
    canonical: "/verify",
  },
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
