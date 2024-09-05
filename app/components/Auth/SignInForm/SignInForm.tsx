'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/services/firebase/config';
import setCookies from '@/app/services/firebase/setCookies';
import { IFormInput } from '../types';
import AuthInput from '../AuthInput/AuthInput';
import schema from '../schema';
import styles from '../authStyles.module.css';
import ProtectedRoute from '../ProtectRoutes/ProtectedRoute';

function SignInForm() {
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  const handleSignIn = async (data: IFormInput) => {
    const res = await signInWithEmailAndPassword(data.email, data.password);

    if (res) {
      const token = await res.user.getIdToken();
      setCookies(token, window.location.pathname.split('/')[1]);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
      <h1 className={styles.title}>Sign In</h1>
      <AuthInput
        register={register}
        type="text"
        label="Email"
        name="email"
        error={errors.email?.message || ''}
      />
      <AuthInput
        register={register}
        type="password"
        label="Password"
        name="password"
        error={errors.password?.message || ''}
      />
      {error && <p className={styles.errorMsg}>Error: {error?.code}</p>}
      <p>
        Do not have an account?{' '}
        <Link href="/sign-up" className={styles.link}>
          Sign Up
        </Link>
      </p>
      <button className={styles.submitButton} type="submit" disabled={!isValid || loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default ProtectedRoute(SignInForm, 'withoutAuth');
