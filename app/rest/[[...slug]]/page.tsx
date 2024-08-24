import FormEditor from '@/app/components/FormEditor/FormEditor';
import ResponceSection from '@/app/components/ResponseSection/ResponseSection';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';
import styles from './page.module.css';

export default async function RestPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams });

  return (
    <>
      <h1 className={styles.pageTitle}>RESTfull Client</h1>
      <FormEditor />
      <ResponceSection data={data} status={status} errorMsg={errorMsg} />
    </>
  );
}
