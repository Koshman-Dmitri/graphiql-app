'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRef } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/services/firebase/config';
import setCookies from '@/app/services/firebase/setCookies';
import { IFormInput } from '../types';
import AuthInput from '../AuthInput/AuthInput';
import schema from '../schema';
import styles from '../authStyles.module.css';
import authStyles from '../AuthInput/AuthInput.module.css';
import ProtectedRoute from '../ProtectRoutes/ProtectedRoute';

function SignUpForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  const handleSignUp = async (data: IFormInput) => {
    const res = await createUserWithEmailAndPassword(data.email, data.password);

    if (res) {
      const token = await res.user.getIdToken();
      setCookies(token, window.location.pathname.split('/')[1]);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
      <h1 className={styles.title}>Sign Up</h1>
      <label className={authStyles.label} htmlFor="name">
        <span className={authStyles.labelName}>Name</span>
        <input ref={nameRef} className={authStyles.input} id="name" />
      </label>

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
        Already have an account?{' '}
        <Link href="/sign-in" className={styles.link}>
          Sign In
        </Link>
      </p>
      <button className={styles.submitButton} type="submit" disabled={!isValid || loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default ProtectedRoute(SignUpForm, 'withoutAuth');
