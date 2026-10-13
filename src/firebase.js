import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithCredential, 
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

if (auth) {
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
 * Zero-redirect Google OAuth sign-in via Google Identity Services token client
 * Eliminates cross-origin iframe issues, partitioned cookie bugs, and page reload loops
 */
export function triggerGoogleOAuthTokenClient() {
  return new Promise((resolve, reject) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '40086953337-p2nemps907kfra452i78un6r89bhcni3.apps.googleusercontent.com';
    if (typeof window === 'undefined' || !window.google?.accounts?.oauth2) {
      return reject(new Error('Google Identity Services client is still loading. Please try again or click Manual Registration.'));
    }

    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile openid',
        callback: async (tokenResponse) => {
          if (tokenResponse?.error) {
            return reject(new Error(tokenResponse.error_description || tokenResponse.error));
          }
          if (tokenResponse?.access_token) {
            try {
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              });
              const profile = await res.json();
              if (!profile?.email) {
                return reject(new Error('Google account did not provide an email address.'));
              }
              const userObj = {
                uid: profile.sub || `google-${Date.now()}`,
                displayName: profile.name || profile.given_name || 'Google Student',
                email: profile.email,
                photoURL: profile.picture || null,
                accessToken: tokenResponse.access_token
              };
              resolve(userObj);
            } catch (fetchErr) {
              reject(fetchErr);
            }
          } else {
            reject(new Error('No access token received from Google OAuth.'));
          }
        },
        error_callback: (err) => {
          reject(new Error(err?.message || 'Google popup sign-in was closed or blocked.'));
        }
      });

      client.requestAccessToken({ prompt: 'select_account' });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Initiates Google Sign-In with zero page reloads
 * Tries Firebase Popup first; on iframe/cookie issues falls back to Google Identity Services Token Client
 * Never triggers signInWithRedirect to avoid reloading and dropping session on localhost
 * @returns {Promise<Object>} Authenticated user profile
 */
export async function signInWithGoogle() {
  if (auth) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (popupErr) {
      console.warn('Firebase popup notice:', popupErr?.code, popupErr?.message);
      if (popupErr?.code === 'auth/popup-closed-by-user' || popupErr?.code === 'auth/popup-blocked') {
        throw popupErr;
      }
      if (popupErr?.code === 'auth/unauthorized-domain') {
        throw popupErr;
      }
      // If popup fails due to internal-error or browser cookie restrictions, proceed to GIS fallback
    }
  }

  // High-reliability fallback: Google Identity Services Token Client
  if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
    return await triggerGoogleOAuthTokenClient();
  }

  throw new Error('Google sign-in service is currently unreachable. You can continue with Manual Registration below.');
}

/**
 * Signs out current user
 */
export async function logOut() {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Sign out notice:', err);
  }
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
