import Image from 'next/image';
import styles from './ResponseSection.module.css';

interface Props {
  data: string;
  status: string;
  errorMsg: string;
}

export default function ResponceSection({ data, status, errorMsg }: Props) {
  if (errorMsg) {
    return (
      <section className={styles.responseSection}>
        <div className={styles.errorWrapper}>
          <h3 className={styles.errorTitle}>Could not send request</h3>
          <Image
            src="/images/request-error.png"
            alt="Request Error picture"
            width={200}
            height={200}
          />
          <p className={styles.errorMessage}>{errorMsg}</p>
        </div>
      </section>
    );
  }

  const value = JSON.stringify(JSON.parse(data), undefined, 2);

  return (
    <section className={styles.responseSection}>
      <h3 className={styles.title}>Responce</h3>
      <p className={styles.status}>Status: {status}</p>
      <textarea className={styles.textarea} value={value} rows={10} cols={40} readOnly />
    </section>
  );
}
