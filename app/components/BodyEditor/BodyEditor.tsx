import { ChangeEvent, useRef, useState } from 'react';
import styles from './BodyEditor.module.css';

interface Props {
  value: string;
  name: string;
  rows: number;
  cols: number;
  placeholder: string;
  handleChangeBody: (value: string) => void;
}

export default function BodyEditor({
  value,
  rows,
  cols,
  name,
  placeholder,
  handleChangeBody,
}: Props) {
  const [isJSON, setIsJSON] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePrettifyBody = (): void => {
    const textareaValue = textareaRef.current?.value || '';
    let uglyJSON;

    try {
      uglyJSON = JSON.parse(textareaValue) as object;
      setError(null);
    } catch (e) {
      const newError = e as Error;
      setError(newError);
    }

    const prettyJSON = JSON.stringify(uglyJSON, undefined, 2);
    handleChangeBody(prettyJSON);
  };

  return (
    <div className={styles.bodyEditor}>
      <h2 className={styles.title}>Body</h2>
      <div className={styles.wrapper}>
        <div className={styles.textareaWrapper}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={value}
            rows={rows}
            cols={cols}
            name={name}
            placeholder={placeholder}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeBody(e.target.value)}
          />
          {error && <p className={styles.errorMsg}>{error.message}</p>}
        </div>
        <div className={styles.controlWrapper}>
          <select
            className={styles.select}
            onChange={() => {
              setError(null);
              setIsJSON(!isJSON);
            }}
          >
            <option value="JSON">JSON</option>
            <option value="Text">Text</option>
          </select>
          {isJSON && (
            <button className={styles.prettifyBtn} type="button" onClick={handlePrettifyBody}>
              Prettify
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
