import GraphiQLFormEditor from '@/app/components/GraphiQLFormEditor/GraphiQLFormEditor';
import ResponceSection from '@/app/components/ResponseSection/ResponseSection';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';

export default async function GraphQLPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams });

  return (
    <>
      <h1 className="pageTitle">GraphiQL Client</h1>
      <GraphiQLFormEditor />
      <ResponceSection data={data} status={status} errorMsg={errorMsg} />
    </>
  );
}
