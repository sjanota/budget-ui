import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import BootstrapTable from 'react-bootstrap-table-next';
import Table from './Table';
import { DictionaryContext } from '../../language';

it('Table renders with minimal props', () => {
  const component = renderer.create(
    <Table
      columns={[{ dataField: 'id' }]}
      columnNames={{ id: 'ID' }}
      data={[{ id: 'id' }]}
      keyField="id"
    />
  );
  expect(component).toMatchSnapshot();
});

describe('Table', () => {
  const component = mount(
    <Table
      columns={[{ dataField: 'id' }]}
      columnNames={{ id: 'ID' }}
      data={[{ id: 'id' }]}
      keyField="id"
    />
  );

  it('adds column names', () => {
    expect(component.find(BootstrapTable)).toHaveProp('columns', [
      { dataField: 'id', text: 'ID' },
    ]);
  });

  it('creates table in bootstrap4 mode', () => {
    expect(component.find(BootstrapTable)).toHaveProp('bootstrap4', true);
  });

  it('can read column names from dictionary', () => {
    const component = mount(
      <DictionaryContext.Provider value={{ id: 'ID' }}>
        <Table
          columns={[{ dataField: 'id' }]}
          readColumnNames={d => d}
          data={[{ id: 'id' }]}
          keyField="id"
        />
      </DictionaryContext.Provider>
    );
    expect(component.find(BootstrapTable)).toHaveProp('columns', [
      { dataField: 'id', text: 'ID' },
    ]);
  });
});
