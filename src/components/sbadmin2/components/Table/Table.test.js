import React from 'react';
import { render } from 'enzyme';
import Table from './Table';
import { DictionaryContext } from '../../language';

describe('Table', () => {
  it('renders with column names as a prop', () => {
    const component = whenRenderedWithColumnNamesProps();

    expectNoConsoleErrors();
    expectColumnNamesToBeSet(component);
    expectToWorkInBootstrap4Mode(component);
  });

  it('renders with column names from context', () => {
    const component = whenRenderedWithContext();

    expectNoConsoleErrors();
    expectColumnNamesToBeSet(component);
    expectToWorkInBootstrap4Mode(component);
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

function whenRenderedWithColumnNamesProps() {
  return render(
    <Table
      columns={[{ dataField: 'id' }, { dataField: 'name' }]}
      columnNames={{ id: fakeColumnName1, name: fakeColumnName2 }}
      data={[{ id: 'id', name: 'name' }]}
      keyField="id"
      condensed
    />
  );
}

function whenRenderedWithContext() {
  return render(
    <DictionaryContext.Provider
      value={{ id: fakeColumnName1, name: fakeColumnName2 }}
    >
      <Table
        columns={[{ dataField: 'id' }, { dataField: 'name' }]}
        readColumnNames={d => d}
        data={[{ id: 'id', name: 'name' }]}
        keyField="id"
        condensed
      />
    </DictionaryContext.Provider>
  );
}

function expectNoConsoleErrors() {
  expect(consoleError).not.toHaveBeenCalled();
}

function expectColumnNamesToBeSet(component) {
  const firstHeader = component.find('th').eq(0);
  expect(firstHeader.text()).toBe(fakeColumnName1);
  const secondHeader = component.find('th').eq(1);
  expect(secondHeader.text()).toBe(fakeColumnName2);
}

function expectToWorkInBootstrap4Mode(component) {
  expect(component.find('table').hasClass('table-sm')).toBe(true);
}
