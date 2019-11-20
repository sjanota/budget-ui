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
    expectFirstColumnToBePadded(component);
  });

  it('accepts title from context', () => {
    const component = whenRenderedWithContext();

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
  data: [{ id: 'my-id', name: 'my-name' }, { id: 'my-id1', name: 'my-name1' }],
  keyField: 'id',
  columnNames: { id: 'ID', name: 'Name' },
};
function whenRenderedWithTitleProp() {
  return render(<TablePanel {...commonProps} title={fakeTitle} />);
}

function whenRenderedWithContext() {
  return render(
    <DictionaryContext.Provider value={fakeTitle}>
      <TablePanel {...commonProps} readTitle={d => d} />
    </DictionaryContext.Provider>
  );
}

function expectNoConsoleErrors() {
  expect(consoleError).not.toHaveBeenCalled();
}

function expectTitleToBeSet(component) {
  expect(component.find('.table-panel--title').text()).toBe(fakeTitle);
}

function expectFirstColumnToBePadded(component) {
  const idHeader = component.find('th').eq(0);
  expect(idHeader.hasClass('pl-3')).toBe(true);

  const ids = component.find('tr > td:first-child');
  expect(ids.eq(0).hasClass('pl-3')).toBe(true);
  expect(ids.eq(1).hasClass('pl-3')).toBe(true);
}
