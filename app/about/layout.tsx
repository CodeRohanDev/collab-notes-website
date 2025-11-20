import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - CollabNotes",
  description: "Learn about CollabNotes, our mission, and why we built the best offline-first note-taking app with cloud sync.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
