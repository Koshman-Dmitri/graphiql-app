'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className={styles['not-found']}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist</p>
      <button onClick={() => router.push('/')} type="button">
        Go back home
      </button>
    </div>
  );
}
