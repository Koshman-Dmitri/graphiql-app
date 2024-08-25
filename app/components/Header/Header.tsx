'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
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
            <Link href="/sign-in" className="buttonLink">
              Sign In
            </Link>
            <button type="button">EN</button>
          </nav>
        </div>
      </div>
    </header>
  );
}
