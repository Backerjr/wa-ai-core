# Firebase Setup Guide

This guide will help you configure the Rozmowa AI Core application with your own Firebase project.

## Quick Start

1. **Copy the configuration template**:
   ```bash
   # The firebase-config.js file already exists with placeholder values
   # Simply edit it with your actual Firebase credentials
   ```

2. **Get your Firebase configuration**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create a new one)
   - Click on the gear icon ⚙️ > Project Settings
   - Scroll down to "Your apps" section
   - If you don't have a web app, click "Add app" and select Web (`</>`)
   - Copy the configuration object

3. **Update the configuration file**:
   Open `firebase-config.js` and replace the placeholder values:
   
   ```javascript
   export const firebaseConfig = {
       apiKey: "your-actual-api-key",              // Replace this
       authDomain: "your-project.firebaseapp.com", // Replace this
       projectId: "your-project-id",                // Replace this
       storageBucket: "your-project.appspot.com",   // Replace this
       messagingSenderId: "your-sender-id",         // Replace this
       appId: "your-app-id"                         // Replace this
   };
   ```

## Detailed Setup

### Step 1: Create Firebase Project

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (you can disable Google Analytics if not needed)

### Step 2: Enable Anonymous Authentication

Anonymous authentication allows users to use the app without creating accounts.

1. In your Firebase project, go to **Authentication**
2. Click on the **Sign-in method** tab
3. Find **Anonymous** in the list of sign-in providers
4. Click on **Anonymous** and toggle the **Enable** switch
5. Click **Save**

### Step 3: Create Firestore Database

1. In your Firebase project, go to **Firestore Database**
2. Click **Create database**
3. Choose a location (pick one closest to your users)
4. Select security rules:
   - For development: Choose **Start in test mode** (expires in 30 days)
   - For production: Choose **Start in production mode** (you'll deploy custom rules later)
5. Click **Enable**

### Step 4: Get Your Web App Configuration

1. Go to **Project Settings** (gear icon ⚙️)
2. Scroll down to **Your apps** section
3. If you don't see a web app, click **Add app** and select the web platform (`</>`)
4. Register your app with a nickname (e.g., "Rozmowa AI Core")
5. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "my-project.firebaseapp.com",
  projectId: "my-project",
  storageBucket: "my-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

### Step 5: Update Local Configuration

1. Open `firebase-config.js` in your project directory
2. Replace all placeholder values with your actual configuration values
3. Save the file

### Step 6: Deploy Security Rules (Important!)

The application uses multi-tenant architecture with user-specific data paths. Deploy the security rules to protect user data:

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firestore (first time only)
firebase init firestore
# Select your project when prompted
# Accept the default firestore.rules file

# Deploy the security rules
firebase deploy --only firestore:rules
```

The security rules in `firestore.rules` ensure that each user can only access their own data.

## Verification

1. Open `index.html` in a web browser
2. You should **NOT** see a red error banner at the top
3. The sidebar should show "ONLINE" with a pulsing green dot
4. You should be able to add students, lessons, materials, and exams
5. Data should persist when you refresh the page

## Troubleshooting

### Error: "Failed to get document because the client is offline"

**Solution**: Check your Firebase configuration. Make sure all values are correct and your project has Firestore enabled.

### Error Banner Still Showing

**Cause**: The `firebase-config.js` file still contains placeholder values.

**Solution**: Double-check that you've replaced ALL placeholder values, especially the `apiKey`.

### Authentication Not Working

**Cause**: Anonymous authentication is not enabled in your Firebase project.

**Solution**: Go to Firebase Console > Authentication > Sign-in method > Enable Anonymous provider.

### Data Not Saving

**Cause**: Firestore database is not created or security rules are blocking access.

**Solution**: 
1. Verify Firestore database exists in Firebase Console
2. Deploy the security rules using `firebase deploy --only firestore:rules`
3. Temporarily set Firestore to test mode to verify the issue is with security rules

### "Permission Denied" Errors in Console

**Cause**: Security rules are blocking access or not deployed correctly.

**Solution**: Deploy the security rules from `firestore.rules`:
```bash
firebase deploy --only firestore:rules
```

## Security Best Practices

1. **Never commit your actual Firebase configuration to public repositories** if your API key has restrictions removed
2. **Deploy proper security rules** - the provided `firestore.rules` implements user-specific data isolation
3. **Enable App Check** in production to prevent abuse
4. **Set up Firebase API key restrictions** in Google Cloud Console
5. **Monitor usage** in Firebase Console to detect unusual activity

## File Structure

```
wa-ai-core/
├── firebase-config.js          # Your Firebase configuration (edit this)
├── firebase-config.template.js # Template showing required structure
├── firestore.rules             # Security rules (deploy to Firebase)
├── index.html                  # Main application
└── FIREBASE_SETUP.md          # This guide
```

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## Need Help?

If you encounter issues not covered in this guide:

1. Check the browser console for specific error messages
2. Verify all Firebase services are enabled in Firebase Console
3. Ensure security rules are deployed correctly
4. Review the Firebase Documentation for your specific error

---

**Note**: This application uses Firebase's free tier, which includes:
- 50,000 document reads/day
- 20,000 document writes/day
- 20,000 document deletes/day
- 1 GB stored data

This should be sufficient for most educational use cases.
