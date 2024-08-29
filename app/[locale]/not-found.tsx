import NotFoundPage from './[...not-found]/page';

export default function NotFound({ params }: { params: { locale: string } }) {
  return <NotFoundPage params={params} />;
}
