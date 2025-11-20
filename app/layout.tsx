import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://collabnotes.com'), // Update with your actual domain
  title: {
    default: "CollabNotes - Modern Note-Taking App with Offline Sync",
    template: "%s | CollabNotes"
  },
  description: "A modern, feature-rich note-taking application with offline-first architecture, cloud sync, and real-time collaboration. Download CollabNotes for Android - Free note-taking app with rich text editor, tags, colors, and team collaboration.",
  keywords: [
    "notes app",
    "note-taking app",
    "offline notes",
    "cloud sync notes",
    "collaboration app",
    "team notes",
    "android notes app",
    "free notes app",
    "rich text editor",
    "note organization",
    "flutter app",
    "mobile notes",
    "sync notes",
    "shared notes",
    "note collaboration",
    "guest mode notes",
    "local notes",
    "encrypted notes",
    "privacy-focused notes"
  ],
  authors: [{ name: "CollabNotes Team" }],
  creator: "CollabNotes",
  publisher: "CollabNotes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://collabnotes.com",
    title: "CollabNotes - Modern Note-Taking App with Offline Sync",
    description: "Free note-taking app with offline-first architecture, cloud sync, and real-time collaboration. Rich text editor, tags, colors, and more.",
    siteName: "CollabNotes",
    images: [
      {
        url: "/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "CollabNotes - Modern Note-Taking App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CollabNotes - Modern Note-Taking App",
    description: "Free note-taking app with offline sync, collaboration, and rich text editing.",
    images: ["/og-image.png"], // You'll need to create this
    creator: "@collabnotes", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://collabnotes.com",
  },
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
