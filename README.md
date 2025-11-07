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

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one

2. **Enable Anonymous Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Anonymous provider

3. **Create a Firestore Database**:
   - Go to Firestore Database
   - Create database in test mode (or production mode with appropriate rules)

4. **Get Your Firebase Configuration**:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - If you haven't created a web app yet, click "Add app" and select Web (</>) 
   - Copy the Firebase configuration object

5. **Update Your Local Configuration**:
   - Open `firebase-config.js` in your project directory
   - Replace the placeholder values with your actual Firebase configuration:

```javascript
export const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

6. **Deploy Firestore Security Rules** (Important for security):
   ```bash
   # Install Firebase CLI (if not already installed)
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firestore (if first time)
   firebase init firestore
   
   # Deploy the security rules
   firebase deploy --only firestore:rules
   ```

**Note**: The `firebase-config.js` file contains your project's configuration. While the repository includes a default template with placeholder values, you should update it with your actual Firebase credentials. The placeholder configuration will display a warning message until you configure it properly.

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

## Firestore Database Structure

This application uses a **multi-tenant architecture** with user-isolated data paths for security and scalability.

### Path Structure

All user data is stored under the following path pattern:

```
artifacts/rozmowa-ai-core/users/{userId}/{collectionName}
```

**Breaking it down:**
- `artifacts/` - Top-level collection for all apps
- `rozmowa-ai-core/` - Document representing this specific app
- `users/` - Collection holding all users
- `{userId}/` - Document for each individual user (using Firebase Auth UID)
- `{collectionName}/` - Sub-collections: `students`, `lessons`, `materials`, `exams`

### Why This Structure?

1. **Security**: Each user's data is isolated under their unique `{userId}`, making it easy to write security rules that prevent users from accessing each other's data.
2. **Scalability**: Supports unlimited users without data conflicts.
3. **Multi-tenant**: Multiple users can use the app simultaneously with complete data isolation.

### Security Rules

The application includes Firestore security rules (see `firestore.rules`) that enforce:
- Users can only read/write data in their own path (where `{userId}` matches their authenticated UID)
- All other access is denied by default

To deploy these rules to your Firebase project:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init firestore` (select your project)
4. Deploy: `firebase deploy --only firestore:rules`

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
