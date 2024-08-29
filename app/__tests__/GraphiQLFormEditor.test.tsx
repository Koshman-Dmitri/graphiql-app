import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import GraphiQLFormEditor from '../components/GraphiQLFormEditor/GraphiQLFormEditor';

describe('GraphiQLFormEditor', () => {
  afterAll(() => {
    localStorage.clear();
  });

  test('Should be rendered', async () => {
    const initQuery = {
      id: '123',
      type: 'graphql',
      method: 'GET',
      url: 'https://',
      encodedUrl: '',
      headers: [{ id: 0, key: '', value: '' }],
      variables: [{ id: 0, key: '', value: '' }],
      body: '',
      sdlUrl: 'sdlUrl',
      jsonVariables: '',
    };

    localStorage.setItem('restoreQuery', JSON.stringify(initQuery));

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ text: 'Fetch response' }),
      } as Response);
    });

    render(<GraphiQLFormEditor />);

    const sendBtn = screen.getByText('Send');
    await userEvent.click(sendBtn);
    expect(sendBtn).toBeDefined();

    const urlInput = screen.getByLabelText<HTMLInputElement>('Endpoint URL:');
    await userEvent.type(urlInput, 'url');
    expect(urlInput.value).toBe('https://url');

    const sdlInput = screen.getByLabelText<HTMLInputElement>('SDL URL:');
    await userEvent.type(sdlInput, 'sdl');
    expect(sdlInput.value).toBe('https://url?sdlsdl');

    const headerInput = screen.getAllByPlaceholderText<HTMLInputElement>('Value');
    await userEvent.type(headerInput[0], '1');
    expect(headerInput[0].value).toBe('1');

    const variableInput = screen.getByPlaceholderText<HTMLTextAreaElement>('Use valid JSON syntax');
    await userEvent.type(variableInput, '1');
    expect(variableInput.value).toBe('1');

    const manageVariablesBtn = screen.getByText('Manage variables');
    await userEvent.click(manageVariablesBtn);
    expect(manageVariablesBtn).toBeDefined();
  });
});
