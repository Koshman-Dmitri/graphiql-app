'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { RowElement } from './types';
import styles from './FormEditor.module.css';
import MethodEditor from '../MethodEditor/MethodEditor';
import TableEditor from '../TableEditor/TableEditor';
import ControlledInput from '../ControlledInput/ControlledInput';
import VariablesEditor from '../VariablesEditor/VariablesEditor';
import BodyEditor from '../BodyEditor/BodyEditor';

export default function FormEditor() {
  const [method, setMethod] = useState('GET');
  const [endpointUrl, setEndpointUrl] = useState('');
  const [headers, setHeaders] = useState<RowElement[]>([{ id: 0, key: '', value: '' }]);
  const [variables, setVariables] = useState<RowElement[]>([{ id: 0, key: '', value: '' }]);
  const [body, setBody] = useState('');

  const handleChangeMethod = (value: string): void => setMethod(value);

  const handleChangeEndpointUrl = (e: ChangeEvent<HTMLInputElement>): void =>
    setEndpointUrl(e.target.value);

  const handleAddHeader = (): void => {
    setHeaders([
      ...headers,
      {
        id: headers.length,
        key: '',
        value: '',
      },
    ]);
  };

  const handleChangeHeader = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    const { value, name } = e.target;

    const newHeaders = headers.slice();
    if (name === 'key') newHeaders[id].key = value;
    if (name === 'value') newHeaders[id].value = value;

    setHeaders(newHeaders);
  };

  const handleRemoveHeader = (id: number): void => {
    const newHeaders = headers.filter((el) => el.id !== id);

    if (newHeaders.length) {
      setHeaders(newHeaders);
    } else {
      setHeaders([{ id: 0, key: '', value: '' }]);
    }
  };

  const handleAddVariables = (): void => {
    setVariables([
      ...variables,
      {
        id: variables.length,
        key: '',
        value: '',
      },
    ]);
  };

  const handleChangeVariables = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    const { value, name } = e.target;

    const newVariables = variables.slice();
    if (name === 'key') newVariables[id].key = value;
    if (name === 'value') newVariables[id].value = value;

    setVariables(newVariables);
  };

  const handleRemoveVariables = (id: number): void => {
    const newVariables = variables.filter((el) => el.id !== id);

    if (newVariables.length) {
      setVariables(newVariables);
    } else {
      setVariables([{ id: 0, key: '', value: '' }]);
    }
  };

  const handleChangeBody = (value: string): void => setBody(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('TODO FORM SUBMIT');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.submitWrapper}>
        <MethodEditor method={method} handleChangeMethod={handleChangeMethod} />
        <ControlledInput
          className=""
          name="endpointUrl"
          value={endpointUrl}
          placeholder="Enter URL or paste text"
          handleChange={handleChangeEndpointUrl}
        />
        <button className={styles.submitBtn} type="submit">
          Send
        </button>
      </div>
      <TableEditor
        title="headers"
        data={headers}
        handleAddData={handleAddHeader}
        handleChangeData={handleChangeHeader}
        handleRemoveData={handleRemoveHeader}
      />
      <VariablesEditor
        title="variables"
        data={variables}
        handleAddData={handleAddVariables}
        handleChangeData={handleChangeVariables}
        handleRemoveData={handleRemoveVariables}
      />
      <BodyEditor
        value={body}
        rows={10}
        cols={40}
        name="bodyEditor"
        placeholder="Use JSON or Plain text syntax"
        readonly={false}
        handleChangeBody={handleChangeBody}
      />
    </form>
  );
}
