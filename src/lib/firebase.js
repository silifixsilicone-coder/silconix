import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// SILICONIX official Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD7Z5lT8xjYSGTgvCpRSSVuoxNO1cJGlBA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "silconix.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "silconix",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "silconix.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "327961379248",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:327961379248:web:ad6ec6499c42ab2c11d675",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0X66G45ZM1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics safely in supported browser environments
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics optional fallback
  });
}

export { analytics };
export const isFirebaseConfigured = true;

export default app;
