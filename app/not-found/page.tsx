import Link from 'next/link';
import styles from './page.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist</p>
      <Link href="/" className="buttonLink">
        Go back home
      </Link>
    </div>
  );
}
