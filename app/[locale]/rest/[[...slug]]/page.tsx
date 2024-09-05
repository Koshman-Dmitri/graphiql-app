import ResponseSection from '@/app/components/ResponseSection/ResponseSection';
import RestFormEditor from '@/app/components/RestFormEditor/RestFormEditor';
import getAuthToken from '@/app/services/firebase/getAuthToken';
import initTranslations from '@/app/services/internationalization/i18n';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';
import { redirect } from 'next/navigation';

export default async function RestPage({ params, searchParams }: UrlParams) {
  if (!getAuthToken()) redirect('/sign-in');

  const { data, status, errorMsg } = await makeRequest({ params, searchParams });

  const { locale } = params;
  const { t } = await initTranslations(locale, ['common', 'rest']);

  return (
    <>
      <h1 className="pageTitle">{t('rest:rest_title')}</h1>
      <RestFormEditor />
      <ResponseSection data={data} status={status} errorMsg={errorMsg} t={t} />
    </>
  );
}
