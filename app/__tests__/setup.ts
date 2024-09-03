import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

beforeEach(() => {
  vi.spyOn(window.history, 'replaceState').mockImplementation(() => null);
});

afterEach(() => {
  cleanup();
});

vitest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      locale: 'no',
      push: vi.fn(),
      reload: vi.fn(),
      refresh: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null),
    };
  },
  usePathname() {
    return {
      path: 'en/rest',
      split: vi.fn().mockImplementation(() => ['foo', 'bar']),
      replace: vi.fn(),
    };
  },
}));
