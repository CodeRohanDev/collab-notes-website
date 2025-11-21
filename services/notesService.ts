import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, getDoc, deleteDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { localDb } from '@/lib/db';
import { Note } from '@/models/Note';

export const createNote = async (
  title: string,
  content: string,
  userId: string
): Promise<Note> => {
  const note: Note = {
    id: uuidv4(),
    title,
    content,
    ownerId: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    collaborators: [],
    isPrivate: true,
    tags: [],
    isPinned: false,
    isArchived: false,
    isFavorite: false,
    color: null,
    syncStatus: 'pending',
    isSyncEnabled: false,
    noteType: 'note',
  };

  // Save locally first
  await localDb.notes.add(note);

  return note;
};

export const updateNote = async (
  noteId: string,
  updates: Partial<Note>
): Promise<void> => {
  const note = await localDb.notes.get(noteId);
  if (!note) throw new Error('Note not found');

  const updatedNote = {
    ...note,
    ...updates,
    updatedAt: new Date(),
    syncStatus: 'pending' as const,
  };

  // Update locally
  await localDb.notes.put(updatedNote);

  // Sync to cloud if enabled
  if (updatedNote.isSyncEnabled) {
    await syncNoteToCloud(updatedNote);
  }
};

export const deleteNote = async (noteId: string): Promise<void> => {
  const note = await localDb.notes.get(noteId);
  if (!note) return;

  // Delete locally
  await localDb.notes.delete(noteId);

  // Delete from cloud if synced
  if (note.isSyncEnabled) {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
    } catch (error) {
      console.error('Error deleting from cloud:', error);
    }
  }
};

export const syncNoteToCloud = async (note: Note): Promise<void> => {
  try {
    // Prepare data for Firestore (remove undefined values)
    const noteData: any = {
      ...note,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };

    // Only add reminder if it exists
    if (note.reminder) {
      noteData.reminder = note.reminder.toISOString();
    } else {
      // Remove reminder field if it's undefined
      delete noteData.reminder;
    }

    // Remove any other undefined fields
    Object.keys(noteData).forEach(key => {
      if (noteData[key] === undefined) {
        delete noteData[key];
      }
    });

    await setDoc(doc(db, 'notes', note.id), noteData);

    // Update sync status
    await localDb.notes.update(note.id, { syncStatus: 'completed' });
  } catch (error) {
    console.error('Sync error:', error);
    await localDb.notes.update(note.id, { syncStatus: 'failed' });
    throw error;
  }
};

export const getNoteById = async (noteId: string): Promise<Note | undefined> => {
  return await localDb.notes.get(noteId);
};

export const getAllNotes = async (userId: string): Promise<Note[]> => {
  return await localDb.notes
    .where('ownerId')
    .equals(userId)
    .and(note => !note.isArchived)
    .toArray();
};

export const getArchivedNotes = async (userId: string): Promise<Note[]> => {
  return await localDb.notes
    .where('ownerId')
    .equals(userId)
    .and(note => note.isArchived)
    .toArray();
};

export const searchNotes = async (query: string, userId: string): Promise<Note[]> => {
  const allNotes = await localDb.notes
    .where('ownerId')
    .equals(userId)
    .toArray();

  const lowerQuery = query.toLowerCase();

  return allNotes.filter(note => {
    if (note.isArchived) return false;

    return (
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
};

export const filterByTag = async (tag: string, userId: string): Promise<Note[]> => {
  return localDb.notes
    .where('ownerId')
    .equals(userId)
    .and(note => note.tags.includes(tag) && !note.isArchived)
    .toArray();
};

export const migrateGuestNotes = async (guestId: string, newUserId: string): Promise<void> => {
  try {
    // Get all guest notes from IndexedDB
    const guestNotes = await localDb.notes.where('ownerId').equals(guestId).toArray();

    // Update owner ID and enable sync
    for (const note of guestNotes) {
      note.ownerId = newUserId;
      note.isSyncEnabled = true;
      note.syncStatus = 'pending';

      // Save locally
      await localDb.notes.put(note);

      // Sync to Firestore
      await syncNoteToCloud(note);
    }
  } catch (error) {
    console.error('Migration error:', error);
  }
};

export const syncAllNotes = async (userId: string): Promise<void> => {
  try {
    // Get all cloud notes
    const notesQuery = query(
      collection(db, 'notes'),
      where('ownerId', '==', userId)
    );
    const snapshot = await getDocs(notesQuery);

    // Sync to local
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      
      // Build note object, handling optional fields
      const note: Note = {
        id: docSnap.id,
        title: data.title || '',
        content: data.content || '',
        ownerId: data.ownerId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
        collaborators: data.collaborators || [],
        isPrivate: data.isPrivate ?? true,
        tags: data.tags || [],
        isPinned: data.isPinned ?? false,
        isArchived: data.isArchived ?? false,
        isFavorite: data.isFavorite ?? false,
        color: data.color || null,
        syncStatus: 'completed',
        isSyncEnabled: data.isSyncEnabled ?? true,
        noteType: data.noteType || 'note',
        workspaceId: data.workspaceId,
        attachments: data.attachments,
        reminder: data.reminder ? new Date(data.reminder) : undefined,
        checklistItems: data.checklistItems,
      };

      await localDb.notes.put(note);
    }
  } catch (error) {
    console.error('Sync all notes error:', error);
  }
};

export const toggleSync = async (noteId: string, enabled: boolean): Promise<void> => {
  const note = await localDb.notes.get(noteId);
  if (!note) return;

  note.isSyncEnabled = enabled;
  note.syncStatus = enabled ? 'pending' : 'completed';

  await localDb.notes.put(note);

  if (enabled) {
    await syncNoteToCloud(note);
  }
};
