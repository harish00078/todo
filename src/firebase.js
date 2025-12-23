import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase project configuration
// Get this from Firebase Console -> Project Settings -> General -> Your apps
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAaQ7KxklGHrNX7JxYce1_OsduEVYV-PE0",
  authDomain: "favorable-tree-408504.firebaseapp.com",
  projectId: "favorable-tree-408504",
  storageBucket: "favorable-tree-408504.firebasestorage.app",
  messagingSenderId: "361094047734",
  appId: "1:361094047734:web:6376252e7f1f563cb049d7"
};

let app;
let db;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  // Initialize Firestore
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { db };