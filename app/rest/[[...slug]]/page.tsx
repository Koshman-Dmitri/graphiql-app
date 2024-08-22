import FormEditor from '@/app/components/FormEditor/FormEditor';
import ResponceSection from '@/app/components/ResponseSection/ResponseSection';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';

export default async function RestPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams });

  return (
    <div>
      <FormEditor />
      <ResponceSection data={data} status={status} errorMsg={errorMsg} />
    </div>
  );
}
