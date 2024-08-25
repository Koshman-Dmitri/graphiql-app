import { notFound } from 'next/navigation';
import { UrlParams } from './globalTypes';

export default async function makeRequest({ params, searchParams }: UrlParams) {
  let status = '';
  let data = '';
  let errorMsg = '';
  const fetchParams = params.slug;

  if (fetchParams && fetchParams.length > 3) notFound();

  if (fetchParams && fetchParams.length > 1) {
    try {
      const method = fetchParams[0];
      const url = atob(decodeURIComponent(fetchParams[1]));
      const body = fetchParams[2] ? atob(decodeURIComponent(fetchParams[2])) : null;
      const headers = searchParams || null;

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      data = JSON.stringify(await response.json());
      status = `${String(response.status)} ${response.statusText}`;
    } catch (error) {
      const err = error as Error;
      errorMsg = `${err.name} ${err.message} ${String(err.cause)}`;
    }
  }

  return { data, status, errorMsg };
}
