import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react';
import React, { createRef } from 'react';

import Combobox from './Combobox';

describe('Combobox', () => {
  it('renders without default value', () => {
    const { getByLabelText } = render(
      <Combobox allowedValues={[]} aria-label='combobox' />
    );

    expect(getByLabelText('combobox')).toBeEmpty();
  });

  it('renders with default value', () => {
    const { getByLabelText } = render(
      <Combobox
        defaultValue='123'
        allowedValues={[{ id: '123', label: 'label1' }]}
        aria-label='combobox'
      />
    );

    expect(getByLabelText('combobox')).toHaveValue('label1');
  });

  it('renders all allowed options after click', async () => {
    const { queryByText, getByRole, getByText, container } = render(
      <Combobox
        allowedValues={[
          { id: '123', label: 'label1' },
          { id: '321', label: 'label2' },
        ]}
      />
    );

    expect(queryByText('label1')).toBeFalsy();

    getByRole('button').click();
    await waitForDomChange({ container });

    const label1 = getByText('label1');
    expect(label1).toBeInTheDocument();
    expect(label1).toBeVisible();

    const label2 = getByText('label2');
    expect(label2).toBeInTheDocument();
    expect(label2).toBeVisible();
  });

  it('clicked value is propagated to ref', async () => {
    const ref = createRef();
    const { getByRole, getByText, container } = render(
      <Combobox _ref={ref} allowedValues={[{ id: '123', label: 'label1' }]} />
    );

    getByRole('button').click();
    await waitForDomChange({ container });

    const label1 = getByText('label1');
    label1.click();
    expect(ref.current.value).toBe('123');
  });

  it('narrows down rendered options on typing', async () => {
    const { getByLabelText, queryByText, container } = render(
      <Combobox
        allowedValues={[
          { id: '123', label: 'label1' },
          { id: '321', label: 'label2' },
        ]}
        aria-label='combobox'
      />
    );
    const input = getByLabelText('combobox');
    fireEvent.change(input, { target: { value: '1' } });
    await waitForDomChange({ container });

    expect(queryByText('label1')).toBeInTheDocument();
    expect(queryByText('label2')).not.toBeInTheDocument();
  });

  it('typing shows available options', async () => {
    const { getByLabelText, queryByText, container } = render(
      <Combobox
        allowedValues={[
          { id: '123', label: 'label1' },
          { id: '321', label: 'label2' },
        ]}
        aria-label='combobox'
      />
    );
    const input = getByLabelText('combobox');
    fireEvent.change(input, { target: { value: 'l' } });
    await waitForDomChange({ container });

    expect(queryByText('label1')).toBeInTheDocument();
    expect(queryByText('label2')).toBeInTheDocument();
  });

  it("filter is cleared when clicked outside is lost and it doesn't match any option", async () => {
    const { getByLabelText, container } = render(
      <Combobox
        allowedValues={[{ id: '123', label: 'label1' }]}
        aria-label='combobox'
      />
    );
    const input = getByLabelText('combobox');
    fireEvent.change(input, { target: { value: 'l' } });
    await waitForDomChange({ container });

    fireEvent.mouseDown(container);

    expect(getByLabelText('combobox')).toHaveValue('');
  });

  it('filter is left when clicked outside is lost and it matches any option', async () => {
    const ref = createRef();
    const { getByLabelText, container } = render(
      <Combobox
        _ref={ref}
        allowedValues={[{ id: '123', label: 'label1' }]}
        aria-label='combobox'
      />
    );
    const input = getByLabelText('combobox');
    fireEvent.change(input, { target: { value: 'label1' } });
    fireEvent.mouseDown(container);

    expect(getByLabelText('combobox')).toHaveValue('label1');
    expect(ref.current.value).toBe('123');
  });

  it('available options are hidden when clicked outside', async () => {
    const { getByRole, queryByText, container } = render(
      <Combobox allowedValues={[]} aria-label='combobox' />
    );
    getByRole('button').click();
    await waitForDomChange({ container });

    fireEvent.mouseDown(container);

    expect(queryByText('label1')).not.toBeInTheDocument();
  });

  it('sets required', async () => {
    const { getByLabelText } = render(
      <Combobox allowedValues={[]} required aria-label='combobox' />
    );
    expect(getByLabelText('combobox')).toBeRequired();
  });
});
