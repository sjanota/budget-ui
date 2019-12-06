import PropTypes from 'prop-types';
import React from 'react';

import { withDictionary } from '../../language';
import Panel from '../Panel/Panel';
import Table from '../Table/Table';

function TablePanel({
  title,
  columns,
  headerButtons,
  panelClassName,
  wrapper: Wrapper,
  wrapperProps,
  hiddenColumns,
  data,
  filters,
  ...props
}) {
  const paddedFirstColumn = {
    ...columns[0],
    classes: 'pl-3',
    headerClasses: 'pl-3',
  };
  const modifiedColumns = [
    paddedFirstColumn,
    ...columns.slice(1, columns.length),
  ];
  const wihtouHidden = modifiedColumns.map(c => ({
    ...c,
    hidden: hiddenColumns && hiddenColumns.some(hc => c.dataField === hc),
  }));

  function filtersMatch(row) {
    return filters.every(f => f(row));
  }

  const filteredData = data.filter(row => filtersMatch(row));

  return (
    <Wrapper className={panelClassName} {...wrapperProps}>
      <Wrapper.Header className='p-2 pl-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <Wrapper.Title title={title} className='table-panel--title' />
          <div>{headerButtons}</div>
        </div>
      </Wrapper.Header>

      <Wrapper.Body className='p-0'>
        <Table
          classes='table-layout-auto table-sm m-0'
          striped
          hover
          bordered={false}
          columns={wihtouHidden}
          data={filteredData}
          {...props}
        />
      </Wrapper.Body>
    </Wrapper>
  );
}

TablePanel.propTypes = {
  wrapper: PropTypes.elementType,
  wrapperProps: PropTypes.object,
  title: PropTypes.string.isRequired,
  headerButtons: PropTypes.node,
  columns: PropTypes.array.isRequired,
  panelClassName: PropTypes.string,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.arrayOf(PropTypes.func),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TablePanel.defaultProps = {
  wrapper: Panel,
  wrapperProps: {},
  hiddenColumns: [],
  filters: [],
};

export default withDictionary('title', TablePanel);
