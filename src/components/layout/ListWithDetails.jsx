import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Switch, useHistory } from 'react-router-dom';

import Details from '../common/Details';
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

function List({ basePath, createButton, name, ...props }) {
  const history = useHistory();

  function onSelect(entity) {
    history.push(`${basePath}/${entity.name}`);
  }

  return (
    <QueryTablePanel
      {...props}
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
  const { basePath, title, name } = props;

  return (
    <Page>
      <Page.Header title={name} breadcrumbs={[{ text: title, to: basePath }]} />
      <Row>
        <Col sm={3}>
          <List visibleColumns={['name']} {...props} />
        </Col>
        <Col>
          <DetailsSection {...props} />
        </Col>
      </Row>
    </Page>
  );
}

const defaultSorted = [
  {
    dataField: 'name',
    order: 'asc',
  },
];

function DetailsSection({
  query,
  columns,
  readColumnNames,
  detailsComponent: AdditionalDetails,
  getData,
  name,
}) {
  return (
    <WithQuery query={query}>
      {({ data }) => {
        const entity = getData(data).find(e => e.name === name);
        return (
          <>
            <Details
              entity={entity}
              columns={columns}
              titleField='name'
              readFieldNames={readColumnNames}
            />
            <AdditionalDetails name={name} />
          </>
        );
      }}
    </WithQuery>
  );
}
