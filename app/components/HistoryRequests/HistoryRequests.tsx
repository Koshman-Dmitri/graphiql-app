'use client';

import { useEffect, useState } from 'react';
import { Query } from '@/app/utils/globalTypes';
import Link from 'next/link';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import styles from './HistoryRequests.module.css';

export default function HistoryRequests() {
  const [requests, setRequests] = useState<Query[] | null | 'loading'>('loading');

  useEffect(() => {
    const lsRequests = localStorageApi.getAllQueries();
    setRequests(lsRequests);
  }, []);

  if (requests === 'loading') {
    return <p className={styles.loading}>LOADING...</p>;
  }

  if (!requests)
    return (
      <div className={styles.emptyContent}>
        <p>You haven&apos;t executed any requests</p>
        <p>It&apos;s empty here. Try those options:</p>
        <div className={styles.pageLinksWrapper}>
          <Link href="/rest" className={`buttonLink ${styles.pageLink}`}>
            REST Clent
          </Link>
          <Link href="/graphql" className={`buttonLink ${styles.pageLink}`}>
            GraphiQL Client
          </Link>
        </div>
      </div>
    );

  return (
    <ul className={styles.historyList}>
      {requests.map((req) => (
        <li key={req.id} className={styles.historyElement}>
          <Link
            href={`${req.type}`}
            className={styles.historyLink}
            onClick={() => localStorageApi.saveRestoreQuery(req)}
          >
            <span className={styles.method}>{req.type === 'rest' ? req.method : 'GRAPHQL'}</span>
            <span className={styles.url}>{req.url}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
