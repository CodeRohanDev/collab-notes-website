import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - CollabNotes",
  description: "Read the terms and conditions for using CollabNotes. Understand your rights and responsibilities when using our note-taking app.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
