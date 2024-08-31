import { UrlParams } from '../utils/globalTypes';
import NotFoundPage from './[...not-found]/page';

export default function NotFound({ params }: UrlParams) {
  return <NotFoundPage params={params} />;
}
