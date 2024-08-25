'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import makeRestPath from '@/app/utils/makeRestPath';
import { Query } from '@/app/utils/globalTypes';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import useLocalStorage from '@/app/services/localStorageApi/useLocalStorage';
import { RowElement } from './types';
import styles from './RestFormEditor.module.css';
import MethodEditor from '../MethodEditor/MethodEditor';
import TableEditor from '../TableEditor/TableEditor';
import ControlledInput from '../ControlledInput/ControlledInput';
import VariablesEditor from '../VariablesEditor/VariablesEditor';
import BodyEditor from '../BodyEditor/BodyEditor';

export default function RestFormEditor() {
  const initData = useLocalStorage();
  const router = useRouter();
  const [method, setMethod] = useState(initData.method);
  const [endpointUrl, setEndpointUrl] = useState(initData.url);
  const [headers, setHeaders] = useState<RowElement[]>(initData.headers);
  const [variables, setVariables] = useState<RowElement[]>(initData.variables);
  const [body, setBody] = useState(initData.body);

  useEffect(() => {
    setMethod(initData.method);
    setEndpointUrl(initData.url);
    setHeaders(initData.headers);
    setVariables(initData.variables);
    setBody(initData.body);
  }, [initData]);

  const handleChangeMethod = (value: string): void => setMethod(value);

  const handleChangeEndpointUrl = (e: ChangeEvent<HTMLInputElement>): void =>
    setEndpointUrl(e.target.value.trim());

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

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!endpointUrl) return;

    const path = makeRestPath({ method, url: endpointUrl, headers, variables, body });
    router.push(path);

    const newQuery = {
      id: crypto.randomUUID(),
      type: 'rest',
      method,
      url: endpointUrl,
      encodedUrl: path,
      headers,
      variables,
      body,
    } satisfies Query;

    localStorageApi.saveQuery(newQuery);
  };

  return (
    <form className={styles.form}>
      <div className={styles.submitWrapper}>
        <MethodEditor method={method} handleChangeMethod={handleChangeMethod} />
        <ControlledInput
          className=""
          name="endpointUrl"
          value={endpointUrl}
          placeholder="Enter URL or paste text"
          handleChange={handleChangeEndpointUrl}
        />
        <button className={styles.submitBtn} type="button" onClick={handleSubmit}>
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
      <BodyEditor
        value={body}
        rows={8}
        cols={30}
        name="bodyEditor"
        placeholder="Use JSON or Plain text syntax"
        handleChangeBody={handleChangeBody}
      />
      <VariablesEditor
        title="variables"
        data={variables}
        handleAddData={handleAddVariables}
        handleChangeData={handleChangeVariables}
        handleRemoveData={handleRemoveVariables}
      />
    </form>
  );
}
