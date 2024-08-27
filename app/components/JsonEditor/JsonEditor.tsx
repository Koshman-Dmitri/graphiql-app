import { ChangeEvent, useRef, useState } from 'react';
import styles from './JsonEditor.module.css';

interface Props {
  title: string;
  value: string;
  name: string;
  rows: number;
  cols: number;
  placeholder: string;
  handleChangeValue: (value: string) => void;
}

export default function JsonEditor({
  title,
  value,
  rows,
  cols,
  name,
  placeholder,
  handleChangeValue,
}: Props) {
  const [isJSON, setIsJSON] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePrettify = (): void => {
    const textareaValue = textareaRef.current?.value || '';

    try {
      const uglyJSON = JSON.parse(textareaValue) as object;
      const prettyJSON = JSON.stringify(uglyJSON, undefined, 2);

      setError(null);
      handleChangeValue(prettyJSON);
    } catch (e) {
      const newError = e as Error;
      setError(newError);
    }
  };

  return (
    <div className={styles.jsonEditor}>
      <h2 className={styles.title}>{title}</h2>
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeValue(e.target.value)}
          />
          {error && <p className={styles.errorMsg}>{error.message}</p>}
        </div>
        <div className={styles.controlWrapper}>
          {title === 'Body' && (
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
          )}
          {isJSON && (
            <button type="button" onClick={handlePrettify}>
              Prettify
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
