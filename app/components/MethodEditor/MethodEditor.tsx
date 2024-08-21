import { ChangeEvent } from 'react';
import styles from './MethodEditor.module.css';

interface Props {
  method: string;
  handleChangeMethod: (value: string) => void;
}

export default function MethodEditor({ method, handleChangeMethod }: Props) {
  return (
    <select
      className={styles.select}
      value={method}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeMethod(e.target.value)}
    >
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="PATCH">PATCH</option>
      <option value="DELETE">DELETE</option>
      <option value="HEAD">HEAD</option>
      <option value="OPTIONS">OPTIONS</option>
    </select>
  );
}
