import { Query } from '@/app/utils/globalTypes';

type LSKEY = {
  allHistoryQueries: Query[];
  restoreQuery: Query;
};

type ValueOf<T> = T[keyof T];
type LSValue = ValueOf<LSKEY>;

const localStorageApi = {
  setData: (key: keyof LSKEY, data: LSValue): void => {
    localStorage.setItem(key.toString(), JSON.stringify(data));
  },

  getAllQueries: (): Query[] | null => {
    const value = localStorage.getItem('allHistoryQueries');
    return value ? (JSON.parse(value) as Query[]) : null;
  },

  saveQuery: (query: Query): void => {
    const queries = localStorageApi.getAllQueries();

    if (!queries) {
      localStorageApi.setData('allHistoryQueries', [query]);
    } else {
      queries.push(query);
      localStorageApi.setData('allHistoryQueries', queries);
    }

    localStorageApi.saveRestoreQuery(query);
  },

  getRestoreQuery: (): Query | null => {
    const value = localStorage.getItem('restoreQuery');
    localStorage.removeItem('restoreQuery');
    return value ? (JSON.parse(value) as Query) : null;
  },

  saveRestoreQuery: (query: Query): void => {
    localStorageApi.setData('restoreQuery', query);
  },
};

export default localStorageApi;
