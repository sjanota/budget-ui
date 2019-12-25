import './MonthProblems.css';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

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

const basePathPerProblem = {
  NegativeBalanceOnEnvelope: '/envelopes',
  EnvelopeOverLimit: '/envelopes',
  NegativeBalanceOnAccount: '/accounts',
};

export function MonthProblems({ className, problems }) {
  const envelopesQuery = useGetEnvelopes();
  const accountsQuery = useGetAccounts();
  return (
    <WithQuery query={envelopesQuery}>
      {({ data: envelopesData }) => (
        <WithQuery query={accountsQuery}>
          {({ data: accountsData }) => (
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
                      <Problem
                        key={idx}
                        problem={problem}
                        envelopes={envelopesData.envelopes}
                        accounts={accountsData.accounts}
                      />
                    ))
                  ) : (
                    <NoProblems />
                  )}
                </ul>
              </Panel.Body>
            </Panel>
          )}
        </WithQuery>
      )}
    </WithQuery>
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

function Problem(props) {
  const { problem, accounts, envelopes } = props;
  const history = useHistory();
  const basePath = basePathPerProblem[problem.__typename];
  const classes = classNames(
    { 'month-dashboard__problem--clickable': !!basePath },
    'list-group-item',
    `text-${severityVariant[problem.severity]}`
  );

  function onClick() {
    if (!basePath) return;
    const list = basePath === '/envelopes' ? envelopes : accounts;
    const entityName = list.find(e => e.id === problem.id).name;
    history.push(`${basePath}/${entityName}`);
  }

  return (
    <li className={classes} onClick={onClick}>
      <i className={`fas fa-fw fa-${severityIcon[problem.severity]} mr-1`} />
      <ProblemMessage {...props} />
    </li>
  );
}

Problem.propTypes = {
  problem: PropTypes.shape({
    severity: PropTypes.oneOf(Object.keys(severityVariant)),
  }),
};

function ProblemMessage({ problem, envelopes, accounts }) {
  const { dashboard } = useDictionary();
  const { problems } = dashboard;

  return (
    <span>
      {problem.__typename === 'Misplanned'
        ? problem.overplanned
          ? problems.overplanned
          : problems.underplanned
        : problem.__typename === 'NegativeBalanceOnEnvelope'
        ? problems.expensesExceedPlans(
            envelopes.find(e => e.id === problem.id).name
          )
        : problem.__typename === 'EnvelopeOverLimit'
        ? problems.envelopeOverLimit(
            envelopes.find(e => e.id === problem.id).name
          )
        : problem.__typename === 'NegativeBalanceOnAccount'
        ? problems.negativeAccountBalance(
            accounts.find(a => a.id === problem.id).name
          )
        : problem.__typename === 'MonthStillInProgress'
        ? problems.monthNotEnded
        : problem.__typename}
    </span>
  );
}

ProblemMessage.propTypes = {
  problem: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    id: PropTypes.any,
    overplanned: PropTypes.bool,
  }),
};
