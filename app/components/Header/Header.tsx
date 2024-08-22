'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

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
      <div className={styles.logo}>
        <button onClick={() => router.push('/')} type="button" className={styles['nav-logo']}>
          <Image
            src="./images/logo.svg"
            className={styles['logo-img']}
            alt="App logo"
            width={38}
            height={38}
          />
        </button>
      </div>
      <nav className={styles.nav}>
        <button
          onClick={() => router.push('/sign-in')}
          type="button"
          className={styles['nav-link']}
        >
          Sign In
        </button>
        <button className={styles['nav-link']} type="button">
          Language
        </button>
      </nav>
    </header>
  );
}
