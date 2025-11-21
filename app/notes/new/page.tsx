'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotesStore } from '@/store/useNotesStore';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewNotePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addNote } = useNotesStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSave = async () => {
    if (!user || isSaving) return;
    
    setIsSaving(true);
    try {
      const note = await addNote(title || 'Untitled Note', content, user.id);
      router.push(`/notes/${note.id}`);
    } catch (error) {
      console.error('Error creating note:', error);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/notes');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-10 shadow-sm transition-all duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Cancel</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="group relative flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              <Save className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{isSaving ? 'Saving...' : 'Save Note'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 p-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full text-3xl font-bold border-none outline-none mb-6 placeholder-gray-400 transition-all duration-200 focus:placeholder-gray-300 bg-transparent text-gray-900"
            autoFocus
          />

          <NoteEditor
            initialContent={content}
            onChange={setContent}
          />
        </div>
      </main>
    </div>
  );
}
