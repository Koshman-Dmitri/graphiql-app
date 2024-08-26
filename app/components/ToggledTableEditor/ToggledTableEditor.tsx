import { useState } from 'react';
import TableEditor, { TableProps } from '../TableEditor/TableEditor';
import styles from './ToggledTableEditor.module.css';

export default function ToggledTableEditor({
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
        {isVisible ? `Close ${title}` : `Manage ${title}`}
      </button>
      <div className={wrapperClassName}>
        {title === 'variables' ? (
          <p className={styles.warningMsg}>
            {'To use variable, type '}
            <span className={styles.accentMsg}>{`{{variable_key}}`}</span>
          </p>
        ) : (
          <br />
        )}
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
