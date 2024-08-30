import { UrlParams } from '../utils/globalTypes';
import MainPage from './main/page';

export default function HomePage({ params }: UrlParams) {
  return <MainPage params={params} />;
}
