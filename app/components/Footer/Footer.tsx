'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const router = useRouter();

  const handleRedirect = (path: string, newTab = false) => {
    if (newTab) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      router.push(path);
    }
  };
  return (
    <footer className={styles.footer}>
      {/* //TODO a link to the authors' GitHub */}
      <button onClick={() => handleRedirect('/#')} type="button" className={styles['footer-link']}>
        <Image
          src="./images/github-logo.svg"
          className={styles['footer-logo']}
          alt="GitHub logo"
          width={24}
          height={24}
        />
      </button>
      <p>&copy; 2024</p>
      {/* //TODO directs to RSS 404 page */}
      <button
        onClick={() => handleRedirect('https://rs.school/react/', true)}
        type="button"
        className={styles['footer-link']}
      >
        <Image
          src="./images/rss-logo.svg"
          className={styles['footer-logo']}
          alt="Rolling Scopes School logo"
          width={24}
          height={24}
        />
      </button>
    </footer>
  );
}
