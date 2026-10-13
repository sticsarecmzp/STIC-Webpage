import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

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
export const googleProvider = new GoogleAuthProvider();

// Customize Google OAuth prompt
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Initiates Google Sign-In with popup
 * @returns {Promise<import('firebase/auth').User|null>} Authenticated user or null
 */
export async function signInWithGoogle() {
  if (!auth) {
    console.warn('Firebase Auth is not configured. Set VITE_FIREBASE_* in .env.');
    return null;
  }
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Signs out current user
 */
export async function logOut() {
  if (!auth) return;
  await signOut(auth);
}

// Initialize Firebase Analytics conditionally
export let analytics = null;
if (app && typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

/**
 * Saves a student registration application to Cloud Firestore database
 * @param {Object} registrationData - Sanitized student registration payload
 * @returns {Promise<string|null>} Document ID of the saved registration or null if not configured
 */
export async function saveRegistrationToFirestore(registrationData) {
  if (!db) {
    console.warn('Firestore is not configured. Set VITE_FIREBASE_* environment variables in .env.');
    return null;
  }
  const registrationsRef = collection(db, 'registrations');
  const docRef = await addDoc(registrationsRef, {
    ...registrationData,
    createdAt: serverTimestamp(),
    academicCohort: '2026-2027',
    status: 'pending'
  });
  return docRef.id;
}

export default app;
