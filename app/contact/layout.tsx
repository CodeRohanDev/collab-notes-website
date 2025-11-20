import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - CollabNotes",
  description: "Get in touch with the CollabNotes team. We're here to help with any questions or support you need.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
