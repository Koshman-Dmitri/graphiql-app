import { render, screen } from '@testing-library/react';
import GraphQlSchema from '../components/GraphQlSchema/GraphQlSchema';

describe('GraphQlSchema', () => {
  test('Should rendered correct with no schema found', () => {
    const props = {
      schema: 'schema',
      isError: true,
    };

    render(<GraphQlSchema schema={props.schema} isError={props.isError} />);

    const text = screen.getByText('Schema not found');
    expect(text).toBeInTheDocument();
  });

  test('Should rendered correct with no schema found', () => {
    const props = {
      schema: 'schema',
      isError: false,
    };

    render(<GraphQlSchema schema={props.schema} isError={props.isError} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });
});
