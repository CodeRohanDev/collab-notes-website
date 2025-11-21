'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotesStore } from '@/store/useNotesStore';
import { NoteCard } from '@/components/notes/NoteCard';
import { ArrowLeft, Archive, Inbox } from 'lucide-react';

export default function ArchivedNotesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { archivedNotes, loadArchivedNotes } = useNotesStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadArchivedNotes(user.id);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/notes')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                <Archive className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Archived Notes</h1>
                <p className="text-xs text-gray-500">{archivedNotes.length} notes archived</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {archivedNotes.length === 0 ? (
          <div className="text-center py-16 animate-slideUp">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
              <Inbox className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No archived notes</h3>
            <p className="text-gray-500 mb-6">Notes you archive will appear here</p>
            <button
              onClick={() => router.push('/notes')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Notes</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {archivedNotes.map((note, index) => (
              <div
                key={note.id}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <NoteCard
                  note={note}
                  onClick={() => router.push(`/notes/${note.id}`)}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
