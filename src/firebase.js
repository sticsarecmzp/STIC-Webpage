import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

/**
 * Firebase Client Configuration
 * Credentials are strictly loaded from environment variables (VITE_FIREBASE_*)
 * Never commit plain text API keys or secrets to version control.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if Firebase configuration is provided
const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Initialize Firebase App (Singleton pattern)
const app = isConfigured
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

// Initialize Cloud Firestore database
export const db = app ? getFirestore(app) : null;

// Initialize Firebase Authentication & Google Auth Provider
export const auth = app ? getAuth(app) : null;

if (auth && typeof window !== 'undefined') {
  try {
    setPersistence(auth, browserLocalPersistence).catch(() => {});
  } catch {}
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { onAuthStateChanged };

/**
 * Initiates Google Sign-In with popup
 * @returns {Promise<import('firebase/auth').User>} Authenticated user object
 */
export async function signInWithGoogle() {
  if (!auth) {
    throw new Error('Firebase Authentication is not configured. Please check .env settings.');
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.error('Google Sign-in error:', err);
    if (err?.code === 'auth/popup-closed-by-user') {
      throw new Error('Google sign-in popup was closed before completing verification.');
    }
    if (err?.code === 'auth/unauthorized-domain') {
      throw new Error('Domain not authorized. Please add this domain to Firebase Console -> Authentication -> Settings -> Authorized Domains.');
    }
    if (err?.code === 'auth/operation-not-allowed') {
      throw new Error('Google Sign-in is not enabled. In Firebase Console, go to Authentication -> Sign-in method -> Enable Google.');
    }
    throw err;
  }
}

/**
 * Signs out current Google user
 */
export async function logOut() {
  if (!auth) return;
  await signOut(auth);
}

/**
 * Saves a student registration application to Cloud Firestore database
 * @param {Object} registrationData - Sanitized student registration payload
 * @returns {Promise<string|null>} Document ID of the saved registration or null if not configured
 */
export async function saveRegistrationToFirestore(registrationData) {
  if (!db) {
    const msg = 'Firestore is not configured. Set VITE_FIREBASE_* environment variables in .env.';
    console.warn(msg);
    throw new Error(msg);
  }
  try {
    const registrationsRef = collection(db, 'registrations');
    const docPromise = addDoc(registrationsRef, {
      ...registrationData,
      createdAt: serverTimestamp(),
      academicCohort: '2026-2027',
      status: 'pending'
    });

    // 15-second timeout safeguard for network connections
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out. Please check your internet connection and try again.')), 15000)
    );

    const docRef = await Promise.race([docPromise, timeoutPromise]);
    return docRef.id;
  } catch (err) {
    console.error('saveRegistrationToFirestore error:', err);
    if (err?.code === 'permission-denied') {
      throw new Error('Firestore permission denied: Please update your Firestore Security Rules in Firebase Console.');
    }
    if (err?.code === 'unavailable') {
      throw new Error('Firebase service is currently unavailable. Please check your connection.');
    }
    throw err;
  }
}

export default app;
