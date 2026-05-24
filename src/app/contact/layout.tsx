import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Workings",
  description: "Get in touch with the Workings team. Have a question about proving your process or protecting your work? We'd love to hear from you.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Workings",
    description: "Get in touch with the Workings team. Have a question about proving your process or protecting your work? We'd love to hear from you.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
