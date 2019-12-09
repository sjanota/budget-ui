import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';

import Month from '../../model/Month';
import { useMonth } from '../context/Month';
import { useBudget } from '../gql/budget';
import { useDictionary } from '../sbadmin2';
import ContextSwitcher from '../sbadmin2/components/ContextSwitcher/ContextSwitcher';
import Spinner from '../sbadmin2/utilities/Spinner';

const GET_AVAILABLE_REPORTS = gql`
  query availableReports($budgetID: ID!) {
    availableReports(budgetID: $budgetID)
  }
`;

export default function MonthSwitcher(props) {
  const { selectedBudget } = useBudget();
  const { selectedMonth, setSelectedMonth } = useMonth();
  const { months } = useDictionary();
  const { loading, error, data } = useQuery(GET_AVAILABLE_REPORTS, {
    variables: {
      budgetID: selectedBudget.id,
    },
  });

  let value;
  let allowedValues = [];
  if (loading) {
    value = <Spinner size='sm' variant='secondary' />;
  } else if (error) {
    value = <i className='fas fa-fw fa-exclamation-triangle text-secondary' />;
  } else {
    allowedValues = data.availableReports
      .sort()
      .reverse()
      .map(m => {
        const parsed = Month.parse(m);
        const label = `${months[parsed.month - 1]} ${parsed.year}`;
        return { id: m, label };
      });

    const parsed = Month.parse(selectedMonth);
    value = `${months[parsed.month - 1]} ${parsed.year}`;
  }
  return (
    <ContextSwitcher
      {...props}
      value={value}
      allowedValues={allowedValues}
      onChange={month => setSelectedMonth(month)}
      displayBg='white'
      label='Month'
      showLabel={false}
      //   labelBg='light'
    />
  );
}
