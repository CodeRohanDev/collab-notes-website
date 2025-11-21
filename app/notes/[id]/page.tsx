'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotesStore } from '@/store/useNotesStore';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { PresenceAvatars } from '@/components/collaboration/PresenceAvatars';
import { ShareDialog } from '@/components/collaboration/ShareDialog';
import { PresenceService, watchNoteChanges } from '@/services/collaborationService';
import { Presence } from '@/models/Presence';
import { 
  ArrowLeft, 
  Share2, 
  Archive, 
  Star, 
  Pin, 
  MoreVertical, 
  Cloud, 
  CloudOff,
  Trash2,
  Palette,
  Tag,
  Check
} from 'lucide-react';
import { getNoteById } from '@/services/notesService';
import { Note } from '@/models/Note';
import { NOTE_COLORS } from '@/lib/constants';

export default function NoteEditorPage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;
  
  const { user } = useAuthStore();
  const { editNote, removeNote, toggleNoteSync } = useNotesStore();
  
  const [note, setNote] = useState<Note | null>(null);
  const [activeUsers, setActiveUsers] = useState<Presence[]>([]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [presenceService] = useState(() => new PresenceService());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user || !noteId) return;

    loadNote();

    let unsubscribeNote: (() => void) | undefined;

    const initCollaboration = async () => {
      const currentNote = await getNoteById(noteId);
      if (currentNote?.isSyncEnabled) {
        await presenceService.startPresence(noteId, user);
        presenceService.watchPresence(noteId, setActiveUsers);
        
        unsubscribeNote = watchNoteChanges(noteId, (updatedNote) => {
          setNote(updatedNote);
        });
      }
    };

    initCollaboration();

    return () => {
      presenceService.stopPresence();
      if (unsubscribeNote) unsubscribeNote();
    };
  }, [user, noteId]);

  const loadNote = async () => {
    const loadedNote = await getNoteById(noteId);
    if (loadedNote) {
      setNote(loadedNote);
    } else {
      router.push('/notes');
    }
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!note) return;
    const newTitle = e.target.value;
    setNote({ ...note, title: newTitle });
    setIsSaving(true);
    await editNote(noteId, { title: newTitle });
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleContentChange = async (content: string) => {
    if (!note) return;
    setNote({ ...note, content });
    setIsSaving(true);
    await editNote(noteId, { content });
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleToggleSync = async () => {
    if (!note) return;
    const newSyncState = !note.isSyncEnabled;
    await toggleNoteSync(noteId, newSyncState);
    setNote({ ...note, isSyncEnabled: newSyncState });
    
    if (newSyncState && user) {
      await presenceService.startPresence(noteId, user);
      presenceService.watchPresence(noteId, setActiveUsers);
    } else {
      await presenceService.stopPresence();
      setActiveUsers([]);
    }
  };

  const handlePin = async () => {
    if (!note) return;
    await editNote(noteId, { isPinned: !note.isPinned });
    setNote({ ...note, isPinned: !note.isPinned });
  };

  const handleFavorite = async () => {
    if (!note) return;
    await editNote(noteId, { isFavorite: !note.isFavorite });
    setNote({ ...note, isFavorite: !note.isFavorite });
  };

  const handleArchive = async () => {
    if (!note) return;
    await editNote(noteId, { isArchived: !note.isArchived });
    router.push('/notes');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    await removeNote(noteId);
    router.push('/notes');
  };

  const handleColorChange = async (color: string | null) => {
    if (!note) return;
    await editNote(noteId, { color });
    setNote({ ...note, color });
    setShowColorPicker(false);
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/notes')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              {/* Saving Indicator */}
              <div className="hidden sm:flex items-center space-x-2">
                {isSaving ? (
                  <span className="text-sm text-gray-500 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span>Saving...</span>
                  </span>
                ) : (
                  <span className="text-sm text-green-600 flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Saved</span>
                  </span>
                )}
              </div>

              {/* Active Users */}
              {note.isSyncEnabled && activeUsers.length > 0 && (
                <div className="hidden md:block">
                  <PresenceAvatars activeUsers={activeUsers} />
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Quick Actions */}
              <div className="hidden sm:flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={handlePin}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    note.isPinned 
                      ? 'bg-white text-yellow-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-white hover:text-yellow-600'
                  }`}
                  title={note.isPinned ? 'Unpin' : 'Pin'}
                >
                  <Pin className="w-4 h-4" />
                </button>

                <button
                  onClick={handleFavorite}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    note.isFavorite 
                      ? 'bg-white text-pink-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-white hover:text-pink-600'
                  }`}
                  title={note.isFavorite ? 'Unfavorite' : 'Favorite'}
                >
                  <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={handleToggleSync}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    note.isSyncEnabled 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-white hover:text-blue-600'
                  }`}
                  title={note.isSyncEnabled ? 'Sync Enabled' : 'Enable Sync'}
                >
                  {note.isSyncEnabled ? <Cloud className="w-4 h-4" /> : <CloudOff className="w-4 h-4" />}
                </button>

                {note.isSyncEnabled && (
                  <button
                    onClick={() => setShowShareDialog(true)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-white hover:text-indigo-600 transition-all duration-200"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* More Options */}
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {showOptions && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowOptions(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 animate-slideDown">
                      {/* Mobile Quick Actions */}
                      <div className="sm:hidden border-b border-gray-100 pb-2 mb-2">
                        <button
                          onClick={() => {
                            handlePin();
                            setShowOptions(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200"
                        >
                          <Pin className="w-4 h-4 text-yellow-600" />
                          <span>{note.isPinned ? 'Unpin Note' : 'Pin Note'}</span>
                        </button>
                        <button
                          onClick={() => {
                            handleFavorite();
                            setShowOptions(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200"
                        >
                          <Star className="w-4 h-4 text-pink-600" />
                          <span>{note.isFavorite ? 'Unfavorite' : 'Add to Favorites'}</span>
                        </button>
                        <button
                          onClick={() => {
                            handleToggleSync();
                            setShowOptions(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200"
                        >
                          {note.isSyncEnabled ? <Cloud className="w-4 h-4 text-blue-600" /> : <CloudOff className="w-4 h-4 text-gray-600" />}
                          <span>{note.isSyncEnabled ? 'Disable Sync' : 'Enable Sync'}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setShowColorPicker(!showColorPicker);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200"
                      >
                        <Palette className="w-4 h-4 text-purple-600" />
                        <span>Change Color</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          handleArchive();
                          setShowOptions(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200"
                      >
                        <Archive className="w-4 h-4 text-gray-600" />
                        <span>{note.isArchived ? 'Unarchive' : 'Archive'}</span>
                      </button>
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button
                        onClick={() => {
                          handleDelete();
                          setShowOptions(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-3 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Note</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Color Picker */}
          {showColorPicker && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 animate-slideDown">
              <p className="text-sm font-medium text-gray-700 mb-3">Choose a color</p>
              <div className="grid grid-cols-7 gap-2">
                {NOTE_COLORS.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => handleColorChange(colorOption.value)}
                    className={`w-10 h-10 rounded-lg transition-all duration-200 hover:scale-110 ${
                      note.color === colorOption.value 
                        ? 'ring-2 ring-offset-2 ring-indigo-600' 
                        : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                    }`}
                    style={{ backgroundColor: colorOption.hex }}
                    title={colorOption.name}
                  >
                    {note.color === colorOption.value && (
                      <Check className="w-5 h-5 text-white mx-auto drop-shadow-lg" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <div 
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-l-4 border border-gray-200 p-8 min-h-[calc(100vh-12rem)]"
          style={{ borderLeftColor: note.color || '#6366F1' }}
        >
          <input
            type="text"
            value={note.title}
            onChange={handleTitleChange}
            placeholder="Untitled note..."
            className="w-full text-4xl font-bold border-none outline-none mb-6 placeholder-gray-300 transition-all duration-200 focus:placeholder-gray-400 bg-transparent text-gray-900"
          />

          <NoteEditor
            initialContent={note.content}
            onChange={handleContentChange}
          />
        </div>
      </main>

      {/* Share Dialog */}
      {showShareDialog && (
        <ShareDialog
          noteId={noteId}
          collaborators={note.collaborators}
          onClose={() => setShowShareDialog(false)}
        />
      )}
    </div>
  );
}
