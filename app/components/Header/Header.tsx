'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/app/servises/firebase/firebase';
import styles from './Header.module.css';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
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

  const handleSignOut = async () => {
    await signOut(auth);
    await fetch('/api/logout', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    router.refresh();
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    handleSignOut().catch((err) => console.error('Error during sign out:', err));
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
              <button type="button" onClick={handleSubmit} className="buttonLink">
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
