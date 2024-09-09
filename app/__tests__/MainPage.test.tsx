import { render, screen } from '@testing-library/react';
import MainPage from '../components/MainPage/MainPage';

describe('MainPage', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
  });

  test('Should be rendered with token', () => {
    const props = { hasToken: true, name: 'Name' };
    render(<MainPage hasToken={props.hasToken} name={props.name} />);

    expect(screen.getByText('rest_btn')).toBeInTheDocument();
    expect(screen.queryByText('common:sign_in')).not.toBeInTheDocument();
  });

  test('Should be rendered without token', () => {
    const props = { hasToken: false, name: 'Name' };
    render(<MainPage hasToken={props.hasToken} name={props.name} />);

    expect(screen.queryByText('rest_btn')).not.toBeInTheDocument();
    expect(screen.getByText('common:sign_in')).toBeInTheDocument();
  });
});
