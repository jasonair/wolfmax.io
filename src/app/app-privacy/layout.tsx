import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Privacy Policy - Workings",
  description:
    "Privacy policy for the Workings desktop application - local-first, zero-knowledge architecture. Your information stays on your device, under your control.",
  alternates: { canonical: "/app-privacy" },
};

export default function AppPrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
