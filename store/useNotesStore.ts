import { create } from 'zustand';
import { Note } from '@/models/Note';
import {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getArchivedNotes,
  searchNotes,
  filterByTag,
  syncAllNotes,
  toggleSync,
} from '@/services/notesService';

interface NotesState {
  notes: Note[];
  archivedNotes: Note[];
  selectedNote: Note | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedTag: string | null;

  // Actions
  loadNotes: (userId: string) => Promise<void>;
  loadArchivedNotes: (userId: string) => Promise<void>;
  addNote: (title: string, content: string, userId: string) => Promise<Note>;
  editNote: (noteId: string, updates: Partial<Note>) => Promise<void>;
  removeNote: (noteId: string) => Promise<void>;
  selectNote: (note: Note | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  performSearch: (query: string, userId: string) => Promise<void>;
  performFilterByTag: (tag: string, userId: string) => Promise<void>;
  syncAll: (userId: string) => Promise<void>;
  toggleNoteSync: (noteId: string, enabled: boolean) => Promise<void>;
  pinNote: (noteId: string) => Promise<void>;
  archiveNote: (noteId: string) => Promise<void>;
  favoriteNote: (noteId: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  archivedNotes: [],
  selectedNote: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedTag: null,

  loadNotes: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const notes = await getAllNotes(userId);
      set({ notes, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  loadArchivedNotes: async (userId: string) => {
    try {
      const archivedNotes = await getArchivedNotes(userId);
      set({ archivedNotes });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  addNote: async (title: string, content: string, userId: string) => {
    try {
      const note = await createNote(title, content, userId);
      set(state => ({ notes: [note, ...state.notes] }));
      return note;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  editNote: async (noteId: string, updates: Partial<Note>) => {
    try {
      await updateNote(noteId, updates);
      set(state => ({
        notes: state.notes.map(n => n.id === noteId ? { ...n, ...updates } : n),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  removeNote: async (noteId: string) => {
    try {
      await deleteNote(noteId);
      set(state => ({
        notes: state.notes.filter(n => n.id !== noteId),
        archivedNotes: state.archivedNotes.filter(n => n.id !== noteId),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  selectNote: (note: Note | null) => {
    set({ selectedNote: note });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedTag: (tag: string | null) => {
    set({ selectedTag: tag });
  },

  performSearch: async (query: string, userId: string) => {
    try {
      set({ isLoading: true });
      const notes = await searchNotes(query, userId);
      set({ notes, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  performFilterByTag: async (tag: string, userId: string) => {
    try {
      set({ isLoading: true });
      const notes = await filterByTag(tag, userId);
      set({ notes, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  syncAll: async (userId: string) => {
    try {
      await syncAllNotes(userId);
      await get().loadNotes(userId);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  toggleNoteSync: async (noteId: string, enabled: boolean) => {
    try {
      await toggleSync(noteId, enabled);
      set(state => ({
        notes: state.notes.map(n => 
          n.id === noteId ? { ...n, isSyncEnabled: enabled } : n
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  pinNote: async (noteId: string) => {
    const note = get().notes.find(n => n.id === noteId);
    if (note) {
      await get().editNote(noteId, { isPinned: !note.isPinned });
    }
  },

  archiveNote: async (noteId: string) => {
    const note = get().notes.find(n => n.id === noteId);
    if (note) {
      await get().editNote(noteId, { isArchived: !note.isArchived });
      await get().loadNotes(note.ownerId);
    }
  },

  favoriteNote: async (noteId: string) => {
    const note = get().notes.find(n => n.id === noteId);
    if (note) {
      await get().editNote(noteId, { isFavorite: !note.isFavorite });
    }
  },
}));
