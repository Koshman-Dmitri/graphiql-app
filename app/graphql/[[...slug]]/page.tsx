import GraphiQLFormEditor from '@/app/components/GraphiQLFormEditor/GraphiQLFormEditor';
import ResponceSection from '@/app/components/ResponseSection/ResponseSection';

export default function GraphQLPage() {
  return (
    <>
      <h1 className="pageTitle">GraphiQL Client</h1>
      <GraphiQLFormEditor />
      <ResponceSection data="data" status="status" errorMsg="errorMsg" />
    </>
  );
}
