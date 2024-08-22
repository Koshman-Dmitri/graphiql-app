// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'graphiql-a4668.firebaseapp.com',
  projectId: 'graphiql-a4668',
  storageBucket: 'graphiql-a4668.appspot.com',
  messagingSenderId: '878331299011',
  appId: '1:878331299011:web:ae5cb613fdbf43d0330e76',
  measurementId: 'G-6WYQ3D400E',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
// const analytics = getAnalytics(app);
