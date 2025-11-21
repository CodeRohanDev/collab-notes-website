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
  color: string;
}
