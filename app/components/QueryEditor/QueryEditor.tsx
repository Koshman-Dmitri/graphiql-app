import { ChangeEvent, useRef, useState } from 'react';
import gqlPrettier from 'graphql-prettier';
import styles from './QueryEditor.module.css';

interface Props {
  value: string;
  name: string;
  rows: number;
  cols: number;
  placeholder: string;
  handleChangeQuery: (value: string) => void;
}

export default function QueryEditor({
  value,
  rows,
  cols,
  name,
  placeholder,
  handleChangeQuery,
}: Props) {
  const [error, setError] = useState<Error | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePrettifyBody = (): void => {
    let textareaValue = textareaRef.current?.value || '';

    try {
      textareaValue = gqlPrettier(textareaValue);
      setError(null);
    } catch (e) {
      const newError = e as Error;
      setError(newError);
    }

    handleChangeQuery(textareaValue);
  };

  return (
    <div className={styles.queryEditor}>
      <h2 className={styles.title}>Query</h2>
      <div className={styles.wrapper}>
        <div>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={value}
            rows={rows}
            cols={cols}
            name={name}
            placeholder={placeholder}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeQuery(e.target.value)}
          />
          {error && <p className={styles.errorMsg}>{error.message}</p>}
        </div>
        <button type="button" onClick={handlePrettifyBody}>
          Prettify
        </button>
      </div>
    </div>
  );
}
