// Firebase Configuration Template
// 1. Copy this file to 'firebase-config.js'.
//    - The app will automatically connect to local emulators if running on localhost.
// 2. Replace the placeholder values with your actual Firebase project configuration.
// 3. IMPORTANT: Make sure 'firebase-config.js' is listed in your .gitignore file to prevent committing sensitive keys.
//
// Get your configuration from your Firebase project:
// Firebase Console > Project Settings > General > Your apps (https://console.firebase.google.com/)

export const firebaseConfig = {
  export const firebaseConfig = {
    apiKey: "your-actual-api-key",              // Replace this
    authDomain: "your-project.firebaseapp.com", // Replace this
    projectId: "your-project-id",                // Replace this
    storageBucket: "your-project.appspot.com",   // Replace this
    messagingSenderId: "your-sender-id",         // Replace this
    appId: "your-app-id"                         // Replace this
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
