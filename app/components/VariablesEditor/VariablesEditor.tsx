import { useState } from 'react';
import TableEditor, { TableProps } from '../TableEditor/TableEditor';
import styles from './VariablesEditor.module.css';

export default function VariablesEditor({
  title,
  data,
  handleAddData,
  handleChangeData,
  handleRemoveData,
}: TableProps) {
  const [isVisible, setIsVisible] = useState(false);

  const wrapperClassName = isVisible
    ? `${styles.variablesWrapper} ${styles.visible}`
    : styles.variablesWrapper;

  return (
    <div>
      <button
        className={styles.visibilityBtn}
        type="button"
        onClick={() => setIsVisible(!isVisible)}
      >
        Manage variables
      </button>
      <div className={wrapperClassName}>
        <TableEditor
          title={title}
          data={data}
          handleAddData={handleAddData}
          handleChangeData={handleChangeData}
          handleRemoveData={handleRemoveData}
        />
      </div>
    </div>
  );
}
