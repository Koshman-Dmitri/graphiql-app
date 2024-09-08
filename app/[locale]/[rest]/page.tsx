import getAuthToken from '@/app/services/firebase/getAuthToken';
import { UrlParams } from '@/app/utils/globalTypes';
import { notFound, redirect } from 'next/navigation';
import RestPage from './[...slug]/page';

export default function Rest({ params, searchParams }: UrlParams) {
  if (!getAuthToken()) redirect('/sign-in');

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
  if (!methods.includes(params.rest)) notFound();

  return <RestPage params={params} searchParams={searchParams} />;
}
