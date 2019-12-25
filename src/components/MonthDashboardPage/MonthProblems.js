import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { useGetAccounts } from '../gql/accounts';
import { useGetEnvelopes } from '../gql/envelopes';
import { WithQuery } from '../gql/WithQuery';
import { Panel, useDictionary } from '../sbadmin2';

const severityVariant = {
  ERROR: 'danger',
  WARNING: 'warning',
  INFO: 'primary',
};

const severityIcon = {
  ERROR: 'exclamation-circle',
  WARNING: 'exclamation-triangle',
  INFO: 'info-circle',
};

export function MonthProblems({ className, problems }) {
  return (
    <Panel className={className}>
      <Panel.Header>
        <div className='d-flex justify-content-between align-items-center'>
          <Panel.Title readTitle={d => d.dashboard.problems.title} />
        </div>
      </Panel.Header>
      <Panel.Body>
        <ul className='list-group list-group-flush'>
          {problems.length > 0 ? (
            problems.map((problem, idx) => (
              <Problem key={idx} problem={problem} />
            ))
          ) : (
            <NoProblems />
          )}
        </ul>
      </Panel.Body>
    </Panel>
  );
}

MonthProblems.propTypes = {
  className: PropTypes.string,
  problems: PropTypes.array.isRequired,
};

function NoProblems() {
  const { dashboard } = useDictionary();
  return (
    <li className='list-group-item text-success'>
      <i className='fas fa-fw fa-check-circle mr-1' />
      {dashboard.noProblems}
    </li>
  );
}

function Problem({ problem }) {
  return (
    <li className={`list-group-item text-${severityVariant[problem.severity]}`}>
      <i className={`fas fa-fw fa-${severityIcon[problem.severity]} mr-1`} />
      <ProblemMessage problem={problem} />
    </li>
  );
}

Problem.propTypes = {
  problem: PropTypes.shape({
    severity: PropTypes.oneOf(Object.keys(severityVariant)),
  }),
};

function ProblemMessage({ problem }) {
  const envelopesQuery = useGetEnvelopes();
  const accountsQuery = useGetAccounts();
  const { dashboard } = useDictionary();

  return (
    <WithQuery query={envelopesQuery}>
      {({ data: envelopesData }) => (
        <WithQuery query={accountsQuery}>
          {({ data: accountsData }) =>
            problem.__typename === 'Misplanned'
              ? problem.overplanned
                ? dashboard.problems.overplanned
                : dashboard.problems.underplanned
              : problem.__typename === 'NegativeBalanceOnEnvelope'
              ? withLink(
                  '/envelopes',
                  dashboard.problems.expensesExceedPlans,
                  envelopesData.envelopes,
                  problem
                )
              : problem.__typename === 'EnvelopeOverLimit'
              ? withLink(
                  '/envelopes',
                  dashboard.problems.envelopeOverLimit,
                  envelopesData.envelopes,
                  problem
                )
              : problem.__typename === 'NegativeBalanceOnAccount'
              ? withLink(
                  '/accounts',
                  dashboard.problems.negativeAccountBalance,
                  accountsData.accounts,
                  problem
                )
              : problem.__typename === 'MonthStillInProgress'
              ? dashboard.problems.monthNotEnded
              : problem.__typename
          }
        </WithQuery>
      )}
    </WithQuery>
  );
}

function withLink(basePath, textParts, data, problem) {
  const name = data.find(e => e.id === problem.id).name;
  const link = (
    <Link
      className={`text-${severityVariant[problem.severity]}`}
      to={`${basePath}/${name}`}
      key='link'
    >
      {name}
    </Link>
  );
  return textParts.reduce(
    (acc, v, idx) =>
      idx < textParts.length - 1
        ? [
            ...acc,
            <span key={idx}>{v}</span>,
            <span key={`${idx}-link`}>{link}</span>,
          ]
        : [...acc, <span key={idx}>{v}</span>],
    []
  );
}

ProblemMessage.propTypes = {
  problem: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    id: PropTypes.any,
    overplanned: PropTypes.bool,
  }),
};
