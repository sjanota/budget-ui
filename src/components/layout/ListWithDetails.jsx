import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Switch, useHistory } from 'react-router-dom';

import Details from '../common/Details';
import MonthSwitcher from '../common/MonthSwitcher';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { WithQuery } from '../gql/WithQuery';
import { Page } from '../sbadmin2';
import { withDictionary } from '../sbadmin2/language';

function ListWithDetails({ ...props }) {
  const { basePath } = props;

  return (
    <Switch>
      <Route
        path={`${basePath}/:name`}
        render={({ match }) => (
          <DetailsPage name={match.params.name} {...props} />
        )}
      />
      <Route render={() => <ListPage {...props} />} />
    </Switch>
  );
}

export default withDictionary('title', ListWithDetails);

function List({
  basePath,
  createButton,
  name,
  columns,
  renderActions,
  ...props
}) {
  const history = useHistory();

  const enhancedColumns = [
    { dataField: 'name', sort: true },
    ...columns,
    {
      dataField: 'actions',
      isDummyColumn: true,
      formatter: (_, row) => <span>{renderActions(row)}</span>,
      style: {
        whiteSpace: 'nowrap',
        width: '1%',
        paddingBottom: 0,
      },
    },
  ];

  function onSelect(entity) {
    history.push(`${basePath}/${entity.name}`);
  }

  return (
    <QueryTablePanel
      {...props}
      columns={enhancedColumns}
      onSelect={onSelect}
      buttons={createButton}
      keyField='id'
      defaultSorted={defaultSorted}
      selected={name}
    />
  );
}

function ListPage({ ...props }) {
  const { title } = props;

  return (
    <Page>
      <Page.Header title={title} />
      <List {...props} />
    </Page>
  );
}

function DetailsPage(props) {
  const { query, basePath, title, name, renderActions, getData } = props;

  return (
    <WithQuery query={query}>
      {({ data }) => {
        const entity = getData(data).find(e => e.name === name);
        return (
          <Page>
            <Page.Header
              title={name}
              actions={renderActions(entity)}
              breadcrumbs={[{ text: title, to: basePath }]}
            >
              <MonthSwitcher />
            </Page.Header>
            <Row>
              <Col sm={3}>
                <List visibleColumns={['name']} {...props} />
              </Col>
              <Col>
                <DetailsSection entity={entity} {...props} />
              </Col>
            </Row>
          </Page>
        );
      }}
    </WithQuery>
  );
}

const defaultSorted = [
  {
    dataField: 'name',
    order: 'asc',
  },
];

function DetailsSection({
  entity,
  columns,
  readColumnNames,
  detailsComponent: AdditionalDetails,
  name,
}) {
  return (
    <>
      <Details
        entity={entity}
        columns={columns}
        titleField='name'
        readFieldNames={readColumnNames}
      />
      <AdditionalDetails name={name} entity={entity} />
    </>
  );
}
