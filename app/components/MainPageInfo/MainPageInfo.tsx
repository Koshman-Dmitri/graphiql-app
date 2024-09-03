import styles from './MainPageInfo.module.css';

export default function MainPageInfo() {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.sectionBox}>
        <h4 className={styles.sectionTitle}>Project Overview</h4>
        <p className={styles.paragraph}>
          Welcome to our final project for the{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
            className={styles.infoLink}
          >
            <span className={styles.bold}>Rolling Scopes School React 2024 Q3 course</span>
          </a>
        </p>
        <p>
          This tool is designed to help developers interact with APIs through dedicated pages for
          both <span className={styles.bold}>REST</span> and{' '}
          <span className={styles.bold}>GraphQL</span>. It allows users to efficiently test, debug,
          and explore the functionality of each API type
        </p>
      </div>

      <div className={styles.sectionBox}>
        <h4 className={styles.sectionTitle}>Technologies Used</h4>
        <p>React 18, Next.js 14, TypeScript, i18next, Vitest, Husky, ESLint, and Prettier</p>
      </div>

      <div className={styles.sectionBox}>
        <h4 className={styles.sectionTitle}>The Team</h4>
        <ul className={styles.teamList}>
          <li>
            <span className={styles.bold}>Team Lead:</span>{' '}
            <a
              href="https://github.com/koshman-dmitri"
              target="_blank"
              rel="noreferrer"
              className={styles.infoLink}
            >
              koshman-dmitri
            </a>
          </li>
          <li>
            <span className={styles.bold}>Developers:</span>{' '}
            <a
              href="https://github.com/digitalfantazy"
              target="_blank"
              rel="noreferrer"
              className={styles.infoLink}
            >
              digitalfantazy
            </a>
            ,{' '}
            <a
              href="https://github.com/LiudmilaRodzina"
              target="_blank"
              rel="noreferrer"
              className={styles.infoLink}
            >
              liudmilarodzina
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
