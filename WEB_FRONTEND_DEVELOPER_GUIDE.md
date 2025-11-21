# CollabNotes Web Version - Frontend Developer Guide

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Core Features](#core-features)
4. [Architecture](#architecture)
5. [Data Models](#data-models)
6. [Authentication](#authentication)
7. [Note Management](#note-management)
8. [Real-Time Collaboration](#real-time-collaboration)
9. [UI/UX Requirements](#uiux-requirements)
10. [API Integration](#api-integration)
11. [Security](#security)
12. [Performance](#performance)
13. [Testing](#testing)
14. [Deployment](#deployment)

---

## 🎯 Project Overview

**CollabNotes** is a modern, feature-rich collaborative note-taking application. This guide will help you build the web version with the same features as the Flutter mobile app.

### Key Characteristics
- **Offline-First**: Works without internet, syncs when online
- **Real-Time Collaboration**: Google Docs-like editing experience
- **Rich Text Editor**: Full formatting capabilities
- **Guest Mode**: No sign-up required to start
- **Cloud Sync**: Optional per-note synchronization

### Target Platforms
- Modern web browsers (Chrome, Firefox, Safari, Edge)
- Desktop and tablet responsive design
- Progressive Web App (PWA) capabilities

---

## 🛠️ Technology Stack

### Recommended Frontend Stack

#### Core Framework
- **React 18+** or **Next.js 14+** (recommended for SSR/SSG)
- **TypeScript** for type safety
- **Vite** for fast development (if using React)

#### State Management
- **Redux Toolkit** or **Zustand** for global state
- **React Query** for server state and caching
- **Context API** for theme and auth

#### UI Framework
- **Material-UI (MUI)** or **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** for animations
- **React Icons** or **Lucide Icons**

#### Rich Text Editor
- **Quill.js** (same as mobile app) or **Slate.js** or **TipTap**
- Must support JSON format for compatibility

#### Backend & Storage
- **Firebase SDK** (v10+)
  - Firebase Auth
  - Cloud Firestore
  - Cloud Storage
- **IndexedDB** for local storage (via Dexie.js or localForage)

#### Additional Libraries
- **date-fns** or **day.js** for date handling
- **uuid** for generating unique IDs
- **react-router-dom** for routing
- **react-hook-form** for forms
- **zod** for validation

---

## ✨ Core Features

### 1. Authentication System

#### Guest Mode
```typescript
// Features:
- Instant access without sign-up
- Generate unique guest ID (UUID)
- Store in localStorage
- All notes saved locally
- Seamless migration to authenticated account
```

#### Google Sign-In
```typescript
// Features:
- One-click OAuth authentication
- Automatic guest data migration
- Profile sync (name, email, photo)
- Session persistence
```

### 2. Note Management

#### CRUD Operations
- Create, Read, Update, Delete notes
- Auto-save on changes (debounced)
- Offline-first: save locally, sync later
- Rich text formatting with Quill
- Word/character count

#### Organization Features
- **Pin Notes**: Keep important notes at top
- **Archive**: Hide without deleting
- **Favorites**: Star important notes
- **Color Coding**: 13 color options
- **Tags**: Multiple tags per note
- **Search**: Full-text search (title, content, tags)

#### Sync Control
- Per-note sync toggle
- Visual indicators (cloud/local badges)
- Sync status: pending/completed/failed
- Manual sync trigger

### 3. Real-Time Collaboration

#### Live Editing
- Multiple users edit simultaneously
- Changes appear in 1-2 seconds
- Debounced updates (500ms)
- Conflict resolution (last-write-wins)

#### Presence System
- Show active users (avatars)
- Online status indicators
- Auto-cleanup after 30s inactivity
- Heartbeat every 5 seconds

#### Cursor Tracking
- Display remote cursors
- Show user selections
- Color-coded per user
- User name labels

#### Comments (Future)
- Threaded discussions
- Real-time updates
- User attribution

### 4. Rich Text Editor

#### Formatting Options
- **Text Styles**: Bold, Italic, Underline, Strikethrough
- **Lists**: Bullet, Numbered, Checklist
- **Code**: Code blocks, Inline code
- **Links**: Hyperlinks
- **Undo/Redo**: Full history
- **Click-to-Type**: Tap anywhere to edit

---

## 🏗️ Architecture

### Application Structure

```
web-app/
├── public/
│   ├── index.html
│   ├── manifest.json          # PWA manifest
│   └── service-worker.js      # Offline support
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── GuestModeButton.tsx
│   │   ├── notes/
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NoteEditor.tsx
│   │   │   ├── NoteList.tsx
│   │   │   └── NoteOptionsMenu.tsx
│   │   ├── collaboration/
│   │   │   ├── PresenceAvatars.tsx
│   │   │   ├── RemoteCursors.tsx
│   │   │   └── ShareDialog.tsx
│   │   └── common/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── SearchBar.tsx
│   ├── features/              # Feature-based modules
│   │   ├── auth/
│   │   │   ├── authSlice.ts
│   │   │   └── authService.ts
│   │   ├── notes/
│   │   │   ├── notesSlice.ts
│   │   │   └── notesService.ts
│   │   └── collaboration/
│   │       ├── collaborationSlice.ts
│   │       └── collaborationService.ts
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useNotes.ts
│   │   ├── useCollaboration.ts
│   │   └── useLocalStorage.ts
│   ├── lib/                   # Utilities & config
│   │   ├── firebase.ts
│   │   ├── db.ts             # IndexedDB setup
│   │   └── constants.ts
│   ├── models/                # TypeScript types
│   │   ├── Note.ts
│   │   ├── User.ts
│   │   └── Presence.ts
│   ├── pages/                 # Route pages
│   │   ├── HomePage.tsx
│   │   ├── EditorPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── store/                 # Redux store
│   │   └── store.ts
│   ├── App.tsx
│   └── main.tsx
├── .env.local                 # Environment variables
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Data Flow Architecture

```
User Action
    ↓
React Component
    ↓
Dispatch Action (Redux/Zustand)
    ↓
Service Layer (API calls)
    ↓
Local Storage (IndexedDB) ← Save First
    ↓
Cloud Storage (Firestore) ← Sync Later
    ↓
Update State
    ↓
Re-render UI
```

---

## 📊 Data Models

### TypeScript Interfaces

#### Note Model
```typescript
// src/models/Note.ts
export interface Note {
  id: string;                    // UUID
  title: string;
  content: string;               // Quill Delta JSON
  ownerId: string;               // User ID or Guest ID
  createdAt: Date;
  updatedAt: Date;
  
  // Collaboration
  collaborators: string[];       // Email addresses
  isPrivate: boolean;
  
  // Organization
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  isFavorite: boolean;
  color: string | null;          // Hex color code
  
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

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  order: number;
}
```

#### User Model
```typescript
// src/models/User.ts
export interface User {
  id: string;                    // Firebase UID or Guest ID
  email: string;
  displayName: string;
  photoUrl?: string;
  createdAt: Date;
  isGuest: boolean;
}
```

#### Presence Model
```typescript
// src/models/Presence.ts
export interface Presence {
  userId: string;
  userName: string;
  userEmail: string;
  userPhotoUrl?: string;
  lastSeen: Date;
  isActive: boolean;
  
  // Cursor tracking
  cursorPosition?: number;
  selectionStart?: number;
  selectionEnd?: number;
  color: string;                 // Unique color for this user
}
```

---

## 🔐 Authentication

### Implementation Guide

#### 1. Firebase Setup
```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
```

#### 2. Guest Mode Implementation
```typescript
// src/features/auth/authService.ts
import { v4 as uuidv4 } from 'uuid';

export const createGuestUser = (): User => {
  const guestId = localStorage.getItem('guestId') || uuidv4();
  localStorage.setItem('guestId', guestId);
  
  return {
    id: guestId,
    email: `guest_${guestId}@local`,
    displayName: 'Guest User',
    createdAt: new Date(),
    isGuest: true,
  };
};

export const isGuestMode = (): boolean => {
  return !!localStorage.getItem('guestId') && !auth.currentUser;
};
```

#### 3. Google Sign-In
```typescript
// src/features/auth/authService.ts
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      createdAt: new Date(),
    });
    
    // Migrate guest notes if any
    await migrateGuestNotes(user.uid);
    
    return {
      id: user.uid,
      email: user.email!,
      displayName: user.displayName!,
      photoUrl: user.photoURL || undefined,
      createdAt: new Date(),
      isGuest: false,
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};
```

#### 4. Guest Data Migration
```typescript
const migrateGuestNotes = async (newUserId: string) => {
  const guestId = localStorage.getItem('guestId');
  if (!guestId) return;
  
  // Get all guest notes from IndexedDB
  const guestNotes = await db.notes.where('ownerId').equals(guestId).toArray();
  
  // Update owner ID and enable sync
  for (const note of guestNotes) {
    note.ownerId = newUserId;
    note.isSyncEnabled = true;
    note.syncStatus = 'pending';
    
    // Save locally
    await db.notes.put(note);
    
    // Sync to Firestore
    await syncNoteToCloud(note);
  }
  
  // Clear guest ID
  localStorage.removeItem('guestId');
};
```

---

## 📝 Note Management

### Local Storage with IndexedDB

#### Setup Dexie.js
```typescript
// src/lib/db.ts
import Dexie, { Table } from 'dexie';
import { Note } from '../models/Note';

class NotesDatabase extends Dexie {
  notes!: Table<Note, string>;
  
  constructor() {
    super('CollabNotesDB');
    
    this.version(1).stores({
      notes: 'id, ownerId, createdAt, updatedAt, isPinned, isArchived, isFavorite, *tags',
    });
  }
}

export const db = new NotesDatabase();
```

### CRUD Operations

#### Create Note
```typescript
// src/features/notes/notesService.ts
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';

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
  await db.notes.add(note);
  
  // Sync to cloud if enabled
  if (note.isSyncEnabled) {
    await syncNoteToCloud(note);
  }
  
  return note;
};
```

#### Update Note
```typescript
export const updateNote = async (
  noteId: string,
  updates: Partial<Note>
): Promise<void> => {
  const note = await db.notes.get(noteId);
  if (!note) throw new Error('Note not found');
  
  const updatedNote = {
    ...note,
    ...updates,
    updatedAt: new Date(),
    syncStatus: 'pending' as const,
  };
  
  // Update locally
  await db.notes.put(updatedNote);
  
  // Sync to cloud if enabled
  if (updatedNote.isSyncEnabled) {
    await syncNoteToCloud(updatedNote);
  }
};
```

#### Delete Note
```typescript
export const deleteNote = async (noteId: string): Promise<void> => {
  const note = await db.notes.get(noteId);
  if (!note) return;
  
  // Delete locally
  await db.notes.delete(noteId);
  
  // Delete from cloud if synced
  if (note.isSyncEnabled) {
    await deleteDoc(doc(db, 'notes', noteId));
  }
};
```

#### Sync to Cloud
```typescript
const syncNoteToCloud = async (note: Note): Promise<void> => {
  try {
    await setDoc(doc(db, 'notes', note.id), {
      ...note,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    });
    
    // Update sync status
    await db.notes.update(note.id, { syncStatus: 'completed' });
  } catch (error) {
    console.error('Sync error:', error);
    await db.notes.update(note.id, { syncStatus: 'failed' });
  }
};
```

### Search & Filter

#### Search Implementation
```typescript
export const searchNotes = async (
  query: string,
  userId: string
): Promise<Note[]> => {
  const allNotes = await db.notes
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
```

#### Filter by Tags
```typescript
export const filterByTag = async (
  tag: string,
  userId: string
): Promise<Note[]> => {
  return db.notes
    .where('ownerId')
    .equals(userId)
    .and(note => note.tags.includes(tag) && !note.isArchived)
    .toArray();
};
```

---

## 🤝 Real-Time Collaboration

### Firestore Real-Time Listeners

#### Watch Note Changes
```typescript
// src/features/collaboration/collaborationService.ts
import { doc, onSnapshot } from 'firebase/firestore';

export const watchNoteChanges = (
  noteId: string,
  onUpdate: (note: Note) => void
): (() => void) => {
  const unsubscribe = onSnapshot(
    doc(db, 'notes', noteId),
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate({
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        } as Note);
      }
    }
  );
  
  return unsubscribe;
};
```

#### Presence System
```typescript
import { collection, doc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

export class PresenceService {
  private heartbeatInterval?: NodeJS.Timeout;
  private unsubscribe?: () => void;
  
  async startPresence(noteId: string, user: User): Promise<void> {
    const presenceRef = doc(db, 'notes', noteId, 'presence', user.id);
    
    // Initial presence
    await this.updatePresence(presenceRef, user);
    
    // Heartbeat every 5 seconds
    this.heartbeatInterval = setInterval(() => {
      this.updatePresence(presenceRef, user);
    }, 5000);
  }
  
  private async updatePresence(presenceRef: any, user: User): Promise<void> {
    await setDoc(presenceRef, {
      userId: user.id,
      userName: user.displayName,
      userEmail: user.email,
      userPhotoUrl: user.photoUrl,
      lastSeen: new Date(),
      isActive: true,
    }, { merge: true });
  }
  
  watchPresence(
    noteId: string,
    onUpdate: (users: Presence[]) => void
  ): void {
    this.unsubscribe = onSnapshot(
      collection(db, 'notes', noteId, 'presence'),
      (snapshot) => {
        const activeUsers = snapshot.docs
          .map(doc => doc.data() as Presence)
          .filter(user => {
            const lastSeen = new Date(user.lastSeen);
            const now = new Date();
            return (now.getTime() - lastSeen.getTime()) < 30000; // 30 seconds
          });
        
        onUpdate(activeUsers);
      }
    );
  }
  
  async stopPresence(noteId: string, userId: string): Promise<void> {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    
    // Mark as inactive
    const presenceRef = doc(db, 'notes', noteId, 'presence', userId);
    await setDoc(presenceRef, { isActive: false }, { merge: true });
  }
}
```

#### Debounced Content Updates
```typescript
import { debounce } from 'lodash-es';

export const createDebouncedUpdate = (noteId: string) => {
  return debounce(async (content: string, title: string) => {
    await setDoc(
      doc(db, 'notes', noteId),
      {
        content,
        title,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  }, 500);
};
```

---

## 🎨 UI/UX Requirements

### Design System

#### Color Palette
```typescript
// src/lib/constants.ts
export const COLORS = {
  primary: '#6366F1',      // Indigo
  secondary: '#8B5CF6',    // Purple
  accent: '#EC4899',       // Pink
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Amber
  error: '#EF4444',        // Red
  info: '#3B82F6',         // Blue
};

export const NOTE_COLORS = [
  { name: 'None', value: null, hex: '#9CA3AF' },
  { name: 'Red', value: '#EF5350', hex: '#EF5350' },
  { name: 'Pink', value: '#EC407A', hex: '#EC407A' },
  { name: 'Purple', value: '#AB47BC', hex: '#AB47BC' },
  { name: 'Indigo', value: '#5C6BC0', hex: '#5C6BC0' },
  { name: 'Blue', value: '#42A5F5', hex: '#42A5F5' },
  { name: 'Teal', value: '#26A69A', hex: '#26A69A' },
  { name: 'Green', value: '#66BB6A', hex: '#66BB6A' },
  { name: 'Yellow', value: '#FFEE58', hex: '#FFEE58' },
  { name: 'Orange', value: '#FF7043', hex: '#FF7043' },
  { name: 'Brown', value: '#8D6E63', hex: '#8D6E63' },
  { name: 'Gray', value: '#78909C', hex: '#78909C' },
  { name: 'Grey', value: '#BDBDBD', hex: '#BDBDBD' },
];
```

#### Typography
```css
/* src/styles/typography.css */
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
}
```

#### Spacing
```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
}
```

### Component Examples

#### Note Card Component
```typescript
// src/components/notes/NoteCard.tsx
import React from 'react';
import { Note } from '../../models/Note';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onPin: () => void;
  onFavorite: () => void;
  onOptions: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onClick,
  onPin,
  onFavorite,
  onOptions,
}) => {
  return (
    <div
      className="note-card"
      style={{ borderLeftColor: note.color || '#E5E7EB' }}
      onClick={onClick}
    >
      {/* Header */}
      <div className="note-card-header">
        <h3 className="note-title">
          {note.isPinned && <PinIcon />}
          {note.title || 'Untitled'}
        </h3>
        
        <div className="note-actions">
          <button onClick={(e) => { e.stopPropagation(); onFavorite(); }}>
            {note.isFavorite ? <StarFilledIcon /> : <StarIcon />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onPin(); }}>
            {note.isPinned ? <PinFilledIcon /> : <PinIcon />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onOptions(); }}>
            <MoreIcon />
          </button>
        </div>
      </div>
      
      {/* Content Preview */}
      <p className="note-content-preview">
        {getPlainTextFromQuill(note.content).substring(0, 150)}...
      </p>
      
      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {note.tags.length > 3 && <span className="tag">+{note.tags.length - 3}</span>}
        </div>
      )}
      
      {/* Footer */}
      <div className="note-footer">
        <span className="note-date">
          {formatDate(note.updatedAt)}
        </span>
        
        {note.isSyncEnabled && (
          <span className="sync-badge">
            {note.syncStatus === 'completed' ? '☁️' : '🔄'}
          </span>
        )}
      </div>
    </div>
  );
};
```

#### Rich Text Editor Component
```typescript
// src/components/notes/NoteEditor.tsx
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface NoteEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  initialContent,
  onChange,
  readOnly = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  
  useEffect(() => {
    if (!editorRef.current) return;
    
    // Initialize Quill
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      readOnly,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'list': 'check' }],
          ['link'],
          ['clean'],
        ],
      },
    });
    
    // Set initial content
    if (initialContent) {
      quill.setContents(JSON.parse(initialContent));
    }
    
    // Listen to changes
    quill.on('text-change', () => {
      const content = JSON.stringify(quill.getContents());
      onChange(content);
    });
    
    quillRef.current = quill;
    
    return () => {
      quill.off('text-change');
    };
  }, []);
  
  return <div ref={editorRef} className="quill-editor" />;
};
```

#### Presence Avatars Component
```typescript
// src/components/collaboration/PresenceAvatars.tsx
import React from 'react';
import { Presence } from '../../models/Presence';

