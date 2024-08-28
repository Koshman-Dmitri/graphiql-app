import styles from './GraphQlSchema.module.css';

export default function GraphQlSchema({ schema, isError }: { schema: string; isError: boolean }) {
  return (
    <section className={styles.schemaSection}>
      <h2 className={styles.title}>Schema</h2>
      {isError ? (
        <p>Schema not found</p>
      ) : (
        <textarea className={styles.textarea} value={schema} rows={20} cols={70} readOnly />
      )}
    </section>
  );
}
