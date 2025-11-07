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

**Quick Start**: Edit `firebase-config.js` with your Firebase credentials.

For detailed setup instructions, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

**Summary**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and enable Anonymous Authentication
3. Create a Firestore Database
4. Get your web app configuration
5. Update `firebase-config.js` with your actual credentials
6. Deploy security rules: `firebase deploy --only firestore:rules`

**Note**: The application will display an error banner until you configure your actual Firebase credentials.

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
