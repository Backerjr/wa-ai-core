// Firebase Configuration Template
// 1. Copy this file to 'firebase-config.js'.
// 2. Replace the placeholder values with your actual Firebase project configuration.
// 3. IMPORTANT: Make sure 'firebase-config.js' is listed in your .gitignore file to prevent committing sensitive keys.
//
// Get your configuration from your Firebase project:
// Firebase Console > Project Settings > General > Your apps (https://console.firebase.google.com/)

export const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8mZzYCujtcG5RylvCx18e6BRVp26kcFY",
  authDomain: "studio-617595928-cae03.firebaseapp.com",
  projectId: "studio-617595928-cae03",
  storageBucket: "studio-617595928-cae03.firebasestorage.app",
  messagingSenderId: "201908464871",
  appId: "1:201908464871:web:e815d2a1cc1284225e4642"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
