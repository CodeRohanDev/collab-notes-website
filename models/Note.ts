export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  order: number;
}

export interface Note {
  id: string;
  title: string;
  content: string; // Quill Delta JSON
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;

  // Collaboration
  collaborators: string[];
  isPrivate: boolean;

  // Organization
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  isFavorite: boolean;
  color: string | null;

  // Sync
  syncStatus: 'pending' | 'completed' | 'failed';
  isSyncEnabled: boolean;

  // Future features
  workspaceId?: string;
  attachments?: string[];
  reminder?: Date;
  noteType: 'note' | 'todo' | 'checklist';
  checklistItems?: ChecklistItem[];
}

export type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'syncStatus'>;
