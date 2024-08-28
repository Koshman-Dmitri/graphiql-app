'use client';

import { useState } from 'react';
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/servises/firebase/firebase';
import styles from '../components/AuthForm/Auth.module.css';
import AuthInput from '../components/AuthForm/Inputs/AuthInput';
import Loader from '../components/Loader/Loader';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitForm = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res?.user) {
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          email,
          name,
        });

        await updateProfile(res.user, {
          displayName: name,
        });

        setEmail('');
        setPassword('');
        setName('');
        router.replace('/sign-in');
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitForm().catch((err) => console.error('Error during form submission:', err));
  };
  return loading ? (
    <Loader />
  ) : (
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
          onChange={(e) => setConfirmation(e.target.value)}
        />
        <AuthInput
          type="password"
          title="Confirm Password"
          id="Confirm Password"
          value={confirmation}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default SignUp;
