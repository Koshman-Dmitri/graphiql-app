import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerWrapper}>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
            className={styles.footerLink}
          >
            <span>RS School</span>
            <Image
              src="/images/rss-logo.svg"
              className={styles.footerLogo}
              alt="Rolling Scopes School logo"
              width={24}
              height={24}
            />
          </a>
          <div className={styles.footerLinks}>
            <a
              href="https://github.com/koshman-dmitri"
              target="_blank"
              rel="noreferrer"
              className={styles.footerLink}
            >
              <span>koshman-dmitri</span>
              <Image
                src="/images/github-logo.svg"
                className={styles.footerLogo}
                alt="GitHub logo"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://github.com/digitalfantazy"
              target="_blank"
              rel="noreferrer"
              className={styles.footerLink}
            >
              <span>digitalfantazy</span>
              <Image
                src="/images/github-logo.svg"
                className={styles.footerLogo}
                alt="GitHub logo"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://github.com/LiudmilaRodzina"
              target="_blank"
              rel="noreferrer"
              className={styles.footerLink}
            >
              <span>liudmilarodzina</span>
              <Image
                src="/images/github-logo.svg"
                className={styles.footerLogo}
                alt="GitHub logo"
                width={24}
                height={24}
              />
            </a>
          </div>
          <span className={styles.footerCopy}>&copy;2024</span>
        </div>
      </div>
    </footer>
  );
}
