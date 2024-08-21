'use client';

import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <button onClick={() => handleRedirect('/')} type="button">
          [Logo]
        </button>
      </div>
      <nav className={styles.nav}>
        <button
          onClick={() => handleRedirect('/sign-in')}
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
