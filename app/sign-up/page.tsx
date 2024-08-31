'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import styles from '../components/AuthForm/Auth.module.css';
import AuthInput from '../components/AuthForm/Inputs/AuthInput';
import Loader from '../components/Loader/Loader';
import { RegistrationValidationSchema, IFormData } from '../utils/yup';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(RegistrationValidationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const nameInput = register('name');
  const emailInput = register('email');
  const passwordInput = register('password');
  const confirmPasswordInput = register('confirmPassword');

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setError('');
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (res?.user) {
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          email: data.email,
          name: data.name,
        });

        await updateProfile(res.user, {
          displayName: data.name,
        });

        router.replace('/sign-in');
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.inputContainer}>
      <h2 className={styles.title}>Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <AuthInput
          type="text"
          title="Name"
          id="name"
          error={errors.name?.message || ''}
          name={nameInput.name}
          onChange={nameInput.onChange}
          onBlur={nameInput.onBlur}
          ref={nameInput.ref}
        />
        <AuthInput
          type="email"
          title="Email"
          id="email"
          error={errors.email?.message || ''}
          name={emailInput.name}
          onChange={emailInput.onChange}
          onBlur={emailInput.onBlur}
          ref={emailInput.ref}
        />
        <AuthInput
          type="password"
          title="Password"
          id="password"
          error={errors.password?.message || ''}
          name={passwordInput.name}
          onChange={passwordInput.onChange}
          onBlur={passwordInput.onBlur}
          ref={passwordInput.ref}
        />
        <AuthInput
          type="password"
          title="Confirm Password"
          id="ConfirmPassword"
          error={errors.confirmPassword?.message || ''}
          name={confirmPasswordInput.name}
          onChange={confirmPasswordInput.onChange}
          onBlur={confirmPasswordInput.onBlur}
          ref={confirmPasswordInput.ref}
        />
        <button type="submit" disabled={!isValid}>
          Sign Up
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default SignUp;
