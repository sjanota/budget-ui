import React from 'react';
import PropTypes from 'prop-types';

import Panel from '../Panel/Panel';
import Table from '../Table/Table';
import { withDictionary } from '../../language';

function TablePanel({
  title,
  columns,
  headerButtons,
  panelClassName,
  wrapper: Wrapper,
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

  return (
    <Wrapper className={panelClassName}>
      <Wrapper.Header className="p-2 pl-3">
        <div className="d-flex justify-content-between align-items-center">
          <Wrapper.Title title={title} className="table-panel--title" />
          <div>{headerButtons}</div>
        </div>
      </Wrapper.Header>

      <Wrapper.Body className="p-0">
        <Table
          classes="table-layout-auto table-sm m-0"
          striped
          hover
          bordered={false}
          columns={modifiedColumns}
          {...props}
        />
      </Wrapper.Body>
    </Wrapper>
  );
}

TablePanel.propTypes = {
  wrapper: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  headerButtons: PropTypes.node,
  columns: PropTypes.array.isRequired,
  panelClassName: PropTypes.string,
};

TablePanel.defaultProps = {
  wrapper: Panel,
};

export default withDictionary('title', TablePanel);
