import { useEffect, useState } from 'react';
import { Query } from '@/app/utils/globalTypes';
import localStorageApi from './localStorageApi';

type InitQuery = Pick<Query, 'method' | 'url' | 'headers' | 'variables' | 'body'>;

const initQuery: InitQuery = {
  method: 'GET',
  url: '',
  headers: [{ id: 0, key: '', value: '' }],
  variables: [{ id: 0, key: '', value: '' }],
  body: '',
};

const useLocalStorage = (): Query | InitQuery => {
  const [query, setQuery] = useState<Query | InitQuery>(initQuery);

  useEffect(() => {
    const restoreQuery = localStorageApi.getRestoreQuery();
    if (restoreQuery) setQuery(restoreQuery);
  }, []);

  return query;
};

export default useLocalStorage;
