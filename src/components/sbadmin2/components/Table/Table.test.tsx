import { render } from '@testing-library/react';
import React from 'react';

import { DictionaryContext } from '../../language';
import Table from './Table';

describe('Table', () => {
  it('renders with column names as a prop', () => {
    const component = render(
      <Table
        columns={[{ dataField: 'id' }, { dataField: 'name' }]}
        columnNames={{ id: fakeColumnName1, name: fakeColumnName2 }}
        data={[fakeItem]}
        keyField='id'
        condensed
      />
    );

    expectNoConsoleErrors();
    expectColumnNamesToBeSet(component);
    expectToWorkInBootstrap4Mode(component);
    expectItemsToBeRendered(component);
  });

  it('renders with column names from context', () => {
    const component = render(
      <DictionaryContext.Provider
        value={{ id: fakeColumnName1, name: fakeColumnName2 }}
      >
        <Table
          columns={[{ dataField: 'id' }, { dataField: 'name' }]}
          readColumnNames={d => d}
          data={[fakeItem]}
          keyField='id'
          condensed
        />
      </DictionaryContext.Provider>
    );

    expectNoConsoleErrors();
    expectColumnNamesToBeSet(component);
    expectToWorkInBootstrap4Mode(component);
    expectItemsToBeRendered(component);
  });
});

const consoleError = jest.spyOn(global.console, 'error').mockImplementation();

afterAll(() => {
  consoleError.mockReset();
});

beforeEach(() => {
  consoleError.mockClear();
});

const fakeColumnName1 = 'ID';
const fakeColumnName2 = 'Name';
const fakeItem = { id: 'my-id', name: 'my-name' };

function expectNoConsoleErrors() {
  expect(consoleError).not.toHaveBeenCalled();
}

function expectColumnNamesToBeSet({ queryByText }) {
  expect(queryByText(fakeColumnName1)).toBeTruthy();
  expect(queryByText(fakeColumnName2)).toBeTruthy();
}

function expectToWorkInBootstrap4Mode({ getByRole }) {
  expect(getByRole('table')).toHaveClass('table-sm');
}

function expectItemsToBeRendered({ queryByText }) {
  expect(queryByText(fakeItem.id)).toBeTruthy();
  expect(queryByText(fakeItem.name)).toBeTruthy();
}
