import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggledTableEditor from '../components/ToggledTableEditor/ToggledTableEditor';

describe('ToggledTableEditor', () => {
  test('Should be render for type "variables"', async () => {
    const props = {
      title: 'variables',
      data: [],
      handleAddData: () => vi.fn(),
      handleChangeData: () => vi.fn(),
      handleRemoveData: () => vi.fn(),
    };

    render(
      <ToggledTableEditor
        title={props.title}
        data={props.data}
        handleAddData={props.handleAddData}
        handleChangeData={props.handleChangeData}
        handleRemoveData={props.handleRemoveData}
      />
    );

    const visBtn = screen.getByText(`Manage ${props.title}`);
    await userEvent.click(visBtn);

    const text = screen.getByText('To use variable, type');
    expect(text).toBeInTheDocument();
  });

  test('Should be render for type "headers"', async () => {
    const props = {
      title: 'headers',
      data: [],
      handleAddData: () => vi.fn(),
      handleChangeData: () => vi.fn(),
      handleRemoveData: () => vi.fn(),
    };

    render(
      <ToggledTableEditor
        title={props.title}
        data={props.data}
        handleAddData={props.handleAddData}
        handleChangeData={props.handleChangeData}
        handleRemoveData={props.handleRemoveData}
      />
    );

    const visBtn = screen.getByText(`Manage ${props.title}`);
    await userEvent.click(visBtn);

    const text = screen.queryByText('To use variable, type');
    expect(text).not.toBeInTheDocument();
  });
});
