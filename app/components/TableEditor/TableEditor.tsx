import { ChangeEvent } from 'react';
import styles from './TableEditor.module.css';
import { RowElement } from '../RestFormEditor/types';

export interface TableProps {
  title: string;
  data: RowElement[];
  handleAddData: () => void;
  handleChangeData: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  handleRemoveData: (id: number) => void;
}

function TableEditor({
  title,
  data,
  handleAddData,
  handleChangeData,
  handleRemoveData,
}: TableProps) {
  const tableTitle = `${title[0].toUpperCase()}${title.slice(1)}`;

  return (
    <div className={styles.tableEditor}>
      <h2 className={styles.title}>{tableTitle}</h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>Key</td>
            <td colSpan={2}>Value</td>
          </tr>
          {data.map((el) => (
            <tr key={el.id}>
              <td>
                <input
                  type="text"
                  name="key"
                  value={el.key}
                  onChange={(e) => handleChangeData(e, el.id)}
                  placeholder="Key"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="value"
                  value={el.value}
                  onChange={(e) => handleChangeData(e, el.id)}
                  placeholder="Value"
                />
              </td>
              <td>
                <button
                  className={styles.removeBtn}
                  type="button"
                  onClick={() => handleRemoveData(el.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addBtn} type="button" onClick={handleAddData}>
        {`Add ${title.slice(0, -1)}`}
      </button>
    </div>
  );
}

export default TableEditor;
