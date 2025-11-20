import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies Policy - CollabNotes",
  description: "Learn about how CollabNotes uses cookies and similar technologies on our website and mobile app.",
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
