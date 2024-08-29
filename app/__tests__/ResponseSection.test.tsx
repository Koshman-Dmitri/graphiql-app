import { render, screen } from '@testing-library/react';
import ResponceSection from '../components/ResponseSection/ResponseSection';

describe('ResponseSection', () => {
  test('Should be render with data', () => {
    const props = {
      data: '{"data": "value"}',
      status: '201',
      errorMsg: '',
    };

    render(<ResponceSection data={props.data} status={props.status} errorMsg={props.errorMsg} />);

    const text = screen.getByText('Status: 201');
    expect(text).toBeInTheDocument();
  });

  test('Should be render if error', () => {
    const props = {
      data: '',
      status: '',
      errorMsg: 'Error',
    };

    render(<ResponceSection data={props.data} status={props.status} errorMsg={props.errorMsg} />);

    const text = screen.getByText('Could not send request');
    expect(text).toBeInTheDocument();
  });

  test('Should be render if no data', () => {
    const props = {
      data: '',
      status: '200',
      errorMsg: '',
    };

    render(<ResponceSection data={props.data} status={props.status} errorMsg={props.errorMsg} />);

    const text = screen.getByText('Send your request');
    expect(text).toBeInTheDocument();
  });

  test('Should be render if data and bad request status', () => {
    const props = {
      data: '{"data": "value"}',
      status: '400',
      errorMsg: '',
    };

    render(<ResponceSection data={props.data} status={props.status} errorMsg={props.errorMsg} />);

    const text = screen.getByText('Status: 400');
    expect(text).toBeInTheDocument();
  });
});
