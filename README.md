# Rozmowa AI Core

Project Cortex: A bespoke, AI-powered dashboard for the Rozmowa English School. This single-page 'AI Core' interface manages students, curriculum, and assessments, replacing traditional admin tools with a live, data-driven command center. Backed by Firebase.

## Features

- **Dark Mode Glassmorphism Design**: Modern, sleek interface with glassmorphism effects
- **2-Column Layout**: Icon sidebar + main content area
- **Dashboard**: 
  - Animated particle canvas background
  - Real-time typing log animation
  - 4 live stat boxes showing counts for Students, Lessons, Materials, and Exams
  - Bento grid layout
- **Students Management**: Full CRUD with real-time updates
- **Lessons Management**: Full CRUD with real-time updates
- **Materials Management**: Full CRUD with real-time updates
- **Exams Management**: Full CRUD with real-time updates
- **Firebase Integration**: Anonymous Authentication + Firestore real-time database

## Technology Stack

- **HTML5**: Single-page application
- **Tailwind CSS**: Via CDN for styling
- **Firebase 11**: Authentication and Firestore database via CDN
- **Vanilla JavaScript**: ES6 modules for Firebase integration

## Firebase Setup

To use this application with your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Anonymous Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Anonymous provider
4. Create a **Firestore Database**:
   - Go to Firestore Database
   - Create database in test mode (or production mode with appropriate rules)
5. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and select Web app
   - Copy the Firebase configuration object
6. Update the `firebaseConfig` object in `index.html` (around line 488) with your actual configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Usage

1. Open `index.html` in a web browser
2. The application will automatically sign in anonymously
3. Use the sidebar icons to navigate between sections:
   - **Dashboard**: View real-time statistics and system status
   - **Students**: Add, view, and delete students
   - **Lessons**: Add, view, and delete lessons
   - **Materials**: Add, view, and delete learning materials
   - **Exams**: Add, view, and delete exams
4. All data is automatically synced with Firebase Firestore in real-time

## Collections Structure

### Students Collection
- name: string
- email: string
- level: string (A1, A2, B1, B2, C1, C2)
- status: string (Active, Inactive)

### Lessons Collection
- title: string
- topic: string
- duration: number (minutes)
- level: string (A1, A2, B1, B2, C1, C2)
- description: string

### Materials Collection
- title: string
- type: string (PDF, Video, Audio, Document)
- url: string
- category: string
- description: string

### Exams Collection
- title: string
- date: string (date format)
- duration: number (minutes)
- level: string (A1, A2, B1, B2, C1, C2)
- description: string

## Development

No build process required! Just open `index.html` in a browser after configuring Firebase.

## License

MIT
