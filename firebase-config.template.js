// Firebase Configuration Template
// 1. Copy this file to 'firebase-config.js'.
//    - The app will automatically connect to local emulators if running on localhost.
// 2. Replace the placeholder values with your actual Firebase project configuration.
// 3. IMPORTANT: Make sure 'firebase-config.js' is listed in your .gitignore file to prevent committing sensitive keys.
//
// Get your configuration from your Firebase project:
// Firebase Console > Project Settings > General > Your apps (https://console.firebase.google.com/)

export const firebaseConfig = {
  apiKey: "studio-AIzaSyB8mZzYCujtcG5RylvCx18e6BRVp26kcFY",
  authDomain: "studio-617595928-cae03.firebaseapp.com",
  projectId: "studio-617595928-cae03",
  storageBucket: "studio-617595928-cae03.firebasestorage.app",
  messagingSenderId: "201908464871",
  appId: "1:201908464871:web:e815d2a1cc1284225e4642"
};

/**
 * Connects to local Firebase emulators if the app is running on localhost.
 * This allows for local development and testing without affecting production data.
 *
 * @param {object} firebaseApp - The initialized Firebase app instance.
 * @param {object} auth - The Firebase Auth instance.
 * @param {object} db - The Firestore instance.
 */
export function connectToEmulators({ auth, db }) {
  if (window.location.hostname === "localhost") {
    console.log("Development mode: Connecting to local Firebase emulators.");
    // Point to the local Auth emulator
    firebase.auth.connectAuthEmulator(auth, "http://localhost:9099");
    // Point to the local Firestore emulator
    firebase.firestore.connectFirestoreEmulator(db, "localhost", 8080);
  }
}
