import React from 'react';
import TablePanel from './TablePanel';
import { render } from 'enzyme';
import { DictionaryContext } from '../../language';

const consoleError = jest.spyOn(global.console, 'error').mockImplementation();

describe('TablePanel', () => {
  it('renders title provided as prop', () => {
    const component = whenRenderedWithTitleProp();

    expectNoConsoleErrors();
    expectTitleToBeSet(component);
  });

  it('accepts title from context', () => {
    const component = whenRenderedWithContext();

    expectNoConsoleErrors();
    expectTitleToBeSet(component);
  });
});

afterAll(() => {
  consoleError.mockReset();
});

beforeEach(() => {
  consoleError.mockClear();
});

const fakeTitle = 'fake-title';

function whenRenderedWithTitleProp() {
  return render(
    <TablePanel
      columns={[{ dataField: 'id' }]}
      columnNames={{ id: 'ID' }}
      data={[{ id: 'id' }]}
      keyField="id"
      title={fakeTitle}
    />
  );
}

function whenRenderedWithContext() {
  return render(
    <DictionaryContext.Provider value={fakeTitle}>
      <TablePanel
        columns={[{ dataField: 'id' }]}
        columnNames={{ id: 'ID' }}
        data={[{ id: 'id' }]}
        keyField="id"
        readTitle={d => d}
      />
    </DictionaryContext.Provider>
  );
}

function expectNoConsoleErrors() {
  expect(consoleError).not.toHaveBeenCalled();
}

function expectTitleToBeSet(component) {
  expect(component.find('.table-panel--title').text()).toBe(fakeTitle);
}
