// firebase-config.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
} from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import {
  getStorage,
  connectStorageEmulator,
} from "firebase/storage";

// --- Firebase Config ---
// Get your config from Firebase Console → Project Settings → General → Your apps
export const firebaseConfig = {
  apiKey: "AIzaSyB8mZzYCujtcG5RylvCx18e6BRVp26kcFY",
  authDomain: "studio-617595928-cae03.firebaseapp.com",
  projectId: "studio-617595928-cae03",
  storageBucket: "studio-617595928-cae03.firebasestorage.app",
  messagingSenderId: "201908464871",
  appId: "1:201908464871:web:e815d2a1cc1284225e4642"
};

// --- Initialize Firebase ---
export const app = initializeApp(firebaseConfig);

// --- Connect to Emulators (for local development) ---
export function connectToEmulators() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  if (window.location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
    console.log("🔥 Connected to Firebase emulators");
  }
}
