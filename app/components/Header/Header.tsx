'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [user] = useAuthState(auth);

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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className="container">
        <div className={styles.headerWrapper}>
          <Link className={styles.navLogo} href="/">
            <Image
              src="./images/logo.svg"
              className={styles.logoImg}
              alt="App logo"
              width={38}
              height={38}
            />
          </Link>
          <nav className={styles.nav}>
            {user ? (
              <button type="button" onClick={handleSignOut} className="buttonLink">
                Sign out
              </button>
            ) : (
              <Link href="/sign-in" className="buttonLink">
                Sign In
              </Link>
            )}

            <button type="button">EN</button>
          </nav>
        </div>
      </div>
    </header>
  );
}
