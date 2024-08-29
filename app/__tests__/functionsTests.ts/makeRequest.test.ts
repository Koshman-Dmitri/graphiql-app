import makeRequest from '../../utils/makeRequest';

describe('makeRequest', () => {
  test('Do success request', async () => {
    const mockProps = {
      params: {
        slug: [
          'POST',
          'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE%3D',
          'eyJ0ZXN0IjoidmFsdWUifQ%3D%3D',
        ],
      },
      searchParams: { 'Content-Type': 'application/json' },
    };

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: 'mockStatusText',
        json: () => Promise.resolve({ test: 'test' }),
      } as Response);
    });

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '{"test":"test"}',
      errorMsg: '',
      status: '200 mockStatusText',
    });
  });

  test('Do failed request', async () => {
    const mockProps = {
      params: {
        slug: [
          'GRAPHQL',
          'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE%3D',
          'eyJ0ZXN0IjoidmFsdWUifQ%3D%3D',
        ],
      },
      searchParams: { 'Content-Type': 'application/json' },
    };

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.reject(new Error('Test Error', { cause: 'cause' }));
    });

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '',
      errorMsg: 'Error Test Error cause',
      status: '',
    });
  });

  test('Return empty data if no url parameters', async () => {
    const mockProps = {
      params: { slug: [] },
      searchParams: {},
    };

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '',
      errorMsg: '',
      status: '',
    });
  });

  test('Do success request with two slug', async () => {
    const mockProps = {
      params: {
        slug: ['GRAPHQL', 'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE%3D'],
      },
      searchParams: null!,
    };

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: 'mockStatusText',
        json: () => Promise.resolve({ test: 'test' }),
      } as Response);
    });

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '{"test":"test"}',
      errorMsg: '',
      status: '200 mockStatusText',
    });
  });

  test('Do success request', async () => {
    const mockProps = {
      params: {
        slug: [
          'POST',
          'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE%3D',
          'eyJ0ZXN0IjoidmFsdWUifQ%3D%3D',
          'more',
        ],
      },
      searchParams: { 'Content-Type': 'application/json' },
    };

    vitest.mock('next/navigation', () => ({
      notFound() {
        return null;
      },
    }));

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: 'mockStatusText',
        json: () => Promise.resolve({ test: 'test' }),
      } as Response);
    });

    expect(await makeRequest(mockProps)).toStrictEqual({
      data: '{"test":"test"}',
      errorMsg: '',
      status: '200 mockStatusText',
    });
  });
});
