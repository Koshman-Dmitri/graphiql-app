import { render } from '@testing-library/react';
import NotFoundPage from '../[locale]/[...not-found]/page';
import GraphQLPage from '../[locale]/graphql/[[...slug]]/page';
import HistoryPage from '../[locale]/history/page';
import RestPage from '../[locale]/rest/[[...slug]]/page';

describe('Should render without crashing', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
  });

  test('Not Found Page', async () => {
    render(await NotFoundPage({ params: { slug: [], locale: 'en' } }));
  });

  test('GraphQl Page', async () => {
    render(await GraphQLPage({ params: { slug: [], locale: 'en' }, searchParams: {} }));
  });

  test('History Page', async () => {
    render(await HistoryPage({ params: { slug: [], locale: 'en' }, searchParams: {} }));
  });

  test('Rest Page', async () => {
    render(await RestPage({ params: { slug: [], locale: 'en' }, searchParams: {} }));
  });
});
