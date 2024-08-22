import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
        className={styles['footer-link']}
      >
        RS School
        <Image
          src="./images/rss-logo.svg"
          className={styles['footer-logo']}
          alt="Rolling Scopes School logo"
          width={24}
          height={24}
        />
      </a>
      <div className={styles['footer-links']}>
        <a
          href="https://github.com/koshman-dmitri"
          target="_blank"
          rel="noreferrer"
          className={styles['footer-link']}
        >
          koshman-dmitri
          <Image
            src="./images/github-logo.svg"
            className={styles['footer-logo']}
            alt="GitHub logo"
            width={24}
            height={24}
          />
        </a>
        <a
          href="https://github.com/digitalfantazy"
          target="_blank"
          rel="noreferrer"
          className={styles['footer-link']}
        >
          digitalfantazy
          <Image
            src="./images/github-logo.svg"
            className={styles['footer-logo']}
            alt="GitHub logo"
            width={24}
            height={24}
          />
        </a>
        <a
          href="https://github.com/LiudmilaRodzina"
          target="_blank"
          rel="noreferrer"
          className={styles['footer-link']}
        >
          liudmilarodzina
          <Image
            src="./images/github-logo.svg"
            className={styles['footer-logo']}
            alt="GitHub logo"
            width={24}
            height={24}
          />
        </a>
      </div>
      <span className={styles['footer-copy']}>&copy;2024</span>
    </footer>
  );
}
