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
        <h2 className={styles.errorTitle}>Could not send request</h2>
        <Image
          className={styles.errorImg}
          src="/images/request-error.png"
          alt="Request Error picture"
          width={200}
          height={200}
        />
        <p className={styles.errorMessage}>{errorMsg}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={styles.responseSection}>
        <h2 className={styles.title}>Responce</h2>
        <p className={styles.text}>Send your request</p>
      </section>
    );
  }

  const value = JSON.stringify(JSON.parse(data), undefined, 2);
  const statusClassName = status.startsWith('2') ? `${styles.goodReq}` : `${styles.badReq}`;

  return (
    <section className={styles.responseSection}>
      <h2 className={styles.title}>Responce</h2>
      <p className={statusClassName}>Status: {status}</p>
      <textarea className={styles.textarea} value={value} rows={10} cols={36} readOnly />
    </section>
  );
}
