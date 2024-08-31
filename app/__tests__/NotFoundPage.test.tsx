import { render } from '@testing-library/react';
import NotFoundPage from '../[locale]/[...not-found]/page';

describe('NotFoundPage', () => {
  test('Should render without crashing', async () => {
    render(await NotFoundPage({ params: { slug: [], locale: 'en' } }));
  });
});
