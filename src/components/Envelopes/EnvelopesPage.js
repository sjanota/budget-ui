import React from 'react';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { CategoriesListPanel } from '../Categories/CategoriesListPanel';
import Details from '../common/Details';
import { useGetEnvelopes } from '../gql/envelopes';
import { Page, useDictionary } from '../sbadmin2';
import Spinner from '../sbadmin2/utilities/Spinner';
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
  const history = useHistory();
  function handleSelected(envelope) {
    history.push(`/envelopes/${envelope.name}`);
  }

  return <EnvelopesTablePanel onSelect={handleSelected} />;
}

export function EnvelopeDetailsPage({ envelopeName }) {
  const history = useHistory();
  const { loading, error, data } = useGetEnvelopes();
  if (loading) {
    return <Spinner />;
  }
  const envelope = data.envelopes.find(e => e.name === envelopeName);

  function handleSelected(envelope) {
    history.push(`/envelopes/${envelope.name}`);
  }

  return (
    <Page>
      <Page.Header
        title={envelope.name}
        breadcrumbs={[
          { readText: d => d.sidebar.pages.envelopes, to: '/envelopes' },
        ]}
      />
      <Row>
        <Col sm={3}>
          <EnvelopesTablePanel
            hiddenColumns={['limit', 'balance', 'overLimit', 'actions']}
            onSelect={handleSelected}
            selected={envelope.id}
          />
        </Col>
        <Col>
          <EnvelopeDetails envelope={envelope} />
        </Col>
      </Row>
    </Page>
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
