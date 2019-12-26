import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Details from '../common/Details';
import { EntityList } from '../common/EntityList';
import MonthSwitcher from '../common/MonthSwitcher';
import { WithQuery } from '../gql/WithQuery';
import { Page } from '../sbadmin2';

export function DetailsPage(props) {
  const {
    query,
    basePath,
    title,
    name,
    renderActions,
    getData,
    getBreadcrumbPrefix = () => [],
  } = props;
  return (
    <WithQuery query={query}>
      {({ data }) => {
        const entity = getData(data).find(e => e.name === name);
        return (
          <Page>
            <Page.Header
              title={name}
              actions={renderActions(entity)}
              breadcrumbs={getBreadcrumbPrefix(entity).concat([
                { text: title, to: basePath },
              ])}
            >
              <MonthSwitcher />
            </Page.Header>
            <Row>
              <Col sm={3}>
                <EntityList visibleColumns={['name']} {...props} />
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
