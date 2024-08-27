import { render, screen } from '@testing-library/react';
import NotFoundPage from '../[locale]/not-found/page';

describe('NotFoundPage', () => {
  test('Renders the 404 page with correct text', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404 - Page Not Found')).toBeDefined();
  });
});
