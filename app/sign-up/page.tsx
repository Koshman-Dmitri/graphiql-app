'use client';

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth, db } from '@/app/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import styles from '../components/AuthForm/Auth.module.css';
import AuthInput from '../components/AuthForm/Inputs/AuthInput';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res?.user) {
          return setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            email,
            name,
          }).then(() => {
            return updateProfile(res.user, {
              displayName: name,
            });
          });
        }
        return null;
      })
      .then(() => {
        setEmail('');
        setPassword('');
        setName('');
      })
      .catch((err) => {
        console.error('Registration error:', err);
      });
  };

  return (
    <div className={styles.inputContainer}>
      <h2 className={styles.title}>Sign up</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <AuthInput
          type="text"
          title="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AuthInput
          type="email"
          title="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          title="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {user && <p>Signed up as: {user.user.displayName}</p>}
    </div>
  );
}

export default SignUp;
