import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  try {
    const registrationsRef = collection(db, 'registrations');
    const docPromise = addDoc(registrationsRef, {
      ...registrationData,
      createdAt: serverTimestamp(),
      academicCohort: '2026-2027',
      status: 'pending'
    });

    // 2.5 second timeout safeguard prevents infinite hang if Firestore database is not yet enabled
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore connection timeout (database may be pending initialization)')), 2500)
    );

    const docRef = await Promise.race([docPromise, timeoutPromise]);
    return docRef.id;
  } catch (err) {
    console.warn('saveRegistrationToFirestore notice:', err?.message || err);
    return null;
  }
}

export default app;
