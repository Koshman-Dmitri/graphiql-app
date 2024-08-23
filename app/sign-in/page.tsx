'use client';

import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import styles from '../components/AuthForm/Auth.module.css';
import AuthInput from '../components/AuthForm/Inputs/AuthInput';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [signInWithEmailAndPassword, loading, user, error] = useSignInWithEmailAndPassword(auth);
  console.log(loading);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className={styles.inputContainer}>
      <h2 className={styles.title}>Sign up</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <button type="submit" disabled={!!loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {user && <p>Signed up as: {user}</p>}
    </div>
  );
}

export default SignIn;
