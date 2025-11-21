import { doc, setDoc, onSnapshot, collection, deleteDoc, Unsubscribe, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Presence } from '@/models/Presence';
import { User } from '@/models/User';
import { Note } from '@/models/Note';
import { PRESENCE_HEARTBEAT_INTERVAL, PRESENCE_TIMEOUT, PRESENCE_COLORS } from '@/lib/constants';

export class PresenceService {
  private heartbeatInterval?: NodeJS.Timeout;
  private unsubscribe?: Unsubscribe;
  private noteId?: string;
  private userId?: string;

  async startPresence(noteId: string, user: User): Promise<void> {
    this.noteId = noteId;
    this.userId = user.id;

    const presenceRef = doc(db, 'notes', noteId, 'presence', user.id);
    const color = this.getUserColor(user.id);

    // Initial presence
    await this.updatePresence(presenceRef, user, color);

    // Heartbeat every 5 seconds
    this.heartbeatInterval = setInterval(() => {
      this.updatePresence(presenceRef, user, color);
    }, PRESENCE_HEARTBEAT_INTERVAL);
  }

  private async updatePresence(presenceRef: any, user: User, color: string): Promise<void> {
    try {
      await setDoc(
        presenceRef,
        {
          userId: user.id,
          userName: user.displayName,
          userEmail: user.email,
          userPhotoUrl: user.photoUrl || null,
          lastSeen: new Date().toISOString(),
          isActive: true,
          color,
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating presence:', error);
    }
  }

  watchPresence(noteId: string, onUpdate: (users: Presence[]) => void): void {
    this.unsubscribe = onSnapshot(
      collection(db, 'notes', noteId, 'presence'),
      (snapshot) => {
        const now = new Date().getTime();
        const activeUsers = snapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              ...data,
              lastSeen: new Date(data.lastSeen),
            } as Presence;
          })
          .filter(user => {
            const lastSeen = user.lastSeen.getTime();
            return user.isActive && (now - lastSeen) < PRESENCE_TIMEOUT;
          });

        onUpdate(activeUsers);
      },
      (error) => {
        console.error('Error watching presence:', error);
      }
    );
  }

  async stopPresence(): Promise<void> {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.noteId && this.userId) {
      try {
        const presenceRef = doc(db, 'notes', this.noteId, 'presence', this.userId);
        await setDoc(presenceRef, { isActive: false }, { merge: true });
      } catch (error) {
        console.error('Error stopping presence:', error);
      }
    }
  }

  private getUserColor(userId: string): string {
    // Generate consistent color based on user ID
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return PRESENCE_COLORS[Math.abs(hash) % PRESENCE_COLORS.length];
  }
}

export const watchNoteChanges = (
  noteId: string,
  onUpdate: (note: Note) => void
): Unsubscribe => {
  return onSnapshot(
    doc(db, 'notes', noteId),
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        
        // Build note object properly
        const note: Note = {
          id: snapshot.id,
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
        
        onUpdate(note);
      }
    },
    (error) => {
      console.error('Error watching note changes:', error);
    }
  );
};

export const addCollaborator = async (noteId: string, email: string): Promise<void> => {
  const noteRef = doc(db, 'notes', noteId);
  const noteDoc = await getDoc(noteRef);
  
  if (noteDoc.exists()) {
    const note = noteDoc.data() as Note;
    if (!note.collaborators.includes(email)) {
      note.collaborators.push(email);
      await updateDoc(noteRef, { collaborators: note.collaborators });
    }
  }
};

export const removeCollaborator = async (noteId: string, email: string): Promise<void> => {
  const noteRef = doc(db, 'notes', noteId);
  const noteDoc = await getDoc(noteRef);
  
  if (noteDoc.exists()) {
    const note = noteDoc.data() as Note;
    const collaborators = note.collaborators.filter(c => c !== email);
    await updateDoc(noteRef, { collaborators });
  }
};
