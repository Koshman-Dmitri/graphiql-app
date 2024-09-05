'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/services/firebase/config';
import setCookies from '@/app/services/firebase/setCookies';
import { IFormInput } from '../types';
import AuthInput from '../AuthInput/AuthInput';
import styles from '../authStyles.module.css';
import authStyles from '../AuthInput/AuthInput.module.css';
import useValidationSchema from '../schema';
import ProtectedRoute from '../ProtectRoutes/ProtectedRoute';

function SignUpForm() {
  const { t } = useTranslation('sign');
  const schema = useValidationSchema();
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
      <h1 className={styles.title}>{t('sign_up')}</h1>

      <label className={authStyles.label} htmlFor="name">
        <span className={authStyles.labelName}>{t('name')}</span>
        <input ref={nameRef} className={authStyles.input} id="name" />
      </label>

      <AuthInput
        register={register}
        type="text"
        label={t('email')}
        name="email"
        error={errors.email?.message || ''}
      />
      <AuthInput
        register={register}
        type="password"
        label={t('password')}
        name="password"
        error={errors.password?.message || ''}
      />
      {error && <p className={styles.errorMsg}>Error: {error?.code}</p>}
      <p>
        {t('have_account')}{' '}
        <Link href="/sign-in" className={styles.link}>
          {t('sign_in')}
        </Link>
      </p>
      <button className={styles.submitButton} type="submit" disabled={!isValid || loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default ProtectedRoute(SignUpForm, 'withoutAuth');
