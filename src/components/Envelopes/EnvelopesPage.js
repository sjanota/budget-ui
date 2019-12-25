import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { CategoriesListPanel } from '../Categories/CategoriesListPanel';
import Details from '../common/Details';
import { Page } from '../sbadmin2';
import { EnvelopesTablePanel, columns } from './EnvelopesTablePanel';

export default function EnvelopesPage() {
  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.envelopes} />
      <Envelopes />
      <CategoriesListPanel />
    </Page>
  );
}

function Envelopes() {
  const [selected, setSelected] = useState(null);
  if (selected === null) {
    return <EnvelopesTablePanel onSelect={setSelected} />;
  }
  return (
    <Row>
      <Col sm={3}>
        <EnvelopesTablePanel
          hiddenColumns={['limit', 'balance', 'overLimit']}
          onSelect={setSelected}
        />
      </Col>
      <Col>
        <EnvelopeDetails envelope={selected} />
      </Col>
    </Row>
  );
}

function EnvelopeDetails({ envelope }) {
  return (
    <div>
      <Details
        entity={envelope}
        columns={columns}
        titleField='name'
        readFieldNames={d => d.envelopes.table.columns}
      />
    </div>
  );
}
