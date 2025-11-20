import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center - CollabNotes",
  description: "Get help with CollabNotes. Find guides, tutorials, and support for all features.",
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
