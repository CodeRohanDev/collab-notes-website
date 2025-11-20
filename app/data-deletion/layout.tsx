import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion - CollabNotes",
  description: "Learn how to delete your CollabNotes account and all associated data. Your data, your control.",
};

export default function DataDeletionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
