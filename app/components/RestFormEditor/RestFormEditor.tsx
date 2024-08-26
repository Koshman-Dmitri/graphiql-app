'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import makeRestPath from '@/app/utils/makeRestPath';
import { Query } from '@/app/utils/globalTypes';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import useLocalStorage from '@/app/services/localStorageApi/useLocalStorage';
import { addEmptyRow, changeRow, removeRow } from '@/app/utils/tableEditorHelpers';
import { RowElement } from './types';
import selfStyles from './RestFormEditor.module.css';
import styles from '../shared/editForm.module.css';
import MethodEditor from '../MethodEditor/MethodEditor';
import TableEditor from '../TableEditor/TableEditor';
import ControlledInput from '../ControlledInput/ControlledInput';
import ToggledTableEditor from '../ToggledTableEditor/ToggledTableEditor';
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

  const handleAddHeader = () => addEmptyRow(setHeaders, headers);
  const handleRemoveHeader = (id: number) => removeRow(setHeaders, headers, id);
  const handleChangeHeader = (e: ChangeEvent<HTMLInputElement>, id: number) =>
    changeRow(e, id, setHeaders, headers);

  const handleAddVariables = () => addEmptyRow(setVariables, variables);
  const handleRemoveVariables = (id: number) => removeRow(setVariables, variables, id);
  const handleChangeVariables = (e: ChangeEvent<HTMLInputElement>, id: number) =>
    changeRow(e, id, setVariables, variables);

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
          labelName=""
          labelClassName=""
          id=""
          name="endpointUrl"
          value={endpointUrl}
          placeholder="Enter URL or paste text"
          handleChange={handleChangeEndpointUrl}
        />
        <button className={selfStyles.submitBtn} type="button" onClick={handleSubmit}>
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
      <ToggledTableEditor
        title="variables"
        data={variables}
        handleAddData={handleAddVariables}
        handleChangeData={handleChangeVariables}
        handleRemoveData={handleRemoveVariables}
      />
    </form>
  );
}
