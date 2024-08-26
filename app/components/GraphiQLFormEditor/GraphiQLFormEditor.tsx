'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import useLocalStorage from '@/app/services/localStorageApi/useLocalStorage';
import { addEmptyRow, changeRow, removeRow } from '@/app/utils/tableEditorHelpers';
import { RowElement } from '../RestFormEditor/types';
import selfStyles from './GraphiQLFormEditor.module.css';
import styles from '../shared/editForm.module.css';
import ControlledInput from '../ControlledInput/ControlledInput';
import QueryEditor from '../QueryEditor/QueryEditor';
import ToggledTableEditor from '../ToggledTableEditor/ToggledTableEditor';

export default function GraphiQLFormEditor() {
  const initData = useLocalStorage();
  const [endpointUrl, setEndpointUrl] = useState(initData.url);
  const [sdlUrl, setSdlUrl] = useState(initData.sdlUrl || `${endpointUrl}?sdl`);
  const [query, setQuery] = useState(initData.body);
  const [variables, setVariables] = useState<RowElement[]>(initData.variables);
  const [headers, setHeaders] = useState<RowElement[]>(initData.headers);

  const handleChangeEndpointUrl = (e: ChangeEvent<HTMLInputElement>): void => {
    const endpoint = e.target.value.trim();

    setEndpointUrl(endpoint);
    setSdlUrl(`${endpoint}?sdl`);
  };

  const handleChangeSdlUrl = (e: ChangeEvent<HTMLInputElement>): void =>
    setSdlUrl(e.target.value.trim());

  const handleChangeQuery = (value: string): void => setQuery(value);

  const handleAddVariables = () => addEmptyRow(setVariables, variables);
  const handleRemoveVariables = (id: number) => removeRow(setVariables, variables, id);
  const handleChangeVariables = (e: ChangeEvent<HTMLInputElement>, id: number) =>
    changeRow(e, id, setVariables, variables);

  const handleAddHeader = () => addEmptyRow(setHeaders, headers);
  const handleRemoveHeader = (id: number) => removeRow(setHeaders, headers, id);
  const handleChangeHeader = (e: ChangeEvent<HTMLInputElement>, id: number) =>
    changeRow(e, id, setHeaders, headers);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log('TODO HANDLE SUBMIT');
  };

  return (
    <form className={styles.form}>
      <div className={styles.submitWrapper}>
        <ControlledInput
          className=""
          labelName="Endpoint URL: "
          labelClassName={selfStyles.labelInput}
          id="graphEndpointUrl"
          name="endpointUrl"
          value={endpointUrl}
          placeholder="Enter URL or paste text"
          handleChange={handleChangeEndpointUrl}
        />
        <button className={styles.submitBtn} type="button" onClick={handleSubmit}>
          Send
        </button>
      </div>
      <div className={styles.sdlInputWrapper}>
        <ControlledInput
          className=""
          labelName="SDL URL: "
          labelClassName={selfStyles.labelInput}
          id="graphSdlUrl"
          name="sdlUrl"
          value={sdlUrl}
          placeholder="Enter URL for SDL endpoint"
          handleChange={handleChangeSdlUrl}
        />
      </div>
      <QueryEditor
        value={query}
        rows={10}
        cols={30}
        name="queryEditor"
        placeholder="Use GraphQL syntax"
        handleChangeQuery={handleChangeQuery}
      />
      <ToggledTableEditor
        title="variables"
        data={variables}
        handleAddData={handleAddVariables}
        handleChangeData={handleChangeVariables}
        handleRemoveData={handleRemoveVariables}
      />
      <ToggledTableEditor
        title="headers"
        data={headers}
        handleAddData={handleAddHeader}
        handleChangeData={handleChangeHeader}
        handleRemoveData={handleRemoveHeader}
      />
    </form>
  );
}
