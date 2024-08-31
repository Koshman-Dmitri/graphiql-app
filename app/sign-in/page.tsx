'use client';

import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/config/firebase';
import styles from '../components/AuthForm/Auth.module.css';
import AuthInput from '../components/AuthForm/Inputs/AuthInput';
import Loader from '../components/Loader/Loader';
import getErrorMessage from '../utils/getErrorMessage';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitForm = async () => {
    setError('');
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      await fetch('api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      router.refresh();
    } catch (e) {
      const errorCode = (e as Error).message;
      const errorMessage = getErrorMessage(errorCode);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitForm().catch((err) => console.error('Error during form submission:', err));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.inputContainer}>
      <h2 className={styles.title}>Sign in</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <AuthInput
          type="email"
          title="Email"
          id="email"
          error={error}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          title="Password"
          id="password"
          error={error}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.newHere}>
          Don&apos;t have an account?
          <Link href="/sign-up" className={styles.createAccountLink}>
            Create an account
          </Link>
        </div>
        <button type="submit" className={`${error ? styles.disabledButton : ''} `}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
