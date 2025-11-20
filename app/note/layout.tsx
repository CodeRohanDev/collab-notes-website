import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Open in CollabNotes',
  description: 'You\'ve been invited to collaborate on a note. Open it in the CollabNotes app.',
  openGraph: {
    title: 'Open in CollabNotes',
    description: 'You\'ve been invited to collaborate on a note.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open in CollabNotes',
    description: 'You\'ve been invited to collaborate on a note.',
  },
};

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
