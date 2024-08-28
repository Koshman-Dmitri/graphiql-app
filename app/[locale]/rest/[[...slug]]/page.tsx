import ResponseSection from '@/app/components/ResponseSection/ResponseSection';
import RestFormEditor from '@/app/components/RestFormEditor/RestFormEditor';
import initTranslations from '@/app/i18n';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';

export default async function RestPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams });

  const { locale } = params;
  const { t } = await initTranslations(locale, ['common', 'rest']);

  return (
    <>
      <h1 className="pageTitle">{t('rest:title')}</h1>
      <RestFormEditor />
      <ResponseSection data={data} status={status} errorMsg={errorMsg} t={t} />
    </>
  );
}
