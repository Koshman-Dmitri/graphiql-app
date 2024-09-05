import GraphiQLFormEditor from '@/app/components/GraphiQLFormEditor/GraphiQLFormEditor';
import ResponseSection from '@/app/components/ResponseSection/ResponseSection';
import getAuthToken from '@/app/services/firebase/getAuthToken';
import initTranslations from '@/app/services/internationalization/i18n';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';
import { redirect } from 'next/navigation';

export default async function GraphQLPage({ params, searchParams }: UrlParams) {
  if (!getAuthToken()) redirect('/sign-in');

  const { data, status, errorMsg } = await makeRequest({ params, searchParams });
  const { t } = await initTranslations(params.locale, ['common', 'graphiql']);

  return (
    <>
      <h1 className="pageTitle">{t('graphiql:graphiql_title')}</h1>
      <GraphiQLFormEditor />
      <ResponseSection data={data} status={status} errorMsg={errorMsg} t={t} />
    </>
  );
}
