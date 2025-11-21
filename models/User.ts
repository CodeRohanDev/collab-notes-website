export interface User {
  id: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  createdAt: Date;
  isGuest: boolean;
}
