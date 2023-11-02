import { initializeApp } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: 'thriamveftikos-62105.firebaseapp.com',
  projectId: 'thriamveftikos-62105',
  storageBucket: 'thriamveftikos-62105.appspot.com',
  messagingSenderId: '676424207236',
  appId: '1:676424207236:web:1e31309621890eff006bd1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const signIn = signInWithEmailAndPassword();
