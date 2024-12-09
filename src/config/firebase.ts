import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYBsWxhlwMpKvKxZ-f41cPGvHdIAusgEI",
  authDomain: "moodtracker2-cfb9b.firebaseapp.com",
  projectId: "moodtracker2-cfb9b",
  storageBucket: "moodtracker2-cfb9b.firebasestorage.app",
  messagingSenderId: "290182061913",
  appId: "1:290182061913:web:d0e6058c29e80d76aff648"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
