'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const { t } = useTranslation('common');

  const isAuthenticated = false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className="container">
        <div className={styles.headerWrapper}>
          <Link className={styles.navLogo} href="/">
            <Image
              src="/images/logo.svg"
              className={styles.logoImg}
              alt="App logo"
              width={38}
              height={38}
            />
          </Link>
          <nav className={styles.nav}>
            {!isAuthenticated ? (
              <>
                <Link href="/sign-in" className="buttonLink">
                  {t('sign_in')}
                </Link>
                <Link href="/sign-up" className="buttonLink">
                  {t('sign_up')}
                </Link>
              </>
            ) : (
              <Link href="/" className="buttonLink">
                {t('sign_out')}
              </Link>
            )}
            <LanguageSelect />
          </nav>
        </div>
      </div>
    </header>
  );
}
