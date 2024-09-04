'use client';

/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { IFormInput } from '../types';
import AuthInput from '../AuthInput/AuthInput';
import styles from '../authStyles.module.css';
import useValidationSchema from '../schema';

export default function SignInForm() {
  const { t } = useTranslation('sign');
  const schema = useValidationSchema();

  const {
    register,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>{t('sign_in')}</h1>
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
      <p>
        {t('no_account')}{' '}
        <Link href="/sign-up" className={styles.link}>
          {t('sign_up')}
        </Link>
      </p>
      <button className={styles.submitButton} type="submit" disabled={!isValid}>
        {t('submit_btn')}
      </button>
    </form>
  );
}
