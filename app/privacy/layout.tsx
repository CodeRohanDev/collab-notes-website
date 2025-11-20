import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - CollabNotes",
  description: "Learn how CollabNotes protects your privacy and handles your data. We are committed to keeping your notes secure and private.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
