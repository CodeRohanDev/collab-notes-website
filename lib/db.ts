import Dexie, { Table } from 'dexie';
import { Note } from '@/models/Note';

class NotesDatabase extends Dexie {
  notes!: Table<Note, string>;

  constructor() {
    super('CollabNotesDB');

    this.version(1).stores({
      notes: 'id, ownerId, createdAt, updatedAt, isPinned, isArchived, isFavorite, *tags, [ownerId+isPinned], [ownerId+isArchived]',
    });
  }
}

export const localDb = new NotesDatabase();