interface PresenceAvatarsProps {
  activeUsers: Presence[];
  maxVisible?: number;
}

export const PresenceAvatars: React.FC<PresenceAvatarsProps> = ({
  activeUsers,
  maxVisible = 3,
}) => {
  const visibleUsers = activeUsers.slice(0, maxVisible);
  const remainingCount = activeUsers.length - maxVisible;
  
  return (
    <div className="presence-avatars">
      {visibleUsers.map(user => (
        <div
          key={user.userId}
          className="avatar"
          style={{ borderColor: user.color }}
          title={user.userName}
        >
          {user.userPhotoUrl ? (
            <img src={user.userPhotoUrl} alt={user.userName} />
          ) : (
            <span>{user.userName.charAt(0).toUpperCase()}</span>
          )}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className="avatar avatar-count">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
```

### Responsive Design

#### Breakpoints
```css
/* src/styles/breakpoints.css */
:root {
  --breakpoint-sm: 640px;   /* Mobile */
  --breakpoint-md: 768px;   /* Tablet */
  --breakpoint-lg: 1024px;  /* Desktop */
  --breakpoint-xl: 1280px;  /* Large Desktop */
}

/* Mobile First Approach */
@media (min-width: 768px) {
  .note-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .note-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🔌 API Integration

### Firestore Security Rules
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(noteData) {
      return isAuthenticated() && noteData.ownerId == request.auth.uid;
    }
    
    function isCollaborator(noteData) {
      return isAuthenticated() && 
             request.auth.token.email in noteData.collaborators;
    }
    
    function hasNoteAccess(noteData) {
      return isOwner(noteData) || isCollaborator(noteData);
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == userId;
    }
    
    // Notes collection
    match /notes/{noteId} {
      allow read: if hasNoteAccess(resource.data);
      allow create: if isAuthenticated() && 
                       request.resource.data.ownerId == request.auth.uid;
      allow update: if hasNoteAccess(resource.data);
      allow delete: if isOwner(resource.data);
      
      // Presence subcollection
      match /presence/{userId} {
        allow read: if hasNoteAccess(get(/databases/$(database)/documents/notes/$(noteId)).data);
        allow write: if isAuthenticated() && request.auth.uid == userId;
      }
    }
  }
}
```

### Environment Variables

```bash
# .env.local
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🔒 Security

### Best Practices

#### 1. Input Validation
```typescript
import { z } from 'zod';

const NoteSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().max(100000),
  tags: z.array(z.string().max(50)).max(20),
});

export const validateNote = (data: unknown) => {
  return NoteSchema.parse(data);
};
```

#### 2. XSS Prevention
```typescript
// Sanitize HTML content
import DOMPurify from 'dompurify';

export const sanitizeContent = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};
```

#### 3. Rate Limiting
```typescript
// Implement debouncing for API calls
import { debounce } from 'lodash-es';

const debouncedSave = debounce(async (note: Note) => {
  await saveNote(note);
}, 500);
```

#### 4. Authentication State
```typescript
// Protect routes
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isGuest } = useAuth();
  
  if (!user && !isGuest) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};
```

---

## ⚡ Performance

### Optimization Strategies

#### 1. Code Splitting
```typescript
// Lazy load routes
import { lazy, Suspense } from 'react';

const EditorPage = lazy(() => import('./pages/EditorPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor/:id" element={<EditorPage />} />
      </Routes>
    </Suspense>
  );
}
```

#### 2. Memoization
```typescript
import { memo, useMemo } from 'react';

export const NoteCard = memo<NoteCardProps>(({ note, ...props }) => {
  const formattedDate = useMemo(
    () => formatDate(note.updatedAt),
    [note.updatedAt]
  );
  
  return (
    <div className="note-card">
      {/* ... */}
    </div>
  );
});
```

#### 3. Virtual Scrolling
```typescript
// For large note lists
import { FixedSizeList } from 'react-window';

export const NoteList: React.FC<{ notes: Note[] }> = ({ notes }) => {
  return (
    <FixedSizeList
      height={600}
      itemCount={notes.length}
      itemSize={120}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <NoteCard note={notes[index]} />
        </div>
      )}
    </FixedSizeList>
  );
};
```

#### 4. IndexedDB Indexing
```typescript
// Optimize queries with proper indexes
this.version(1).stores({
  notes: 'id, ownerId, [ownerId+isPinned], [ownerId+isArchived], *tags',
});
```

#### 5. Image Optimization
```typescript
// Lazy load images
<img
  src={user.photoUrl}
  alt={user.displayName}
  loading="lazy"
  decoding="async"
/>
```

---

## 🧪 Testing

### Testing Strategy

#### Unit Tests (Vitest + React Testing Library)
```typescript
// src/features/notes/__tests__/notesService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { createNote, updateNote, deleteNote } from '../notesService';

describe('notesService', () => {
  beforeEach(() => {
    // Clear IndexedDB
  });
  
  it('should create a note', async () => {
    const note = await createNote('Test', 'Content', 'user123');
    expect(note.title).toBe('Test');
    expect(note.ownerId).toBe('user123');
  });
  
  it('should update a note', async () => {
    const note = await createNote('Test', 'Content', 'user123');
    await updateNote(note.id, { title: 'Updated' });
    
    const updated = await db.notes.get(note.id);
    expect(updated?.title).toBe('Updated');
  });
});
```

#### Component Tests
```typescript
// src/components/notes/__tests__/NoteCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { NoteCard } from '../NoteCard';

describe('NoteCard', () => {
  const mockNote = {
    id: '1',
    title: 'Test Note',
    content: '{"ops":[{"insert":"Hello"}]}',
    // ... other fields
  };
  
  it('renders note title', () => {
    render(<NoteCard note={mockNote} onClick={() => {}} />);
    expect(screen.getByText('Test Note')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<NoteCard note={mockNote} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Test Note'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

#### E2E Tests (Playwright)
```typescript
// tests/e2e/notes.spec.ts
import { test, expect } from '@playwright/test';

test('create and edit note', async ({ page }) => {
  await page.goto('/');
  
  // Click create button
  await page.click('[data-testid="create-note-btn"]');
  
  // Enter title
  await page.fill('[data-testid="note-title"]', 'My Note');
  
  // Enter content
  await page.fill('.ql-editor', 'Note content');
  
  // Save
  await page.click('[data-testid="save-btn"]');
  
  // Verify note appears
  await expect(page.locator('text=My Note')).toBeVisible();
});
```

---

## 🚀 Deployment

### Build Configuration

#### Vite Config
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CollabNotes',
        short_name: 'CollabNotes',
        description: 'Collaborative note-taking app',
        theme_color: '#6366F1',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'editor-vendor': ['quill'],
        },
      },
    },
  },
});
```

### Deployment Platforms

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

#### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### Environment Setup

#### Production Checklist
- [ ] Set up Firebase project
- [ ] Configure authentication providers
- [ ] Deploy Firestore security rules
- [ ] Set up environment variables
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Set up CDN
- [ ] Enable compression
- [ ] Configure caching headers
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics

---

## 📚 Additional Resources

### Documentation
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Firebase**: https://firebase.google.com/docs
- **Quill.js**: https://quilljs.com
- **Dexie.js**: https://dexie.org

### Design Resources
- **Material-UI**: https://mui.com
- **Tailwind CSS**: https://tailwindcss.com
- **Figma Design System**: [Link to design files]

### Code Examples
- **GitHub Repository**: [Link to reference implementation]
- **Storybook**: [Link to component library]

---

## 🎯 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up project structure
- [ ] Configure Firebase
- [ ] Implement authentication (Guest + Google)
- [ ] Set up IndexedDB with Dexie
- [ ] Create basic routing

### Phase 2: Core Features (Week 3-4)
- [ ] Implement CRUD operations
- [ ] Build note editor with Quill
- [ ] Add local storage
- [ ] Implement sync logic
- [ ] Create note list view

### Phase 3: Organization (Week 5)
- [ ] Add pin/archive/favorite
- [ ] Implement tags system
- [ ] Add color coding
- [ ] Build search functionality
- [ ] Create filters

### Phase 4: Collaboration (Week 6-7)
- [ ] Implement real-time sync
- [ ] Add presence indicators
- [ ] Build cursor tracking
- [ ] Create share dialog
- [ ] Add collaborator management

### Phase 5: Polish (Week 8)
- [ ] Responsive design
- [ ] Animations and transitions
- [ ] Error handling
- [ ] Loading states
- [ ] Accessibility improvements

### Phase 6: Testing & Deployment (Week 9-10)
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] E2E testing
- [ ] Performance optimization
- [ ] Deploy to production

---

## 💡 Tips & Best Practices

### Development Tips
1. **Start with Guest Mode**: Easier to test without auth
2. **Use TypeScript**: Catch errors early
3. **Implement Offline First**: Better UX
4. **Debounce Everything**: Reduce API calls
5. **Test on Real Devices**: Mobile experience matters

### Common Pitfalls
1. **Don't sync on every keystroke**: Use debouncing
2. **Handle offline gracefully**: Show clear indicators
3. **Validate all inputs**: Security first
4. **Clean up listeners**: Prevent memory leaks
5. **Handle conflicts**: Last-write-wins is simple but lossy

### Performance Tips
1. **Lazy load routes**: Faster initial load
2. **Virtualize long lists**: Better scroll performance
3. **Optimize images**: Use WebP format
4. **Cache aggressively**: Reduce network requests
5. **Use service workers**: Offline support

---

## 📞 Support & Questions

### Getting Help
- Review the Flutter app source code for reference
- Check Firebase documentation for API details
- Use browser DevTools for debugging
- Test with Firebase Emulator Suite locally

### Contact
- **Technical Questions**: [Your contact]
- **Design Questions**: [Designer contact]
- **Firebase Setup**: [Backend team contact]

---

## ✅ Checklist

### Before Starting
- [ ] Read this entire document
- [ ] Review Flutter app codebase
- [ ] Set up Firebase project
- [ ] Install required tools
- [ ] Clone starter template

### During Development
- [ ] Follow TypeScript best practices
- [ ] Write tests for critical features
- [ ] Document complex logic
- [ ] Use Git with meaningful commits
- [ ] Review code regularly

### Before Launch
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify offline functionality
- [ ] Test collaboration features
- [ ] Run performance audit
- [ ] Security review
- [ ] Accessibility audit

---

**Good luck building the web version of CollabNotes! 🚀**

**Last Updated**: November 2024  
**Version**: 1.0  
**Status**: Ready for Development ✅
