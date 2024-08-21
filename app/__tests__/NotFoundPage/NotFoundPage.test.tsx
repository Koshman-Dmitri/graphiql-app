import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import NotFoundPage from '../../not-found/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('NotFoundPage', () => {
  test('renders the 404 page with correct text', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404 - Page Not Found')).toBeDefined();
  });
});
