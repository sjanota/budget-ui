import { render } from '@testing-library/react';
import React from 'react';

import { DictionaryContext } from '../../language';
import TablePanel from './TablePanel';

const consoleError = jest.spyOn(global.console, 'error').mockImplementation();

describe('TablePanel', () => {
  it('renders title provided as prop', () => {
    const component = render(<TablePanel {...commonProps} title={fakeTitle} />);

    expectNoConsoleErrors();
    expectTitleToBeSet(component);
    expectFirstColumnToBePadded(component);
  });

  it('accepts title from context', () => {
    const component = render(
      <DictionaryContext.Provider value={fakeTitle}>
        <TablePanel {...commonProps} readTitle={d => d} />
      </DictionaryContext.Provider>
    );

    expectNoConsoleErrors();
    expectTitleToBeSet(component);
    expectFirstColumnToBePadded(component);
  });
});

afterAll(() => {
  consoleError.mockReset();
});

beforeEach(() => {
  consoleError.mockClear();
});

const fakeTitle = 'fake-title';
const commonProps = {
  columns: [{ dataField: 'id' }, { dataField: 'name' }],
  data: [
    { id: 'my-id', name: 'my-name' },
    { id: 'my-id1', name: 'my-name1' },
  ],
  keyField: 'id',
  columnNames: { id: 'ID', name: 'Name' },
};

function expectNoConsoleErrors() {
  expect(consoleError).not.toHaveBeenCalled();
}

function expectTitleToBeSet({ queryByText }) {
  expect(queryByText(fakeTitle)).toBeTruthy();
}

function expectFirstColumnToBePadded({ queryByText }) {
  expect(queryByText(commonProps.columnNames.id)).toHaveClass('pl-3');
  expect(queryByText(commonProps.data[0].id)).toHaveClass('pl-3');
  expect(queryByText(commonProps.data[1].id)).toHaveClass('pl-3');
}
