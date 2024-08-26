import ResponceSection from '@/app/components/ResponseSection/ResponseSection';
import RestFormEditor from '@/app/components/RestFormEditor/RestFormEditor';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';

export default async function RestPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams });

  return (
    <>
      <h1 className="pageTitle">RESTfull Client</h1>
      <RestFormEditor />
      <ResponceSection data={data} status={status} errorMsg={errorMsg} />
    </>
  );
}
