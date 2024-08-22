import FormEditor from '@/app/components/FormEditor/FormEditor';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';

export default async function RestPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams });

  return (
    <div>
      <h2>{status}</h2>
      <h2>{errorMsg}</h2>
      <h2>{data}</h2>
      <FormEditor />
    </div>
  );
}
