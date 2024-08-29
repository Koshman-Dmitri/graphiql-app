import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JsonEditor from '../components/JsonEditor/JsonEditor';

describe('JsonEditor', () => {
  const props = {
    title: 'Body',
    value: '',
    name: 'name',
    rows: 10,
    cols: 10,
    placeholder: 'placeholder',
    handleChangeValue: () => vi.fn(),
  };

  test('Should be render', async () => {
    render(
      <JsonEditor
        title={props.title}
        value={props.value}
        rows={props.rows}
        cols={props.cols}
        name={props.name}
        placeholder={props.placeholder}
        handleChangeValue={props.handleChangeValue}
      />
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'some');
    expect(textarea).toBeInTheDocument();
  });

  test('Should work prettify onclick', async () => {
    render(
      <JsonEditor
        title={props.title}
        value={props.value}
        rows={props.rows}
        cols={props.cols}
        name={props.name}
        placeholder={props.placeholder}
        handleChangeValue={props.handleChangeValue}
      />
    );

    const prettifyBtn = screen.getByText('Prettify');
    await userEvent.click(prettifyBtn);
  });

  test('Should pretty valid json', async () => {
    const badProps = {
      title: 'Body',
      value: '{"test":"test"}',
      name: 'name',
      rows: 10,
      cols: 10,
      placeholder: 'placeholder',
      handleChangeValue: () => vi.fn(),
    };

    render(
      <JsonEditor
        title={badProps.title}
        value={badProps.value}
        rows={badProps.rows}
        cols={badProps.cols}
        name={badProps.name}
        placeholder={badProps.placeholder}
        handleChangeValue={badProps.handleChangeValue}
      />
    );

    const prettifyBtn = screen.getByText('Prettify');
    await userEvent.click(prettifyBtn);
  });

  test('Should hide pretty button on Text select', async () => {
    const badProps = {
      title: 'Body',
      value: '{"test":"test"}',
      name: 'name',
      rows: 10,
      cols: 10,
      placeholder: 'placeholder',
      handleChangeValue: () => vi.fn(),
    };

    render(
      <JsonEditor
        title={badProps.title}
        value={badProps.value}
        rows={badProps.rows}
        cols={badProps.cols}
        name={badProps.name}
        placeholder={badProps.placeholder}
        handleChangeValue={badProps.handleChangeValue}
      />
    );

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'Text');

    const prettifyBtn = screen.queryByText('Prettify');
    expect(prettifyBtn).not.toBeInTheDocument();
  });
});
