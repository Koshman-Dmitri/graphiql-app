'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/app/services/firebase/config';
import { useTranslation } from 'react-i18next';
import MainPageInfo from '../MainPageInfo/MainPageInfo';
import styles from './MainPage.module.css';

export default function MainPage({ hasToken, name }: { hasToken: boolean; name: string }) {
  const [isAuth, setIsAuth] = useState(false);
  const { t } = useTranslation(['main', 'common']);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setIsAuth(Boolean(user));
    });

    return unsubscribe;
  }, []);

  if (!isAuth && !hasToken) {
    return (
      <div className={styles.mainContent}>
        <h1 className="pageTitle">{t('title_primary_default')}</h1>
        <MainPageInfo />
        <div className={styles.authLinks}>
          <Link href="/sign-in" className={`buttonLink ${styles.authButton}`}>
            {t('common:sign_in')}
          </Link>
          <Link href="/sign-up" className={`buttonLink ${styles.authButton}`}>
            {t('common:sign_up')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContent}>
      <h1 className="pageTitle">{t('title_primary_auth', { name })}</h1>
      <MainPageInfo />
      <div className={styles.apiLinks}>
        <Link href="/rest" className={`buttonLink ${styles.apiButton}`}>
          {t('rest_btn')}
        </Link>
        <Link href="/graphql" className={`buttonLink ${styles.apiButton}`}>
          {t('graphiql_btn')}
        </Link>
        <Link href="/history" className={`buttonLink ${styles.apiButton}`}>
          {t('history_btn')}
        </Link>
      </div>
    </div>
  );
}
