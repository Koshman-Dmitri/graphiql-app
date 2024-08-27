import MainPage from './main/page';

export default function HomePage({ params }: { params: { locale: string } }) {
  return <MainPage params={params} />;
}
