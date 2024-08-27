import ResponceSection from '@/app/components/ResponseSection/ResponseSection';
import RestFormEditor from '@/app/components/RestFormEditor/RestFormEditor';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';
import initTranslations from '@/app/i18n';
import styles from './page.module.css';

export default async function RestPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams });

  const { locale } = params;
  const { t } = await initTranslations(locale, ['rest']);

  return (
    <>
      <h1 className={styles.pageTitle}>{t('title')}</h1>
      <RestFormEditor />
      <ResponceSection data={data} status={status} errorMsg={errorMsg} />
    </>
  );
}
