'use client';

/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRef } from 'react';
import { IFormInput } from '../types';
import AuthInput from '../AuthInput/AuthInput';
import schema from '../schema';
import styles from '../authStyles.module.css';
import authStyles from '../AuthInput/AuthInput.module.css';

export default function SignUpForm() {
  const nameRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <form className={styles.form}>
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
      <p>
        Already have an account?{' '}
        <Link href="/sign-in" className={styles.link}>
          Sign In
        </Link>
      </p>
      <button className={styles.submitButton} type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
