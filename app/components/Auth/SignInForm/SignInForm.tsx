'use client';

/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { IFormInput } from '../types';
import AuthInput from '../AuthInput/AuthInput';
import schema from '../schema';
import styles from '../authStyles.module.css';

export default function SignInForm() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <form className={styles.form}>
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
      <p>
        Do not have an account?{' '}
        <Link href="/sign-up" className={styles.link}>
          Sign Up
        </Link>
      </p>
      <button className={styles.submitButton} type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
