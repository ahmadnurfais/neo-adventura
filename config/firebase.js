import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

// Access environment variables
const apiKey = API_KEY;
const authDomain = AUTH_DOMAIN;
const projectId = PROJECT_ID;
const storageBucket = STORAGE_BUCKET;
const messagingSenderId = MESSAGING_SENDER_ID;
const appId = APP_ID;

// Firebase config
const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Access Firebase services
// export const auth = getAuth();
export const database = getFirestore();
