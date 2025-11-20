import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - CollabNotes",
  description: "Frequently asked questions about CollabNotes. Find answers about features, privacy, sync, and more.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
