import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import { User } from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { migrateGuestNotes } from './notesService';

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

export const getGuestId = (): string | null => {
  return localStorage.getItem('guestId');
};

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create/update user document in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        createdAt: new Date().toISOString(),
      });
    }

    // Migrate guest notes if any
    const guestId = getGuestId();
    if (guestId) {
      await migrateGuestNotes(guestId, user.uid);
      localStorage.removeItem('guestId');
    }

    return {
      id: user.uid,
      email: user.email!,
      displayName: user.displayName || 'User',
      photoUrl: user.photoURL || undefined,
      createdAt: new Date(),
      isGuest: false,
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      callback({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || userData?.displayName || 'User',
        photoUrl: firebaseUser.photoURL || userData?.photoUrl || undefined,
        createdAt: userData?.createdAt ? new Date(userData.createdAt) : new Date(),
        isGuest: false,
      });
    } else {
      callback(null);
    }
  });
};
