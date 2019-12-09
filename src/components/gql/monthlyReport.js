import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useBudget } from './budget';

const MONTHLY_REPORT_FRAGMENT = gql`
  fragment MonthlyReport on MonthlyReport {
    month
    totalPlannedAmount
    totalIncomeAmount
    totalExpenseAmount
    problems {
      severity
      ... on EnvelopeOverLimit {
        id
      }
      ... on NegativeBalanceOnAccount {
        id
      }
      ... on NegativeBalanceOnEnvelope {
        id
      }
      ... on Misplanned {
        overplanned
      }
    }
  }
`;

export const GET_MONTHLY_REPORT = gql`
  query GetMonthlyReport($budgetID: ID!, $month: Month!) {
    monthlyReport(budgetID: $budgetID, month: $month) {
      ...MonthlyReport
    }
  }
  ${MONTHLY_REPORT_FRAGMENT}
`;

export function useGetMonthlyReport(month) {
  const { selectedBudget } = useBudget();
  return useQuery(GET_MONTHLY_REPORT, {
    variables: { budgetID: selectedBudget.id, month },
    fetchPolicy: 'network-only',
  });
}
