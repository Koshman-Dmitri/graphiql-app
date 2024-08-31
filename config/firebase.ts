import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { clientConfig } from './config';

const app = !getApps().length ? initializeApp(clientConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
